import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import Home from './components/homePage';
import Login from './components/Login';
import Algo from './components/Algo';
import API from './components/API';
import Portfolio from './components/Portfolio';
import Wallet from './components/Wallet';
import TradeDetails from './components/TradeDetails';
import EmailTestDashboard from './components/EmailTestDashboard';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bots" element={<Algo />} />
            <Route path="/trade" element={<Portfolio />} />
            <Route path="/assets" element={<Wallet />} />
            <Route path="/apikeys" element={<API />} />
            <Route path="/trade-details" element={<TradeDetails />} />
            <Route path="/email-test" element={<EmailTestDashboard />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
