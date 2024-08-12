document.addEventListener('DOMContentLoaded', function () {
    const saveUrlButton = document.getElementById('saveUrlButton');
    const youtubeUrlInput = document.getElementById('youtubeUrl');
    const videoContainer = document.getElementById('videoContainer');

    // ローカルストレージからURLリストを取得して表示
    const savedUrls = JSON.parse(localStorage.getItem('youtubeUrls')) || [];
    displayVideos(savedUrls);

    // ボタンがクリックされたときにURLを保存
    saveUrlButton.addEventListener('click', function () {
        const url = youtubeUrlInput.value;
        if (url) {
            savedUrls.push(url);
            localStorage.setItem('youtubeUrls', JSON.stringify(savedUrls));
            displayVideos(savedUrls);
            youtubeUrlInput.value = ''; // 入力欄をクリア
        } else {
            alert('URLを入力してください');
        }
    });

    // 複数の動画を表示する関数
    function displayVideos(urls) {
        videoContainer.innerHTML = ''; // コンテナをクリア
        urls.forEach(url => {
            const videoId = extractVideoId(url);
            if (videoId) {
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.width = "560";
                iframe.height = "315";
                iframe.frameborder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                videoContainer.appendChild(iframe);
            }
        });
    }

    // YouTubeのURLから動画IDを抽出する関数
    function extractVideoId(url) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
    }
});

