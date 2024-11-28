import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function AnswerQueries() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [randomQuery, setRandomQuery] = useState(null);
    const [isNightMode, setIsNightMode] = useState(false);

    const queries = [
        { id: 1, category: 'cats', question: 'Who is the best cat ever?', options: ['Gucci', 'HDU'] },
        { id: 2, category: 'cats', question: 'Who is the cutest cat ever?', options: ['Gucci', 'HDU'] },
        { id: 3, category: 'cats', question: 'Who is the prettiest cat ever?', options: ['Gucci', 'HDU'] },
        { id: 4, category: 'geography', question: 'What is the capital of France?', options: ['Berlin', 'Paris'] },
        { id: 5, category: 'space', question: 'What is the largest planet?', options: ['Jupiter', 'Saturn'] },
    ];

    const answeredQueries = [
        {
            id: 12,
            question: 'What is the capital of France?',
            yourAnswer: 'Berlin',
            correctAnswer: 'Paris',
            score: '0/45',
        },
        {
            id: 21,
            question: 'What is the largest planet in our solar system?',
            yourAnswer: 'Jupiter',
            correctAnswer: 'Jupiter',
            score: '30/30',
        },
    ];

    const filteredQueries =
        selectedCategory === 'all'
            ? queries
            : queries.filter((query) => query.category === selectedCategory);

    const handleShowRandomQuery = () => {
        const random = filteredQueries[Math.floor(Math.random() * filteredQueries.length)];
        setRandomQuery(random);
    };

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
        document.body.classList.toggle('night-mode', !isNightMode);
    };

    return (
        <div className={`container ${isNightMode ? 'night-mode' : ''}`}>
            <h1>Available Queries</h1>
            <div className="form-group">
                <label htmlFor="category-select">Filter by Category:</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="cats">Cats</option>
                    <option value="geography">Geography</option>
                    <option value="space">Space</option>
                </select>
            </div>
            <div className="button-group">
                <button className="random-query-btn" onClick={handleShowRandomQuery}>
                    Answer Random Query
                </button>
                <button className="show-all-btn" onClick={() => setRandomQuery(null)}>
                    Show All Queries
                </button>
            </div>

            <div className="query-card-container">
                {randomQuery ? (
                    <QueryCard key={randomQuery.id} query={randomQuery} />
                ) : (
                    filteredQueries.map((query) => <QueryCard key={query.id} query={query} />)
                )}
            </div>

            <div className="answered-queries">
                <h2>Previously Answered</h2>
                {answeredQueries.map((answered) => (
                    <AnsweredQueryCard key={answered.id} query={answered} />
                ))}
            </div>

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

function QueryCard({ query }) {
    return (
        <div className="query-card">
            <h3>{query.question}</h3>
            <select defaultValue="">
                <option value="" disabled>
                    Select an answer
                </option>
                {query.options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <button>Submit Answer</button>
        </div>
    );
}

function AnsweredQueryCard({ query }) {
    return (
        <div className="answered-query-card">
            <h3>{query.question}</h3>
            <p>
                <strong>Your Answer:</strong> {query.yourAnswer}
            </p>
            <p>
                <strong>Correct Answer:</strong> {query.correctAnswer}
            </p>
            <p>
                <strong>Score:</strong> {query.score}
            </p>
        </div>
    );
}

export default AnswerQueries;
