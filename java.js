const searchInput = document.getElementById('search-input');
const suggestionsContainer = document.getElementById('suggestions');

const data = [
    'Seiken Gakuin no Makentsukai',
    'Banana',
    'Cherry',
    'Date',
    'Grape',
    'Kiwi',
    'Mango',
    'Orange',
    'Pineapple',
    'Strawberry'
];

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsContainer.innerHTML = '';
    
    if (query) {
        const filteredData = data.filter(item => item.toLowerCase().includes(query));
        
        if (filteredData.length > 0) {
            suggestionsContainer.style.display = 'block';
            filteredData.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.textContent = item;
                suggestionItem.addEventListener('click', () => {
                    // Arahkan ke halaman hasil pencarian
                    window.location.href = `search.html?q=${encodeURIComponent(item)}`;
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
        } else {
            suggestionsContainer.style.display = 'none';
        }
    } else {
        suggestionsContainer.style.display = 'none';
    }
});

// Menangani Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value;
        if (query) {
            // Arahkan ke halaman hasil pencarian
            window.location.href = `HTML.html?q=${encodeURIComponent(query)}`;
        }
    }
});