import { Product } from "./product";

export interface Products {
  "total": number,
  "pages": number,
  "current_page": number,
  "per_page": number,
  "items": Product[]
}
