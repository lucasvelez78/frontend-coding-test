import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Lego Crew</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
