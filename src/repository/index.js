import { Product } from '../DAO/factory.js';
//import { Product, User, Ticket } from '../DAO/factory.js';

//import UserRepository from './users.repository.js';
//import TicketRepository from './tickets.repository.js';
import ProductRepository from './products.repository.js';

//export const UserService = new UserRepository(new User());
//export const TicketService = new TicketRepository(new Ticket());
export const ProductService = new ProductRepository(new Product());
