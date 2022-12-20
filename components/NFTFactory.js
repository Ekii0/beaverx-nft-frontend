import { Button, CryptoLogos, useNotification } from "@web3uikit/core";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants";
import NftCounter from "../components/NftCounter";
import { useEffect, useState } from "react";

export default function NFTFactory() {
  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const [numNFTs, setNumNFTs] = useState(0);
  const [winner, setWinner] = useState(null);

  const {
    data,
    error,
    runContractFunction: mintNft,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "mintNft",
    params: {},
  });

  const { runContractFunction: getTokenId } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getTokenId",
    params: {},
  });

  const { runContractFunction: getWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "s_winner",
    params: {},
  });

  const dispatch = useNotification();

  const handleSuccess = async (tx) => {
    try {
      await tx.wait();
      updateUIValues();
      handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  async function updateUIValues() {
    const numNftsFromCall = (await getTokenId()).toNumber();
    const checkForWinner = (await getWinner()).toString();
    if (checkForWinner != "0x0000000000000000000000000000000000000000") {
      setWinner(checkForWinner);
    }
    setNumNFTs(numNftsFromCall);
  }

  async function switchToBsc() {
    try {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + (31337).toString(16) }],
      });
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  }, [isWeb3Enabled]);

  return (
    <>
      {chainId == 31337 ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {winner ? (
            <>
              <h3 style={{ display: "flex" }}>
                Congratulations to {winner} for winning 2000 $STRX!
              </h3>
              <div>
                Thanks everyone for participating! See you soon for another
                giveaway!
              </div>
            </>
          ) : (
            <>
              <h3 style={{ display: "flex" }}>
                Mint your own limited BeaverX NFT and have a chance to win 2000
                $STRX!
              </h3>
              <div style={{ margin: "0.5em 2em 2em 2em" }}>
                <Button
                  text="Mint your NFT"
                  theme="primary"
                  size="large"
                  onClick={async () => {
                    await mintNft({
                      onSuccess: (data) => handleSuccess(data),
                      onError: (error) => console.log(error),
                    });
                  }}
                  disabled={isFetching || isLoading}
                  style={{ display: "flex" }}
                />
              </div>
              <NftCounter counter={numNFTs} />
            </>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <h1>Please make sure you are connected to the BSC network!</h1>

          <CryptoLogos
            chain="binance"
            onClick={async () => {
              await switchToBsc();
            }}
            size="60px"
            style={{
              cursor: "pointer",
              alignSelf: "center",
              display: "flex",
            }}
          />
        </div>
      )}
    </>
  );
}
