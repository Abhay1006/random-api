import React, { useState, useEffect } from 'react';
import './CryptoPrices.css';

const CryptoPrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana,bitcoin,ethereum,ripple&vs_currencies=usd');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="crypto-prices-container">
      <h2>Crypto Prices</h2>
      <ul className="crypto-prices-list">
        {Object.keys(prices).map((crypto) => (
          <li key={crypto}>
            <span>{crypto.charAt(0).toUpperCase() + crypto.slice(1)}</span>
            <span className="price">${prices[crypto].usd}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoPrices;
