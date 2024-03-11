import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>链尚</title>
        <meta name="description" content="63字符长域名只需输入部分字符即可跳转到完整的域名。" />
        <meta name="keywords" content="短链接, 长域名, Short Url, 63字符域名, 最长域名" />
        <link rel="apple-touch-icon" type="image/png" href="/images/logo-144.png"/>
        <link rel="icon" type="image/png" href="/images/ico.png"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
