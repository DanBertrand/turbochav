import { query, getDocs } from 'firebase/firestore';
import { collection, doc, getDoc } from '@firebase/firestore';
import { db } from 'pages';
import { Product } from 'types';

export const getAllProducts = async () => {
  const response = await getDocs(query(collection(db, 'products')));
  const products: Product[] = [];
  response.forEach((product) =>
    products.push({ id: product.id, ...product.data() } as Product)
  );
  return products;
};

export const getAllProductsIds = async () => {
  const products = await getDocs(collection(db, 'products'));
  const ids: { params: { id: string } }[] = [];
  products.forEach((doc) => {
    ids.push({ params: { id: doc.id } });
  });
  return ids;
};

export const getProductData = async (id: string) => {
  const docRef = doc(db, 'products', id);
  const product = await getDoc(docRef);
  const productData = { id: product.id, ...product.data() } as Product;
  return productData;
};
