import Head from 'next/head';
import Link from 'next/link';



export default function Item() {
  return (
    <>
      <Head>
        <title>商品詳細</title>
      </Head>
      <h1>商品詳細</h1>
      <Link href='/'>
        <p>一覧へ</p>
      </Link>
    </>
  );
}
