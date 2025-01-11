import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './API.css';

const API = () => {
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState([]);
  const [newApiKey, setNewApiKey] = useState('');
  const [newSecretKey, setNewSecretKey] = useState('');
  const [showSecretKey, setShowSecretKey] = useState({});
  const [selectedExchange, setSelectedExchange] = useState('binance');
  const [keyName, setKeyName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterExchange, setFilterExchange] = useState('all');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [deleteModal, setDeleteModal] = useState({ show: false, keyId: null, keyName: '' });
  const { isAuthenticated } = useSelector((state) => state.auth);

  const exchanges = [
    { value: 'binance', label: 'Binance', icon: '₿' },
    { value: 'coinbase', label: 'Coinbase', icon: 'C' },
    { value: 'kraken', label: 'Kraken', icon: 'K' },
    { value: 'kucoin', label: 'KuCoin', icon: 'K₿' },
  ];

  useEffect(() => {
    // Load keys from localStorage on component mount
    const savedKeys = localStorage.getItem('apiKeys');
    if (savedKeys) {
      setApiKeys(JSON.parse(savedKeys));
    }
  }, []);

  useEffect(() => {
    // Save keys to localStorage whenever they change
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const validateApiKey = (key) => {
    // Basic validation - can be enhanced based on exchange requirements
    return key.length >= 8;
  };

  const handleAddKey = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validateApiKey(newApiKey) || !validateApiKey(newSecretKey)) {
        throw new Error('Invalid API key or Secret key format');
      }

      // Simulate API validation delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newKey = {
        id: Date.now(),
        name: keyName || `${selectedExchange.toUpperCase()} Key`,
        apiKey: newApiKey,
        secretKey: newSecretKey,
        exchange: selectedExchange,
        createdAt: new Date().toISOString(),
        lastUsed: null,
        status: 'active',
        permissions: ['read', 'trade'],
        ipWhitelist: []
      };

      setApiKeys(prev => [...prev, newKey]);
      setNewApiKey('');
      setNewSecretKey('');
      setKeyName('');
      showNotification('API Key added successfully');
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteKey = (id) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
    showNotification('API Key deleted successfully');
    setDeleteModal({ show: false, keyId: null, keyName: '' });
  };

  const openDeleteModal = (id, name) => {
    setDeleteModal({ show: true, keyId: id, keyName: name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, keyId: null, keyName: '' });
  };

  const handleToggleKeyStatus = (id) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ));
    showNotification('API Key status updated');
  };

  const handleAddIpWhitelist = (id, ip) => {
    if (!ip.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
      showNotification('Invalid IP address format', 'error');
      return;
    }

    setApiKeys(prev => prev.map(key => 
      key.id === id 
        ? { ...key, ipWhitelist: [...key.ipWhitelist, ip] }
        : key
    ));
    showNotification('IP address added to whitelist');
  };

  const toggleSecretKey = (id) => {
    setShowSecretKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleUpdatePermissions = (id, permission) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id 
        ? {
            ...key,
            permissions: key.permissions.includes(permission)
              ? key.permissions.filter(p => p !== permission)
              : [...key.permissions, permission]
          }
        : key
    ));
    showNotification('Permissions updated');
  };

  const filteredAndSortedKeys = apiKeys
    .filter(key => {
      const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          key.apiKey.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesExchange = filterExchange === 'all' || key.exchange === filterExchange;
      return matchesSearch && matchesExchange;
    })
    .sort((a, b) => {
      const aValue = sortBy === 'date' ? new Date(a.createdAt) : a[sortBy];
      const bValue = sortBy === 'date' ? new Date(b.createdAt) : b[sortBy];
      return sortOrder === 'asc' ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
    });

  const handleLogin = () => {
    navigate('/signin');
  };

  if (!isAuthenticated) {
    return (
      <div className="api-container">
        <div className="auth-required-container">
          <div className="auth-content">
            <div className="auth-icon-container">
              <div className="auth-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <div className="key-icons">
                  <svg className="key-icon key-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>
                  <svg className="key-icon key-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>
                </div>
              </div>
            </div>
            <h1>Secure API Management</h1>
            <p className="auth-description">Access your exchange API keys securely and manage them in one place</p>
            
            <div className="feature-grid">
              <div className="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                <span>Multiple Exchanges</span>
              </div>
              <div className="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>Enhanced Security</span>
              </div>
              <div className="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span>Easy Management</span>
              </div>
              <div className="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Instant Updates</span>
              </div>
            </div>

            <button className="auth-login-btn" onClick={handleLogin}>
              <span>Log In to Manage API Keys</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="api-container">
      <div className="api-content">
        {deleteModal.show && (
          <div className="modal-overlay">
            <div className="delete-modal">
              <div className="modal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </div>
              <h3>Delete API Key</h3>
              <p>Are you sure you want to delete the API key for <span className="highlight">{deleteModal.keyName}</span>?</p>
              <p className="warning-text">This action cannot be undone.</p>
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteKey(deleteModal.keyId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="api-header">
          <h2>API Keys Management</h2>
          <p>Securely manage your API and Secret keys</p>
        </div>

        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="api-format-guide">
          <h3>API Key Format Guide</h3>
          <div className="exchange-formats">
            {exchanges.map(exchange => (
              <div key={exchange.value} className="format-item">
                <div className="format-header">
                  <span className="exchange-icon">{exchange.icon}</span>
                  <h4>{exchange.label}</h4>
                </div>
                <div className="format-details">
                  <div className="format-example">
                    <label>API Key:</label>
                    {exchange.value === 'binance' && <span>1234abcd-5678-efgh-ijkl</span>}
                    {exchange.value === 'coinbase' && <span>a1b2c3d4-e5f6-g7h8-i9j0</span>}
                    {exchange.value === 'kraken' && <span>ABCD-EFGH-IJKL-MNOP</span>}
                    {exchange.value === 'kucoin' && <span>12345678-abcd-efgh-ijkl</span>}
                  </div>
                  <div className="format-example">
                    <label>Secret Key:</label>
                    {exchange.value === 'binance' && <span>A1B2C3D4E5F6G7H8I9J0</span>}
                    {exchange.value === 'coinbase' && <span>abcdef1234567890ABCDEF</span>}
                    {exchange.value === 'kraken' && <span>ABCDEFGHIJKLMNOPQRST</span>}
                    {exchange.value === 'kucoin' && <span>1a2b3c4d5e6f7g8h9i0j</span>}
                  </div>
                  <div className="key-path">
                    {exchange.value === 'binance' && "Profile → API Management"}
                    {exchange.value === 'coinbase' && "Settings → API"}
                    {exchange.value === 'kraken' && "Security → API"}
                    {exchange.value === 'kucoin' && "Account → API Management"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="api-form" onSubmit={handleAddKey}>
          <div className="input-group">
            <div className="form-field">
              <label htmlFor="keyName">Key Name</label>
              <input
                type="text"
                id="keyName"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="Enter a name for this key"
              />
            </div>
            <div className="form-field">
              <label htmlFor="exchange">Exchange</label>
              <select
                id="exchange"
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value)}
              >
                {exchanges.map(exchange => (
                  <option key={exchange.value} value={exchange.value}>
                    {exchange.icon} {exchange.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group">
            <div className="form-field">
              <label htmlFor="apiKey">API Key</label>
              <input
                type="text"
                id="apiKey"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter API Key"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="secretKey">Secret Key</label>
              <input
                type="password"
                id="secretKey"
                value={newSecretKey}
                onChange={(e) => setNewSecretKey(e.target.value)}
                placeholder="Enter Secret Key"
                required
              />
            </div>
          </div>
          <button type="submit" className="add-key-btn" disabled={loading}>
            {loading ? (
              <div className="loader"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add New Key
              </>
            )}
          </button>
        </form>

        <div className="filters-section">
          <div className="search-field">
            <input
              type="text"
              placeholder="Search keys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <select
              value={filterExchange}
              onChange={(e) => setFilterExchange(e.target.value)}
            >
              <option value="all">All Exchanges</option>
              {exchanges.map(exchange => (
                <option key={exchange.value} value={exchange.value}>
                  {exchange.label}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="exchange">Sort by Exchange</option>
              <option value="status">Sort by Status</option>
            </select>
            <button
              className="sort-order-btn"
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        <div className="keys-list">
          {filteredAndSortedKeys.map((key) => (
            <div key={key.id} className={`key-item ${key.status}`}>
              <div className="key-info">
                <div className="key-header">
                  <h3>{key.name}</h3>
                  <span className={`status-badge ${key.status}`}>
                    {key.status}
                  </span>
                </div>
                <div className="key-field">
                  <label>Exchange:</label>
                  <div className="key-value">
                    {exchanges.find(e => e.value === key.exchange)?.label}
                  </div>
                </div>
                <div className="key-field">
                  <label>API Key:</label>
                  <div className="key-value">{key.apiKey}</div>
                </div>
                <div className="key-field">
                  <label>Secret Key:</label>
                  <div className="key-value">
                    {showSecretKey[key.id] ? key.secretKey : '••••••••••••••••'}
                    <button
                      className="toggle-visibility"
                      onClick={() => toggleSecretKey(key.id)}
                    >
                      {showSecretKey[key.id] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="key-details">
                  <div className="permissions">
                    <label>Permissions:</label>
                    <div className="permission-toggles">
                      <button
                        className={`permission-btn ${key.permissions.includes('read') ? 'active' : ''}`}
                        onClick={() => handleUpdatePermissions(key.id, 'read')}
                      >
                        Read
                      </button>
                      <button
                        className={`permission-btn ${key.permissions.includes('trade') ? 'active' : ''}`}
                        onClick={() => handleUpdatePermissions(key.id, 'trade')}
                      >
                        Trade
                      </button>
                    </div>
                  </div>
                  <div className="ip-whitelist">
                    <label>IP Whitelist:</label>
                    <div className="ip-list">
                      {key.ipWhitelist.map((ip, index) => (
                        <span key={index} className="ip-tag">
                          {ip}
                          <button
                            onClick={() => {
                              setApiKeys(prev => prev.map(k => 
                                k.id === key.id 
                                  ? { ...k, ipWhitelist: k.ipWhitelist.filter((_, i) => i !== index) }
                                  : k
                              ));
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        placeholder="Add IP..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddIpWhitelist(key.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="key-dates">
                  <span>Created: {new Date(key.createdAt).toLocaleDateString()}</span>
                  {key.lastUsed && (
                    <span>Last Used: {new Date(key.lastUsed).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="key-actions">
                <button
                  className={`status-toggle-btn ${key.status}`}
                  onClick={() => handleToggleKeyStatus(key.id)}
                >
                  {key.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  className="delete-key-btn"
                  onClick={() => openDeleteModal(key.id, key.name)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
          {filteredAndSortedKeys.length === 0 && (
            <div className="no-keys">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
              <p>No API keys found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default API;