document.getElementById('shareForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    const videoId = extractVideoId(youtubeUrl);
    
    if (videoId) {
        const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
        addVideoToDOM(videoEmbedUrl);
        saveVideo(videoEmbedUrl);
        document.getElementById('youtubeUrl').value = ''; // フォームをリセット
    } else {
        alert('有効なYouTubeのURLを入力してください');
    }
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function addVideoToDOM(videoUrl) {
    const videosContainer = document.getElementById('videosContainer');
    const videoElement = document.createElement('div');
    videoElement.classList.add('video');
    
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    videoElement.appendChild(iframe);
    videosContainer.appendChild(videoElement);
}

function saveVideo(videoUrl) {
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.push(videoUrl);
    localStorage.setItem('videos', JSON.stringify(videos));
}

function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.forEach(videoUrl => addVideoToDOM(videoUrl));
}

document.addEventListener('DOMContentLoaded', function() {
    loadVideos();
});
