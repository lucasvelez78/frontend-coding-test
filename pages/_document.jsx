import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Lego Crew</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&family=Saira:wght@200;400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body style={{ margin: 0, padding: 0, fontFamily: "Saira, sans-serif" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
