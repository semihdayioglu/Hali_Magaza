# Yer Döşeme E-Ticaret Sitesi PRD

## Original Problem Statement
Yer döşemeleri e-ticaret web sitesi. Ürünler: Çim Halı, Karo Halı, PVC Zemin, Paspas. Referans: Bahçem.com.tr tasarım stili. Türkçe arayüz.

## User Personas
- **Ev Sahipleri**: Bahçe, balkon ve iç mekan zemin döşemesi arayanlar
- **İç Mimarlar**: Profesyonel projeler için toplu alım yapanlar
- **İnşaat Firmaları**: Büyük çaplı zemin kaplama ihtiyacı olanlar

## Core Requirements (Static)
- Statik ürün listesi JSON formatında, admin paneli altyapısına uygun
- Sepete ekleme ve WhatsApp sipariş formu
- localStorage ile sepet ve favoriler
- Profesyonel, modern, responsive tasarım
- Türkçe arayüz

## What's Been Implemented (Jan 2025)
- ✅ **Layout Components**: Topbar, Header, Navbar, Footer
- ✅ **Pages**: HomePage, CategoryPage, ProductDetailPage, CartPage, FavoritesPage, OrderPage, TrackOrderPage, AccountPage, SearchPage, NotFoundPage
- ✅ **Features**: 
  - Ürün listesi ve detay görüntüleme
  - Sepete ekleme/çıkarma (localStorage)
  - Favorilere ekleme/çıkarma (localStorage)
  - WhatsApp sipariş formu
  - Kargo takip (demo verilerle)
  - Ürün arama
  - Kategori filtreleme ve sıralama
- ✅ **Backend API**: Orders, Contact, Newsletter endpoints
- ✅ **Design**: Bahçem.com.tr tarzı yeşil tema

## Tech Stack
- **Frontend**: React + Tailwind CSS + Lucide Icons + Shadcn/UI
- **Backend**: FastAPI + MongoDB
- **State**: Context API + localStorage

## Prioritized Backlog

### P0 (Critical - Completed)
- [x] Ana sayfa ve hero section
- [x] Kategori sayfaları
- [x] Ürün detay sayfası
- [x] Sepet işlemleri
- [x] Sipariş formu

### P1 (High Priority - Future)
- [ ] Admin paneli (ürün yönetimi)
- [ ] Kullanıcı kayıt/giriş sistemi
- [ ] Online ödeme entegrasyonu (Stripe/iyzico)
- [ ] Gerçek kargo entegrasyonu

### P2 (Medium Priority - Future)
- [ ] Ürün yorumları ve puanlama
- [ ] Kupon/indirim kodu sistemi
- [ ] E-posta bildirimleri
- [ ] Stok yönetimi

### P3 (Low Priority - Future)
- [ ] Çoklu dil desteği
- [ ] Blog/içerik yönetimi
- [ ] SEO optimizasyonları
- [ ] Analytics entegrasyonu

## Next Tasks
1. Admin paneli için backend endpoint'leri oluştur
2. Kullanıcı authentication sistemi ekle
3. Ödeme sistemi entegrasyonu
