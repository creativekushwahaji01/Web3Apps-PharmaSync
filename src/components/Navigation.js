import { useState } from 'react';
import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {
    const [networkError, setNetworkError] = useState(false);

    const connectHandler = async () => {
        try {
            // Request account access from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = ethers.utils.getAddress(accounts[0]);
            setAccount(address);
            console.log('Connected account:', address);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error.message);
            setNetworkError(true);
        }
    };

    return (
        <nav>
            <a className='link__header' href='/'>
                <div className='nav__brand'>
                    <h1>BOOKWARM</h1>
                    <div>
                        <img src="https://i.ibb.co/W0CW3Pt/logo1.png" alt="Polygon" />
                    </div>
                </div>
            </a>

            <h2 className='nav_top'>Find your genre and order your Book</h2>

            {account ? (
                <button type='button' className='nav__connect'>
                    {'Connected to ' + account.slice(0, 6) + '...' + account.slice(42)}
                </button>
            ) : (
                <button type='button' className='nav__connect' onClick={connectHandler}>
                    Connect
                </button>
            )}

            {networkError && <p className="error-message">Failed to connect to MetaMask. Make sure you are connected to Polygon network.</p>}

            <ul className='nav__links'>
                <li>
                    <a href='#Bestseller'>Fiction</a>
                </li>
                <li>
                    <a href='#Marvel'>Marvel</a>
                </li>
                <li>
                    <a href='#Mythology'>Mythology</a>
                </li>
                <li>
                    <a href='#History'>History</a>
                </li>
                <li>
                    <a href='#Hindi'>Hindi</a>
                </li>
                <li>
                    <a href='#Goosebumps'>Goosebumps</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
