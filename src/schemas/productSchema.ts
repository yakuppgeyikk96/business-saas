import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(2, "Ürün adı en az 2 karakter olmalıdır")
    .max(100, "Ürün adı en fazla 100 karakter olabilir"),
  price: z.coerce.number().min(0, "Fiyat 0'dan büyük olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  category: z.string().min(1, "Kategori seçmelisiniz"),
  stock: z.coerce.number().min(0, "Stok 0'dan büyük olmalıdır"),
});

export type ProductFormData = z.infer<typeof productSchema>;
