# Frontend Update Notes

Bu paket, backend güncellemeleriyle uyum sağlamak için frontend üzerinde yapılan düzenlemeleri içerir.

## Yapılan ana düzenlemeler

- Auth akışı güncellendi:
  - Register sonrası token kaydedilmesi kaldırıldı.
  - E-posta doğrulama sayfası eklendi.
  - Doğrulama kodunu tekrar gönderme akışı eklendi.
  - Şifremi unuttum ve şifre sıfırlama akışları eklendi.
- Backend UUID kullandığı için ID alanlarında yapılan hatalı `Number(...)` dönüşümleri kaldırıldı.
- Ödeme payloadı backend'in beklediği `expiryDate` formatına dönüştürüldü.
- Profil payloadı `passengerProfile` nested yapısına uyumlu hale getirildi.
- Opsiyonel alanlarda `null` göndermek yerine boş değerlerin request body'den çıkarılması sağlandı.
- Backend nested DTO yanıtları için mapper katmanı eklendi.
- Admin kullanıcı ekranına yeni admin oluşturma formu/modalı eklendi.
- Havaalanı kodu validation kuralı 3 karaktere indirildi.
- `OTHER` cinsiyet seçeneği eklendi.
- Eksik notification türleri eklendi.
- Check-in ve bilet iptal butonları backend business rule'larına daha uyumlu hale getirildi.
- Axios refresh-token interceptor'ı auth endpointlerinde refresh denemeyecek şekilde güncellendi.
- Frontend varsayılan backend portu `localhost:3000` olarak güncellendi.
- ESLint hataları giderildi; proje build ve lint kontrollerinden geçti.

## Kontrol sonuçları

```bash
npm run build
# başarılı

npm run lint
# başarılı
```

## Notlar

Backend tarafında hâlâ tamamlanması önerilen bazı noktalar bulunur:

- `availableSeatCount` gerçek müsait koltuk sayısı olarak backend DTO'suna eklenmeli.
- Admin ticket DTO'suna kullanıcı bilgisi eklenirse admin bilet ekranı daha dolu çalışır.
- Sales report ödemelerine reservation/user relation eklenirse rapor ödeme detayları daha anlamlı görünür.
- Nullable alan politikası backend tarafında netleştirilmeli.
