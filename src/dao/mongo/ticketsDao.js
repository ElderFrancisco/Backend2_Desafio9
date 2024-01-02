const ticketmodel = require('./models/ticket.model');
class TicketsDao {
  async createOne(ticket) {
    try {
      return await ticketmodel.create(ticket);
    } catch (error) {
      console.log('error on TicketsDao createOne:' + error);
    }
  }
}
module.exports = TicketsDao;
