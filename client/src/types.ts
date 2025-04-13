export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
}

export interface ProductProps {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  category: string;
  description: string;
  price: number;
  slug: string;
  image: ImageProps[];
  Tersedia: string;
  isPreOrder: boolean;
}

export interface CategoryProps {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  slug: string;
  image: ImageProps;
}

export interface CartProps {
  id: number;
  documentId: string;
  userId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product: ProductProps;
}

