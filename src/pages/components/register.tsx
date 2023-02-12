import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import Link from 'next/link';

type Option = {
  name: string;
  description: string;
  price: number;
};
type Item = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  options: Option;
};

export default function Post() {
  const [itemData, setItemData] = useState<Item>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '/images/NoImage.png',
    options:{
      name: '',
      description: '',
      price: 0,
    }
  });

  const i = itemData;

  const url = 'http://localhost:8000/items';

  function makeDate(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setItemData((i) => ({ ...i, [name]: value }));
  }
  function makeOption(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setItemData({
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      imageUrl: itemData.imageUrl,
      options:{
        name: e.target.value,
        description: i.options.description,
        price: i.options.price,
      }
    });
  }
    function makeOptionDescription(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setItemData({
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      imageUrl: itemData.imageUrl,
      options:{
        name: i.options.name,
        description: e.target.value,
        price: i.options.price,
      }
    });
  }
  function makeOptionPrice(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setItemData({
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      imageUrl: itemData.imageUrl,
      options:{
        name: i.options.name,
        description: i.options.description,
        price: Number(e.target.value),
      }
    });
  }

  function setOption(){
    const option = itemData.options
    
  }


  function register() {
    if (
      i.name.length === 0 ||
      i.description.length === 0 
    ) {
      alert('空欄があります');
    } else {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${i.name}`,
          description: `${i.description}`,
          price: `${i.price}`,
          imageUrl: `${i.imageUrl}`,
          deleted: false,
          options:{
            name: `${i.options.name}`,
            description: `${i.options.description}`,
            price: `${i.options.price}`,
          }
        }),
      });
      setItemData({
        name: '',
        description: '',
        price: 0,
        imageUrl: '/images/NoImage.png',
        options:{
          name: '',
          description: '',
          price: 0,
        }
      });
      alert('登録完了');
    }
  }

  return (
    <>
      <Head>
        <title>商品登録</title>
      </Head>
      <h1>商品登録</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="name">商品名</label>
          <br />
          <input
            type="text"
            id="name"
            className="inputItem"
            name="name"
            value={i.name}
            onChange={makeDate}
          />
        </div>
        <div>
          <Image
            priority
            src={i.imageUrl}
            height={100}
            width={100}
            alt=""
          />
          <br />
          <label htmlFor="imageUrl">画像URL</label>
          <br />
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="inputItem"
            onChange={makeDate}
          />
        </div>
        <div>
          <label htmlFor="description">商品詳細</label>
          <br />
          <textarea
            id="description"
            className="inputItem"
            name="description"
            value={i.description}
            onChange={makeDate}
          />
        </div>
        <div>
          <label htmlFor="price">価格</label>
          <br />
          <input
            type="number"
            id="price"
            className="inputItem"
            name="price"
            value={i.price}
            onChange={makeDate}
          />
        </div>
        <p>オプション設定</p>
        <div>
          <label htmlFor="option">オプション</label>
          <br />
          <input
            type="text"
            id="option"
            className="inputItem"
            name="name"
            value={i.options.name}
            onChange={makeOption}
          />
        </div>
        <div>
          <label htmlFor="option-description">オプション説明</label>
          <br />
          <textarea
            id="option-description"
            className="inputItem"
            name="description"
            value={i.options.description}
            onChange={makeOptionDescription}
          />
        </div>
        <div>
          <label htmlFor="option-price">オプション価格</label>
          <br />
          <input
            type="number"
            id="option-price"
            className="inputItem"
            name="price"
            value={i.options.price}
            onChange={makeOptionPrice}
          />
        </div>
        <p>オプション適用価格：{Number(i.price) + Number(i.options.price)}円</p>
        <button type="button" className='button' onClick={register}>
          登録
        </button>
      </form>
      <Link href="/">
        <p>一覧へ</p>
      </Link>
    </>
  );
}
