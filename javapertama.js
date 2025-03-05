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
  
  const menu = document.getElementById("menu");
  if (!menu) {
      console.error("Elemen menu tidak ditemukan!");
      return;
  }

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

      menu.innerHTML = `
          <li><a href="About.html">About</a></li>
          <li>
              <a href="#" id="logout-btn" style="display: flex; align-items: center; text-decoration: none;">
                  <div style="width: 30px; height: 30px; background: white; border-radius: 50%; border: 2px solid orange; display: flex; justify-content: center; align-items: center;">
                      <img src="${userInfo.picture}" alt="Foto Profil" style="border-radius: 50%; width: 30px; height: 30px;">
                  </div>
                  <div style="margin-left: 10px;">
                      <span>${userInfo.name}</span>
                      <p style="font-size: 12px; color: red; cursor: pointer;" onclick="handleLogout()">Klik untuk Log Out</p>
                  </div>
              </a>
          </li>
          <li><a href="Full.html">FindNime</a></li>
      `;
  } else {
      menu.innerHTML = `<li><a id="google-login-btn" href="#">Login</a></li>
      <li><a href="Full.html">FindNime</a></li>`;
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
      history.replaceState(null, "", window.location.pathname);
  }
}

// Jalankan saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
  extractAccessToken();
  updateMenu();
});
