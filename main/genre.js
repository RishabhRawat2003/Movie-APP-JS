const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');
const Api_Key = 'API_KEY'

async function moviesGenreLists() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    const data = await response.json()
    return data
}

async function seriesGenreLists() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options)
    const data = await response.json()
    return data
}

async function moviesByGenre(genreId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options)
    const data = await response.json()
    return data
}

async function seriesByGenre(genreId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options)
    const data = await response.json()
    return data
}

const seriesGenre = seriesGenreLists()
const movieGenre = moviesGenreLists()

//Header Functionality starts

const sideBarIcon = document.querySelector('.sidebarIcon')
const dropDown = document.querySelector('.dropDownSidebar')
const userNameFirstLetter = document.querySelectorAll('.firstLetter')
const userName = document.querySelectorAll('.userName')
const editProfile = document.querySelectorAll('.editProfile')
const loginLogout = document.querySelectorAll('.loginLogout')
const userNameIcon = document.querySelector('.userNameIcon') //for big devices
const sidebarUser = document.querySelector('.userSidebar') //for big devices


//username First later functionality starts
userNameFirstLetter.forEach((items) => {
    items.innerHTML = paramValue.slice(0, 1).toUpperCase()
})
//username First later functionality ends

//sidebar icon click functionality starts
sideBarIcon.addEventListener('click', function (e) {
    e.preventDefault()
    const trueOrFalse = sideBarIcon.classList.contains('fa-bars-staggered')
    if (trueOrFalse) {
        sideBarIcon.classList.remove('fa-bars-staggered')
        sideBarIcon.classList.add('fa-xmark')
        dropDown.setAttribute('class', 'dropDownSidebar bg-slate-700 z-40 opacity-90 h-80 w-44 absolute top-16 right-5 rounded-md')
    }
    else {
        sideBarIcon.classList.remove('fa-xmark')
        sideBarIcon.classList.add('fa-bars-staggered')
        dropDown.setAttribute('class', 'dropDownSidebar bg-slate-700 hidden opacity-90 h-0 w-44 absolute top-16 right-5 rounded-md')
    }
})
//sidebar icon click functionality ends

//username icon click functionality starts
userNameIcon.addEventListener('click', function (e) {
    e.preventDefault()
    sidebarUser.classList.toggle('hidden')
})
//username icon click functionality ends

//param value functionality starts
if (paramValue === 'Guest') {
    userName.forEach((items) => {
        items.innerHTML = paramValue
    })
    editProfile.forEach((items) => {
        items.classList.add('hidden')
    })
    loginLogout.forEach((items) => {
        items.innerHTML = 'Login'
        items.addEventListener('click', function (e) {
            e.preventDefault()
            window.location.href = 'index.html'
        })
    })
} else {
    userName.forEach((items) => {
        items.innerHTML = paramValue.slice(0, 8)
    })
    editProfile.forEach((items) => {
        items.classList.remove('hidden')
    })
    loginLogout.forEach((items) => {
        items.innerHTML = 'Logout'
        items.classList.remove('hidden')
    })

}
//param value functionality Ends

//Navbar Click Event Listener Functionality Starts
const moviesNews = document.querySelectorAll('.moviesNews')
const homeBtn = document.querySelectorAll('.homeBtn')
const about = document.querySelectorAll('.about')


homeBtn.forEach((items) => {
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `mainWindow.html?param=${paramValue}`;
    })
})
moviesNews.forEach((items) => {
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `moviesNews.html?param=${paramValue}`;

    })
})
about.forEach((items) => {
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `about.html?param=${paramValue}`;

    })
})


//Navbar Click Event Listener Functionality Ends
//Header Functionality Ends


//Body Functionality starts
const movies = document.querySelector('.movies')
const series = document.querySelector('.tvShow')
const ball = document.querySelector('.ball')
const movieList = document.querySelector('.moviesList')
const seriesList = document.querySelector('.seriesList')
const mainList = document.querySelector('.itemsList')
const footer = document.querySelector('.footer')
const genreNameDiv = document.querySelector('.genreName')

//Event Listener in Movies and Tv Show button Starts
seriesList.classList.add('hidden')
movies.addEventListener('click', function (e) {
    e.preventDefault()
    ball.classList.add('left-0')
    ball.classList.remove('right-0')
    seriesList.classList.add('hidden')
    movieList.classList.remove('hidden')
})
series.addEventListener('click', function (e) {
    e.preventDefault()
    ball.classList.remove('left-0')
    ball.classList.add('right-0')
    seriesList.classList.remove('hidden')
    movieList.classList.add('hidden')
})
//Event Listener in Movies and Tv Show button Ends


//Movie Genre list Functionality starts
movieGenre.then((val) => {
    const arrGenres = val.genres
    arrGenres.map((items) => {
        //console.log(items)
        const genreName = items.name
        const genreId = items.id
        genreMoviesLists(genreName, genreId)
    })
})

