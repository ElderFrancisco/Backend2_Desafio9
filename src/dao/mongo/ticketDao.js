const ticketmodel = require('./models/ticket.model');
class TicketsDao {
  async createOne(message) {
    try {
      return await ticketmodel.create(message);
    } catch (error) {
      console.log('error on TicketsDao createOne:' + error);
    }
  }
}
module.exports = TicketsDao;
