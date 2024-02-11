export default class ProductCreateDTO {
  constructor(product) {
    this._id = product?._id || '';
    this.title = product?.title || '';
    this.description = product?.description || '';
    this.code = product?.code || Math.random().toString(36).substring(2, 8);
    this.price = product?.price || 0;
    this.status = product?.status || true;
    this.stock = product?.stock || 0;
    this.category = product?.category || '';
    this.thumbnail = product?.thumbnail || [];
    this.owner = product?.owner || 'admin';
  }
}
