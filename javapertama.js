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
const REDIRECT_URI = "https://ransyah21.github.io/Myanime/"; // Ganti ini dengan URL aplikasimu
// Cek login state
const hash = window.location.hash;
const params = new URLSearchParams(hash.substring(1));
const accessToken =
  params.get("access_token") || localStorage.getItem("access_token");

if (accessToken) {
  localStorage.setItem("access_token", accessToken);
  getUserInfo(accessToken);
} else {
  updateMenu(false);
}

// Ambil informasi pengguna
function getUserInfo(accessToken) {
  fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((userInfo) => {
      console.log("User Info:", userInfo);
      updateMenu(true, userInfo);
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
      updateMenu(false);
    });
}

// Update menu navigasi
function updateMenu(isLoggedIn, userInfo) {
  const menu = document.querySelector("ul");

  if (isLoggedIn) {
    menu.innerHTML = `
          <li><a href="#" style="display: flex; align-items: center; text-decoration: none;">
      <img src="${userInfo.picture}" alt="Foto Profil" style="border-radius: 50%; width: 30px; height: 30px; margin-right: 8px;">
      <div style="overflow: hidden; white-space: nowrap; width: 125px;">
        <span class="animated-text">
          Selamat Datang Di Myanime (${userInfo.name})
        </span>
      </div>
    </a></li>
          <li><a href="#" id="logout-btn">Logout</a></li>
          <li><a href="About.html">About</a></li>
        `;

    // Tambahkan event listener untuk logout
    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("favorites"); // Hapus data favorit
      window.location.reload();
    });
  }
}

// Tambahkan event listener untuk login
document.body.addEventListener("click", (e) => {
  if (e.target.id === "google-login-btn") {
    const oauth2Url =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${REDIRECT_URI}&` +
      `response_type=token&` +
      `scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;
    window.location.href = oauth2Url;
  }
});

