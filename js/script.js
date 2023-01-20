const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

let index = 1;


async function getData(URL) {
    const url = await  fetch(URL);
    const data = await url.json()
    renderMovies(data.results)
    moviePrevew(data.results)
}


getData(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${index}`)

let moveApp = document.querySelector(".movie-app")

function renderMovies(json) {
    let gridSystem = document.createElement("div")
    gridSystem.className = "row"
    moveApp.appendChild(gridSystem)
    for (let movie in json) {
        let col = document.createElement("div")
        col.className = "col-lg-4 col-md-6 col-sm-12 mt-4 main"
        gridSystem.appendChild(col)
        let moiveElement = document.createElement("div")
        moiveElement.className = `movie movie-${json[movie].title}`
        col.appendChild(moiveElement)
        let back = document.createElement("div")
        back.className = "back"
        col.appendChild(back)
        let img = document.createElement("img")
        img.src = `${IMG_PATH + json[movie].poster_path}`
        moiveElement.appendChild(img)
        let movieName = document.createElement("h5")
        movieName.innerHTML = `Movie Name: ${json[movie].title}`
        moiveElement.appendChild(movieName)
        let movieNameBack = document.createElement("h5")
        movieNameBack.innerHTML = `Movie Name: ${json[movie].title}`
        back.appendChild(movieNameBack)
        let descrition = document.createElement("p")
        descrition.innerHTML = `${json[movie].overview}`
        back.appendChild(descrition)
        let info = document.createElement("div")
        info.className = "Movie Information"
        back.appendChild(info)
        let lan = document.createElement("h4")
        lan.innerHTML = `language: ${json[movie].original_language}`
        info.appendChild(lan)
        let popularity= document.createElement("h4")
        popularity.innerHTML = `popularity: ${json[movie].popularity}`
        info.appendChild(popularity)
        let release_date= document.createElement("h4")
        release_date.innerHTML = `release_date: ${json[movie].release_date}`
        info.appendChild(release_date)
        let vote_average= document.createElement("h4")
        vote_average.innerHTML = `vote_average: ${json[movie].vote_average}`
        info.appendChild(vote_average)
        let vote_count= document.createElement("h4")
        vote_count.innerHTML = `vote_count: ${json[movie].vote_count}`
        info.appendChild(vote_count)
        let prevewBtn = document.createElement("button")
        prevewBtn.className = "prevew-btn"
        prevewBtn.innerHTML = "prevew"
        back.appendChild(prevewBtn)
    }
}


function moviePrevew(json) {
    let prevewBtn = document.querySelectorAll(".back .prevew-btn")
    prevewBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
            let condition = btn.previousSibling.previousSibling.previousSibling.innerHTML.slice(12)
            for (let movie in json) {
                if (json[movie].title === condition) {
                    console.log(json[movie])
                    let overly = document.createElement("div")
                    overly.className = "overly"
                    document.body.appendChild(overly)
                    let box = document.createElement("div")
                    box.className = "box"
                    overly.appendChild(box)
                    let img = document.createElement("img")
                    img.src = `${IMG_PATH + json[movie].poster_path}`
                    box.appendChild(img)
                    let info = document.createElement("div")
                    info.className = "info"
                    box.appendChild(info)
                    info.innerHTML = `
                    <h4 class="${json[movie].original_title}">${json[movie].original_title}</h4>
                    <p class="${json[movie].original_title}">${json[movie].overview}</p>
                    <div>
                    <h5>popularity: ${json[movie].popularity}</h5>
                    <h5>release_date: ${json[movie].release_date}</h5>
                    <h5>vote_average: ${json[movie].vote_average}</h5>
                    <h5>vote_count: ${json[movie].vote_count}</h5>
                    </div>
                    `
                    let closeButton = document.createElement("span")
                    closeButton.className = "close-button"
                    closeButton.innerHTML = "X"
                    overly.appendChild(closeButton)
                    document.addEventListener("click", function (e) {
                        if (e.target.className === "close-button" || e.target.className === "overly") {
                            overly.remove()
                        }
                    })
                }   
            }
        })
    })
}


document.forms[0].onsubmit = function (e) {
    e.preventDefault()
    let searchInput = document.querySelector("form input[type='search']").value
    renderSearchContainer(searchInput)
    try {
        renderSearch(searchInput)
    } catch(err) {
        return err
    }
}

function renderSearchContainer(value) {
    let searchInput = document.querySelector("form input[type='search']")
    let overly = document.createElement("div")
    overly.className = "overly-box "
    document.body.appendChild(overly)
    let searchArea = document.createElement("div")
    searchArea.className = "search-area container"
    overly.appendChild(searchArea)
    let heading = document.createElement("h4")
    heading.className = "heading"
    if (value.length === 0) {
        heading.innerHTML = `Movie_Name:Not Found`
    } else {
        heading.innerHTML = `Movie_Name: ${value.charAt(0).toUpperCase() + value.slice(1)}`
    }
    searchArea.prepend(heading)
    let movieArea = document.createElement("div")
    movieArea.className = "movie-area"
    searchArea.appendChild(movieArea)
    let closeButton = document.createElement("span")
    closeButton.className = "close-button"
    closeButton.innerHTML = "X"
    overly.appendChild(closeButton)
    document.addEventListener("click", function (e) {
        if (e.target.className === "close-button" || e.target.className === "overly-box") {
            overly.remove()
            searchInput.value = ""
        }
    })
}

async function renderSearch (movieName) {
    let url = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="${movieName}"`)
    let json = await url.json()
    if (json.results.length === 0) {
        throw Error("The Movies Is Not Found")
    } else {
        render(json.results)
    }
}

function render(json) {
    let movieArea = document.querySelector(".search-area .movie-area")
    let gridSystem = document.createElement("div")
    gridSystem.className = "row"
    movieArea.appendChild(gridSystem)
    for (let movie in json) {
        let col = document.createElement("div")
        col.className = "col-lg-4 col-md-6 col-sm-12 mt-4 main"
        gridSystem.appendChild(col)
        let moiveElement = document.createElement("div")
        moiveElement.className = `movie movie-${json[movie].title}`
        col.appendChild(moiveElement)
        let back = document.createElement("div")
        back.className = "back"
        col.appendChild(back)
        let img = document.createElement("img")
        img.src = `${IMG_PATH + json[movie].poster_path}`
        moiveElement.appendChild(img)
        let movieName = document.createElement("h5")
        movieName.innerHTML = `Movie Name: ${json[movie].title}`
        moiveElement.appendChild(movieName)
        let movieNameBack = document.createElement("h5")
        movieNameBack.innerHTML = `Movie Name: ${json[movie].title}`
        back.appendChild(movieNameBack)
        let descrition = document.createElement("p")
        descrition.innerHTML = `${json[movie].overview}`
        back.appendChild(descrition)
        let info = document.createElement("div")
        info.className = "Movie Information"
        back.appendChild(info)
        let lan = document.createElement("h4")
        lan.innerHTML = `language: ${json[movie].original_language}`
        info.appendChild(lan)
        let popularity= document.createElement("h4")
        popularity.innerHTML = `popularity: ${json[movie].popularity}`
        info.appendChild(popularity)
        let release_date= document.createElement("h4")
        release_date.innerHTML = `release_date: ${json[movie].release_date}`
        info.appendChild(release_date)
        let vote_average= document.createElement("h4")
        vote_average.innerHTML = `vote_average: ${json[movie].vote_average}`
        info.appendChild(vote_average)
        let vote_count= document.createElement("h4")
        vote_count.innerHTML = `vote_count: ${json[movie].vote_count}`
        info.appendChild(vote_count)
    }
}
