function goToEpisode(id) {
  const iframe = document.querySelector("iframe");
  iframe.src = `https://drive.google.com/file/d/${id}/preview`;
}

const driveVideos = document.querySelectorAll(".video");

driveVideos.forEach((iframe) => {
  iframe.addEventListener("load", function () {
    const driveVideoWindow = iframe.contentWindow;
    driveVideoWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
  });
});

//untuk pemangilan nonton
function opennonton() {
  document.getElementById("mynonton").style.display = "block";
}

function closenonton() {
  document.getElementById("mynonton").style.display = "none";
}

function chooseLink(link) {
  window.open(link, "_blank");
  closeModal();
}

// untuk pemangilan download
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function chooseLink(link) {
  window.open(link, "_blank");
  closeModal();
}

//Loading nya

// Ambil elemen loader
const loader = document.getElementById("loader");

// Fungsi untuk menampilkan loader
function showLoader(duration, callback) {
  loader.style.display = "block"; // Tampilkan loader
  setTimeout(() => {
    loader.style.display = "none"; // Sembunyikan loader setelah waktu tertentu
    if (callback) callback(); // Jalankan callback jika ada
  }, duration); // Durasi loading dalam milidetik
}

// Fungsi opennonton
function opennonton() {
  showLoader(1000, () => {
    // Tambahkan logika tambahan untuk "nonton" di sini
    const modal = document.getElementById("mynonton");
    modal.style.display = "block";
  });
}

// Fungsi openModal
function openModal() {
  showLoader(1000, () => {
    // Tambahkan logika tambahan untuk "download" di sini
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
  });
}

function toggleReadMore() {
  const dots = document.getElementById("dots");
  const moreText = document.getElementById("more");
  const btnText = document.getElementById("readMoreBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read More";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read Less";
    moreText.style.display = "inline";
  }
}

let comments = [];

function submitComment() {
  const commentInput = document.getElementById("commentInput");
  const commentText = commentInput.value;

  if (commentText) {
    const comment = {
      text: commentText,
      user: "rizky", // Ganti dengan nama pengguna yang sesuai
      timestamp: new Date().toLocaleString(),
    };
    comments.push(comment);
    displayComments();
    commentInput.value = ""; // Kosongkan input setelah mengirim
  }
}

function displayComments() {
  const commentsDiv = document.getElementById("comments");
  commentsDiv.innerHTML = ""; // Kosongkan div sebelum menampilkan komentar

  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.innerHTML = `<strong>${comment.user}</strong>: ${comment.text} <em>${comment.timestamp}</em>`;
    commentsDiv.appendChild(commentElement);
  });
}

let watchedEpisodes = []; // Simpan episode yang sudah ditonton

function goToEpisode(id) {
  const iframe = document.querySelector("iframe");
  iframe.src = `https://drive.google.com/file/d/${id}/preview`;

  // Simpan episode yang sudah ditonton
  if (!watchedEpisodes.includes(id)) {
    watchedEpisodes.push(id);
  }

  // Tampilkan komentar jika sudah menonton episode 1 atau 2
  if (
    watchedEpisodes.includes("15gJC6dKsu4Hy-s8P06qllkuew9SvEy2e") ||
    watchedEpisodes.includes("15tit1W_DPXJoNCc7qTcyPw6-sW1nVFco")
  ) {
    document.getElementById("commentSection").style.display = "block";
  }
}
