import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ethers } from "ethers";
import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { Ethereum } from "@particle-network/chains";
import Web3 from "web3";
import axios from "axios";


import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { createAgent } from "@dfinity/utils";

function Navbar() {

  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState('0x');
  const [walletConnected, setWalletConnected] = useState(false);

  async function getAddress() {
    // const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  // const particle = new ParticleNetwork({
  //   projectId: "5a8f9102-a170-4073-a243-14062f849ca4",
  //   clientKey: "cGv2wa2T9LDAXkIVvKPq39PdLfN8d5B3HelaYfUz",
  //   appId: "e573367d-b6b0-4fb2-b32a-5188a59cbf0f",
  //   chainName: "ethereum", //optional: current chain name, default Ethereum.
  //   chainId: 1, //optional: current chain id, default 1.
  //   wallet: {   //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
  //     displayWalletEntry: true,  //show wallet entry when connect particle.
  //     defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
  //     uiMode: "dark",  //optional: light or dark, if not set, the default is the same as web auth.
  //     supportChains: [{ id: 1, name: "Ethereum" }, { id: 5, name: "Ethereum" }, { id: 11155111, name: "Ethereum" }], // optional: web wallet support chains.
  //     customStyle: {}, //optional: custom wallet style
  //   },
  //   securityAccount: { //optional: particle security account config
  //     //prompt set payment password. 0: None, 1: Once(default), 2: Always
  //     promptSettingWhenSign: 1,
  //     //prompt set master password. 0: None(default), 1: Once, 2: Always
  //     promptMasterPasswordSettingWhenLogin: 1
  //   },

  // });



  function updateButton() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log(chainId);
    if (chainId !== '0x5') {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      })
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname)
      });
  }

  //   // window.web3 = new Web3(particleProvider);
  //   // window.web3.currentProvider.isParticleNetwork

  //   const particleProvider = new ParticleProvider(particle.auth);
  //   //init web3 with paricle provider
  //   const web3 = new Web3(particleProvider);

  //   const accounts = await web3.eth.getAccounts();
  //   console.log(accounts);
  //   // const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   // const signer = provider.getSigner();
  //   // const network = await provider.getNetwork();
  //   // const userInfo = await particle.auth.login();
  //   // console.log(userInfo);

  //   if (!particle.auth.isLogin()) {
  //     // Request user login if needed, returns current user info
  //     const userInfo = await particle.auth.login();
  //     console.log(userInfo);
  //   }

  //   // const userInfo = particle.auth.login({
  //   //   preferredAuthType: 'jwt',
  //   //   account: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGUyQGdtYWlsLmNvbSIsImlkIjoiNjUzMjE5ODc4NDc4ZWY5MjQxMTc0YTJiIiwiaWF0IjoxNjk4Mjk0NTIyLCJleHAiOjE2OTgyOTUxMjJ9.ZZx39CMV2Px0Q8Zai6frJnvPvzpYskQpoYGNIQllmag8IzlTnF_9fOTod2dHwP4Y3ef2VtJ_tI60Ri7gdmx0u6tvnKUgo6FibRcL3__WsAGNDZCiTXTetICstiJnFDIk19Kkth2uttZbuSlCvaONuwzcoZ6tbQPQlgvP_tIWaYIftz6dSNjZJwy8_Pj5D-cwTwRNVRFWIr_8sfwZ6M3OLGsoryZvoP0sRpXMUvscohxrC4NEPQTotI5jhDdvfgOr5e4T8wHUnbpfBWYVT9MZ6sXQINFumrHlfGNAMfB-vHr7y7DmX_t0UvfEfHtdU_krQyD8ENJLaGrN_6-5VSeoZA',
  //   //   hideLoading: true,   //optional: hide particle loading when login.
  //   // })

  //   // if (network.chainId !== 11155111) {
  //   //   await window.ethereum.request({N
  //   //     method: 'wallet_switchEthereumChain',
  //   //     params: [{ chainId: '11155111' }], // ChainId for Sepolia testnet
  //   //   });
  //   // }

  //   // await window.ethereum.request({ method: 'eth_requestAccounts' });

  //   // //updateButton();
  //   // console.log("here");
  //   // getAddress();
  //   // window.location.replace(location.pathname);
  //   // setWalletConnected(true);

  // }

  // const connectWithGoogle = async () => {
  //   const userInfo = await particle.auth.login({
  //     preferredAuthType: 'google' //support facebook,google,twitter,apple,discord,github,twitch,microsoft,linkedin etc.
  //   })

  //   console.log(userInfo);
  //   const email = userInfo.google_email;
  //   const fullName = userInfo.name;
  //   const userName = "mavens";
  //   const walletAddress = userInfo.wallets[0].public_address;

  //   console.log(email, fullName, userName, walletAddress);
  //   try {
  //     const response = await axios.post("https://kind-pear-puffer-tie.cyclic.cloud/loginWithGoogle", {
  //       fullName,
  //       userName,
  //       email,
  //       walletAddress
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  const disconnectWallet = () => {
    window.ethereum.disconnect();
    setWalletConnected(false);
  };

  // let plugConnect = async () => {
  //   const nnsCanisterId = 'qoctq-giaaa-aaaaa-aaaea-cai'
  //   // Whitelist
  //   const whitelist = [
  //     nnsCanisterId,
  //   ];

  //   // Host
  //   const host = "https://mainnet.dfinity.network";

  //   // Callback to print sessionData
  //   const onConnectionUpdate = () => {
  //     console.log(window.ic.plug.sessionManager.sessionData)
  //   }

  //   // '2l3jf-zj4c2-trcxt-jur3u-qhc37-nokpm-iziu5-y4q6k-rcbci-bes2b-rae'

  //   // Make the request
  //   try {
  //     const publicKey = await window.ic.plug.requestConnect({
  //       whitelist,
  //       host,
  //       onConnectionUpdate,
  //       timeout: 50000
  //     });
  //     console.log(`The connected user's public key is:`, publicKey);

  //     // type SessionData = { agent: HttpAgent, principalId: string, accountId: string } | null;
  //     // console.log(window.ic.plug.principalId);
  //     // console.log(window.ic.plug.accountId);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  useEffect(() => {
    if (window.ethereum == undefined)
      return;
    let val = window.ethereum.isConnected();
    console.log(val);
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.replace(location.pathname)
    })
  }, []);

  return (
    <div className="">
      <nav className="w-screen">
        <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5 mt-4'>
          <li className=' items-end ml-5 pb-2'>
            <Link to="/" className="flex items-center">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                viewBox="0 0 64 64"
              >
                <path d="M18 7.8 4.5 15.6v32.8l13.8 7.9 13.7 8 13.8-7.9 13.7-7.9v-33L46 7.7C38.6 3.5 32.3 0 32 0c-.3 0-6.6 3.5-14 7.8zm26 3.1 11.5 6.7v28.8l-11.7 6.8L32.1 60l-11.8-6.8-11.8-6.8V17.6L20 10.9c6.3-3.7 11.7-6.7 12-6.8.3 0 5.7 3.1 12 6.8z" />
                <path d="M12.4 25.4c-.3.7-.4 4.2-.2 7.7.2 4.9.7 6.4 1.8 6.4 1 0 1.7-1.3 2-4l.5-4 1.7 4.3c1.4 3.6 2.1 4.3 4 4 2.2-.3 2.3-.7 2.3-7.8 0-6-.3-7.5-1.5-7.5-1 0-1.6 1.2-1.8 3.9l-.3 4-1.9-4.2c-1.9-4.3-5.4-5.8-6.6-2.8zM28.4 25.3c-.3.8-.4 4.3-.2 7.8.2 4.9.7 6.4 1.8 6.4.8 0 1.6-1 1.8-2.2.2-1.5 1.1-2.3 3-2.5 3.6-.4 3.6-3.2 0-3.6-4.2-.5-3.5-3 1-3.4 2.5-.2 3.7-.8 3.7-1.8 0-2.1-10.3-2.7-11.1-.7zM41.5 25c-.8 1.3.3 3 2 3 1 0 1.5 1.6 1.7 5.7.2 4.4.7 5.8 1.8 5.8s1.6-1.4 1.8-5.6c.2-4.8.6-5.8 2.4-6.2 1.1-.3 1.8-1.2 1.6-1.9-.6-1.6-10.3-2.4-11.3-.8z" />
              </svg> */}
              <div className='inline-block  font-bold text-xl ml-2'>
                NFT Bazaar
              </div>
            </Link>
          </li>
          {/*  */}
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ?
                <li className='border-b-2 hover:pb-0 p-2'>
                  <Link to="/">Marketplace</Link>
                </li>
                :
                <li className='hover:border-b-2 hover:pb-0 p-2'>
                  <Link to="/">Marketplace</Link>
                </li>
              }
              {location.pathname === "/sellNFT" ?
                <li className='border-b-2 hover:pb-0 p-2  '>
                  <Link to="/sellNFT">List NFT</Link>
                </li>
                :
                <li className='hover:border-b-2 hover:pb-0 p-2 '>
                  <Link to="/sellNFT">List NFT</Link>
                </li>
              }
              {location.pathname === "/profile" ?
                <li className='border-b-2 hover:pb-0 p-2'>
                  <Link to="/profile">Profile</Link>
                </li>
                :
                <li className='hover:border-b-2 hover:pb-0 p-2'>
                  <Link to="/profile">Profile</Link>
                </li>
              }
              {location.pathname === "/walletList" ?
                <li className='border-b-2 hover:pb-0 p-2'>
                  <Link to="/walletList">WalletList</Link>
                </li>
                :
                <li className='hover:border-b-2 hover:pb-0 p-2'>
                  <Link to="/walletList">WalletList</Link>
                </li>
              }
              <li>
                {walletConnected ? (
                  <button onClick={disconnectWallet}>Disconnect Wallet</button>
                ) : (
                  <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>Connect Wallet</button>
                )}
              </li>
              {/* <li>
                <button onClick={connectWithGoogle}>
                  google
                </button> */}
              {/* </li> */}
            </ul>
          </li>

        </ul>
      </nav>
      {/* <button onClick={plugConnect}>
        plug
      </button> */}
      <div className='text-white text-bold text-right mr-10 text-sm'>
        {currAddress !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0, 15) + '...') : ""}
      </div>
    </div>
  );
}

export default Navbar;