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
  // Hapus access_token dari URL
  history.replaceState(null, "", window.location.pathname);
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
          <li>
      <a href="#" style="display: flex; align-items: center; text-decoration: none;">
        <div style="position: relative; display: inline-block;">
          <div class="fire-effect"></div>
          <div class="fire-effect"></div>
          <div class="fire-effect"></div>
          <div style="width: 30px; height: 30px; background: white; border-radius: 50%; border: 5px solid orange; display: flex; justify-content: center; align-items: center;">
            <img src="${userInfo.picture}" alt="Foto Profil" style="border-radius: 50%; width: 30px; height: 30px; position: relative; z-index: 1;">
          </div>
        </div>
        <div style="overflow: hidden; white-space: nowrap; width: 125px;">
          <span class="animated-text">
            Selamat Datang Di Myanime (${userInfo.name})
          </span>
        </div>
      </a>
    </li>
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

if (window.location.pathname.endsWith("index.html")) {
  window.history.replaceState(
    null,
    "",
    window.location.pathname.replace("index.html", "")
  );
}

// Uji coba

function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert("Browser ini tidak mendukung notifikasi.");
  } else if (Notification.permission === "granted") {
    alert("Izin notifikasi sudah diberikan.");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        alert("Izin notifikasi diberikan!");
      }
    });
  }
}

// Fungsi untuk mengirimkan notifikasi
function sendNotification() {
  if (Notification.permission === "granted") {
    new Notification("Anime Update", {
      body: "Anime Uq holder baru COY",
      icon: "Gambar\nime-removebg-preview.png", // URL ikon (opsional)
    });
  } else {
    alert("Silakan izinkan notifikasi terlebih dahulu.");
  }
}

// Meminta izin saat pertama kali
document.addEventListener("DOMContentLoaded", requestNotificationPermission);

// Menangani klik tombol
document
  .getElementById("notifyBtn")
  .addEventListener("click", sendNotification);

Notification.requestPermission();

new Notification("Anime Uq holder baru COY", {
  body: "Update",
  icon: "Gambar\nime-removebg-preview.png",
});
