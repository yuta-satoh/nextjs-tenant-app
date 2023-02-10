import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import Link from 'next/link';

type Item = {
  name: string;
  description: string;
  price: number;
};

export default function Post() {
  const [itemData, setItemData] = useState<Item>({
    name: '',
    description: '',
    price: 0,
  });

  const i = itemData;

  const url = '/api/items';

  function makeDate(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setItemData((i) => ({ ...i, [name]: value }));
  }
  function register() {
    if (
      i.name.length === 0 ||
      i.description.length === 0 ||
      i.price === 0
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
          deleted: false,
        }),
      });
      setItemData({
        name: '',
        description: '',
        price: 0,
      });
      alert('登録完了');
    }
  }

  type ListData = {
    id: number;
    name: string;
    description: string;
    price: number;
    deleted: boolean;
  }[];

  type Items = {
    id: number;
    name: string;
    description: string;
    price: number;
    deleted: boolean;
  };

  const listData = [
    { id: 0, name: '', description: '', price: 0, deleted: false },
  ];
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.map((item: Items) => {
        listData.push({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          deleted: item.deleted,
        });
      });
    });
  console.log(listData);

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
            className="name"
            name="name"
            value={i.name}
            onChange={makeDate}
          />
        </div>
        <div>
          <label htmlFor="description">商品詳細</label>
          <br />
          <textarea
            id="description"
            className="description"
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
            className="price"
            name="price"
            value={i.price}
            onChange={makeDate}
          />
        </div>
        <button type="button" onClick={register}>
          登録
        </button>
      </form>
      <Link href="/">
        <p>一覧へ</p>
      </Link>
    </>
  );
}
