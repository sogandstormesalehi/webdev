import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function DesignerDashboard() {
    const navigate = useNavigate();
    const [isNightMode, setIsNightMode] = useState(false);

    const recentCategories = [
        'Orange cat (Recently Accessed)',
        'DSH (Recently Accessed)',
        'Cutie Pookie (Recently Accessed)',
    ];

    const recentQueries = [
        'Caet? (Recently Accessed)',
        'Caets? (Recently Accessed)',
        'CAETS!? (Recently Accessed)',
    ];

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
        document.body.classList.toggle('night-mode', !isNightMode);
    };

    return (
        <div className={`container ${isNightMode ? 'night-mode' : ''}`}>
            <h1>Designer Dashboard</h1>
            <div className="card-container">
                <div className="card">
                    <h2>Category Management</h2>
                    <ul>
                        {recentCategories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                    </ul>
                    <button onClick={() => navigate('/category-management')}>
                        Go to Category Management
                    </button>
                </div>
                <div className="card">
                    <h2>Query Management</h2>
                    <ul>
                        {recentQueries.map((query, index) => (
                            <li key={index}>{query}</li>
                        ))}
                    </ul>
                    <button onClick={() => navigate('/query-management')}>
                        Go to Query Management
                    </button>
                </div>
            </div>
            <button className="back-button" onClick={() => navigate('/')}>
                Logout
            </button>
            <div className="toggle-container">
                <input
                    type="checkbox"
                    id="night-mode-toggle"
                    className="toggle-checkbox"
                    checked={isNightMode}
                    onChange={toggleNightMode}
                />
                <label htmlFor="night-mode-toggle" className="toggle-label"></label>
            </div>
        </div>
    );
}

export default DesignerDashboard;
