import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Product } from 'types';
import { getAllProductsIds, getProductData } from '@lib/products';
import Image from 'next/image';
import Layout from '@components/layout';
import styles from 'styles/Product.module.scss';
import { useDispatch } from 'react-redux';
import { addItemToCart } from 'store/slices/cart';

export default function ProductPage({ product }: { product: Product }) {
  const { name, description, images, price, quantity } = product;
  const dispatch = useDispatch();
  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <h1>{name}</h1>
        <p>{description}</p>
        <span>Price: {price}</span>
        <br />
        <span>Quantity: {quantity}</span>
        {images.map((url) => (
          <Image
            key={url}
            priority
            src={url}
            height={144}
            width={144}
            alt={name}
          />
        ))}
        <button onClick={() => dispatch(addItemToCart({ item: product }))}>
          Add to cart
        </button>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllProductsIds();
  console.log('PATHS', paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productData = await getProductData(params?.id as string);
  console.log('productData', productData);
  return {
    props: {
      product: productData,
    },
  };
};
