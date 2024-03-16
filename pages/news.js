'use strict';
const searchNews = document.getElementById('search-news-input');
const searchNewsBtn = document.getElementById('news-submit');
const newsOutput = document.getElementById('news-output');

const newsBtn = document.getElementById('news-link')
const newsArea = document.getElementById('news-area')

let apiKey = 'fac2543d23a441c5a681e690d1f10bd5';

newsBtn.addEventListener('click', ()=>{
    newsArea.classList.remove('hidden-news')
    booksArea.classList.add('hidden-book')
    gitArea.classList.add('hidden-git')
})

let getNews = () => {
    let searchNewsWord = searchNews.value.trim();
    const url = `https://newsapi.org/v2/everything?q=${searchNewsWord}&apiKey=${apiKey}`;

    if (searchNewsWord.length <= 0) {
        newsOutput.innerHTML = `<h3 class='err'> Please search for news</h3>`; 
    } else {

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.articles && data.articles.length > 0) {
                    getNewsData(data.articles.slice(0, 7));
                } else {
                    newsOutput.innerHTML = `<h3 class='err'>No results found!</h3>`;
                }
            })
            .catch(() => {
                newsOutput.innerHTML = `<h3 class='err'>Something went wrong, check your connection!</h3>`;
            });
    }
};

function getNewsData(data) {
    newsOutput.innerHTML = '';

    data.forEach((news) => {
        const photo = news.urlToImage || "";
        const { title, source, author, description, url, publishedAt, content } = news;

        const newsInfo = document.createElement('div');
        newsInfo.classList.add('info');
        newsInfo.innerHTML = `
            <div>
                <h2>${source.name ? source.name : 'Unknown'}</h2>
                <p><strong>Author(s):</strong> ${author ? author : 'Unknown'}</p>
                <p><strong>Title:</strong> ${title ? title : 'Unknown'}</p>
                <p><strong>Published Date:</strong> ${publishedAt ? publishedAt : 'Unknown'}</p>
                <p><strong>Description:</strong> ${description ? description.slice(0, 120) : 'No description available'}</p>
                <p><strong>content:</strong> ${content ? content : 'No content available'}</p>
                <strong><a href="${url ? url : 'No URL available'}" target="_blank">Read Now...</a></strong>
            </div>
            <img class="cover" src="${photo ? photo : 'No image available'}">
        `;

        newsOutput.appendChild(newsInfo);
    });
}

searchNewsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getNews();
});

searchNews.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getNews();
    }
});

