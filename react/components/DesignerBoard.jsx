import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function DesignerBoard() {
    const navigate = useNavigate();
    const [designers, setDesigners] = useState([
        { name: 'Miaw', queries: 500, following: true },
        { name: ':3', queries: 480, following: false },
        { name: 'Mio', queries: 460, following: true },
        { name: 'Meow', queries: 440, following: false },
    ]);
    const [isNightMode, setIsNightMode] = useState(false);

    useEffect(() => {
        const updatedDesigners = designers.map((designer) => ({
            ...designer,
            following: JSON.parse(localStorage.getItem(designer.name)) ?? designer.following,
        }));
        setDesigners(updatedDesigners);
    }, []);

    const toggleFollow = (name) => {
        const updatedDesigners = designers.map((designer) =>
            designer.name === name
                ? { ...designer, following: !designer.following }
                : designer
        );
        setDesigners(updatedDesigners);
        localStorage.setItem(name, JSON.stringify(!designers.find((d) => d.name === name).following));
    };

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
        document.body.classList.toggle('night-mode', !isNightMode);
    };

    return (
        <div className={`container ${isNightMode ? 'night-mode' : ''}`}>
            <h1>Designers List</h1>
            <table className="scoreboard-table">
                <thead>
                    <tr>
                        <th>Designer</th>
                        <th>Number of Queries</th>
                        <th>Following Status</th>
                    </tr>
                </thead>
                <tbody>
                    {designers.map((designer) => (
                        <tr key={designer.name}>
                            <td>{designer.name}</td>
                            <td>{designer.queries}</td>
                            <td>
                                <button
                                    className={`follow-button ${designer.following ? 'unfollow' : 'follow'}`}
                                    onClick={() => toggleFollow(designer.name)}
                                >
                                    {designer.following ? 'Unfollow' : 'Follow'}
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

export default DesignerBoard;
