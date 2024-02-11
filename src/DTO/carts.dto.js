export default class CartCreateDTO {
  constructor(cart) {
    this.products = cart?.products || [];
  }
}
