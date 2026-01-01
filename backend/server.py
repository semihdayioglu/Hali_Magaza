from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Yer Döşeme E-Ticaret API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class OrderItem(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    price: float
    unit: str

class OrderCreate(BaseModel):
    full_name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str = Field(..., min_length=10)
    city: str
    district: str
    address: str
    notes: Optional[str] = None
    items: List[OrderItem]
    subtotal: float
    shipping: float
    total: float

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    phone: str
    city: str
    district: str
    address: str
    notes: Optional[str] = None
    items: List[OrderItem]
    subtotal: float
    shipping: float
    total: float
    status: str = "pending"
    tracking_code: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class ContactMessageCreate(ContactMessage):
    pass

class ContactMessageResponse(ContactMessage):
    id: str
    created_at: datetime

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Yer Döşeme E-Ticaret API", "status": "active"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Orders
@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate):
    """Yeni sipariş oluştur"""
    order = Order(
        full_name=order_data.full_name,
        email=order_data.email,
        phone=order_data.phone,
        city=order_data.city,
        district=order_data.district,
        address=order_data.address,
        notes=order_data.notes,
        items=[item.model_dump() for item in order_data.items],
        subtotal=order_data.subtotal,
        shipping=order_data.shipping,
        total=order_data.total,
        tracking_code=f"YD{uuid.uuid4().hex[:6].upper()}"
    )
    
    doc = order.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.orders.insert_one(doc)
    return order

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Sipariş detayı getir"""
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Sipariş bulunamadı")
    
    if isinstance(order.get('created_at'), str):
        order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return order

@api_router.get("/orders/track/{tracking_code}")
async def track_order(tracking_code: str):
    """Kargo takip"""
    order = await db.orders.find_one({"tracking_code": tracking_code.upper()}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Kargo bulunamadı")
    
    return {
        "tracking_code": order["tracking_code"],
        "status": order["status"],
        "created_at": order["created_at"]
    }

# Contact Messages
@api_router.post("/contact", response_model=ContactMessageResponse)
async def create_contact_message(message: ContactMessageCreate):
    """İletişim mesajı gönder"""
    msg = ContactMessageResponse(
        id=str(uuid.uuid4()),
        name=message.name,
        email=message.email,
        phone=message.phone,
        subject=message.subject,
        message=message.message,
        created_at=datetime.now(timezone.utc)
    )
    
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_messages.insert_one(doc)
    return msg

# Newsletter Subscription
class NewsletterSubscribe(BaseModel):
    email: EmailStr

@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(data: NewsletterSubscribe):
    """Bültene abone ol"""
    existing = await db.newsletter.find_one({"email": data.email})
    if existing:
        return {"message": "Bu e-posta zaten kayıtlı", "status": "exists"}
    
    await db.newsletter.insert_one({
        "email": data.email,
        "subscribed_at": datetime.now(timezone.utc).isoformat()
    })
    
    return {"message": "Bültene başarıyla abone oldunuz", "status": "success"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
