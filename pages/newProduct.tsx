import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from '@firebase/firestore';
import React, { useState } from 'react';
import { db, app } from 'firebaseConfig';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

type ProductState = {
  name: string;
  description: string;
  price: string;
  quantity: string;
};

const NewProduct = () => {
  const [state, setState] = useState({} as ProductState);
  const [files, setFiles] = useState([] as File[]);
  const [value, setValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const validateFields = () => {
    if (state.name && state.description && state.price && state.quantity) {
      createProduct();
    } else {
      alert('All field must be field');
    }
  };

  const handleFile = (files: FileList) => {
    const file = files[0];
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  console.log('files', files);

  const addImageToProduct = async (productId: string, url: string) => {
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, {
      images: arrayUnion(url),
    });
  };

  const uploadFile = (productId: string, file: File) => {
    const storage = getStorage(
      app,
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    );

    // /** @type {any} */
    // const metadata = {
    //   contentType: 'image/jpeg',
    // };

    const storageRef = ref(storage, `products/${productId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setValue(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        alert(error.code + '' + error.message);
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          addImageToProduct(productId, downloadURL);
        });
      }
    );
  };

  const createProduct = async () => {
    const docData = {
      ...state,
      quantity: parseInt(state.quantity),
      price: parseFloat(state.price),
    };
    const product = await addDoc(collection(db, 'products'), docData);

    if (product.id && files) {
      files.map((file) => uploadFile(product.id, file));
    }
  };

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input name="name" type="text" onChange={handleChange} />
      <label htmlFor="description">Description</label>
      <input name="description" type="text" onChange={handleChange} />
      <label htmlFor="quantity">Quantity</label>
      <input name="quantity" type="number" onChange={handleChange} />
      <label htmlFor="price">Price</label>
      <input name="price" type="number" step="0.01" onChange={handleChange} />
      <div>
        <progress value={value} max="100" style={{ width: '100%' }}></progress>
        <br />
        <label>Pictures</label>
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.files && handleFile(e.target.files)
          }
        />
      </div>
      <button type="button" onClick={validateFields}>
        Submit
      </button>
    </form>
  );
};

export default NewProduct;
