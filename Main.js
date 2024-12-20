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