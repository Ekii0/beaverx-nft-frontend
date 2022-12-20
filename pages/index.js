import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import Header from "../components/Header";
import NFTFactory from "../components/NFTFactory";
import StrxBeaver from "./images/STRXBeaver.png";

export default function Home() {
  const { isWeb3Enabled } = useMoralis();
  return (
    <div className="body">
      <Head>
        <title>BeaverX NFT</title>
        <meta
          name="description"
          content="A beaver-themed NFT created by ekiio as tribute to the StrikeX community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {isWeb3Enabled ? (
        <div
          /*     style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            minHeight: "100vh",
            width: "960px",
            gap: "2em",
          }} */
          className="main-wrapper"
        >
          <div style={{ display: "flex", width: "90%" }}>
            <Image
              src={StrxBeaver}
              width="100%"
              style={{
                borderRadius: "1em",
                width: "100%",
                height: "unset",
              }}
            />
          </div>
          <NFTFactory />
        </div>
      ) : (
        <div className="main-wrapper">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <h1>Please connect your wallet to enter the NFT Factory!</h1>
          </div>
        </div>
      )}
    </div>
  );
}
