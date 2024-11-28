import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function Scoreboard() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([
        { rank: 1, name: 'Cat A', score: 500, following: true },
        { rank: 2, name: 'Cat B', score: 480, following: false },
        { rank: 3, name: 'Cat C', score: 460, following: true },
        { rank: 4, name: 'Cat D', score: 440, following: false },
        { rank: 5, name: 'Cat E', score: 420, following: true },
        { rank: 6, name: 'Cat F', score: 400, following: false },
    ]);
    const [isNightMode, setIsNightMode] = useState(false);

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
        document.body.classList.toggle('night-mode', !isNightMode);
    };

    const toggleFollowStatus = (index) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player, i) =>
                i === index ? { ...player, following: !player.following } : player
            )
        );
    };

    return (
        <div className={`container ${isNightMode ? 'night-mode' : ''}`}>
            <h1>Scoreboard</h1>
            <table className="scoreboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Following Status</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={index}>
                            <td>{player.rank}</td>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                            <td>
                                <button
                                    className="follow-button"
                                    style={{
                                        backgroundColor: player.following ? '#F4978E' : '#C6CEB3',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => toggleFollowStatus(index)}
                                >
                                    {player.following ? 'Unfollow' : 'Follow'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={() => navigate('/player')}>
                Back to Player Dashboard
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

export default Scoreboard;
