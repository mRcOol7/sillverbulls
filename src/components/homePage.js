import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import './homePage.css';

const Home = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('USDm');

  // Chart data and options for 3x leverage
  const chart3xOptions = {
    chart: {
      type: 'area',
      height: 100,
      sparkline: {
        enabled: true
      },
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#00ff00'],
    tooltip: {
      theme: 'dark'
    }
  };

  const chart3xSeries = [{
    name: 'Value',
    data: [100, 200, 300, 400, 500, 600, 700, 800, 929.28]
  }];

  const chart2xOptions = {
    ...chart3xOptions
  };

  const chart2xSeries = [{
    name: 'Value',
    data: [100, 150, 200, 250, 300, 400, 450, 500, 597.7]
  }];

  const handleChartClick = () => {
    navigate('/trade-details');
  };

  const handleFollowClick = () => {
    navigate('/trade-details');
  };

  const renderCard = (title, leverage, chartOptions, chartSeries, stats) => (
    <div className="leverage-card">
      <div className="card-sections">
        {/* Left Section */}
        <div className="card-section left-section">
          <div className="header-section">
            <div className="title-row">
              <div className="title-with-pair">
                <h2>{title}</h2>
                <div className="pair-tag">ETHUSDT</div>
              </div>
              <div className="followers-count">{stats.followers} Followers</div>
            </div>
            <div className="badge-row">
              <div className="category-badge">Futures</div>
              <div className="currency-badge">USDm</div>
              <div className="leverage-badge">{leverage}x Leverage</div>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="vertical-divider"></div>

        {/* Middle Section */}
        <div className="card-section middle-section">
          <div className="roi-title">
            <span className="roi-text">ROI</span>
          </div>
          <div className="stats-container">
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">3M</span>
                  <span className="stat-separator">|</span>
                  <span className="stat-value green">+169.94%</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">6M</span>
                  <span className="stat-separator">|</span>
                  <span className="stat-value green">+406.87%</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">1Y</span>
                  <span className="stat-separator">|</span>
                  <span className="stat-value green">+785.01%</span>
                </div>
              </div>
            </div>
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">2Y</span>
                  <span className="stat-separator">|</span>
                  <span className="stat-value green">+3.2K%</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">3Y</span>
                  <span className="stat-separator">|</span>
                  <span className="stat-value green">+17.53K%</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">4Y</span>
                  <span className="stat-separator">|</span>
                  <span className="stat-value green">+85.22K%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="vertical-divider"></div>

        {/* Right Sections */}
        <div className="right-sections-wrapper">
          <div className="card-section right-section">
            <div className="value-section">
              <div className="value-groups-wrapper">
                <div className="value-group">
                  <div className="current-value">${stats.all}</div>
                  <div className="value-label">AUM (USDT)</div>
                </div>
                <div className="value-separator"></div>
                <div className="value-group">
                  <div className="percentage-change green">+{stats.oneY}%</div>
                  <div className="value-label">Annualized ROI</div>
                </div>
              </div>
            </div>
            <div className="chart-container" onClick={handleChartClick}>
              <ReactApexChart 
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={100}
              />
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="vertical-divider"></div>

          {/* Follow Button Section */}
          <div className="follow-section">
            <button className="follow-btn" onClick={handleFollowClick}>
              <p className="follow-text">Follow</p>
              <img
                alt="right-down"
                className="icon"
                loading="lazy"
                src="https://cdn1.iconfinder.com/data/icons/basic-arrow/512/Artboard_40-512.png"
                width="20"
                height="20"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const stats3x = {
    followers: 27,
    oneM: '1.44',
    sixM: '68.63',
    oneY: '495.44',
    all: '929.28'
  };

  const stats2x = {
    followers: 159,
    oneM: '0.71',
    sixM: '34.07',
    oneY: '258.17',
    all: '597.7'
  };

  return (
    <div className="home-container">
      {renderCard('Omega-3X', 3, chart3xOptions, chart3xSeries, stats3x)}
      {renderCard('Omega-2X', 2, chart2xOptions, chart2xSeries, stats2x)}
    </div>
  );
};

export default Home;