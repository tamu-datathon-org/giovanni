import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import utilStyles from "../styles/utils.module.css";
import styles from "./layout.module.css";

const name = "TAMU Datathon Blog! 🤖";
export const siteTitle = "Official TAMU Datathon Blog";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/images/td-logo.png" />
        <meta
          name="The offical blog for the TAMU Datathon"
          content="Find offical solutions to the Datathon challenges here"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/tdMascotChibi.svg"
              className={utilStyles.borderCircle}
              height={150}
              width={280}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/tdMascotChibi.svg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home!</Link>
        </div>
      )}
    </div>
  );
}
