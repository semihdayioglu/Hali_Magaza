#!/usr/bin/env python3
"""
Backend API Testing for Turkish E-commerce Flooring Website
Tests all API endpoints for functionality and error handling
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class BackendAPITester:
    def __init__(self, base_url="https://halitarim.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    Details: {details}")

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data: Dict[Any, Any] = None) -> tuple:
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                self.log_test(name, False, f"Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}, Expected: {expected_status}"
            
            if not success:
                details += f", Response: {response.text[:200]}"
            
            self.log_test(name, success, details)
            
            try:
                return success, response.json() if success else {}
            except:
                return success, {}

        except requests.exceptions.RequestException as e:
            self.log_test(name, False, f"Request error: {str(e)}")
            return False, {}

    def test_health_endpoints(self):
        """Test basic health and root endpoints"""
        print("\n🔍 Testing Health Endpoints...")
        
        # Test root endpoint
        self.run_test("Root API Endpoint", "GET", "api/", 200)
        
        # Test health check
        self.run_test("Health Check Endpoint", "GET", "api/health", 200)

    def test_order_endpoints(self):
        """Test order creation and retrieval"""
        print("\n🔍 Testing Order Endpoints...")
        
        # Test order creation with valid data
        order_data = {
            "full_name": "Test Müşteri",
            "email": "test@example.com",
            "phone": "5551234567",
            "city": "İstanbul",
            "district": "Kadıköy",
            "address": "Test Mahallesi, Test Sokak No:1",
            "notes": "Test sipariş notu",
            "items": [
                {
                    "product_id": "1",
                    "product_name": "Test Çim Halı",
                    "quantity": 2,
                    "price": 150.0,
                    "unit": "m²"
                }
            ],
            "subtotal": 300.0,
            "shipping": 49.99,
            "total": 349.99
        }
        
        success, response = self.run_test("Create Order", "POST", "api/orders", 200, order_data)
        
        if success and 'id' in response:
            order_id = response['id']
            tracking_code = response.get('tracking_code')
            
            # Test order retrieval
            self.run_test("Get Order by ID", "GET", f"api/orders/{order_id}", 200)
            
            # Test order tracking
            if tracking_code:
                self.run_test("Track Order", "GET", f"api/orders/track/{tracking_code}", 200)
        
        # Test invalid order creation
        invalid_order = {
            "full_name": "",  # Invalid: empty name
            "email": "invalid-email",  # Invalid email format
            "phone": "123",  # Invalid phone
            "items": []  # Empty items
        }
        self.run_test("Create Invalid Order", "POST", "api/orders", 422, invalid_order)
        
        # Test non-existent order
        self.run_test("Get Non-existent Order", "GET", "api/orders/nonexistent", 404)
        
        # Test non-existent tracking
        self.run_test("Track Non-existent Order", "GET", "api/orders/track/INVALID", 404)

    def test_contact_endpoints(self):
        """Test contact message endpoints"""
        print("\n🔍 Testing Contact Endpoints...")
        
        # Test valid contact message
        contact_data = {
            "name": "Test Kullanıcı",
            "email": "test@example.com",
            "phone": "5551234567",
            "subject": "Test Konu",
            "message": "Bu bir test mesajıdır."
        }
        
        self.run_test("Create Contact Message", "POST", "api/contact", 200, contact_data)
        
        # Test invalid contact message
        invalid_contact = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "subject": "",  # Empty subject
            "message": ""  # Empty message
        }
        self.run_test("Create Invalid Contact", "POST", "api/contact", 422, invalid_contact)

    def test_newsletter_endpoints(self):
        """Test newsletter subscription"""
        print("\n🔍 Testing Newsletter Endpoints...")
        
        # Test valid subscription
        newsletter_data = {
            "email": f"test{datetime.now().timestamp()}@example.com"  # Unique email
        }
        
        self.run_test("Newsletter Subscribe", "POST", "api/newsletter/subscribe", 200, newsletter_data)
        
        # Test duplicate subscription
        self.run_test("Duplicate Newsletter Subscribe", "POST", "api/newsletter/subscribe", 200, newsletter_data)
        
        # Test invalid email
        invalid_newsletter = {
            "email": "invalid-email"
        }
        self.run_test("Invalid Newsletter Subscribe", "POST", "api/newsletter/subscribe", 422, invalid_newsletter)

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend API Tests...")
        print(f"Testing against: {self.base_url}")
        
        self.test_health_endpoints()
        self.test_order_endpoints()
        self.test_contact_endpoints()
        self.test_newsletter_endpoints()
        
        # Print summary
        print(f"\n📊 Test Summary:")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = BackendAPITester()
    success = tester.run_all_tests()
    
    # Save test results
    with open('/app/test_reports/backend_test_results.json', 'w', encoding='utf-8') as f:
        json.dump({
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
                "timestamp": datetime.now().isoformat()
            },
            "results": tester.test_results
        }, f, indent=2, ensure_ascii=False)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())