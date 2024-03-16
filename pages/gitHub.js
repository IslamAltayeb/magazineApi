'use strict';
const searchGit = document.getElementById('search-git-input');
const searchGitBtn = document.getElementById('git-submit');
const repoOutput = document.getElementById('git-output');

const gitHubBtn = document.getElementById('git-Hub')
const gitArea = document.getElementById('git-area')

const clientId = 'f30f7ae4b828dca370fc';
const clientSecret = '0b0c8cb22734dda71967f97cb53327d23768190d';

gitHubBtn.addEventListener('click', ()=>{
    gitArea.classList.remove('hidden-git')
    booksArea.classList.add('hidden-book')
    newsArea.classList.add('hidden-news')
})

let getRepo = () => {
    let searchWord = searchGit.value.trim();
    const accountUrl = `https://api.github.com/users/${searchWord}?client_id=${clientId}&client_secret=${clientSecret}&sort=created`;

    if (searchWord.length <= 0) {
        searchGitBtn.addEventListener('click', ()=>{
        repoOutput.innerHTML = `<h3 class='err'> Please Enter a GitHub user, for example IslamAltayeb</h3>`;
    })
    } else {
        fetch(accountUrl)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error('GitHub API request failed');
                }
            })
            .then(user => {
                if (user.name) {
                    getData(user);
                } else {
                    repoOutput.innerHTML = `<h3 class='err'>No results found!</h3>`;
                }
            })
            .catch(() => {           
                repoOutput.innerHTML = `<h3 class='err'>Something went wrong, check your connection!</h3>`;
            });
    }
};

function getData(user) {
    repoOutput.innerHTML = '';
    const { name, login, location, bio, avatar_url, repos_url, blog, public_repos, followers, following} = user;

    const repoInfo = document.createElement('div');
    repoInfo.classList.add('info');
    repoInfo.innerHTML = `
        <div>               
            <h2>Full Name: ${name ? name : 'Unknown'}</h2>
            <p><strong>Username:</strong> ${login ? login : 'Unknown'}</p>
            <p><strong>Location:</strong> ${location ? location : 'Unknown'}</p>
            <p><strong>Biography:</strong> ${bio ? bio : 'No Biography available'}</p>                 
            <p><strong>Blog: <a href=${blog} target=${blog}> ${blog ? blog : 'No Blog available'}</a></strong> </p>
            <p><strong>followers:</strong> ${followers ? followers : 'No followers available'}</p> 
            <p><strong>following:</strong> ${following ? following : 'No following available'}</p> 
            <p><strong>public repos:</strong> ${public_repos ? public_repos : 'No repos available'}</p>              
            <p><strong>Check for all repos: <a href= "https://github.com/${name}?tab=repositories" target=https://github.com/${name}?tab=repositories> ${repos_url ? 'All Repos' : 'No repos available'}</a></strong></p>                         
        </div>
        <img class="cover" src="${avatar_url ? avatar_url : 'No image available'}">
    `;

    repoOutput.appendChild(repoInfo);
}

searchGitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getRepo();
});

searchGit.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getRepo();
    }
});

