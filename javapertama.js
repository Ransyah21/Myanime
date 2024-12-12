const data = [
  "Seiken Gakuin no Makentsukai",
  "Nagasarete Airantou",
  "chiyu mahou no machigatta tsukaikata",
  "Chijou Saikyou no Yome",
  "Kouritsu Ebisugawa Koukou Tenmonbu",
  "ichigo 100%",
  "Otona no bouguya-san",
  "Shironeko Project: Zero Chronicle",
  "Sakura-sou no Pet na Kanojo",
  "Kusuriya no Hitorigoto",
  "Amagi Brilliant Park",
  "Midara na Ao-chan wa Benkyou ga Dekinai",
  "Asu no Yoichi!",
  "Bokura wa Minna Kawai-sou",
  "Busou Shoujo Machiavellianism",
  "Cheat Kusushi no Slow Life",
  "Danna ga Nani wo Itteiru ka Wakaranai Ken",
  "Denpa Onna to Seishun Otoko",
  "Kyuukyoku Shinka shita Full Dive RPG",
  "Full Metal Panic!",
  "Bokutachi no Remake",
  "Gamers!",
  "Aishen Qiaokeli-ing...",
  "ReLIFE",
  "Kotoura-san",
  "UQ Holder! Mahou Sensei Negima! 2",
  "Mahou Sensei Negima!",
  "Bucchigiri?!",
  "Seisen Cerberus: Ryuukoku no Fatalités",
  "Mairimashita! Iruma-kun",
];

// Ambil elemen-elemen yang diperlukan
const searchInput = document.getElementById("search-input");
const animeItems = document.querySelectorAll(".anime-item");

// Event listener untuk pencarian
searchInput.addEventListener("keyup", function (event) {
  const searchValue = searchInput.value.toLowerCase();
  console.log("Searching for:", searchValue); // Debugging

  // Perulangan untuk semua elemen <div> dalam .anime-item
  animeItems.forEach(function (item, index) {
    if (index < data.length) {
      const animeTitle = data[index].toLowerCase();
      if (animeTitle.includes(searchValue)) {
        item.style.display = "block"; // Tampilkan elemen
      } else {
        item.style.display = "none"; // Sembunyikan elemen
      }
    }
  });
});

// uji coba pagination

const totalPages = 440; // Total jumlah halaman
const visiblePages = 5; // Jumlah halaman yang terlihat
let currentPage = 1; // Halaman saat ini

function renderPagination(currentPage) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Kosongkan pagination

  // Hitung halaman yang akan ditampilkan
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  // Tombol "Previous"
  if (currentPage > 1) {
    const prevPage = document.createElement("a");
    prevPage.textContent = "«";
    prevPage.href = "#";
    prevPage.onclick = () => goToPage(currentPage - 1);
    pagination.appendChild(prevPage);
  }

  // Tampilkan halaman dari startPage sampai endPage
  for (let i = startPage; i <= endPage; i++) {
    const pageLink = document.createElement("a");
    pageLink.textContent = i;
    pageLink.href = "#";
    if (i === currentPage) {
      pageLink.classList.add("active");
    }
    pageLink.onclick = () => goToPage(i);
    pagination.appendChild(pageLink);
  }

  // Tombol "Next"
  if (currentPage < totalPages) {
    const nextPage = document.createElement("a");
    nextPage.textContent = "»";
    nextPage.href = "#";
    nextPage.onclick = () => goToPage(currentPage + 1);
    pagination.appendChild(nextPage);
  }
}

function goToPage(pageNumber) {
  currentPage = pageNumber;
  renderPagination(currentPage);
  // Logika untuk memuat halaman konten di sini
  console.log(`Loading content for page ${pageNumber}`);
}

// Inisialisasi pagination pertama kali
renderPagination(currentPage);

function ShowAlert(event) {
  event.preventDefault();
  alert("maaf Masih dalam on-going!!");
}

// Menyimpan posisi scroll sebelum keluar halaman
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("scrollPosition", window.scrollY);
});

// Mengembalikan posisi scroll saat halaman dimuat ulang
window.addEventListener("load", () => {
  const savedPosition = sessionStorage.getItem("scrollPosition");
  if (savedPosition) {
    window.scrollTo(0, parseInt(savedPosition, 10));
  }
});

document.querySelectorAll(".anime-item img").forEach((img) => {
  img.addEventListener("touchstart", () => {
    img.style.transform = "scale(1.4)";
  });

  img.addEventListener("touchend", () => {
    img.style.transform = "scale(1)";
  });
});

function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  // Kirim token ke backend (opsional) untuk validasi
}
const CLIENT_ID =
  "429779218315-46milavmlmmbb1b1v5p6v4mbh1o40uk6.apps.googleusercontent.com";
const REDIRECT_URI = "http://127.0.0.1:5500"; // Ganti ini dengan URL aplikasimu

// Event untuk login
document.getElementById("google-login-btn").addEventListener("click", (e) => {
  e.preventDefault();

  const oauth2Url =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${REDIRECT_URI}&` +
    `response_type=token&` +
    `scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;

  window.location.href = oauth2Url; // Arahkan ke halaman login Google
});

// Ambil access_token dari URL
const hash = window.location.hash;
const params = new URLSearchParams(hash.substring(1));
const accessToken = params.get("access_token");

if (accessToken) {
  getUserInfo(accessToken); // Ambil data pengguna
}

// Fungsi untuk mendapatkan informasi pengguna
function getUserInfo(accessToken) {
  fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User Info:", data);

      // Tampilkan data pengguna di halaman
      document.body.innerHTML = `
          <h1>Selamat Datang, ${data.name}</h1>
          <img src="${data.picture}" alt="Foto Profil" style="border-radius: 50%; width: 100px; justify-items: center;">
          <p>Email: ${data.email}</p>
        `;
    })
    .catch((error) => console.error("Error fetching user info:", error));
}
