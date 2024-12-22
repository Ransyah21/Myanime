function goToEpisode(id) {
    const iframe = document.querySelector('iframe');
    iframe.src = `https://drive.google.com/file/d/${id}/preview`;
  }

  const driveVideos = document.querySelectorAll('.video');
    
  driveVideos.forEach((iframe) => {
      iframe.addEventListener('load', function() {
          const driveVideoWindow = iframe.contentWindow;
          driveVideoWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
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
        window.open(link, '_blank');
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
        window.open(link, '_blank');
        closeModal();
    }

//Loading nya

// Ambil elemen loader
const loader = document.getElementById('loader');

// Fungsi untuk menampilkan loader
function showLoader(duration, callback) {
  loader.style.display = 'block'; // Tampilkan loader
  setTimeout(() => {
    loader.style.display = 'none'; // Sembunyikan loader setelah waktu tertentu
    if (callback) callback(); // Jalankan callback jika ada
  }, duration); // Durasi loading dalam milidetik
}

// Fungsi opennonton
function opennonton() {
  showLoader(1500, () => {
    // Tambahkan logika tambahan untuk "nonton" di sini
    const modal = document.getElementById('mynonton');
    modal.style.display = 'block';
  });
}

// Fungsi openModal
function openModal() {
  showLoader(1500, () => {
    // Tambahkan logika tambahan untuk "download" di sini
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  });
}
