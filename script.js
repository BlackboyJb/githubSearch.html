const APIURL = 'https://api.github.com/users/'

const formEL = document.getElementById('form')
const searchEL = document.getElementById('search')
const mainEL = document.getElementById('main')



async function getUser(username) {

    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('No User Found')
        }

    }

}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('problem fetching repos')
        }

    }
}



function createUserCard(user) {

    const cardHTML = `
    <div class="card">
    <div class="avatar">
        <img src="${user.avatar_url}" alt="">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repository</strong></li>
        </ul>
        <div id="repos">
           
        </div>
    </div>

</div>
    `
    mainEL.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEL = document.getElementById('repos')

    repos
        .slice(0, 10)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name


            reposEL.appendChild(repoEl)
        })
}



function createErrorCard(msg) {
    const cardHTML =
        `<div class='card'>
    <h1>${msg}</h1>
    
    </div>`
    mainEL.innerHTML = cardHTML
}

formEL.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = searchEL.value

    if (user) {
        getUser(user)

        searchEL.value = ''
    }
})