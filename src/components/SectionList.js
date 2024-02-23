import { useState } from 'react';
import { ethers } from 'ethers';

const Navigation = ({ account, setAccount, sections }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
        console.log(account);
    }

    return (
        <nav>
            <a className='link__header' href='/'>
                <div className='nav__brand'>
                    <h1>BOOKWARM</h1>
                    <div>
                        <img src="https://img.icons8.com/ios/50/000000/ethereum.png" alt="Ethereum" />
                    </div>
                </div>
            </a>

            {/* Search input field */}
            <input
                type="text"
                placeholder="Search"
                className="nav__search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Connect button */}
            {account ?
                <button
                    type='button'
                    className='nav__connect'
                >
                    {account.slice(0, 6) + "..." + account.slice(42)}
                </button>
                :
                <button
                    type='button'
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            }

            {/* Render SectionList component */}
            <SectionList sections={sections} searchQuery={searchQuery} />
        </nav>
    );
}

// SectionList component to render filtered sections
const SectionList = ({ sections, searchQuery }) => {
    // Filter sections based on search query
    const filteredSections = sections.filter(section => section.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <ul className='nav__links'>
            {filteredSections.map((section, index) => (
                <li key={index}>
                    <a href={`#${section.className}`}>{section.name}</a>
                </li>
            ))}
        </ul>
    );
}

export default Navigation;
