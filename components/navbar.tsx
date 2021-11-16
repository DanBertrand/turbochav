import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from 'firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import styles from 'styles/Navbar.module.scss';
import Cart from '@components/cart';
import { useSelector, useDispatch } from 'react-redux';
import { TStore } from 'store';
import Cookies from 'js-cookie';
import { addItemToCart } from 'store/slices/cart';
import { Product } from 'types';

const Status = () => {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
  };
  if (user) {
    return (
      <>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </>
    );
  }
  return (
    <>
      <Link href="/login">
        <a>Login</a>
      </Link>{' '}
      <Link href="/signup">
        <a>Register</a>
      </Link>
    </>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: TStore) => state.productsReducer);
  const { items: cartItems } = useSelector(
    (state: TStore) => state.cartReducer
  );

  useEffect(() => {
    // Load cart if stored in Cookies
    const itemsInCookies = Cookies.get('cartItems');
    if (itemsInCookies && !cartItems.length) {
      const parsedItems = JSON.parse(itemsInCookies) as Product[];
      parsedItems.map((item) => dispatch(addItemToCart({ item: item })));
    }
  }, []);

  console.log('Products from Navbar', data);
  return (
    <div className={styles.container}>
      <span>TurboChav</span>
      <Status />
      <Cart />
    </div>
  );
};

export default Navbar;
