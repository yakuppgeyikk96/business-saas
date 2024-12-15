export interface Product {
  _id: number;
  title: string;
  price: number;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  stock: number;
}
