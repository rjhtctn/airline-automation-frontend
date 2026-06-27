# Airline Automation Frontend

React + Vite + JavaScript ile geliştirilmiş havayolu rezervasyon, biletleme, check-in ve sistem yönetim arayüzü. 

## Proje Hakkında
Bu proje, havayolu şirketleri için bilet satış, uçuş yönetimi, dinamik koltuk seçimi ve raporlama süreçlerini kapsayan uçtan uca modern bir SPA (Single Page Application) çözümüdür. Kullanıcılar (yolcular) uçuş arayabilir, rezervasyon yapabilir, bilet satın alıp check-in yapabilirken; yöneticiler (adminler) sistemdeki tüm operasyonları merkezi bir dashboard üzerinden yönetebilir.

## Özellikler

### Yolcu (Passenger) Ekranları
- **Ana Sayfa & Uçuş Arama**: Tarih, kalkış ve varış havaalanlarına göre aktif uçuşları listeleme.
- **Kullanıcı Kaydı & Giriş**: E-posta doğrulama akışı (OTP destekli) ve güvenli giriş.
- **Rezervasyon Yönetimi**: Yeni rezervasyon oluşturma, detay görüntüleme, misafir rezervasyon sorgulama ve iptal.
- **Ödeme Modülü**: Rezervasyon sonrası bilet satın alma (Luhn formatlı mock kredi kartı sistemi).
- **Dinamik Check-in & Sınıf Yükseltme (Upgrade)**: İnteraktif koltuk haritası üzerinden seçim yapma. Üst sınıf bir koltuk (Business/First Class) seçildiğinde aradaki fiyat farkının sistem tarafından anlık hesaplanması ve inline tahsil edilmesi.
- **Biniş Kartı (Boarding Pass)**: Başarılı check-in sonrası uçuş ve koltuk detaylarını içeren biniş kartı.
- **Profil & Bildirimler**: Kişisel bilgileri güncelleme, şifre değiştirme ve anlık sistem bildirimlerini takip etme.

### Yönetici (Admin) Ekranları
- **Dashboard**: Günlük satışlar, aktif uçuşlar ve yolcu metriklerini içeren genel bakış.
- **Uçuş & Uçak Yönetimi**: Yeni uçak modelleri tanımlama, uçuş güzergahları oluşturma, rötar ve iptal durumlarını yönetme.
- **Havaalanı Yönetimi**: Dünyadaki havaalanlarını kodlarıyla sisteme tanıtma.
- **Kullanıcı Yönetimi**: Sisteme kayıtlı yolcuları görüntüleme, hesaplarını pasife alma, yeni admin kullanıcılar yetkilendirme.
- **Operasyonel Takip**: Sistemdeki tüm rezervasyon, bilet ve ödeme işlemlerini görüntüleme, iptal/iade süreçlerini yönetme.
- **Raporlama**: Detaylı bilet satış raporları ve uçuş bazlı doluluk oranları.
- **Audit Log**: Sistemde yapılan kritik değişikliklerin admin kayıt defteri.

## Teknolojiler

- **Core:** React 19, Vite, JavaScript
- **State Yönetimi:** Zustand (Global State)
- **Router:** React Router DOM (v7)
- **HTTP İstemcisi:** Axios (Interceptor, Refresh Token ve Hata Yönetimi mekanizmaları dahil)
- **Stil & UI:** TailwindCSS, Lucide React Icons
- **Bildirimler:** React Hot Toast
- **Form & Validation:** Zod / Custom Utils

## Mimari & Klasör Yapısı

```text
src/
├── api/            # Axios yapılandırması ve merkezi API servis sınıfları
│   └── mappers/    # Backend DTO'larını (Data Transfer Object) UI modellerine dönüştüren mapper katmanı
├── app/            # App.jsx (Root), React Router tanımlamaları (router.jsx)
├── components/     # İş etki alanlarına (domain) göre ayrılmış modüler UI bileşenleri
│   ├── admin/      # Admin tabloları, formlar
│   ├── auth/       # Login, kayıt, şifre sıfırlama formları
│   ├── checkin/    # İnteraktif koltuk haritası (SeatMap), Boarding Pass
│   ├── common/     # Global, tekrar kullanılabilir UI elemanları (Modal, Button, Input, Loader)
│   ├── flights/    # Uçuş arama kartları
│   └── ...
├── constants/      # Endpoint URlleri, Route isimleri, Roller (ROLES) ve Storage Key'ler
├── hooks/          # API verilerini çekmek ve yönetmek için Custom React Hook'lar
├── layouts/        # Sayfa yerleşimleri (PassengerLayout, AdminLayout, PublicLayout)
├── pages/          # Sayfa bileşenleri (Admin, Passenger, Public klasörlerinde gruplanmış)
├── store/          # Zustand store'ları (authStore.js, uiStore.js vs.)
├── styles/         # Global CSS tanımlamaları (index.css)
└── utils/          # Yardımcı fonksiyonlar (Tarih formatlama, yetki kontrolleri vb.)
```

## Geliştirme Ortamı Kurulumu

### Gereksinimler
- Node.js 18+
- Çalışır durumda bir [Airline Automation Backend](https://github.com/rjhtctn/airline-automation-backend) servisi.

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme ortamı (.env) dosyasını oluşturun:
```bash
cp .env.example .env
```

3. `.env` dosyası içerisinde backend URL adresinizin doğru olduğundan emin olun (Varsayılan: `http://localhost:3000`):
```env
VITE_API_BASE_URL=http://localhost:3000
```

4. Uygulamayı başlatın:
```bash
npm run dev
```

*(Projeye ağ üzerindeki cihazlardan erişmek için `npm run dev -- --host 0.0.0.0` kullanabilirsiniz.)*

## Kimlik Doğrulama ve Token Yönetimi
Uygulama JWT tabanlı token mimarisi kullanır:
- Giriş (Login) başarılı olduğunda dönen Access Token ve Refresh Token `localStorage`'da şifreli olmasa da güvenli bir formda saklanır.
- Backend'e atılan her istekte Axios Interceptor aracılığıyla Access Token otomatik olarak Header'a eklenir.
- Eğer Access Token'ın süresi dolmuşsa (HTTP 401 Unauthorized), arka planda kullanıcı hissetmeden `/refresh-token` endpoint'i tetiklenerek yeni bir oturum alınır. Eğer Refresh Token da geçersizse, localStorage temizlenir ve kullanıcı Login ekranına yönlendirilir.

## Build ve Production
```bash
npm run build
npm run preview
```
Build çıktısı Vite tarafından `dist/` klasörüne üretilir.
