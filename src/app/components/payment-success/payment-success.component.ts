import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  template: `
    <div class="container mt-5">
      <h2>Ödeme Başarılı</h2>
      <p>Kiralama işleminiz başarıyla tamamlandı. İyi yolculuklar dileriz!</p>
    </div>
  `
})
export class PaymentSuccessComponent { }
