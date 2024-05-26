import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ResponseModel } from "../models/responseModel";

@Injectable({
    providedIn: 'root'
  })
  export class FakeBankService {
    processPayment(paymentDetails: any): Observable<ResponseModel> {
        const success = Math.random() > 0.2; // %80 başarılı olma ihtimali
        const response: ResponseModel = {
          success,
          message: success ? 'Ödeme başarılı' : 'Ödeme başarısız'
        };
        return of(response);
      }
  }
  