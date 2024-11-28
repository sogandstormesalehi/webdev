import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function PlayerDashboard() {
    const navigate = useNavigate();
    const [isNightMode, setIsNightMode] = useState(false);

    const dummyScores = [
        { category: 'CAT A', score: 500 },
        { category: 'CAT B', score: 450 },
        { category: 'CAT C', score: 400 },
    ];

    const recentQueries = ['Query 1 (Recent)', 'Query 2 (Recent)', 'Query 3 (Recent)'];
    const recentDesigners = ['Mio (Recent)', 'Meow (Recent)', 'Miaw (Recent)'];

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
        document.body.classList.toggle('night-mode', !isNightMode);
    };

    const renderCard = (title, items, buttonLabel, navigateTo) => (
        <div className="card">
            <h2>{title}</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={() => navigate(navigateTo)}>{buttonLabel}</button>
        </div>
    );

    return (
        <div className={`container ${isNightMode ? 'night-mode' : ''}`}>
            <h1>Player Dashboard</h1>
            <div className="card-container">
                {renderCard(
                    'Scoreboard',
                    dummyScores.map((score) => `${score.category} - ${score.score} Points`),
                    'Go to Scoreboard',
                    '/scoreboard'
                )}
                {renderCard('Answer Queries', recentQueries, 'Go to Answer Queries', '/answer-queries')}
                {renderCard('Show Designers', recentDesigners, 'Go to Designers Board', '/designerboard')}
            </div>
            <button className="back-button" onClick={() => navigate('/')}>Logout</button>
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

export default PlayerDashboard;
