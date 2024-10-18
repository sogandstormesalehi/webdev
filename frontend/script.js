document.addEventListener("DOMContentLoaded", () => {
    const nightModeCheckbox = document.getElementById('night-mode-toggle');
    if (localStorage.getItem('nightMode') === 'true') {
        nightModeCheckbox.checked = true;
        enableNightMode();
    }
    nightModeCheckbox.addEventListener('change', toggleNightMode);
    const players = ["Player A", "Player B", "Player C", "Player D", "Player E", "Player F"];
    players.forEach(player => {
        const isFollowing = localStorage.getItem(player) === 'true';
        updateFollowButton(player, isFollowing);
    });
    document.querySelectorAll('.follow-button').forEach(button => {
        button.addEventListener('click', () => {
            const playerName = button.dataset.player;
            const isFollowing = localStorage.getItem(playerName) === 'true';
            
            localStorage.setItem(playerName, isFollowing ? 'false' : 'true');
            updateFollowButton(playerName, !isFollowing);
        });
    });
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'player.html';
        });
    }
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'designer.html';
        });
    }
    const categorySelect = document.getElementById('category-select');
    const queryCards = Array.from(document.querySelectorAll('.query-card'));
    const randomQueryBtn = document.getElementById('random-query-btn');
    const filterQueries = (category) => {
        queryCards.forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
    };
    categorySelect.addEventListener('change', () => {
        filterQueries(categorySelect.value);
    });

    const showRandomQuery = () => {
        const category = categorySelect.value;
        const visibleCards = queryCards.filter(card => category === 'all' || card.dataset.category === category);
        queryCards.forEach(card => card.style.display = 'none');
        if (visibleCards.length) {
            const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
            randomCard.style.display = 'block';
        }
    };

    randomQueryBtn.addEventListener('click', showRandomQuery);
});

const toggleNightMode = () => {
    document.body.classList.toggle('night-mode');
    localStorage.setItem('nightMode', document.body.classList.contains('night-mode'));
};

const enableNightMode = () => {
    document.body.classList.add('night-mode');
};

const updateFollowButton = (playerName, isFollowing) => {
    const button = document.querySelector(`button[data-player="${playerName}"]`);
    if (button) {
        button.textContent = isFollowing ? 'Unfollow' : 'Follow';
        button.classList.toggle('follow', !isFollowing);
        button.classList.toggle('unfollow', isFollowing);
    }
};
