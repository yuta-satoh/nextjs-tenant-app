import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

type Option = {
  name: string;
  description: string;
  price: number;
};

type ItemData = {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    deleted: boolean;
    imageUrl: string;
    options: Option;
  };
};

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  deleted: boolean;
  imageUrl: string;
  options: Option;
};
export default function Post({ item }: ItemData) {
  const [itemData, setItemData] = useState<Item>({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    imageUrl: item.imageUrl,
    deleted: item.deleted,
    options: {
      name: item.options.name,
      description: item.options.description,
      price: item.options.price,
    },
  });

  const i = itemData;

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
      id: item.id,
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      imageUrl: itemData.imageUrl,
      deleted: item.deleted,
      options: {
        name: e.target.value,
        description: i.options.description,
        price: i.options.price,
      },
    });
  }
  function makeOptionDescription(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setItemData({
      id: item.id,
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      imageUrl: itemData.imageUrl,
      deleted: item.deleted,
      options: {
        name: i.options.name,
        description: e.target.value,
        price: i.options.price,
      },
    });
  }
  function makeOptionPrice(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setItemData({
      id: item.id,
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      imageUrl: itemData.imageUrl,
      deleted: item.deleted,
      options: {
        name: i.options.name,
        description: i.options.description,
        price: Number(e.target.value),
      },
    });
  }

  function register() {
    if (
      i.name.length === 0 ||
      i.description.length === 0
    ) {
      alert('?????????????????????');
    } else {
      fetch(`http://localhost:8000/items/${i.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${i.name}`,
          description: `${i.description}`,
          price: `${i.price}`,
          imageUrl: `${i.imageUrl}`,
          deleted: false,
          options: {
            name: `${i.options.name}`,
            description: `${i.options.description}`,
            price: `${i.options.price}`,
          },
        }),
      });
      alert('????????????');
    }
  }
  return (
    <>
      <Head>
        <title>{item.name}</title>
      </Head>
      <h1>????????????&nbsp;ID{item.id}</h1>
      <form action="" method="POST">
        <div>
          <label htmlFor="name">?????????</label>
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
          <label htmlFor="imageUrl">??????URL</label>
          <br />
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="inputItem"
            value={i.imageUrl}
            onChange={makeDate}
          />
        </div>
        <div>
          <label htmlFor="description">????????????</label>
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
          <label htmlFor="price">??????</label>
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
        <p>?????????????????????</p>
        <div>
          <label htmlFor="option">???????????????</label>
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
          <label htmlFor="option-description">?????????????????????</label>
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
          <label htmlFor="option-price">?????????????????????</label>
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
        <p>
          ??????????????????????????????
          {Number(i.price) + Number(i.options.price)}???
        </p>
        <button type="button" className='button' onClick={register}>
          ??????
        </button>
      </form>
      <Link href="/">?????????</Link>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8000/items');
  const items = await res.json();
  const paths = items.map((item: Item) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

type Params = {
  params: { id: string };
};

export async function getStaticProps({ params }: Params) {
  const id = params.id;
  const res = await fetch(`http://localhost:8000/items/${id}`);
  const item = await res.json();

  return {
    props: { item },
    revalidate: 5,
  };
}
