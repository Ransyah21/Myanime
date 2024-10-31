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