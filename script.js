document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});

function fetchNews() {
    const apiKey = '83532c9c3835483d88552015860da8e1'; // ニュースAPIのAPIキーをここに挿入
    const url = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => console.error('ニュースの取得に失敗しました:', error));
}

function displayNews(articles) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description || '説明なし';

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = '続きを読む';
        link.target = '_blank';

        newsItem.appendChild(title);
        newsItem.appendChild(description);
        newsItem.appendChild(link);

        newsList.appendChild(newsItem);
    });
}

function searchNews() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const newsItems = document.querySelectorAll('.news-item');

    newsItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
