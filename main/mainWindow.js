const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');

const Api_Key = 'API_KEY'

async function topImageSlider() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/trending/person/week?language=en-US', options)
    const data = await response.json()
    return data
}

async function forJustRelease() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
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

async function topRatedMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    const data = await response.json()
    return data
}

async function moviesOnly() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    const data = await response.json()
    return data
}

async function seriesOnly() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
    const data = await response.json()
    return data
}

const forTopImageSlider = topImageSlider()
const trending = allTrending()
const topMovies = topRatedMovies()
const movies = moviesOnly()
const series = seriesOnly()
const forJustReleaseSlider = forJustRelease()


//All the genres id and name list 
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
if (window.location.reload) {
    searchField.value = ''
}
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
        const param = searchField.value
        window.location.href = `searchWindow.html?param=${paramValue}&param1=${param}`
        searchField.value = ''
    }
})
//Search Functionality ends

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
const genreBtn = document.querySelectorAll('.genreBtn')
const about = document.querySelectorAll('.about')

genreBtn.forEach((items) => {
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `genreWindow.html?param=${paramValue}`;

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

//Body Functionality Starts
//auto slider functionality starts
const slides = document.querySelector('.slides')

forTopImageSlider.then((val) => {
    const valueArray = val.results
    //console.log(val.results);
    valueArray.map((items) => {
        const images = items.known_for[0].poster_path || items.known_for[0].backdrop_path
        const id = items.known_for[0].id
        let genres = items.known_for[0].genre_ids
        const name = items.known_for[0].title || items.known_for[0].original_name
        const rating = items.known_for[0].vote_average
        const summary = items.known_for[0].overview
        const type = items.known_for[0].media_type
        function findMatchingNames(genres, list2) {
            const matchingNames = [];

            genres.forEach(id => {
                const matchingObject = list2.find(obj => obj.id === id);
                if (matchingObject) {
                    matchingNames.push(matchingObject.name);
                }
            });

            return matchingNames;
        }
        const matchingNames = findMatchingNames(genres, list2);
        silderImages(images, name, matchingNames, summary, rating, id, type)
    })
})

function silderImages(img, nameOfTheShow, genres, summary, rating, id, type) {
    let anchor = document.createElement('a')
    let image = document.createElement('img')
    let name = document.createElement('span')
    let yearGenres = document.createElement('p')
    let summaryText = document.createElement('span')
    let watchTrailer = document.createElement('a')
    let watchlist = document.createElement('span')
    let ratingStar = document.createElement('p')
    let div = document.createElement('div')
    let types = type === 'movie' ? 'movies' : 'series'

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
    image.alt = 'img'
    watchTrailer.href = `singleItemInfo.html?param=${types + id}`
    watchTrailer.innerHTML = '<span class="mx-1 w-5 h-5 bg-white rounded-full flex justify-center items-center"><i class="fa-solid fa-play" style="color: #4ade80;"></i></span><span class="h-6 w-auto flex justify-center items-center lg:text-lg">Watch Trailer</span>'
    watchlist.innerHTML = '<i class="fa-regular fa-bookmark mx-1"></i> Add Watchlist'
    ratingStar.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating.toFixed(1)}`
    summaryText.innerHTML += `${summary.slice(0, 350)} ${summary ? `<a href='singleItemInfo.html?param=${types + id}' class='text-blue-500 select-none cursor-pointer active:text-blue-600 active:underline font-bold font-newFont md:text-sm xl:text-base md:hover:text-blue-600 md:hover:underline'>See More</a>` : ''}`
    yearGenres.innerHTML += `${genres.length < 5 ? genres : genres[0] + ',' + genres[1] + ',' + genres[2]}`
    name.innerHTML = nameOfTheShow
    image.src = `https://image.tmdb.org/t/p/w500${img}`

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

    //watchlist btn functionality starts
    watchlist.addEventListener('click', function (e) {
        e.preventDefault()
        watchlist.classList.add('bg-slate-600')
        watchlist.innerHTML = '<i class="fa-regular fa-bookmark mx-3"></i> Added'
    })
    //watchlist btn functionality ends
}


setInterval(() => {
    let a = slides.firstElementChild.offsetWidth * 9
    if (slides.scrollLeft >= a) {
        slides.scrollLeft = 0
    } else {
        slides.scrollLeft += slides.firstElementChild.offsetWidth
    }
}, 7000);
//auto slider functionality ends

//Top rated slider functionality starts
const justReleaseSlider = document.querySelector('.justRelease')
const justReleaseSliderLeftArrow = document.querySelector('.justReleaseLeftArrow')
const justReleaseSliderRightArrow = document.querySelector('.justReleaseRightArrow')

forJustReleaseSlider.then((val) => {
    const valueArray = val.results
    valueArray.map((items) => {
        //console.log(items);
        const id = items.id
        const name = items.name
        const rating = items.vote_average
        const thumbnail = items.poster_path
        justReleaseSliderFunc(name, id, rating, thumbnail)
    })
})

function justReleaseSliderFunc(name, id, rating, thumbnail) {
    let anchor = document.createElement('a')
    let img = document.createElement('img')
    let title = document.createElement('p')
    let ratingStar = document.createElement('p')

    //setting attributes and css
    anchor.setAttribute('class', 'h-64 w-44 relative mx-3 rounded-md shadow-lg')
    img.setAttribute('class', 'h-full min-w-44 object-cover rounded-md opacity-60')
    title.setAttribute('class', 'text-base text-slate-200 font-bold font-newFont absolute bottom-7 mx-2 md:text-lg md:my-2')
    ratingStar.setAttribute('class', 'text-sm mx-2 w-full text-white font-bold font-newFont absolute bottom-2 md:text-lg')

    //inserting content inside elements
    anchor.href = `singleItemInfo.html?param=${'series' + id}`
    img.src = `https://image.tmdb.org/t/p/w500${thumbnail}`
    img.alt = 'img'
    title.innerHTML = name
    ratingStar.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ${rating.toFixed(1)}`

    //appending it in body
    anchor.appendChild(img)
    anchor.appendChild(title)
    anchor.appendChild(ratingStar)
    justReleaseSlider.appendChild(anchor)
}


justReleaseSliderRightArrow.addEventListener('click', function (e) {
    e.preventDefault()
    justReleaseSlider.scrollLeft += 400
})

justReleaseSliderLeftArrow.addEventListener('click', function (e) {
    e.preventDefault()
    justReleaseSlider.scrollLeft -= 400
})

//Top rated lider functionality ends

//popular of week slider functionality starts
const popularWeekSlider = document.querySelector('.trending')
const leftArrow = document.querySelector('.popularSliderLeftArrow')
const rightArrow = document.querySelector('.popularSliderRightArrow')

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
    let forMovieParam = type === 'movie' ? type + 's' : 'series'

    //setting attributes and css
    mainName.setAttribute('class', 'h-auto w-auto text-white my-2 mx-2 font-bold text-xs xl:text-sm')
    genre.setAttribute('class', 'h-auto w-auto text-gray-400 mx-2 font-bold text-xs xl:text-sm')
    ratingType.setAttribute('class', 'h-auto w-auto my-3 mx-2 text-white font-bold text-xs xl:text-sm')
    div.setAttribute('class', 'h-full w-full flex flex-col justify-center')
    imgDiv.setAttribute('class', 'h-full w-[166px]')
    img.setAttribute('class', 'h-full w-full object-cover md:object-cover')
    main.setAttribute('class', 'h-40 w-auto flex justify-center ml-4 items-center shadow-lg')

    //inserting content inside elements
    main.href = `singleItemInfo.html?param=${forMovieParam + id}`
    img.alt = 'img'
    mainName.innerHTML = name
    genre.innerHTML = main_genre
    ratingType.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ${rating.toFixed(1)} |<span class="text-gray-400"> ${type.toUpperCase()}</span>`
    img.src = `https://image.tmdb.org/t/p/w500${thumbnail}`

    //appending it in body
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
//popular of week slider functionality ends


//featured slider functionality starts
const featuredSlider = document.querySelector('.featured')
const featuredSliderArrowLeft = document.querySelector('.leftArrowFeatured')
const featuredSliderArrowRight = document.querySelector('.rightArrowFeatured')

topMovies.then((val) => {
    const result = val.results
    result.map((items) => {
        //console.log(items);
        const id = items.id
        const bgImage = items.backdrop_path
        const genreId = items.genre_ids
        const title = items.title
        const summary = items.overview
        const mainImg = items.poster_path
        const year = items.release_date
        const rating = items.vote_average
        function findMatchingNames(genreId, list2) {
            const matchingNames = [];

            genreId.forEach(id => {
                const matchingObject = list2.find(obj => obj.id === id);
                if (matchingObject) {
                    matchingNames.push(matchingObject.name);
                }
            });

            return matchingNames;
        }
        const matchingNames = findMatchingNames(genreId, list2);
        allFeaturedDetails(bgImage, mainImg, matchingNames, rating, title, summary, year, id)
    })
})

function allFeaturedDetails(bgImg, mainImg, genre, star, title, summary, year, id) {
    const mainContainer = document.createElement('div')
    const sliderDiv = document.createElement('div')
    const imageDiv = document.createElement('div')
    const mainImage = document.createElement('img')
    const bgImage = document.createElement('img')
    const h1 = document.createElement('h1')
    const p1 = document.createElement('p')
    const mainTitle = document.createElement('p')
    let ratingType = document.createElement('p')
    const overview = document.createElement('p')
    let watchTrailer = document.createElement('a')
    let watchlist = document.createElement('span')

    //setting attributes to the elements and also setting css
    mainContainer.setAttribute('class', 'min-h-full min-w-full relative')
    h1.setAttribute('class', 'text-2xl mx-2 my-2 text-white absolute top-1 font-semibold font-newFont z-20 md:text-3xl')
    p1.setAttribute('class', 'mx-2 my-1 text-gray-400 absolute top-10 font-newFont z-20 md:text-xl')
    mainTitle.setAttribute('class', 'text-lg mx-2 my-1 text-white absolute bottom-40 font-bold font-newFont z-20 md:text-2xl')
    ratingType.setAttribute('class', 'text-sm mx-2 my-1 text-white absolute bottom-32 font-bold font-newFont z-20 md:text-xl')
    overview.setAttribute('class', 'text-xs mx-2 my-1 text-gray-400 absolute bottom-16 font-bold font-newFont z-20 md:text-lg lg:bottom-20')
    bgImage.setAttribute('class', 'min-w-full min-h-full object-cover opacity-40 z-10')
    watchTrailer.setAttribute('class', 'h-auto w-auto p-2 px-3 flex absolute bottom-2 mx-3 z-20 cursor-pointer bg-green-400 rounded-xl md:mx-4 md:hover:bg-green-600 md:hover:scale-105 duration-200 active:bg-green-600')
    watchlist.setAttribute('class', 'h-auto w-auto p-2 px-3 flex absolute bottom-2 right-0 mx-3 z-20 cursor-pointer rounded-xl border-[1px] gap-2 border-white flex justify-center items-center text-white active:bg-slate-600 md:hover:bg-slate-600 md:hover:scale-105 duration-200 md:right-[55vw] lg:right-[65vw] xl:right-[72vw] 2xl:right-[76vw]')
    sliderDiv.setAttribute('class', 'featuredSliderDiv h-[50vh] w-full top-20 absolute gap-5 flex z-20 overflow-scroll')
    imageDiv.setAttribute('class', 'h-full w-auto absolute z-20 right-1 rounded-xl lg:right-4 xl:right-6')
    mainImage.setAttribute('class', 'h-full w-full object-contain z-20 rounded-xl')

    //appending content inside elements
    watchTrailer.href = `singleItemInfo.html?param=${'movies' + id}`
    mainImage.src = `https://image.tmdb.org/t/p/w500${mainImg}`
    mainImage.alt = 'img'
    p1.innerHTML = 'Best Featured For You Today'
    h1.innerHTML = 'Featured in CinaMania'
    bgImage.src = `https://image.tmdb.org/t/p/w500${bgImg}`
    bgImage.alt = 'img'
    mainTitle.innerHTML = title
    ratingType.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${star.toFixed(1)} <span class="text-gray-400">| ${year.slice(0, 4)} • ${genre}</span>`
    overview.innerHTML = summary.slice(0, 150) + `<span class="text-blue-500 text-xs active:text-blue-700 active:underline md:text-lg md:hover:text-blue-700 md:hover:underline"><a href=singleItemInfo.html?param=${'movies' + id}> See More</a></span>`
    watchTrailer.innerHTML = '<span class="mx-1 w-5 h-5 bg-white rounded-full flex justify-center items-center"><i class="fa-solid fa-play" style="color: #4ade80;"></i></span><span class="h-6 w-auto flex justify-center items-center text-white font-semibold font-newFont lg:text-lg">Watch Trailer</span>'
    watchlist.innerHTML = '<i class="fa-regular fa-bookmark mx-1"></i> Add Watchlist'

    //appending elements
    mainContainer.appendChild(h1)
    mainContainer.appendChild(p1)
    mainContainer.appendChild(mainTitle)
    mainContainer.appendChild(ratingType)
    mainContainer.appendChild(overview)
    mainContainer.appendChild(watchTrailer)
    mainContainer.appendChild(watchlist)
    mainContainer.appendChild(bgImage)
    imageDiv.appendChild(mainImage)
    sliderDiv.appendChild(imageDiv)
    featuredSlider.appendChild(mainContainer)
    mainContainer.appendChild(sliderDiv)

    //watchlist btn functionality starts
    watchlist.addEventListener('click', function (e) {
        e.preventDefault()
        watchlist.classList.add('bg-slate-600')
        watchlist.innerHTML = '<i class="fa-regular fa-bookmark mx-3"></i> Added'
    })
    //watchlist btn functionality ends
}

featuredSliderArrowRight.addEventListener('click', function (e) {
    e.preventDefault()
    featuredSlider.scrollLeft += featuredSlider.offsetWidth
})

featuredSliderArrowLeft.addEventListener('click', function (e) {
    e.preventDefault()
    featuredSlider.scrollLeft -= featuredSlider.offsetWidth
})

//featured slider functionality Ends

//Movies Slider functionality starts
const moviesSliderDiv = document.querySelector('.moviesSlider')
const moviesSliderArrowLeft = document.querySelector('.leftArrowMoviesSlider')
const moviesSliderArrowRight = document.querySelector('.rightArrowMoviesSlider')

movies.then((val) => {
    const items = val.results
    items.map((allItems) => {
        const id = allItems.id
        const title = allItems.title
        const type = allItems.media_type
        const image = allItems.poster_path
        const rating = allItems.vote_average
        const genre = allItems.genre_ids
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
        moviesSlider(id, title, type, image, rating, matchingNames)
    })
})

function moviesSlider(id, name, type, poster, stars, genres) {
    const mainAnchor = document.createElement('a')
    const image = document.createElement('img')
    const title = document.createElement('p')
    const rating = document.createElement('span')

    mainAnchor.setAttribute('class', 'h-full min-w-[60vw] mx-2 flex flex-col sm:min-w-[35vw] md:min-w-[30vw] lg:min-w-[25vw] xl:min-w-[20vw] 2xl:min-w-[15vw]')
    image.setAttribute('class', 'h-80 min-w-full object-cover rounded-xl')
    title.setAttribute('class', 'text-base font-semibold text-white mx-3 my-2 font-newFont')
    rating.setAttribute('class', 'text-white text-sm mx-3')

    mainAnchor.href = `singleItemInfo.html?param=${'movies' + id}`
    image.src = `https://image.tmdb.org/t/p/w500${poster}`
    image.alt = 'Image'
    title.innerHTML = name
    rating.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${stars.toFixed(1)} <span class="text-gray-500 font-bold text-xs">| ${genres[0]} • ${type.toUpperCase()}</span> `

    mainAnchor.appendChild(image)
    mainAnchor.appendChild(title)
    mainAnchor.appendChild(rating)
    moviesSliderDiv.appendChild(mainAnchor)
}

moviesSliderArrowRight.addEventListener('click', function (e) {
    e.preventDefault()
    moviesSliderDiv.scrollLeft += 500
})

moviesSliderArrowLeft.addEventListener('click', function (e) {
    e.preventDefault()
    moviesSliderDiv.scrollLeft -= 500
})

//Movies Slider functionality Ends

//Series Slider functionality Starts

const seriesSliderDiv = document.querySelector('.seriesSlider')
const seriesSliderArrowLeft = document.querySelector('.leftArrowSeriesSlider')
const seriesSliderArrowRight = document.querySelector('.rightArrowSeriesSlider')

series.then((val) => {
    const items = val.results.slice(0, 19)
    items.map((allItems) => {
        const id = allItems.id
        const title = allItems.name
        const type = allItems.media_type
        const image = allItems.poster_path
        const rating = allItems.vote_average
        const genre = allItems.genre_ids
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
        seriesSlider(id, title, type, image, rating, matchingNames)
    })
})

function seriesSlider(id, name, type, poster, stars, genres) {
    const mainAnchor = document.createElement('a')
    const image = document.createElement('img')
    const title = document.createElement('p')
    const rating = document.createElement('span')

    mainAnchor.setAttribute('class', 'h-full min-w-[60vw] mx-2 flex flex-col sm:min-w-[35vw] md:min-w-[30vw] lg:min-w-[25vw] xl:min-w-[20vw] 2xl:min-w-[15vw]')
    image.setAttribute('class', 'h-80 min-w-full object-cover rounded-xl')
    title.setAttribute('class', 'text-base font-semibold text-white mx-3 my-2 font-newFont')
    rating.setAttribute('class', 'text-white text-sm mx-3')

    mainAnchor.href = `singleItemInfo.html?param=${'series' + id}`
    image.src = `https://image.tmdb.org/t/p/w500${poster}`
    image.alt = 'Image'
    title.innerHTML = name
    rating.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${stars.toFixed(1)} <span class="text-gray-500 font-bold text-xs">| ${genres[0]} • ${type.toUpperCase()}</span> `

    mainAnchor.appendChild(image)
    mainAnchor.appendChild(title)
    mainAnchor.appendChild(rating)
    seriesSliderDiv.appendChild(mainAnchor)
}

seriesSliderArrowRight.addEventListener('click', function (e) {
    e.preventDefault()
    seriesSliderDiv.scrollLeft += 500
})

seriesSliderArrowLeft.addEventListener('click', function (e) {
    e.preventDefault()
    seriesSliderDiv.scrollLeft -= 500
})

//Series Slider functionality Ends
