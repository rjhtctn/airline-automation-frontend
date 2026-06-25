# Havayolu Otomasyon Sistemi — Frontend

React + JavaScript ile geliştirilmiş havayolu rezervasyon ve yönetim sistemi frontend uygulaması. Uygulama; uçuş arama, rezervasyon oluşturma, ödeme, bilet yönetimi, check-in, boarding pass, bildirimler ve admin yönetim ekranlarını içerir.

---

## Backend Bağlantısı

Bu frontend uygulaması ayrı çalışan backend servisi ile birlikte kullanılmak üzere hazırlanmıştır.

- Backend varsayılan adresi: `http://localhost:3000`
- Backend repository: [airline-automation-backend](https://github.com/rjhtctn/airline-automation-backend)

> **Not:** Backend çalışmadan arayüz açılır; ancak login, uçuş arama, rezervasyon, ödeme, check-in, admin işlemleri ve diğer API istekleri çalışmaz.

---

## Özellikler

### Public Kullanıcı İşlemleri
- Ana sayfa üzerinden uçuş arama alanına erişim
- Kalkış/varış havaalanı ve tarih bilgisine göre uçuş arama
- Uçuş detaylarını görüntüleme
- Kullanıcı girişi ve kayıt işlemleri
- E-posta doğrulama
- Doğrulama kodunu tekrar gönderme
- Şifremi unuttum ve şifre sıfırlama akışı

### Yolcu Paneli
- Yolcu profilini görüntüleme ve güncelleme
- Rezervasyon oluşturma
- Kullanıcıya ait rezervasyonları listeleme
- Rezervasyon detayını görüntüleme
- Rezervasyon kodu ile sorgulama
- Rezervasyon iptali
- Rezervasyon ödeme işlemi
- Biletleri listeleme
- Bilet detayını görüntüleme
- Bilet iptali
- Check-in işlemi
- Boarding pass görüntüleme
- Bildirimleri listeleme ve okundu olarak işaretleme

### Admin Paneli
- Dashboard ekranı
- Kullanıcı listeleme ve kullanıcı durum yönetimi
- Yeni admin kullanıcı oluşturma
- Havaalanı CRUD işlemleri
- Uçak CRUD işlemleri
- Uçağa ait koltukları görüntüleme
- Uçuş CRUD işlemleri
- Uçuş detaylarını görüntüleme
- Uçuş durum güncelleme
- Rezervasyonları listeleme ve detay görüntüleme
- Biletleri listeleme ve detay görüntüleme
- Ödemeleri listeleme ve iade işlemi
- Satış raporu
- Uçuş doluluk raporu
- Audit log / işlem logları görüntüleme

---

## Kurulum

### Gereksinimler

- Node.js 18+
- npm 9+
- Ayrı çalışan backend projesi

### Adımlar

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Ortam değişkeni dosyasını oluştur
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

`.env` dosyasındaki backend adresini kontrol et:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Geliştirme sunucusunu başlat:

```bash
npm run dev
```

Tarayıcıda aç:

```text
http://localhost:5173
```

---

## Kullanılabilir Komutlar

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build çıktısını önizleme
npm run preview

# ESLint kontrolü
npm run lint
```

---

## Proje Yapısı

```text
src/
├── api/                  # Axios client, servis dosyaları ve backend DTO mapper dosyaları
│   └── mappers/          # Backend response yapısını frontend ekran modeline çeviren mapper fonksiyonları
├── app/                  # App.jsx, router.jsx, providers.jsx
├── components/           # Yeniden kullanılabilir UI bileşenleri
│   ├── admin/            # Admin paneli tablo, form ve rapor bileşenleri
│   ├── auth/             # Login, register, verify email, forgot/reset password formları
│   ├── checkin/          # SeatMap, BoardingPassCard, CheckInSummary
│   ├── common/           # Button, Input, Modal, Table, Badge, Loader, ConfirmDialog
│   ├── flights/          # FlightCard, FlightList, FlightSearchForm, FlightDetailCard
│   ├── layout/           # Header, Footer, AdminSidebar, PassengerNavbar, GlobalUi
│   ├── notifications/    # NotificationList, NotificationItem
│   ├── payments/         # PaymentForm, PaymentSummary
│   ├── profile/          # ProfileForm
│   ├── reservations/     # PassengerForm, PassengerFormList, ReservationCard, ReservationDetailCard
│   └── tickets/          # TicketCard, TicketList, TicketDetailCard
├── constants/            # Route, endpoint, rol, status ve storage sabitleri
├── hooks/                # useAuth, useFlights, useReservations, useTickets, useCheckIn...
├── layouts/              # PublicLayout, PassengerLayout, AdminLayout
├── pages/                # Public, passenger ve admin sayfa bileşenleri
│   ├── admin/            # Dashboard, CRUD sayfaları, detay sayfaları ve raporlar
│   ├── passenger/        # Rezervasyon, bilet, check-in, ödeme, profil, bildirimler
│   └── public/           # Ana sayfa, uçuş arama, auth sayfaları
├── routes/               # PublicRoute, PassengerRoute, AdminRoute, ProtectedRoute
├── store/                # Zustand store dosyaları
├── styles/               # Global ve modül CSS dosyaları
└── utils/                # Format, validation, token, status ve yardımcı fonksiyonlar
```

---

## Kullanıcı Rolleri

| Rol | Varsayılan Yönlendirme | Erişim |
|-----|-------------------------|--------|
| `PASSENGER` | `/passenger/tickets` | Rezervasyon, ödeme, check-in, bilet, profil ve bildirim işlemleri |
| `ADMIN` | `/admin/dashboard` | Yönetim paneli, CRUD ekranları, raporlar, kullanıcılar ve loglar |

Yetki kontrolü `src/routes/PassengerRoute.jsx`, `src/routes/AdminRoute.jsx` ve `src/routes/PublicRoute.jsx` üzerinden yapılır.

---

## Sayfalar ve Route Bilgileri

### Public Sayfalar

| Sayfa | Route |
|-------|-------|
| Ana Sayfa | `/` |
| Uçuş Arama | `/flight-search` |
| Uçuş Detayı | `/flight-detail/:id` |
| Giriş Yap | `/login` |
| Kayıt Ol | `/register` |
| E-posta Doğrulama | `/verify-email` |
| Şifremi Unuttum | `/forgot-password` |
| Şifre Sıfırlama | `/reset-password` |

### Yolcu Paneli

| Sayfa | Route |
|-------|-------|
| Biletlerim | `/passenger/tickets` |
| Bilet Detayı | `/passenger/ticket-detail/:ticketNumber` |
| Rezervasyonlarım | `/passenger/reservations` |
| Rezervasyon Oluştur | `/passenger/reservation-create/:flightId` |
| Rezervasyon Detayı | `/passenger/reservation-detail/:id` |
| Rezervasyon Sorgula | `/passenger/reservation-query` |
| Ödeme | `/passenger/payment/:reservationId` |
| Check-In | `/passenger/check-in/:ticketId` |
| Boarding Pass | `/passenger/boarding-pass/:ticketId` |
| Profilim | `/passenger/profile` |
| Bildirimler | `/passenger/notifications` |

### Admin Paneli

| Sayfa | Route |
|-------|-------|
| Dashboard | `/admin/dashboard` |
| Kullanıcılar | `/admin/users` |
| Havaalanları | `/admin/airports` |
| Havaalanı Oluştur | `/admin/airports/create` |
| Havaalanı Düzenle | `/admin/airports/edit/:id` |
| Uçaklar | `/admin/aircrafts` |
| Uçak Oluştur | `/admin/aircrafts/create` |
| Uçak Düzenle | `/admin/aircrafts/edit/:id` |
| Uçak Koltukları | `/admin/aircrafts/:id/seats` |
| Uçuşlar | `/admin/flights` |
| Uçuş Oluştur | `/admin/flights/create` |
| Uçuş Düzenle | `/admin/flights/edit/:id` |
| Uçuş Detayı | `/admin/flights/detail/:id` |
| Rezervasyonlar | `/admin/reservations` |
| Rezervasyon Detayı | `/admin/reservations/:id` |
| Biletler | `/admin/tickets` |
| Bilet Detayı | `/admin/tickets/:ticketNumber` |
| Ödemeler & İade | `/admin/payments` |
| Satış Raporu | `/admin/reports/sales` |
| Doluluk Raporu | `/admin/reports/flight-occupancy` |
| İşlem Logları | `/admin/audit-logs` |

---

## Teknolojiler

| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| React | `^19.2.6` | UI geliştirme |
| React DOM | `^19.2.6` | React DOM render işlemleri |
| Vite | `^8.0.12` | Geliştirme sunucusu ve build aracı |
| React Router DOM | `^7.17.0` | Sayfa yönlendirme |
| Axios | `^1.17.0` | HTTP istekleri |
| Zustand | `^5.0.14` | Global state yönetimi |
| React Hot Toast | `^2.6.0` | Kullanıcı bildirimleri |
| Lucide React | `^1.17.0` | İkonlar |
| ESLint | `^10.3.0` | Kod kalite kontrolü |

---

## API Bağlantısı

`.env` dosyasındaki `VITE_API_BASE_URL` değişkeni backend adresini belirtir.

```env
VITE_API_BASE_URL=http://localhost:3000
```

Axios yapılandırması `src/api/axiosClient.js` dosyasındadır. Tüm endpoint sabitleri `src/constants/apiEndpoints.js` içinde tanımlanır.

Ana API grupları:

- Auth: login, register, logout, refresh token, verify email, forgot/reset password
- Users: profil, kullanıcı listesi, admin oluşturma, kullanıcı durumu güncelleme
- Airports: havaalanı listeleme, detay, oluşturma, güncelleme, silme
- Aircrafts: uçak listeleme, detay, oluşturma, güncelleme, silme, uçak koltukları
- Flights: uçuş listeleme, arama, detay, oluşturma, güncelleme, durum güncelleme, silme
- Seats: uçuşa göre müsait koltuklar, koltuk kilitleme ve kilit açma
- Reservations: rezervasyon oluşturma, kullanıcı rezervasyonları, detay, kod ile sorgulama, iptal, admin listeleme
- Payments: ödeme alma, ödeme listeleme, iade
- Tickets: kullanıcı biletleri, bilet detayı, bilet iptali, admin listeleme
- Check-ins: check-in oluşturma, boarding pass, check-in iptali
- Notifications: kullanıcı bildirimleri ve okundu işaretleme
- Reports: dashboard, satış raporu, uçuş doluluk raporu
- Audit Logs: işlem logları

---

## Token ve Oturum Yönetimi

- Login sonrası `accessToken`, `refreshToken` ve kullanıcı bilgileri `localStorage` içinde saklanır.
- Storage key değerleri `src/constants/storageKeys.js` dosyasında tanımlıdır.
- Her API isteğine otomatik olarak `Authorization: Bearer <token>` header'ı eklenir.
- `401` hatası alındığında refresh token ile yeni access token alınmaya çalışılır.
- Aynı anda birden fazla istek `401` alırsa refresh işlemi tek sefer yapılır; bekleyen istekler kuyruk üzerinden devam eder.
- Login, register, verify email, forgot password ve reset password gibi auth endpointlerinde refresh token denemesi yapılmaz.
- Refresh token geçersizse token bilgileri temizlenir ve kullanıcı `/login` sayfasına yönlendirilir.

---

## State Yönetimi

Zustand store dosyaları `src/store/` altında tutulur.

- `authStore.js`: login, register, logout, verify email, forgot/reset password ve oturum bilgileri
- `userStore.js`: profil bilgileri ve profil güncelleme
- `flightSearchStore.js`: uçuş arama parametreleri ve arama sonuçları
- `uiStore.js`: global loading, modal ve confirm dialog yönetimi

---

## Mapper Katmanı

Backend'den gelen nested DTO yanıtlarını frontend ekranlarında daha rahat kullanılacak yapıya çevirmek için `src/api/mappers/` klasörü kullanılır.

Mapper dosyaları özellikle şu alanlarda kullanılır:

- Uçuş verileri
- Rezervasyon verileri
- Bilet verileri
- Ödeme sonuçları
- Check-in / boarding pass verileri
- Rapor verileri
- Audit log verileri

Bu sayede component'ler backend response detaylarına doğrudan bağımlı kalmaz.

---

## Geliştirici Notları

- Component'ler doğrudan `axios` çağırmaz; API istekleri `src/api/` altındaki servis dosyaları üzerinden yapılır.
- Tüm route sabitleri `src/constants/routes.js` dosyasında tutulur.
- Tüm endpoint sabitleri `src/constants/apiEndpoints.js` dosyasında tutulur.
- Form doğrulama kuralları `src/utils/validators.js` üzerinden yönetilir.
- Tarih gösterimi için `formatDateTime()`, `formatDate()` ve `formatTime()` yardımcı fonksiyonları kullanılır.
- Fiyat gösterimi için `formatPrice()` kullanılır. Örnek: `2500` → `2.500 TL`
- Uçuşa göre müsait koltuk sorgusu `flightId` ile yapılır: `GET /api/seats/available/:flightId`
- Uçağa ait koltuk yönetimi `aircraftId` ile yapılır: `GET /api/seats/aircraft/:aircraftId`
- Backend UUID kullandığı için frontend tarafında ID değerleri sayıya çevrilmeden kullanılır.
- Kayıt işleminden sonra kullanıcı otomatik login yapılmaz; e-posta doğrulama akışına yönlendirilir.
- Admin kullanıcı oluşturma işlemi kullanıcılar sayfasındaki admin oluşturma formu/modalı üzerinden yapılır.
- Global loading, modal ve confirm dialog yönetimi `GlobalUi` bileşeni ile merkezi olarak sağlanır.

---

## Önemli Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `src/app/router.jsx` | Uygulamadaki tüm route tanımları |
| `src/api/axiosClient.js` | Axios base URL, token ekleme ve refresh token interceptor yapısı |
| `src/constants/apiEndpoints.js` | Backend endpoint sabitleri |
| `src/constants/routes.js` | Frontend route sabitleri |
| `src/constants/roles.js` | Kullanıcı rol sabitleri |
| `src/utils/tokenStorage.js` | Token ve kullanıcı bilgisini localStorage üzerinde yönetir |
| `src/api/mappers/` | Backend DTO yanıtlarını frontend modeline dönüştürür |
| `src/store/authStore.js` | Auth ve oturum yönetimi |
| `src/store/uiStore.js` | Global UI durum yönetimi |

---

## Production Build

```bash
npm run build
npm run preview
```

Build çıktısı Vite tarafından `dist/` klasörüne üretilir.
