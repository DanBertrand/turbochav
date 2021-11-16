import React from 'react';
import { useRouter } from 'next/router';
import { Product } from '../types';
import Image from 'next/image';
import styles from '../styles/ProductCard.module.scss';

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { id, name, description, images, price, quantity } = product;

  const handleClick = () => {
    router.push(`http://localhost:3000/products/${id}`);
  };

  console.log('Product', product);
  console.log('Quantity', quantity);
  return (
    <article onClick={handleClick} className={styles.container}>
      <Image
        priority={false}
        src={images[0]}
        height={200}
        width={200}
        alt={name}
      />
      <section>
        <p>{name}</p>
        <p>{description}</p>
        <span>{price}</span>
      </section>
    </article>
  );
}
