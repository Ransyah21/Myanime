// 🟢 Toggle search input biar bisa muncul/ilang
function toggleSearch() {
    document.querySelector(".search-container").classList.toggle("active");
}

// 🔍 Pencarian Anime
document.getElementById("search-box").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchAnime();
    }
});

function searchAnime() {
    let searchQuery = document.getElementById("search-box").value;
    let url = `https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayAnime(data.data);
        })
        .catch(error => console.log("Error:", error));
}

// 🎭 Ambil Anime Berdasarkan Genre (Tampilkan lebih banyak!)
function getAnimeByGenre(genreId, page = 1) {
    let url = `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}&limit=25`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.data.length > 0) {
                displayAnime(data.data, genreId, page);
            } else {
                alert("Anime untuk genre ini gak banyak cuy! 🥲");
            }
        })
        .catch(error => console.log("Error:", error));
}


// 🔄 Tampilkan Anime & Pagination
function displayAnime(animeList, genreId, page) {
    let animeListDiv = document.getElementById("anime-list");
    animeListDiv.innerHTML = ""; // Bersihin tampilan lama

    animeList.forEach(anime => {
        let animeItem = document.createElement("div");
        animeItem.classList.add("anime-item");

        animeItem.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <button onclick="opennonton('${anime.trailer.url}')">Nonton</button>
            <button onclick="openModal()">Download</button>
        `;

        animeListDiv.appendChild(animeItem);
    });

    // Tambahin tombol Next Page
    let paginationDiv = document.createElement("div");
    paginationDiv.classList.add("pagination");

    paginationDiv.innerHTML = `
        <button onclick="getAnimeByGenre(${genreId}, ${page + 1})">Next Page</button>
    `;

    animeListDiv.appendChild(paginationDiv);
}


// 📌 Tampilkan Anime di HTML
function displayAnime(animeList) {
    let animeListDiv = document.getElementById("anime-list");
    animeListDiv.innerHTML = ""; // Hapus data lama

    animeList.forEach(anime => {
        let animeItem = document.createElement("div");
        animeItem.classList.add("anime-item");

        animeItem.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
        `;

        animeListDiv.appendChild(animeItem);
    });
}
