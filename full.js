document.addEventListener("DOMContentLoaded", function () {
  fetchDefaultAnime();

  // Tambahkan event listener untuk keypress
  document
    .getElementById("search-box")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        searchAnime(); // Panggil fungsi pencarian ketika Enter ditekan
      }
    });
});

// 🟢 Toggle search input biar bisa muncul/ilang
function toggleSearch() {
  document.querySelector(".search-container").classList.toggle("active");
}

// 🔍 Pencarian Anime (Tanpa Loop untuk Menghindari Duplikasi)
function searchAnime() {
  let searchQuery = document.getElementById("search-box").value;
  let url = `https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=175`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let allAnime = data.data || [];
      console.log("Fetched Anime Data:", allAnime); // Log data anime yang diterima
      displayAnime(allAnime);
    })
    .catch((error) => console.log("Error:", error));
}

// 🎭 Ambil Anime Berdasarkan Genre (FIXED: 50 Anime/Page + Pagination)
function getAnimeByGenre(genreId, page = 1) {
  let url = `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}&limit=50`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.data && data.data.length > 0) {
        displayAnime(data.data, () => getAnimeByGenre(genreId, page + 1));
      } else {
        alert("Masi belum di tambah kan !");
      }
    })
    .catch((error) => console.log("Error:", error));
}

// 🔄 Fetch Anime Default (Menampilkan lebih banyak halaman & musim sebelumnya)
function fetchDefaultAnime(page = 1, season = "now") {
  let urls = [];

  for (let i = page; i < page + 10; i++) {
    urls.push(`https://api.jikan.moe/v4/seasons/${season}?page=${i}&limit=25`);
  }

  Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
    .then((results) => {
      let allAnime = results.flatMap((result) => result.data || []);
      displayAnime(allAnime, () =>
        fetchDefaultAnime(page + 10, season === "now" ? "previous" : season)
      ); // Pindah ke musim sebelumnya setelah habis
    })
    .catch((error) => console.log("Error:", error));
}

// 📌 Tampilkan Anime di HTML (Tanpa Duplikasi)
function displayAnime(animeList, nextPageFunction = null) {
  let animeListDiv = document.getElementById("anime-list");
  animeListDiv.innerHTML = "";

  // Gunakan Set untuk menghindari duplikasi
  let uniqueAnime = new Map();
  animeList.forEach((anime) => {
    if (!uniqueAnime.has(anime.mal_id)) {
      uniqueAnime.set(anime.mal_id, anime);
    }
  });

  uniqueAnime.forEach((anime) => {
    let animeItem = document.createElement("div");
    animeItem.classList.add("anime-item");

    animeItem.innerHTML = `
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
          <h3>${anime.title}</h3>
      `;

    animeListDiv.appendChild(animeItem);
  });

  if (nextPageFunction) {
    let loadMoreButton = document.createElement("button");
    loadMoreButton.innerText = "Load More";
    loadMoreButton.addEventListener("click", nextPageFunction);
    animeListDiv.appendChild(loadMoreButton);
  }
}
