// import React from 'react';
import type { GetStaticProps } from 'next';
import styles from 'styles/Home.module.scss';
import { getAnalytics } from 'firebase/analytics';
import Link from 'next/link';
import { getAllProducts } from '@lib/products';
import { Product } from 'types';
import ProductCard from '@components/productCard';
import Layout from '@components/layout';
import { useDispatch } from 'react-redux';
import { setProducts } from 'store/slices/products';
import { app } from 'firebaseConfig';

if (typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
  console.log('Analytics', analytics);
}

export default function Home({ products }: { products: Product[] }) {
  const dispatch = useDispatch();

  dispatch(setProducts({ data: products }));
  return (
    <Layout>
      <Link href="/newProduct">
        <a>New Product</a>
      </Link>
      <section className={styles.container}>
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts();
  return {
    props: {
      products,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};
