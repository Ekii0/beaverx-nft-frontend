import { ConnectButton } from "@web3uikit/web3";

export default function Header() {
  return (
    <div className="navbar">
      <nav style={{ width: "100%", height: "100%" }}>
        <div className="container flex">
          <div id="logo">
            <h1>BeaverX NFT</h1>
          </div>
          <div id="web3-connector">
            <ConnectButton />
          </div>
        </div>
      </nav>
    </div>
  );
}
