//Eski kod
/*
export const mapPayment = (payment) => {
  if (!payment) return payment;

  return {
    ...payment,
    reservationCode:
      payment.reservationCode || payment.reservation?.reservationCode || "—",
    userFullName:
      payment.userFullName || payment.reservation?.user?.fullName || "—",
  };
};

export const mapPayments = (payments = []) => payments.map(mapPayment);
*/

//Yeni eklenen kod
/* =========================================================================
   GÜNCELLEME NOTU:
   Sadece düz ödeme listelerini değil, ödeme işlemi tamamlandıktan sonra dönen 
   ve içinde bilet detaylarını (tickets) barındıran kompleks "Payment Result" 
   nesnelerini de UI'a uygun haritalayabilmek (map etmek) için genişletildi.
   ========================================================================= */

import { mapTickets } from "./ticketMapper";

export const mapPayment = (payment) => {
  if (!payment) return payment;

  return {
    ...payment,
    reservationCode:
      payment.reservationCode || payment.reservation?.reservationCode || "—",
    userFullName:
      payment.userFullName || payment.reservation?.user?.fullName || "—",
  };
};

export const mapPayments = (payments = []) => payments.map(mapPayment);

export const mapPaymentResult = (result) => {
  if (!result) return result;

  const payment = result.payment || result;
  const tickets = result.tickets || payment.tickets || [];

  return {
    ...result,

    payment: mapPayment(payment),
    tickets: mapTickets(tickets),

    paymentId: result.paymentId || payment?.id,
    reservationId: result.reservationId || payment?.reservationId,
    reservationCode:
      result.reservationCode ||
      payment?.reservationCode ||
      payment?.reservation?.reservationCode ||
      "—",
    amount: result.amount ?? payment?.amount ?? 0,
    paymentMethod: result.paymentMethod || payment?.paymentMethod,
    status: result.status || payment?.status,
    transactionNumber: result.transactionNumber || payment?.transactionNumber,
    paymentDate: result.paymentDate || payment?.paymentDate,
  };
};