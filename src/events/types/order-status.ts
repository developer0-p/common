export enum OrderStatus {
  //created but not reserved
  Created = 'created',
  //trying to reserve one has been reserved or
  //user cancelled the order or
  //order expires
  Cancelled = 'cancelled',
  //successfully reserved
  AwaitingPayment = 'awaiting:payment',
  //successfully paid
  Complete = 'complete',
}
