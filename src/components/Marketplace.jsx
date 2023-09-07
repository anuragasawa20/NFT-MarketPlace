import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useEffect, useState } from "react";
// import { GetIpfsUrlFromPinata } from "../utils";
import { ethers } from "ethers";


export default function Marketplace() {
    const sampleData = [
        {
            "name": "NFT#1",
            "description": "Bored Ape #8585",
            "website": "http://axieinfinity.io",
            "image": "https://ipfs.io/ipfs/QmZHQAMaD5F9j9UqHJ1n3srTbDeQ5vhqRoijJMr91XRJqx",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#2",
            "description": "Normal Life",
            "website": "http://axieinfinity.io",
            "image": "https://ipfs.io/ipfs/QmQsG4gAywsc5Q4HVYbUNnZnbWQmbMn7w2u6H28kijM641",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#3",
            "description": "Bored Ape #3749",
            "website": "http://axieinfinity.io",
            "image": "https://ipfs.io/ipfs/QmZDpLf5mJ5QxjeJ7hr6DzEKK2CNURrstDjkLe62Ugxi7Z",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
    ];
    const [data, updateData] = useState(sampleData);
    const [dataFetched, setUpdateFetched] = useState(false);

    async function getAllNFTs() {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);

        let transaction = await contract.getAllNFTs();
        console.log(transaction);
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);

            console.log(tokenURI);
            let meta = await axios.get(tokenURI);

            meta = meta.data;

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            return item;
        }))
        setUpdateFetched(true);
        console.log(items);
        updateData(items);
    }

    if (!dataFetched) {
        // alert("Please connect your wallet");
        getAllNFTs();
    }


    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col place-items-center mt-12">
                <div className="md:text-2xl font-bold text-white">
                    Top NFTs
                </div>
                <div className="grid mt-5 justify-between grid-cols-4 max-w-screen-xl text-center">
                    {data.map((value, index) => {
                        return <NFTTile data={value} key={index}></NFTTile>;
                    })}
                </div>
            </div>
         
        </div>
    );

}

