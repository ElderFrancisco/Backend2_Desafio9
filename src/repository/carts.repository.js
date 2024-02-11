import CartCreateDTO from '../DTO/carts.dto.js';

export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  paginate = async (params) => {
    return this.dao.paginate(params);
  };
  get = async () => {
    return this.dao.get();
  };
  getByID = async (id) => {
    return this.dao.getByID(id);
  };
  create = async (data) => {
    const dataToInsert = new CartCreateDTO(data);
    return this.dao.create(dataToInsert);
  };
  update = async (data) => {
    const dataToInsert = new CartCreateDTO(data);
    return this.dao.update(dataToInsert);
  };
  deleteByID = async (id) => {
    return this.dao.deleteByID(id);
  };
  emptyByID = async (id) => {
    const cart = {
      _id: id,
      products: [],
    };
    return this.dao.update(cart);
  };
  //   export default class Cart {
  //     get = async () => {
  //       return cartModel.find();
  //     };
  //     create = async (data) => {
  //       return cartModel.create(data);
  //     };
  //     getByEmail = async (email) => {
  //       return cartModel
  //         .findOne({ email: email })
  //         .populate('products.product')
  //         .lean();
  //     };
  //     update = async (data) => {
  //       return cartModel.findOneAndUpdate({ _id: data._id }, data, { new: true });
  //     };
  //     paginate = async (params) => {
  //       return cartModel.paginate(
  //         {},
  //         {
  //           limit: params.limit,
  //           page: params.page,
  //           sort: params.sort,
  //           lean: true,
  //         },
  //       );
  //     };
  //     deleteByID = async (id) => {
  //       return cartModel.deleteOne({ _id: id });
  //     };
  //   }

  //   addTicket = async (userID, ticketID) => {
  //     const user = await this.dao.getByID(userID);

  //     if (!user) {
  //       throw new Error(`User not found`);
  //     }
  //     const ticket = await TicketService.getByID(ticketID);
  //     if (!ticket) {
  //       throw new Error(`Ticket not found`);
  //     }

  //     user.tickets.push(ticketID);

  //     return this.dao.update(user);
  //   };

  //   reminder = async (userID) => {
  //     const user = await this.dao.getByID(userID);

  //     let html = `Mr ${user.name}, your tickets: <hr><ul>`;
  //     for (let i = 0; i < user.tickets.length; i++) {
  //       const ticketID = user.tickets[i];
  //       const ticket = await TicketService.getByID(ticketID);

  //       html = html.concat(`<li>${ticket.name}: ${ticket.description}<li>`);
  //     }
  //     html += `<ul>`;

  //     const result = this.mail.send(user, 'Reminder Tickets', html);

  //     return result;
  //   };
}
