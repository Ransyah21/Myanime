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
  "Kimi wa Meido-sama.",
  "Dokyuu Hentai HxEros",
  "Toaru Ossan no VRMMO Katsudouki",
  "Jashin-chan Dropkick",
  "Rewrite",
  "Ladies versus Butlers!",
  "coba",
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

document.addEventListener("DOMContentLoaded", async function () {
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.querySelector("main"); // Elemen tempat menampilkan hasil

  if (searchInput) {
    const data = await fetchData(); // Ambil data dari Database.html
    console.log("Data fetched:", data);

    // Event listener untuk pencarian
    searchInput.addEventListener("keyup", function () {
      const searchValue = searchInput.value.toLowerCase();

      // Filter data berdasarkan pencarian
      const results = data.filter((item) =>
        item.toLowerCase().includes(searchValue)
      );

      // Tampilkan hasil pencarian
      resultsContainer.innerHTML = results
        .map(
          (anime) =>
            `<div class="anime-item">
               <span>${anime}</span>
             </div>`
        )
        .join("");
    });
  }
});

function ShowAlert(event) {
  event.preventDefault();
  alert("maaf Masih dalam perbaikan!!");
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
const REDIRECT_URI = "https://ransyah21.github.io/Myanime/";
const menu = document.getElementById("menu");

// Fungsi untuk login dengan Google
function handleLogin() {
  const oauth2Url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;
  window.location.href = oauth2Url;
}

// Fungsi untuk logout
function handleLogout() {
  localStorage.removeItem("access_token");
  window.location.reload();
}

// Fungsi untuk mendapatkan informasi pengguna
async function getUserInfo(accessToken) {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch user info");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

// Fungsi untuk memperbarui menu
async function updateMenu() {
  console.log("Update menu dipanggil");
  console.log(localStorage.getItem("access_token"));

  const menu = document.getElementById("menu"); // Ganti dengan ID yang sesuai
  if (!menu) {
    console.error("Elemen menu tidak ditemukan!");
    return;
  }

  // Hapus menu sebelumnya
  menu.innerHTML = "";

  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    const userInfo = await getUserInfo(accessToken);
    if (!userInfo || !userInfo.picture) {
      console.error("Gagal mengambil info pengguna");
      localStorage.removeItem("access_token");
      window.location.reload();
      return;
    }

    // Tambahkan menu untuk pengguna yang sudah login
    menu.innerHTML = `
      <li><a href="About.html">About</a></li>
      <li>
        <a href="#" id="logout-btn" style="display: flex; align-items: center; text-decoration: none;">
          <div style="width: 30px; height: 30px; background: white; border-radius: 50%; border: 2px solid orange; display: flex; justify-content: center; align-items: center;">
            <img src="${userInfo.picture}" alt="Foto Profil" style="border-radius: 50%; width: 30px; height: 30px;">
          </div>
          <div style="margin-left: 10px;">
            <span>${userInfo.name}</span>
          </div>
        </a>
      </li>
      <li><a href="#" id="logout-btn-2">Logout</a></li>
    `;

    // Tambahkan event listener ke kedua tombol logout
    document.querySelectorAll("#logout-btn, #logout-btn-2").forEach((btn) => {
      btn.addEventListener("click", handleLogout);
    });
  } else {
    // Tambahkan menu untuk pengguna yang belum login
    menu.innerHTML = `<li><a id="google-login-btn" href="#">Login</a></li>`;
    document
      .getElementById("google-login-btn")
      .addEventListener("click", handleLogin);
  }
}

// Ambil access token dari URL
function extractAccessToken() {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get("access_token");
  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
    history.replaceState(null, "", window.location.pathname); // Hapus access token dari URL
  }
}

// Jalankan saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
  extractAccessToken();
  updateMenu();
});

// Uji coba
