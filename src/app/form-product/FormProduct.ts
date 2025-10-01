export class FormProduct {
  id?: string;
  name: string;
  mark: string;
  value: number;

  static newFormProduct() {
    const formProduct = new FormProduct();
    return formProduct;
  }
}
