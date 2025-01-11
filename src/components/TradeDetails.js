import React, { useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import './TradeDetails.css';

const TradeDetails = () => {
  const [timeframe, setTimeframe] = useState('3 Months');
  const [roiType, setRoiType] = useState('Compounding');

  const timeframeData = useMemo(() => ({
    '3 Months': [
      [1640995200000, 500], 
      [1643673600000, 600],
      [1646092800000, 750],
      [1648771200000, 929.28]
    ],
    '6 Months': [
      [1635724800000, 400], 
      [1638316800000, 450],
      [1640995200000, 500],
      [1643673600000, 600],
      [1646092800000, 750],
      [1648771200000, 929.28]
    ],
    '1 Year': [
      [1625097600000, 200], 
      [1627776000000, 250],
      [1630454400000, 300],
      [1633046400000, 350],
      [1635724800000, 400],
      [1638316800000, 450],
      [1640995200000, 500],
      [1643673600000, 600],
      [1646092800000, 750],
      [1648771200000, 929.28]
    ],
    '2 Years': [
      [1609459200000, 100], 
      [1612137600000, 150],
      [1614556800000, 180],
      [1617235200000, 200],
      [1619827200000, 220],
      [1622505600000, 250],
      [1625097600000, 300],
      [1627776000000, 350],
      [1630454400000, 400],
      [1633046400000, 450],
      [1635724800000, 500],
      [1638316800000, 550],
      [1640995200000, 600],
      [1643673600000, 700],
      [1646092800000, 800],
      [1648771200000, 929.28]
    ],
    '3 Years': [
      [1577836800000, 50],  
      [1580515200000, 80],
      [1583020800000, 100],
      [1585699200000, 120],
      [1588291200000, 150],
      [1590969600000, 180],
      [1593561600000, 200],
      [1596240000000, 250],
      [1598918400000, 300],
      [1601510400000, 350],
      [1604188800000, 400],
      [1606780800000, 450],
      [1609459200000, 500],
      [1612137600000, 550],
      [1614556800000, 600],
      [1617235200000, 650],
      [1619827200000, 700],
      [1622505600000, 750],
      [1625097600000, 800],
      [1627776000000, 850],
      [1630454400000, 900],
      [1633046400000, 929.28]
    ],
    '4 Years': [
      [1546300800000, 20],  
      [1548979200000, 40],
      [1551398400000, 60],
      [1554076800000, 80],
      [1556668800000, 100],
      [1559347200000, 150],
      [1561939200000, 200],
      [1564617600000, 250],
      [1567296000000, 300],
      [1569888000000, 350],
      [1572566400000, 400],
      [1575158400000, 450],
      [1577836800000, 500],
      [1580515200000, 550],
      [1583020800000, 600],
      [1585699200000, 650],
      [1588291200000, 700],
      [1590969600000, 750],
      [1593561600000, 800],
      [1596240000000, 850],
      [1598918400000, 900],
      [1601510400000, 929.28]
    ],
    'Bot Config': [
      [1640995200000, 500],
      [1643673600000, 600],
      [1646092800000, 750],
      [1648771200000, 929.28]
    ]
  }), []);

  const timeframeStats = useMemo(() => ({
    '3 Months': {
      annualizedROI: 495.44,
      profitFactor: 1.47,
      avgWeeklyTrades: 0.48,
      avgHoldingTime: '40.12h',
      sharpeRatio: 8.00,
      sortingRatio: 25.95,
      winRate: 76.00,
      profit: '30%',
      maxRisk: 39.00
    },
    '6 Months': {
      annualizedROI: 432.18,
      profitFactor: 1.52,
      avgWeeklyTrades: 0.52,
      avgHoldingTime: '38.45h',
      sharpeRatio: 7.85,
      sortingRatio: 24.12,
      winRate: 74.50,
      profit: '45%',
      maxRisk: 41.20
    },
    '1 Year': {
      annualizedROI: 364.92,
      profitFactor: 1.61,
      avgWeeklyTrades: 0.56,
      avgHoldingTime: '36.78h',
      sharpeRatio: 7.45,
      sortingRatio: 22.85,
      winRate: 72.80,
      profit: '78%',
      maxRisk: 43.50
    },
    '2 Years': {
      annualizedROI: 298.65,
      profitFactor: 1.68,
      avgWeeklyTrades: 0.62,
      avgHoldingTime: '35.24h',
      sharpeRatio: 7.12,
      sortingRatio: 21.45,
      winRate: 71.20,
      profit: '125%',
      maxRisk: 45.80
    },
    '3 Years': {
      annualizedROI: 245.33,
      profitFactor: 1.75,
      avgWeeklyTrades: 0.68,
      avgHoldingTime: '33.92h',
      sharpeRatio: 6.85,
      sortingRatio: 20.18,
      winRate: 69.80,
      profit: '185%',
      maxRisk: 47.20
    },
    '4 Years': {
      annualizedROI: 198.76,
      profitFactor: 1.82,
      avgWeeklyTrades: 0.72,
      avgHoldingTime: '32.45h',
      sharpeRatio: 6.54,
      sortingRatio: 19.25,
      winRate: 68.50,
      profit: '245%',
      maxRisk: 48.90
    },
    'Bot Config': {
      annualizedROI: 495.44,
      profitFactor: 1.47,
      avgWeeklyTrades: 0.48,
      avgHoldingTime: '40.12h',
      sharpeRatio: 8.00,
      sortingRatio: 25.95,
      winRate: 76.00,
      profit: '30%',
      maxRisk: 39.00
    }
  }), []);

  const timeframeQuarterly = useMemo(() => ({
    '3 Months': [
      { year: 2024, q1: '+89.8%', q2: '-22.8%', q3: '+78.7%', q4: '+61.4%' },
      { year: 2025, q1: '+60.0%', q2: '+0.0%', q3: '+0.0%', q4: '+0.0%' }
    ],
    '6 Months': [
      { year: 2024, q1: '+89.8%', q2: '-22.8%', q3: '+78.7%', q4: '+61.4%' },
      { year: 2025, q1: '+60.0%', q2: '+0.0%', q3: '+0.0%', q4: '+0.0%' }
    ],
    '1 Year': [
      { year: 2023, q1: '+112.3%', q2: '-25.8%', q3: '-2.4%', q4: '+18.9%' },
      { year: 2024, q1: '+89.8%', q2: '-22.8%', q3: '+78.7%', q4: '+61.4%' },
      { year: 2025, q1: '+60.0%', q2: '+0.0%', q3: '+0.0%', q4: '+0.0%' }
    ],
    '2 Years': [
      { year: 2022, q1: '+86.4%', q2: '+83.2%', q3: '+14.9%', q4: '+33.7%' },
      { year: 2023, q1: '+112.3%', q2: '-25.8%', q3: '-2.4%', q4: '+18.9%' },
      { year: 2024, q1: '+89.8%', q2: '-22.8%', q3: '+78.7%', q4: '+61.4%' },
      { year: 2025, q1: '+60.0%', q2: '+0.0%', q3: '+0.0%', q4: '+0.0%' }
    ],
    '3 Years': [
      { year: 2021, q1: '+80.2%', q2: '+98.8%', q3: '+105.1%', q4: '+83.7%' },
      { year: 2022, q1: '+86.4%', q2: '+83.2%', q3: '+14.9%', q4: '+33.7%' },
      { year: 2023, q1: '+112.3%', q2: '-25.8%', q3: '-2.4%', q4: '+18.9%' },
      { year: 2024, q1: '+89.8%', q2: '-22.8%', q3: '+78.7%', q4: '+61.4%' },
      { year: 2025, q1: '+60.0%', q2: '+0.0%', q3: '+0.0%', q4: '+0.0%' }
    ],
    '4 Years': [
      { year: 2021, q1: '+80.2%', q2: '+98.8%', q3: '+105.1%', q4: '+83.7%' },
      { year: 2022, q1: '+86.4%', q2: '+83.2%', q3: '+14.9%', q4: '+33.7%' },
      { year: 2023, q1: '+112.3%', q2: '-25.8%', q3: '-2.4%', q4: '+18.9%' },
      { year: 2024, q1: '+89.8%', q2: '-22.8%', q3: '+78.7%', q4: '+61.4%' },
      { year: 2025, q1: '+60.0%', q2: '+0.0%', q3: '+0.0%', q4: '+0.0%' }
    ],
    'Bot Config': [
      { year: 2024, q1: '+89.8%', q2: '-22.8%', q3: '+78.7%', q4: '+61.4%' },
      { year: 2025, q1: '+60.0%', q2: '+0.0%', q3: '+0.0%', q4: '+0.0%' }
    ]
  }), []);

  const chartOptions = {
    chart: {
      type: 'area',
      height: '100%',
      width: '100%',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      redrawOnWindowResize: true,
      animations: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 250
        },
        legend: {
          position: 'bottom',
          offsetY: 7
        }
      }
    }],
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
      theme: 'dark',
      x: {
        format: 'dd MMM yyyy'
      }
    },
    grid: {
      show: true,
      borderColor: '#90A4AE',
      strokeDashArray: 0,
      position: 'back'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
        style: {
          colors: '#fff'
        },
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM yyyy',
          day: 'dd MMM',
          hour: 'HH:mm'
        }
      }
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: '#fff'
        },
        formatter: (value) => `$${value.toFixed(2)}`
      }
    }
  };

  const chartSeries = [{
    name: 'Portfolio Value',
    data: timeframeData[timeframe]
  }];

  const timeframeOptions = ['3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '4 Years', 'Bot Config'];
  const roiOptions = ['Non-Compounding','No. of Investors','AUM Balance'];

  return (
    <div className="trade-details-container">
      <div className="main-content">
        <div className="left-content">
          <div className="stats-section">
            <div className="stats-card">
              <div className="stats-item">
                <span>Annualized ROI</span>
                <span className="value">{timeframeStats[timeframe].annualizedROI}%</span>
              </div>
              <div className="stats-item">
                <span>Profit Factor</span>
                <span className="value">{timeframeStats[timeframe].profitFactor}</span>
              </div>
              <div className="stats-item">
                <span>Avg. Weekly Trades</span>
                <span className="value">{timeframeStats[timeframe].avgWeeklyTrades}</span>
              </div>
              <div className="stats-item">
                <span>Avg. Holding Time</span>
                <span className="value">{timeframeStats[timeframe].avgHoldingTime}</span>
              </div>
              <div className="stats-item">
                <span>Sharpe Ratio</span>
                <span className="value">{timeframeStats[timeframe].sharpeRatio}</span>
              </div>
              <div className="stats-item">
                <span>Sorting Ratio</span>
                <span className="value">{timeframeStats[timeframe].sortingRatio}</span>
              </div>
            </div>
          </div>

          <div className="chart-section">
            <div className="main-chart">
              <div className="chart-controls">
                <div className="control-group">
                  <label>Period</label>
                  <select 
                    value={timeframe} 
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="chart-select"
                  >
                    {timeframeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="control-group">
                  <label>ROI</label>
                  <select 
                    value={roiType} 
                    onChange={(e) => setRoiType(e.target.value)}
                    className="chart-select"
                  >
                    {roiOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={350}
              />
            </div>
          </div>

          <div className="quarterly-section">
            <table className="quarterly-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Q1</th>
                  <th>Q2</th>
                  <th>Q3</th>
                  <th>Q4</th>
                </tr>
              </thead>
              <tbody>
                {timeframeQuarterly[timeframe].map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td className={row.q1.startsWith('+') ? 'positive' : 'negative'}>{row.q1}</td>
                    <td className={row.q2.startsWith('+') ? 'positive' : 'negative'}>{row.q2}</td>
                    <td className={row.q3.startsWith('+') ? 'positive' : 'negative'}>{row.q3}</td>
                    <td className={row.q4.startsWith('+') ? 'positive' : 'negative'}>{row.q4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="right-content">
          <div className="algo-overview">
            <div className="algo-header">
              <h2>Algo Overview</h2>
              <div className="timeframe-selector">
                <select 
                  className="timeframe-dropdown"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <option value="3 Months">3M</option>
                  <option value="6 Months">6M</option>
                  <option value="1 Year">1Y</option>
                  <option value="2 Years">2Y</option>
                  <option value="3 Years">3Y</option>
                  <option value="4 Years">4Y</option>
                </select>
              </div>
            </div>

            <div className="algo-pair">
              <div className="pair-label">Pair | USDM</div>
              <div className="pair-value">BTCUSDT</div>
            </div>

            <div className="algo-stats-grid">
              <div className="algo-stat-item">
                <div className="stat-title">AUM</div>
                <div className="stat-value">786.94K USDT</div>
              </div>

              <div className="algo-stat-item">
                <div className="stat-title">Trade Volume</div>
                <div className="stat-value">8.11M USDT</div>
              </div>

              <div className="algo-stat-item">
                <div className="stat-title">Draw Down</div>
                <div className="stat-value">
                  <div>31.5% Max</div>
                  <div className="separator">|</div>
                  <div>16.6% Avg</div>
                </div>
              </div>

              <div className="algo-stat-item">
                <div className="stat-title">Time to Recovery</div>
                <div className="stat-value">
                  <div>137d Max</div>
                  <div className="separator">|</div>
                  <div>50.7d Avg</div>
                </div>
              </div>

              <div className="algo-stat-item">
                <div className="stat-title">No of Trade</div>
                <div className="stat-value">24</div>
              </div>

              <div className="algo-stat-item">
                <div className="stat-title">Win Rate</div>
                <div className="stat-value">75.00%</div>
              </div>

              <div className="algo-stat-item">
                <div className="stat-title">Profit Comm.</div>
                <div className="stat-value">30%</div>
              </div>

              <div className="algo-stat-item">
                <div className="stat-title">Max Floating Risk</div>
                <div className="stat-value">36.80%</div>
              </div>

              <div className="algo-stat-item">
                <div className="stat-title">Trade Time</div>
                <div className="stat-value">
                  <div>30.17d Max</div>
                  <div className="separator">|</div>
                  <div>10.52d Avg</div>
                </div>
              </div>
            </div>
          </div>

          <div className="trade-analysis">
            <div className="analysis-header">
              <div className="winning-trades">
                <div className="trade-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none">
                    <path d="M1.03211 12.3339C0.713816 12.6948 0.748342 13.2453 1.10922 13.5636C1.47011 13.8819 2.02069 13.8474 2.33898 13.4865L1.03211 12.3339ZM8.88616 4.74611L9.54048 4.17079C9.37522 3.98283 9.13711 3.87502 8.88683 3.87483C8.63655 3.87464 8.39828 3.98208 8.23273 4.16979L8.88616 4.74611ZM13.9866 10.5469L13.3323 11.1222C13.4977 11.3104 13.7361 11.4182 13.9866 11.4182C14.2371 11.4182 14.4755 11.3104 14.6409 11.1222L13.9866 10.5469ZM22.4873 0.878906H23.3586C23.3586 0.397712 22.9685 0.00762749 22.4873 0.00762749V0.878906ZM21.616 6.67971C21.616 7.1609 22.0061 7.55099 22.4873 7.55099C22.9685 7.55099 23.3586 7.1609 23.3586 6.67971H21.616ZM17.3869 0.00762749C16.9057 0.00762749 16.5156 0.397712 16.5156 0.878906C16.5156 1.3601 16.9057 1.75019 17.3869 1.75019V0.00762749ZM2.33898 13.4865L9.5396 5.32243L8.23273 4.16979L1.03211 12.3339L2.33898 13.4865ZM8.23184 5.32143L13.3323 11.1222L14.6409 9.97159L9.54048 4.17079L8.23184 5.32143ZM14.6409 11.1222L23.1416 1.45423L21.833 0.303587L13.3323 9.97159L14.6409 11.1222ZM21.616 0.878906V6.67971H23.3586V0.878906H21.616ZM22.4873 0.00762749H17.3869V1.75019H22.4873V0.00762749Z" fill="#20B26C"/>
                  </svg>
                  <span>Winning Trades</span>
                </div>
              </div>
              <div className="losing-trades">
                <div className="trade-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="14" viewBox="0 0 23 14" fill="none">
                    <path d="M0.678594 1.45713C0.360301 1.09625 0.394826 0.545668 0.755709 0.227374C1.11659 -0.0909195 1.66717 -0.0563946 1.98547 0.304489L0.678594 1.45713ZM8.53265 9.04491L9.18697 9.62023C9.02171 9.80818 8.7836 9.91599 8.53332 9.91619C8.28304 9.91638 8.04476 9.80893 7.87921 9.62123L8.53265 9.04491ZM13.6331 3.2441L12.9788 2.66878C13.1442 2.48065 13.3826 2.37282 13.6331 2.37282C13.8836 2.37282 14.122 2.48065 14.2874 2.66878L13.6331 3.2441ZM22.1338 12.9121H23.0051C23.0051 13.3933 22.615 13.7834 22.1338 13.7834V12.9121ZM21.2625 7.11131C21.2625 6.63011 21.6526 6.24003 22.1338 6.24003C22.615 6.24003 23.0051 6.63011 23.0051 7.11131H21.2625ZM17.0334 13.7834C16.5522 13.7834 16.1621 13.3933 16.1621 12.9121C16.1621 12.4309 16.5522 12.0408 17.0334 12.0408V13.7834ZM1.98547 0.304489L9.18609 8.46858L7.87921 9.62123L0.678594 1.45713L1.98547 0.304489ZM7.87833 8.46959L12.9788 2.66878L14.2874 3.81942L9.18697 9.62023L7.87833 8.46959ZM14.2874 2.66878L22.7881 12.3368L21.4795 13.4874L12.9788 3.81942L14.2874 2.66878ZM21.2625 12.9121V7.11131H23.0051V12.9121H21.2625ZM22.1338 13.7834H17.0334V12.0408H22.1338V13.7834Z" fill="#F6465D"/>
                  </svg>
                  <span>Losing Trades</span>
                </div>
              </div>
            </div>

            <div className="trade-stats-container">

              <div className="stat-row">
                <div className="stat-value winning">60.38%</div>
                <div className="dotted-line"></div>
                <div className="stat-value losing">39.62%</div>
              </div>
              <div className="stat-label">% WINNING/LOSING TRADES</div>

              <div className="stat-row">
                <div className="stat-value winning">18.69%</div>
                <div className="dotted-line"></div>
                <div className="stat-value losing">11.98%</div>
              </div>
              <div className="stat-label">AVERAGE WIN/LOSS</div>

              <div className="stat-row">
                <div className="stat-value winning">88.43%</div>
                <div className="dotted-line"></div>
                <div className="stat-value losing">30.50%</div>
              </div>
              <div className="stat-label">BIGGEST WIN/LOSS</div>

              <div className="stat-row">
                <div className="stat-value winning">1W 0D 5h</div>
                <div className="dotted-line"></div>
                <div className="stat-value losing">3D 6h</div>
              </div>
              <div className="stat-label">AVERAGE HOLDING TIME</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeDetails;
