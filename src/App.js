import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Navigation from './components/Navigation';
import Section from './components/Section';
import Product from './components/Product';
import MedicineABI from './abis/Bookwarm.json';
import config from './config.json';
import logo from './assets/store/main_banner.png';

function App() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [dappazon, setDappazon] = useState(null);
  const [bestsellers, setBestsellers] = useState([]);
  const [history, setHistory] = useState([]);
  const [hindi, setHindi] = useState([]);
  const [marvel, setMarvel] = useState([]);
  const [mythology, setMythology] = useState([]);
  const [goosebumps, setGoosebumps] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission to access accounts
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      }
    };
    initWeb3();
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!web3) return;

      // Connect to contract deployed on Polygon
      const dappazon = new web3.eth.Contract(
        MedicineABI,
        '0x5FbDB2315678afecb367f032d93F642f64180aa3' // Replace with your contract address on Polygon
      );
      setDappazon(dappazon);

      // Fetch items from the contract
      const items = [];
      for (let i = 0; i < 19; i++) {
        const item = await dappazon.methods.items(i).call();
        items.push(item);
      }

      // Filter items by category
      const bestsellerItems = items.filter((item) => item.category === 'bestseller');
      setBestsellers(bestsellerItems);

      const historyItems = items.filter((item) => item.category === 'history');
      setHistory(historyItems);

      const marvelItems = items.filter((item) => item.category === 'marvel');
      setMarvel(marvelItems);

      const mythologyItems = items.filter((item) => item.category === 'mythology');
      setMythology(mythologyItems);

      const hindiItems = items.filter((item) => item.category === 'hindi');
      setHindi(hindiItems);

      const goosebumpsItems = items.filter((item) => item.category === 'goosebumps');
      setGoosebumps(goosebumpsItems);
    };

    loadBlockchainData();
  }, [web3]);

  const togglePop = (item) => {
    setItem(item);
    setToggle(!toggle);
  };

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <div className='logo__homepage'>
        <img className='logo__home' src={logo} alt='Pharma-Sync' />
        <h2>Welcome to Bookwarm</h2>
      </div>
      {bestsellers && history && hindi && marvel && mythology && goosebumps && (
        <>
          <Section title={'Bestseller'} items={bestsellers} togglePop={togglePop} />
          <Section title={'Marvel'} items={marvel} togglePop={togglePop} />
          <Section title={'Mythology'} items={mythology} togglePop={togglePop} />
          <Section title={'History'} items={history} togglePop={togglePop} />
          <Section title={'Hindi'} items={hindi} togglePop={togglePop} />
          <Section title={'Goosebumps'} items={goosebumps} togglePop={togglePop} />
        </>
      )}
      {toggle && <Product item={item} web3={web3} account={account} dappazon={dappazon} togglePop={togglePop} />}
    </div>
  );
}

export default App;
