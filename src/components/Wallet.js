import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Wallet.css';

const Wallet = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [cryptoBalances] = useState([
        { 
            id: 'btc', 
            name: 'Bitcoin', 
            symbol: 'BTC', 
            balance: 0.0000, 
            value: 0, 
            icon: '₿',
            image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500&auto=format',
            color: '#F7931A'
        },
        { 
            id: 'eth', 
            name: 'Ethereum', 
            symbol: 'ETH', 
            balance: 0.0000, 
            value: 0, 
            icon: 'Ξ',
            image: 'https://images.unsplash.com/photo-1622790698141-94e30457ef12?w=500&auto=format',
            color: '#627EEA'
        },
        { 
            id: 'usdt', 
            name: 'Tether', 
            symbol: 'USDT', 
            balance: 0.0000, 
            value: 0, 
            icon: '₮',
            image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&auto=format',
            color: '#26A17B'
        },
        { 
            id: 'bnb', 
            name: 'BNB', 
            symbol: 'BNB', 
            balance: 0.0000, 
            value: 0, 
            icon: 'BNB',
            image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=500&auto=format',
            color: '#F3BA2F'
        }
    ]);
    const [lockedAmount] = useState(0);
    const [selectedCrypto, setSelectedCrypto] = useState('usdt');

    const totalValueUSDT = cryptoBalances.reduce((acc, curr) => acc + curr.value, 0);

    const handleDeposit = () => {
        console.log("Processing deposit for", selectedCrypto);
    };

    const handleWithdraw = () => {
        console.log("Processing withdrawal for", selectedCrypto);
    };

    const handleLogin = () => {
        navigate('/signin');
    };

    if (!isAuthenticated) {
        return (
            <div className="wallet-container">
                <div className="wallet-background"></div>
                <div className="auth-message-container">
                    <div className="auth-message-content">
                        <div className="auth-icons">
                            {cryptoBalances.map(crypto => (
                                <div 
                                    key={crypto.id}
                                    className="auth-icon"
                                    style={{ '--icon-color': crypto.color }}
                                >
                                    {crypto.icon}
                                </div>
                            ))}
                        </div>
                        <h1>Access Your Crypto Wallet</h1>
                        <p>Please log in to view your wallet balance and make transactions</p>
                        <div className="auth-features">
                            <div className="feature">
                                <span className="feature-icon">🔒</span>
                                <span>Secure Transactions</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">💱</span>
                                <span>Multiple Cryptocurrencies</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">📊</span>
                                <span>Real-time Updates</span>
                            </div>
                        </div>
                        <button className="login-button" onClick={handleLogin}>
                            Log In to Continue
                            <span className="arrow">→</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const selectedCryptoData = cryptoBalances.find(c => c.id === selectedCrypto);

    return (
        <div className="wallet-container">
            <div className="wallet-background"></div>
            <div className="wallet-content">
                <div className="wallet-header">
                    <div className="balance-info">
                        <h2>Total Value (USDT)</h2>
                        <h1>{totalValueUSDT.toFixed(2)} USDT</h1>
                        <p>≈ ${totalValueUSDT.toFixed(2)} USD</p>
                        <p className="locked-info">
                            <span className="lock-icon">🔒</span>
                            Locked in open position: USDT {lockedAmount.toFixed(2)}
                        </p>
                    </div>
                    <div className="crypto-icons">
                        {cryptoBalances.map(crypto => (
                            <div 
                                key={crypto.id}
                                className={`crypto-card ${selectedCrypto === crypto.id ? 'selected' : ''}`}
                                onClick={() => setSelectedCrypto(crypto.id)}
                                style={{
                                    '--card-color': crypto.color,
                                    backgroundImage: `linear-gradient(45deg, rgba(26, 31, 60, 0.95), rgba(26, 31, 60, 0.85)), url(${crypto.image})`
                                }}
                            >
                                <div className={`crypto-icon ${crypto.id}`}>
                                    <span>{crypto.icon}</span>
                                </div>
                                <div className="crypto-info">
                                    <span className="crypto-symbol">{crypto.symbol}</span>
                                    <span className="crypto-name">{crypto.name}</span>
                                    <span className="crypto-balance">{crypto.balance.toFixed(4)} {crypto.symbol}</span>
                                    <span className="crypto-value">${crypto.value.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="action-buttons">
                    <button 
                        className="deposit-btn"
                        onClick={handleDeposit}
                        style={{
                            '--btn-color': selectedCryptoData?.color,
                            '--btn-rgb': selectedCryptoData?.color.replace('#', '').match(/.{2}/g)
                                .map(x => parseInt(x, 16)).join(', ')
                        }}
                    >
                        <span className="btn-icon">↓</span>
                        Deposit {selectedCryptoData?.symbol}
                    </button>
                    <button 
                        className="withdraw-btn"
                        onClick={handleWithdraw}
                        style={{
                            '--btn-color': selectedCryptoData?.color,
                            '--btn-rgb': selectedCryptoData?.color.replace('#', '').match(/.{2}/g)
                                .map(x => parseInt(x, 16)).join(', ')
                        }}
                    >
                        <span className="btn-icon">↑</span>
                        Withdraw {selectedCryptoData?.symbol}
                    </button>
                </div>

                <div className="history-section">
                    <div className="history-header">
                        <h3>History records</h3>
                        <div className="history-filters">
                            <select className="history-type-filter">
                                <option value="all">All Types</option>
                                <option value="deposit">Deposits</option>
                                <option value="withdraw">Withdrawals</option>
                            </select>
                            <select className="history-crypto-filter">
                                <option value="all">All Coins</option>
                                {cryptoBalances.map(crypto => (
                                    <option key={crypto.id} value={crypto.id}>{crypto.symbol}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="history-list">
                        <p className="no-records">No Records</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;