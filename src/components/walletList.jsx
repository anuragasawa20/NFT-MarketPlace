import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";

const WalletList = () => {
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        // Fetch wallet data from your API
        axios.get('https://kind-pear-puffer-tie.cyclic.cloud/api/wallet/get')
            .then(response => setWallets(response.data.walletAddresses))
            .catch(error => console.error('Error fetching wallet addresses:', error));
    }, []);

    return (
        <div className="profileClass" style={{ "min-height": "100vh" }}>
            <Navbar></Navbar>

            <div className="container mt-8 mx-8">
                <h1 className="text-2xl font-bold mb-4 text-center">Wallet List</h1>
                <table className="min-w-full border border-gray-300  ">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Wallet ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map(wallet => (
                            <tr key={wallet.walletId}>
                                <td className="border border-gray-300 p-2">{wallet.walletId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WalletList;