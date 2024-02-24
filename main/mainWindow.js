const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');

const Api_Key = 'Api Key'


async function allShows() {
    const response = await fetch('https://api.tvmaze.com/shows')
    const data = await response.json()
    return data
}

async function allTrending() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US', options)
    const data = await response.json()
    return data
}
async function moveGenres() {
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
async function tvShowGenres() {
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

const shows = allShows()
const trending = allTrending()
const genreMovie = moveGenres()
const genreShow = tvShowGenres()


//Header Functionality starts

const sideBarIcon = document.querySelector('.sidebarIcon')
const dropDown = document.querySelector('.dropDownSidebar')
const userNameFirstLetter = document.querySelectorAll('.firstLetter')
const userName = document.querySelectorAll('.userName')
const editProfile = document.querySelectorAll('.editProfile')
const loginLogout = document.querySelectorAll('.loginLogout')
const userNameIcon = document.querySelector('.userNameIcon') //for big devices
const sidebarUser = document.querySelector('.userSidebar') //for big devices
const searchIcon = document.querySelector('.searchIcon')
const searchField = document.querySelector('.search')

//Search Functionality Starts
searchField.addEventListener('input', function (e) {
    e.preventDefault()
    searchField.value = e.target.value
})

searchIcon.addEventListener('click', function (e) {
    e.preventDefault()
    if (searchField.value.length < 1) {
        searchField.classList.toggle('hidden')
        searchField.value = ''
    }
    else if (searchField.value.length > 2) {
        // Search Api Here
    }
})
//Search Functionality ends

userNameFirstLetter.forEach((items) => {
    items.innerHTML = paramValue.slice(0, 1).toUpperCase()
})

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

userNameIcon.addEventListener('click', function (e) {
    e.preventDefault()
    sidebarUser.classList.toggle('hidden')
})

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

//Header Functionality Ends


//Body Functionality Starts

const slides = document.querySelector('.slides')
const popularWeekSlider = document.querySelector('.trending')
const leftArrow = document.querySelector('.leftArrow')
const rightArrow = document.querySelector('.rightArrow')

shows.then((val) => {
    const movieDetails = val.slice(10, 20)
    movieDetails.map((items) => {
        const images = items.image.original
        const id = items.id
        let genres = items.genres //array of generes
        const name = items.name
        const year = items.premiered
        const rating = items.rating.average
        const summary = items.summary
        const trailer = items.url
        //console.log(items)
        silderImages(images, name, genres, year, summary, rating, trailer, id)
    })
})

function silderImages(img, nameOfTheShow, generes, year, summary, rating, trailer, id) {
    let anchor = document.createElement('a')
    let image = document.createElement('img')
    let name = document.createElement('span')
    let yearGenres = document.createElement('p')
    let summaryText = document.createElement('span')
    let watchTrailer = document.createElement('a')
    let watchlist = document.createElement('span')
    let ratingStar = document.createElement('p')
    let div = document.createElement('div')

    //setting attributes to the elements and also setting css
    yearGenres.setAttribute('class', 'absolute bottom-52 mx-5 w-full z-10 text-gray-400 font-bold text-sm font-newFont xl:text-base')
    image.setAttribute('class', 'min-h-full min-w-full object-cover opacity-40 overflow-hidden sm:object-contain ')
    anchor.setAttribute('class', 'min-h-full min-w-full overflow-hidden')
    name.setAttribute('class', 'absolute bottom-60 mx-5 w-full z-10 text-white font-bold text-4xl font-newFont')
    summaryText.setAttribute('class', 'absolute bottom-20 w-[94%] ml-5 z-10 text-white text-xs font-bold font-newFont md:text-sm xl:text-base md:w-[70%]')
    ratingStar.setAttribute('class', 'absolute top-16 z-10 mx-4 w-14 text-white font-bold text-lg')
    div.setAttribute('class', 'absolute bottom-0 z-10 w-[97%] my-4 h-auto flex justify-evenly items-center md:justify-start md:gap-5 md:mx-5')
    watchTrailer.setAttribute('class', 'p-3 bg-green-400 mx-1 rounded-xl cursor-pointer text-sm flex items-center justify-center text-white font-newFont font-bold z-10 active:bg-green-600 md:hover:bg-green-600 md:hover:scale-105 md:duration-300 lg:w-44 lg:gap-3')
    watchlist.setAttribute('class', 'text-white p-3 border-[1px] border-white rounded-xl text-sm font-newFont font-bold z-10 cursor-pointer active:bg-slate-600 flex justify-center items-center md:hover:bg-slate-600 md:hover:scale-105 md:duration-300 select-none lg:w-44 lg:gap-3 lg:text-lg')


    //appending content inside elements
    watchTrailer.target = '_blank'
    watchTrailer.href = trailer
    watchTrailer.innerHTML = '<span class="mx-1 w-5 h-5 bg-white rounded-full flex justify-center items-center"><i class="fa-solid fa-play" style="color: #4ade80;"></i></span><span class="h-6 w-auto flex justify-center items-center lg:text-lg">Watch Trailer</span>'
    watchlist.innerHTML = '<i class="fa-regular fa-bookmark mx-1"></i> Add Watchlist'
    ratingStar.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating}`
    summaryText.innerHTML += `${summary.slice(0, 350)} <a href='singleItemInfo.html?param=${id}' class='text-blue-500 select-none cursor-pointer active:text-blue-600 active:underline font-bold font-newFont md:text-sm xl:text-base md:hover:text-blue-600 md:hover:underline'>See More</a> `
    yearGenres.innerHTML += `${year.slice(0, 4)} • ${generes}`
    name.innerHTML = nameOfTheShow
    image.src = img

    //appending elements
    div.appendChild(watchTrailer)
    div.appendChild(watchlist)
    anchor.appendChild(ratingStar)
    anchor.appendChild(name)
    anchor.appendChild(yearGenres)
    anchor.appendChild(summaryText)
    anchor.appendChild(div)
    anchor.appendChild(image)
    slides.appendChild(anchor)
}


setInterval(() => {
    let a = slides.firstElementChild.offsetWidth * 9
    if (slides.scrollLeft >= a) {
        slides.scrollLeft = 0
    } else {
        slides.scrollLeft += slides.firstElementChild.offsetWidth
    }
}, 7000);


trending.then((val) => {
    const trendingArr = val.results
    trendingArr.map((items) => {
        //console.log(items);
        const thumbnail = items.poster_path
        const name = items.name || items.title
        const id = items.id
        const rating = items.vote_average
        const type = items.media_type
        const genre = items.genre_ids // array of genres id
        const list2 = [{
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        },
        {
            "id": 10759,
            "name": "Action & Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 10762,
            "name": "Kids"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10763,
            "name": "News"
        },
        {
            "id": 10764,
            "name": "Reality"
        },
        {
            "id": 10765,
            "name": "Sci-Fi & Fantasy"
        },
        {
            "id": 10766,
            "name": "Soap"
        },
        {
            "id": 10767,
            "name": "Talk"
        },
        {
            "id": 10768,
            "name": "War & Politics"
        },
        {
            "id": 37,
            "name": "Western"
        }
        ]
        function findMatchingNames(genre, list2) {
            const matchingNames = [];

            genre.forEach(id => {
                const matchingObject = list2.find(obj => obj.id === id);
                if (matchingObject) {
                    matchingNames.push(matchingObject.name);
                }
            });

            return matchingNames;
        }
        const matchingNames = findMatchingNames(genre, list2);
        if (matchingNames.length <= 3) {
            const main_genre = matchingNames
            trendingWeek(thumbnail, name, id, rating, type, main_genre)

        }
    })
})


function trendingWeek(thumbnail, name, id, rating, type, main_genre) {
    let main = document.createElement('a')
    let imgDiv = document.createElement('div')
    let img = document.createElement('img')
    let mainName = document.createElement('p')
    let genre = document.createElement('p')
    let ratingType = document.createElement('p')
    let div = document.createElement('div')


    mainName.setAttribute('class', 'h-auto w-auto text-white my-2 mx-2 font-bold text-xs xl:text-sm')
    genre.setAttribute('class', 'h-auto w-auto text-gray-400 mx-2 font-bold text-xs xl:text-sm')
    ratingType.setAttribute('class', 'h-auto w-auto my-3 mx-2 text-white font-bold text-xs xl:text-sm')
    div.setAttribute('class', 'h-full w-full flex flex-col justify-center')
    imgDiv.setAttribute('class', 'h-full w-[166px]')
    img.setAttribute('class', 'h-full w-full object-cover md:object-cover')
    main.setAttribute('class', 'h-40 w-auto flex justify-center mx-4 items-center shadow-lg')
    main.href = `singleItemInfo.html?param=${id}`
    mainName.innerHTML = name
    genre.innerHTML = main_genre
    ratingType.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ${rating.toFixed(1)} |<span class="text-gray-400"> ${type.toUpperCase()}</span>`
    img.src = `https://image.tmdb.org/t/p/w500${thumbnail}`



    imgDiv.appendChild(img)
    main.appendChild(imgDiv)
    div.appendChild(mainName)
    div.appendChild(genre)
    div.appendChild(ratingType)
    main.appendChild(div)
    popularWeekSlider.appendChild(main)
}

rightArrow.addEventListener('click', function (e) {
    e.preventDefault()
    popularWeekSlider.scrollLeft += 400
})

leftArrow.addEventListener('click', function (e) {
    e.preventDefault()
    popularWeekSlider.scrollLeft -= 400
})