function genreMoviesLists(name, id) {
    const genreName = document.createElement('span')
    genreName.setAttribute('class', 'genreMoviesList w-auto h-auto p-1 px-3 text-sm text-white font-bold bg-blue-500 rounded-full mx-1 my-1 cursor-pointer md:text-base md:p-2 md:px-4 lg:text-lg lg:p-3 lg:px-5 lg:mx-2 lg:my-2')
    genreName.id = id
    genreName.innerHTML = name
    movieList.appendChild(genreName)
    const genreListsItems = document.querySelectorAll('.genreMoviesList')
    genreListsItems.forEach(span => {
        span.addEventListener('click', () => {
            genreListsItems.forEach(s => {
                s.classList.remove('bg-red-500');
            });
            span.classList.add('bg-red-500');
        });
    });

    genreName.addEventListener('click', function (e) {
        e.preventDefault()
        footer.classList.add('hidden')
        genreNameDiv.innerHTML = ''
        mainList.innerHTML = ''
        genreNameDiv.innerHTML += e.target.textContent + ':'
        const id = e.target.id
        const moviesLists = moviesByGenre(id)
        moviesLists.then((val) => {
            const list = val.results;
            list.map((items) => {
                //console.log(items);
                const id = items.id
                const name = items.original_title
                const poster = items.poster_path
                const year = items.release_date.slice(0, 4)
                const rating = items.vote_average
                moviesListByGenre(name, id, poster, year, rating)
            })
        })
    })
}
//Movie Genre list Functionality ends

//Movie Genre list items Functionality starts
function moviesListByGenre(name, id, thumbnail, year, rating) {
    const main = document.createElement('a')
    const image = document.createElement('img')
    const title = document.createElement('p')
    const stars = document.createElement('p')

    main.setAttribute('class', 'w-40 rounded-2xl h-60 flex flex-col relative shadow-md md:w-60 md:h-80 xl:w-80 xl:h-96')
    image.setAttribute('class', 'h-full min-w-full object-cover opacity-60 rounded-2xl z-10')
    title.setAttribute('class', 'h-auto w-auto text-white font-bold text-lg absolute opacity-100 z-20 bottom-7 px-2 lg:text-xl lg:bottom-9')
    stars.setAttribute('class', 'h-auto w-auto text-white font-bold text-xs absolute bottom-2 px-2 opacity-100 z-20 lg:text-lg')

    main.href = `singleItemInfo.html?param=${id}`
    image.src = `https://image.tmdb.org/t/p/w500${thumbnail}`
    title.innerHTML = name
    stars.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating.toFixed(1)} | <span class="text-gray-300 font-bold text-xs">${year} • MOVIE</span> `

    main.appendChild(image)
    main.appendChild(title)
    main.appendChild(stars)
    mainList.appendChild(main)
    footer.classList.remove('hidden')
    footer.classList.add('flex')
}
//Movie Genre list items Functionality Ends

//Series Genre list Functionality starts
seriesGenre.then((val) => {
    const arrGenres = val.genres
    arrGenres.map((items) => {
        //console.log(items)
        const genreName = items.name
        const genreId = items.id
        genreSeriesLists(genreName, genreId)
    })
})

function genreSeriesLists(name, id) {
    const genreName = document.createElement('span')
    genreName.setAttribute('class', 'genreSeriesList w-auto h-auto p-1 px-3 text-sm text-white font-bold bg-blue-500 rounded-full mx-1 my-1 cursor-pointer md:text-base md:p-2 md:px-4 lg:text-lg lg:p-3 lg:px-5 lg:mx-2 lg:my-2')
    genreName.id = id
    genreName.innerHTML = name
    seriesList.appendChild(genreName)
    const genreSeriesList = document.querySelectorAll('.genreSeriesList')
    genreSeriesList.forEach(span => {
        span.addEventListener('click', () => {
            genreSeriesList.forEach(s => {
                s.classList.remove('bg-red-500');
            });
            span.classList.add('bg-red-500');
        });
    });
    genreName.addEventListener('click', function (e) {
        e.preventDefault()
        footer.classList.add('hidden')
        genreNameDiv.innerHTML = ''
        mainList.innerHTML = ''
        genreNameDiv.innerHTML += e.target.textContent + ':'
        const id = e.target.id
        const seriesLists = seriesByGenre(id)
        seriesLists.then((val) => {
            const list = val.results;
            list.map((items) => {
                //console.log(items);
                const id = items.id
                const name = items.original_name
                const poster = items.poster_path
                const year = items.first_air_date.slice(0, 4)
                const rating = items.vote_average
                seriesListByGenre(name, id, poster, year, rating)
            })
        })
    })
}
//Series Genre list Functionality ends

//Series Genre list items Functionality starts
function seriesListByGenre(name, id, thumbnail, year, rating) {
    const main = document.createElement('a')
    const image = document.createElement('img')
    const title = document.createElement('p')
    const stars = document.createElement('p')

    main.setAttribute('class', 'w-40 rounded-2xl h-60 flex flex-col relative shadow-md md:w-60 md:h-80 xl:w-80 xl:h-96')
    image.setAttribute('class', 'h-full min-w-full object-cover opacity-60 rounded-2xl z-10')
    title.setAttribute('class', 'h-auto w-auto text-white font-bold text-lg absolute opacity-100 z-20 bottom-7 px-2 lg:text-xl lg:bottom-9')
    stars.setAttribute('class', 'h-auto w-auto text-white font-bold text-xs absolute bottom-2 px-2 opacity-100 z-20 lg:text-lg')

    main.href = `singleItemInfo.html?param=${id}`
    image.src = `https://image.tmdb.org/t/p/w500${thumbnail}`
    title.innerHTML = name
    stars.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating.toFixed(1)} | <span class="text-gray-300 font-bold text-xs">${year} • TV</span> `

    main.appendChild(image)
    main.appendChild(title)
    main.appendChild(stars)
    mainList.appendChild(main)
    footer.classList.remove('hidden')
    footer.classList.add('flex')
}
//Series Genre list items Functionality Ends
//body Functionality Ends
