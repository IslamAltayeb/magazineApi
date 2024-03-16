'use strict';
const search = document.getElementById('search-book-input')
const searchBtn = document.getElementById('submit')
const output = document.getElementById('output')
const book = document.getElementById('book')
const booksArea = document.getElementById('books-area')

let key = 'AIzaSyCzK4xsLEdS-bbCshmI_kdo9AFcgnm1-1Y'

book.addEventListener('click', ()=>{
    booksArea.classList.remove('hidden-book')
    gitArea.classList.add('hidden-git')
    newsArea.classList.add('hidden-news')
})

let getBook = () => {
    let bookName = search.value.trim();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&apikey=${key}`;

  if (bookName.length <= 0) {      
      output.innerHTML = `<h3 class='err'> Please Enter A Book Name</h3>`; 
  }else{

    fetch(url)
    .then(res => res.json())
    .then(data => {        
        if (data.items && data.items.length > 0) {
            getBookData(data.items);
        }else{
            output.innerHTML = `<h3 class='err'>No results found!</h3>`;
        }
    })
    .catch(()=>{
        output.innerHTML = `<h3 class='err'>Something went wrong, check your connection!</h3>`
    })
  }
}

function getBookData(data) {    
    output.innerHTML = '';
    data.forEach((book) => {
        const cover = book.volumeInfo.imageLinks?.thumbnail || "";
        const { title, authors, publisher, publishedDate, description, language, pageCount, previewLink } = book.volumeInfo;

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('info');
        bookInfo.innerHTML = `
            <div>
                <h2>${title ? title : 'Unknown'}</h2>
                <p><strong>Authors:</strong> ${authors ? authors.join(', ') : 'Unknown'}</p>
                <p><strong>Publisher:</strong> ${publisher ? publisher : 'Unknown'}</p>
                <p><strong>Published Date:</strong> ${publishedDate ? publishedDate : 'Unknown'}</p>
                <p><strong>Language:</strong> ${language ? language : 'No language available'}</p>
                <p><strong>Page Count:</strong> ${pageCount ? pageCount : 'No pageCount available'}</p>
                <p><strong>Description:</strong> ${description ? description.slice(0, 120) : 'No description available'}</p>
                <strong><a href="${previewLink ? previewLink : 'No previewLink available'}" target="_blank">Read Now...</a> </strong>
            </div>
            <img class="cover" src="${cover ? cover : 'No image available'}">
        `;

        output.appendChild(bookInfo);
    });
}


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    getBook();
});

search.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getBook();
    }
});
