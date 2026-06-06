# ✈️ Havayolu Otomasyon Sistemi — Frontend

React + JavaScript ile geliştirilmiş havayolu rezervasyon ve yönetim sistemi frontend uygulaması.

---

## 🚀 Kurulum

> ⚠️ **Not:** Backend ayrı çalışmalıdır (`localhost:5000`). Backend olmadan sadece arayüz görünür, API istekleri çalışmaz.

### Gereksinimler
- Node.js 18+
- npm 9+

### Adımlar

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Ortam değişkenini ayarla
# Windows:
copy .env.example .env
# Mac/Linux:
cp .env.example .env
# .env dosyasını aç, backend URL'ini güncelle:
# VITE_API_BASE_URL=http://localhost:5000

# 3. Geliştirme sunucusunu başlat
npm run dev

# 4. Tarayıcıda aç
# http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🗂️ Proje Yapısı

```
src/
├── api/              # Axios servis dosyaları (her endpoint için ayrı)
├── app/              # App.jsx, router.jsx, providers.jsx
├── components/       # Yeniden kullanılabilir UI bileşenleri
│   ├── admin/        # Admin paneli bileşenleri
│   ├── auth/         # Login / Register formları
│   ├── checkin/      # SeatMap, BoardingPassCard
│   ├── common/       # Button, Input, Modal, Table, Badge...
│   ├── flights/      # FlightCard, FlightSearchForm
│   ├── layout/       # Header, Footer, Sidebar
│   ├── payments/     # PaymentForm, PaymentSummary
│   ├── reservations/ # PassengerForm, ReservationCard
│   └── tickets/      # TicketCard, TicketList
├── constants/        # Route, endpoint, status sabit değerleri
├── hooks/            # useAuth, useFlights, useReservations...
├── layouts/          # PublicLayout, PassengerLayout, AdminLayout
├── pages/            # Tüm sayfa bileşenleri
│   ├── admin/        # Dashboard, CRUD sayfaları, raporlar
│   ├── passenger/    # Rezervasyon, bilet, check-in, ödeme
│   └── public/       # Ana sayfa, uçuş arama, login, register
├── routes/           # ProtectedRoute, AdminRoute, PassengerRoute
├── store/            # Zustand store (auth, ui, flightSearch)
├── styles/           # Global CSS, değişkenler, modül stilleri
└── utils/            # formatDate, formatPrice, validators...
```

---

## 🔐 Kullanıcı Rolleri

| Rol | Yönlendirme | Erişim |
|-----|-------------|--------|
| `PASSENGER` | `/passenger/tickets` | Rezervasyon, ödeme, check-in, bilet |
| `ADMIN` | `/admin/dashboard` | Tüm yönetim, raporlar, kullanıcılar |

---

## 📄 Sayfalar

### Public (Giriş Gerektirmez)
| Sayfa | Route |
|-------|-------|
| Ana Sayfa | `/` |
| Uçuş Arama | `/flight-search` |
| Uçuş Detayı | `/flight-detail/:id` |
| Giriş Yap | `/login` |
| Kayıt Ol | `/register` |

### Yolcu Paneli
| Sayfa | Route |
|-------|-------|
| Biletlerim | `/passenger/tickets` |
| Rezervasyonlarım | `/passenger/reservations` |
| Rezervasyon Oluştur | `/passenger/reservation-create/:flightId` |
| Rezervasyon Detayı | `/passenger/reservation-detail/:id` |
| Rezervasyon Sorgula | `/passenger/reservation-query` |
| Ödeme | `/passenger/payment/:reservationId` |
| Bilet Detayı | `/passenger/ticket-detail/:ticketNumber` |
| Check-In | `/passenger/check-in/:ticketId` |
| Boarding Pass | `/passenger/boarding-pass/:ticketId` |
| Profilim | `/passenger/profile` |
| Bildirimler | `/passenger/notifications` |

### Admin Paneli
| Sayfa | Route |
|-------|-------|
| Dashboard | `/admin/dashboard` |
| Kullanıcılar | `/admin/users` |
| Havaalanları (CRUD) | `/admin/airports` |
| Uçaklar (CRUD) | `/admin/aircrafts` |
| Uçuşlar (CRUD) | `/admin/flights` |
| Rezervasyonlar | `/admin/reservations` |
| Biletler | `/admin/tickets` |
| Ödemeler & İade | `/admin/payments` |
| Satış Raporu | `/admin/reports/sales` |
| Doluluk Raporu | `/admin/reports/flight-occupancy` |
| İşlem Logları | `/admin/audit-logs` |

---

## 🛠️ Teknolojiler

| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| React | 19 | UI framework |
| Vite | 8 | Build tool |
| React Router DOM | 7 | Sayfa yönlendirme |
| Axios | 1.x | HTTP istekleri |
| Zustand | 5 | Global state yönetimi |
| React Hot Toast | 2.x | Bildirimler |
| Lucide React | 1.x | İkonlar |

---

## 🔄 Token Yönetimi

- Login sonrası `accessToken` ve `refreshToken` localStorage'a kaydedilir
- Her istekte `Authorization: Bearer <token>` header'ı otomatik eklenir
- `401` hatası alındığında otomatik olarak token yenileme isteği atılır
- Refresh token da geçersizse kullanıcı `/login` sayfasına yönlendirilir

---

## 🌐 API Bağlantısı

`.env` dosyasındaki `VITE_API_BASE_URL` değişkeni backend adresini belirtir.

```env
VITE_API_BASE_URL=http://localhost:5000
```

Tüm endpoint tanımları `src/constants/apiEndpoints.js` dosyasındadır.

---

## 👥 Geliştirici Notları

- Component'ler direkt `axios` çağırmaz, `src/api/` klasöründeki servis fonksiyonları kullanılır
- Form doğrulamaları `src/utils/validators.js` üzerinden yapılır
- Tarih gösterimi: `formatDateTime()` → `15.07.2026 13:00`
- Fiyat gösterimi: `formatPrice()` → `2.500 TL`
- Koltuk durumu her zaman `flightId` bazlı sorgulanır (`GET /api/seats/available/:flightId`)
