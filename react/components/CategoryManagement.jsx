import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function CategoryManagement() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([
        'mio',
        'meow 2',
        'miaw 3',
        'Paws & Claws',
        'Whisker Wonders',
        'Feline Fiesta',
        'Purrfection',
        'Kitten Chaos',
        'Meowgic Moments',
        'Cuddle Crew',
        'Fluffy Tails',
        'Cat Nap Central',
        'Zoomie Zone',
        'Purr Party',
        'Scratching Post',
    ]);

    const [newCategory, setNewCategory] = useState('');
    const [isNightMode, setIsNightMode] = useState(false);

    const handleCreateCategory = () => {
        if (newCategory.trim()) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        } else {
            alert('Please enter a valid category name.');
        }
    };

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
        document.body.classList.toggle('night-mode', !isNightMode);
    };

    return (
        <div className={`container ${isNightMode ? 'night-mode' : ''}`}>
            <h1>Category Management</h1>
            <div className="list-section">
                <h2>Current Categories</h2>
                <ul className="category-list">
                    {categories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
                <div className="new-item">
                    <h3>Create New Category</h3>
                    <input
                        type="text"
                        placeholder="New Category Name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={handleCreateCategory}>Create Category</button>
                </div>
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

export default CategoryManagement;
