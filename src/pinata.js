// import dotenv from "dotenv"
// dotenv.config();

import axios from 'axios';
import FormData from 'form-data';
import React from 'react';

export const uploadJSONToIPFS = async (JSONBody) => {
    const key = import.meta.env.VITE_PINATA_API_KEY;
    //console.log(key);
    const secret = import.meta.env.VITE_PINATA_API_SECRET;
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            return {
                success: true,
                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
            };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
        });
};

export const uploadFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    const key = import.meta.env.VITE_PINATA_API_KEY
    //  console.log(key);
    const secret = import.meta.env.VITE_PINATA_API_SECRET;
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
                success: true,
                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
            };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

        });
};

export const GetIpfsUrlFromPinata = (pinataUrl) => {
    var IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
    return IPFSUrl;
};