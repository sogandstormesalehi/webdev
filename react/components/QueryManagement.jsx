import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function QueryManagement() {
    const navigate = useNavigate();

    const [newQuery, setNewQuery] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(1);
    const [category, setCategory] = useState('Category 1');
    const [difficulty, setDifficulty] = useState('easy');
    const [similarQueries, setSimilarQueries] = useState([]);
    const [isNightMode, setIsNightMode] = useState(false);

    const existingQueries = [
        {
            id: 1,
            question: 'Why does my cat scream at 3am?',
            options: [
                'They\'re starving',
                'Probably talking to ghosts (or plotting your demise)',
                'Midnight zoomies, why not?',
                'Attention... that they will immediately regret',
            ],
        },
        {
            id: 2,
            question: 'Why does my cat stare at me like I owe them money?',
            options: [
                'Judging your life choices, obviously',
                'Calculating how to best trip you on the stairs',
                'Wondering why you didn’t bring a second breakfast',
                'Just contemplating how much they "tolerate" you',
            ],
        },
    ];

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleCreateQuery = () => {
        if (!newQuery.trim() || options.some((opt) => !opt.trim())) {
            alert('Please fill all fields.');
        } else {
            alert('Query created successfully!');
            // Reset form
            setNewQuery('');
            setOptions(['', '', '', '']);
            setCategory('Category 1');
            setDifficulty('easy');
            setSimilarQueries([]);
        }
    };

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
        document.body.classList.toggle('night-mode', !isNightMode);
    };

    return (
        <div className={`container ${isNightMode ? 'night-mode' : ''}`}>
            <h1>Create New Query</h1>
            <div className="form-section">
                <label>Enter your question</label>
                <input
                    type="text"
                    placeholder="Enter your question"
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                />
            </div>
            <div className="options-container">
    {options.map((option, index) => (
        <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
        />
    ))}
</div>

            <div className="form-section">
                <label>Select Correct Answer</label>
                <select
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(Number(e.target.value))}
                >
                    {options.map((_, index) => (
                        <option key={index} value={index + 1}>
                            Option {index + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-section">
                <label>Classify Question under Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                </select>
            </div>
            <div className="form-section">
                <label>Select Difficulty Level</label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="form-section">
                <label>Select Similar Queries</label>
                <select
                    multiple
                    value={similarQueries}
                    onChange={(e) =>
                        setSimilarQueries([...e.target.selectedOptions].map((opt) => opt.value))
                    }
                >
                    <option value="1">cat stare at the wall for hours?</option>
                    <option value="2">How to apologize to a cat?</option>
                    <option value="3">cat plotting world domination?</option>
                    <option value="4">cat sitting on my keyboard?</option>
                    <option value="5">the fluff overlord?</option>
                    <option value="6">survive a cat ignoring you</option>
                </select>
            </div>
            <button onClick={handleCreateQuery}>Create Query</button>
            <h1 className="query-management">Query Management</h1>
            <div className="query-card-container">
                {existingQueries.map((query) => (
                    <div className="query-card" key={query.id}>
                        <h3>{query.question}</h3>
                        <select>
                            <option value="" disabled selected>
                                Select an answer
                            </option>
                            {query.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button>Edit Query</button>
                    </div>
                ))}
            </div>
            <button className="back-button" onClick={() => navigate('/designer')}>
                Back to Designer
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

export default QueryManagement;
