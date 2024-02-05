import ticketmodel from './models/ticket.model.js';

export default class TicketsDao {
  async createOne(ticket) {
    try {
      return await ticketmodel.create(ticket);
    } catch (error) {
      req.logger.info(error);
    }
  }
}
