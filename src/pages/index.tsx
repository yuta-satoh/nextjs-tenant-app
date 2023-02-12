import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

export async function getStaticProps() {
  const res = await fetch('http://localhost:8000/items');
  const listData = await res.json();
  return {
    props: { listData },
    revalidate: 10,
  };
}

type List = {
  listData: {
    id: number;
    name: string;
    description: string;
    price: number;
    deleted: boolean;
  }[];
};

function deleteItem(id: number) {
  fetch(`http://localhost:8000/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default function Home({ listData }: List) {
  return (
    <>
      <Head>
        <title>商品管理</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>商品一覧</h1>
        <Link href="components/register">商品登録</Link>
        <table>
          {listData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>
                <Link href={`items/${data.id}`}>{data.name}</Link>
              </td>
              <td>{data.description}</td>
              <td>
                <button
                  type="button"
                  onClick={() => deleteItem(data.id)}
                  className="button"
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </table>
      </main>
    </>
  );
}
