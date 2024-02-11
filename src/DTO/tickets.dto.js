export default class TicketCreateDTO {
  constructor(ticket) {
    this.code = ticket?.code || Math.random().toString(36).substring(2, 8);
    this.purchase_datetime = ticket?.purchase_datetime || '';
    this.amount = ticket?.amount || '';
    this.purchaser = ticket?.purchaser || '';
  }
}
