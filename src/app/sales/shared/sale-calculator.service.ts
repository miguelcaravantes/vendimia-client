import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleCalculator {

  constructor() { }

  price = (itemPrice, financeRate, deadline) => {
    return this.round(itemPrice * (1 + (financeRate * deadline) / 100));
  }

  amount = (detailPrice, quantity) =>
    this.round(detailPrice * quantity)

  downPayment = (amount, downPaymentConf) =>
    this.round(amount * downPaymentConf / 100)

  downPaymentBonus = (downPayment, financeRate, deadline) =>
    this.round(downPayment * (financeRate * deadline / 100))

  total = (ammount, downPayment, downPaymentBonus) =>
    this.round(ammount - downPayment - downPaymentBonus)

  totalByCountedPrice = (countedPrice, financeRate, months) => {
    return this.round(countedPrice * (1 + (financeRate * months) / 100));
  }

  countedPrice = (total, financeRate, deadline) =>
    this.round(total / (1 + (financeRate * deadline / 100)))
  private round = (value) =>
    Math.round(value * 100) / 100;
}
