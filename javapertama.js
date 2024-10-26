const data = [
    'Seiken Gakuin no Makentsukai',
    'Nagasarete Airantou',
    'chiyu mahou no machigatta tsukaikata',
    'Chijou Saikyou no Yome',
    'Kouritsu Ebisugawa Koukou Tenmonbu',
    'ichigo 100%',
    'Otona no bouguya-san',
    'Shironeko Project: Zero Chronicle',
    'Sakura-sou no Pet na Kanojo',
    'Kusuriya no Hitorigoto',
    'Amagi Brilliant Park',
    'Midara na Ao-chan wa Benkyou ga Dekinai',
    'Asu no Yoichi!',
    'Bokura wa Minna Kawai-sou',
    'Busou Shoujo Machiavellianism',
    'Cheat Kusushi no Slow Life',
    'Danna ga Nani wo Itteiru ka Wakaranai Ken',
    'Denpa Onna to Seishun Otoko',
    'Kyuukyoku Shinka shita Full Dive RPG',
    'Full Metal Panic!',
];

// Ambil elemen-elemen yang diperlukan
const searchInput = document.getElementById('search-input');
const animeItems = document.querySelectorAll('.anime-item');

// Event listener untuk pencarian
searchInput.addEventListener('keyup', function(event) {
    const searchValue = searchInput.value.toLowerCase();
    console.log('Searching for:', searchValue); // Debugging

    // Perulangan untuk semua elemen <div> dalam .anime-item
    animeItems.forEach(function(item, index) {
        if (index < data.length) {
            const animeTitle = data[index].toLowerCase();
            if (animeTitle.includes(searchValue)) {
                item.style.display = 'block'; // Tampilkan elemen
            } else {
                item.style.display = 'none'; // Sembunyikan elemen
            }
        }
    });
});

// uji coba pagination

    const totalPages = 440; // Total jumlah halaman
    const visiblePages = 5; // Jumlah halaman yang terlihat
    let currentPage = 1; // Halaman saat ini

    function renderPagination(currentPage) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = ''; // Kosongkan pagination

        // Hitung halaman yang akan ditampilkan
        const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        const endPage = Math.min(totalPages, startPage + visiblePages - 1);

        // Tombol "Previous"
        if (currentPage > 1) {
            const prevPage = document.createElement('a');
            prevPage.textContent = '«';
            prevPage.href = '#';
            prevPage.onclick = () => goToPage(currentPage - 1);
            pagination.appendChild(prevPage);
        }

        // Tampilkan halaman dari startPage sampai endPage
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.textContent = i;
            pageLink.href = '#';
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLink.onclick = () => goToPage(i);
            pagination.appendChild(pageLink);
        }

        // Tombol "Next"
        if (currentPage < totalPages) {
            const nextPage = document.createElement('a');
            nextPage.textContent = '»';
            nextPage.href = '#';
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
        alert("maaf Masih dalam pengerjaan!!");
       
    }


function showLoading(event, url) {
    event.preventDefault(); // Mencegah link untuk membuka halaman
    document.getElementById('loading').style.display = 'block'; // Tampilkan elemen loading
    document.getElementById('content').classList.add('blur');

    // Simulasi loading (misalnya 0.75 detik) sebelum mengalihkan ke halaman baru
    setTimeout(function() {
        window.location.href = url; // Arahkan ke URL yang diinginkan
    }, 750); // Ganti 750 dengan waktu loading yang diinginkan dalam milidetik
}

// Simpan posisi scroll saat pengguna meninggalkan halaman
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

// Ambil posisi scroll yang disimpan saat halaman dimuat
window.addEventListener('load', function() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition'); // Hapus posisi scroll setelah digunakan
    }
    document.getElementById('loading').style.display = 'none'; // Sembunyikan elemen loading ketika halaman dimuat
});

// Fungsi untuk pergi ke halaman lain
function goToAnotherPage() {
    // Simulasi pergi ke halaman lain
    alert('Anda akan pergi ke halaman lain. Ketika kembali, posisi scroll akan disimpan.');
    // Di sini, kamu bisa mengganti dengan window.location.href = 'halaman-lain.html';
}