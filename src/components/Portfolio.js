import React, { useState } from 'react';
import './Portfolio.css';

const Portfolio = () => {
    const [mainTab, setMainTab] = useState('usd');
    const [subTab, setSubTab] = useState('positions');
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc'
    });

    // Sample data - replace with your actual data
    const rows = [];

    const handleMainTabChange = (tab) => {
        setMainTab(tab);
    };

    const handleSubTabChange = (tab) => {
        setSubTab(tab);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const renderSortArrows = (columnName) => {
        if (columnName === 'ROI (%)') return null;
        
        return (
            <div className="sort-arrows">
                <span className={`arrow up ${sortConfig.key === columnName && sortConfig.direction === 'asc' ? 'active' : ''}`}>
                    ▲
                </span>
                <span className={`arrow down ${sortConfig.key === columnName && sortConfig.direction === 'desc' ? 'active' : ''}`}>
                    ▼
                </span>
            </div>
        );
    };

    const renderTable = () => (
        <div className="table-wrapper">
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            {[
                                'Pair Type',
                                'Order Type',
                                'Leverage',
                                'PnL',
                                'ROI (%)',
                                'Size',
                                'Entry Price (USDT)',
                                'Liq Price (USDT)'
                            ].map((columnName) => (
                                <th 
                                    key={columnName}
                                    onClick={() => columnName !== 'ROI (%)' && handleSort(columnName)}
                                    className={columnName !== 'ROI (%)' ? 'sortable' : ''}
                                >
                                    <div className="th-content">
                                        {columnName}
                                        {renderSortArrows(columnName)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="8" className="no-records">No Records</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="table-footer">
                <div className="showing-entries">
                    Showing 1 to 1 of 1 entries
                </div>
                <div className="pagination-controls">
                    <div className="entries-per-page">
                        Entries per page 
                        <select value={rowsPerPage} onChange={() => {}}>
                            <option value={10}>10</option>
                        </select>
                    </div>
                    <button 
                        className="page-button"
                        disabled={page === 0}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Previous
                    </button>
                    <span className="page-number">1</span>
                    <button 
                        className="page-button"
                        disabled={rows.length <= (page + 1) * rowsPerPage}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="portfolio-container">
            <div className="tabs-wrapper">
                <div className="main-tabs">
                    <button 
                        className={`tab-button main futures-usd ${mainTab === 'usd' ? 'active' : ''}`}
                        onClick={() => handleMainTabChange('usd')}
                    >
                        Futures USD-M
                    </button>
                    <button 
                        className={`tab-button main ${mainTab === 'coin' ? 'active' : ''}`}
                        onClick={() => handleMainTabChange('coin')}
                    >
                        Futures COIN-M
                    </button>
                </div>

                <div className="sub-tabs">
                    <button 
                        className={`tab-button sub ${subTab === 'positions' ? 'active' : ''}`}
                        onClick={() => handleSubTabChange('positions')}
                    >
                        <span>Open positions (0)</span>
                    </button>
                    <button 
                        className={`tab-button sub ${subTab === 'orders' ? 'active' : ''}`}
                        onClick={() => handleSubTabChange('orders')}
                    >
                        <span>Open orders (0)</span>
                    </button>
                    <button 
                        className={`tab-button sub ${subTab === 'history' ? 'active' : ''}`}
                        onClick={() => handleSubTabChange('history')}
                    >
                        <span>Order history</span>
                    </button>
                </div>
            </div>

            <div className="content-area">
                {mainTab === 'usd' && renderTable()}
                {mainTab === 'coin' && <div className="coin-content">Futures COIN-M Content</div>}
            </div>
        </div>
    );
};

export default Portfolio;