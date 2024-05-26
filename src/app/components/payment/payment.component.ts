import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FakeBankService } from "../../services/fake-bank.service";
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  carId: number | undefined;
  rentDate: string | undefined;
  returnDate: string | undefined;
  formattedCardNumber: string = '**** **** **** ****';
  formattedExpiryDate: string = '**/**';
  formattedCVV: string = '***';
  cardHolderName: string = '';

  constructor(
    private fb: FormBuilder,
    private fakeBankService: FakeBankService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { carId: number; rentDate: string; returnDate: string };
    if (state) {
      this.carId = state.carId;
      this.rentDate = state.rentDate;
      this.returnDate = state.returnDate;
    }
  }

  updateCardPreview() {
    const cardNumber = this.paymentForm.controls['cardNumber'].value;
    this.formattedCardNumber = cardNumber ? cardNumber.replace(/\d{4}(?=.)/g, '$& ') : '**** **** **** ****';

    const expiryDate = this.paymentForm.controls['expiryDate'].value;
    this.formattedExpiryDate = expiryDate ? expiryDate : '**/**';

    const cvv = this.paymentForm.controls['cvv'].value;
    this.formattedCVV = cvv ? cvv : '***';

    const cardHolderName = this.paymentForm.controls['cardHolderName'].value;
    this.cardHolderName = cardHolderName ? cardHolderName.toUpperCase() : 'KART SAHİBİ';
  }

  makePayment() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.fakeBankService.processPayment(this.paymentForm.value).subscribe((response: any) => {
      if (response.success) {
        this.toastr.success('Ödeme başarılı', 'Başarılı');
        this.router.navigate(['/payment-success']);
      } else {
        this.toastr.error('Ödeme sırasında hata oluştu', 'Hata');
      }
    });
  }
}
