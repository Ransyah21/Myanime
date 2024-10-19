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

