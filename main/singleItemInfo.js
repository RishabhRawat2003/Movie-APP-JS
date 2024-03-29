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

const urlParams = new URLSearchParams(window.location.search);
const paramValue1 = urlParams.get('param');
const paramValue = paramValue1.slice(6)
const moviesOrSeriesParam = paramValue1.slice(0, 6)


const Api_Key = 'API_KEY'


if (moviesOrSeriesParam === 'movies') {

    //loading functionality starts
    const loader = document.querySelector('.loading')
    var loading = true
    //loading functionality ends

    async function imagesForMovies() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/movie/${paramValue}/images`, options)
        const data = await response.json()
        return data
    }

    async function detailsForMovies() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/movie/${paramValue}?language=en-US`, options)
        const data = await response.json()
        return data
    }

    async function moviesCrew() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/movie/${paramValue}/credits?language=en-US`, options)
        const data = await response.json()
        return data
    }

    async function recommendedMovies() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/movie/${paramValue}/recommendations?language=en-US&page=1`, options)
        const data = await response.json()
        return data
    }

    async function similarMovies() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/movie/${paramValue}/similar`, options)
        const data = await response.json()
        return data
    }

    const imagesListMovies = imagesForMovies()
    const moviesDetails = detailsForMovies()
    const crewMember = moviesCrew()
    const recommended = recommendedMovies()
    const similar = similarMovies()


    const recommendedH1 = document.querySelector('.recommendedH1 ')
    const recommendedH1Elem2 = document.querySelector('.recommendedH2 ')
    recommendedH1.innerHTML = 'Recommended Movies'
    recommendedH1Elem2.innerHTML = 'Similar Movies for you'


    //image Slider functionality starts
    const imagesSlider = document.querySelector('.imagesSlider')
    const imagesSliderDiv = document.querySelector('.imagesSliderDiv')
    const imagesSliderLeftArrow = document.querySelector('.leftArrowSlider')
    const imagesSliderRightArrow = document.querySelector('.rightArrowSlider')

    imagesListMovies.then((val) => {
        const valueArray = val.backdrops.slice(0, 20)
        if (valueArray.length < 1) {
            imagesSliderDiv.classList.add('hidden')
        }
        //const valueArray = val.logos.slice(0,20)
        //const valueArray1 = val.posters.slice(0,20)
        valueArray.map((items) => {
            const image = items.file_path
            imageSliderFunc(image)
        })
    })

    function imageSliderFunc(images) {
        const imageElem = document.createElement('img')
        imageElem.setAttribute('class', 'h-full min-w-full object-cover xl:object-contain')
        imageElem.src = `https://image.tmdb.org/t/p/w500${images}`
        imageElem.alt = 'image'
        imagesSlider.appendChild(imageElem)
    }

    imagesSliderRightArrow.addEventListener('click', function (e) {
        e.preventDefault()
        imagesSlider.scrollLeft += imagesSlider.clientWidth
    })

    imagesSliderLeftArrow.addEventListener('click', function (e) {
        e.preventDefault()
        imagesSlider.scrollLeft -= imagesSlider.clientWidth

    })
    //image Slider functionality ends

    //moviesDetails functionality starts
    const mainDiv = document.querySelector('.mainDiv')

    moviesDetails.then((val) => {
        const name = val.title
        const genres = val.genres
        const overview = val.overview
        const release = val.release_date
        const tagline = val.tagline
        // runtime calculation starts
        const runtime = val.runtime
        let a = String(runtime / 60)
        let hours = a.slice(0, 1) + 'h'
        let min = '0.' + a.slice(2, 4)
        let minutes = String(min * 60)
        let minut = minutes.slice(0, 2) + 'm'
        let movieRuntime = hours + minut
        // runtime calculation ends
        let arrayGenres = []
        genres.map((items) => {
            arrayGenres.push(items.name)
        })
        moviesDetailsFunc(name, overview, release, tagline, arrayGenres, movieRuntime)
        document.title = name + "-" + tagline
        if (loading) {
            console.log('loading');
        } else {
            loader.classList.add('hidden')
        }
    })

    function moviesDetailsFunc(name, overview, release, tagline, arrayGenres, movieRuntime) {
        const mainDivElem = document.createElement('div')
        const elemDiv = document.createElement('div')
        const elemDiv1 = document.createElement('div')
        const elemDiv2 = document.createElement('div')
        const playNowElem = document.createElement('span')
        const watchlistElem = document.createElement('span')
        const shareElem = document.createElement('span')
        const likedElem = document.createElement('span')
        const downloadElem = document.createElement('span')
        const heading = document.createElement('h1')
        const nameElem = document.createElement('p')
        const infoElem = document.createElement('p')
        const summaryElem = document.createElement('p')

        //setting attributes to the elements and also setting css
        infoElem.setAttribute('class', 'text-xs text-gray-500 font-newFont md:text-sm xl:text-base')
        mainDivElem.setAttribute('class', 'h-auto w-full px-3 mt-5 flex flex-col')
        nameElem.setAttribute('class', 'h-auto w-full text-white text-2xl font-bold font-newFont md:text-4xl xl:text-5xl')
        elemDiv.setAttribute('class', 'h-auto w-full flex justify-between items-center my-3')
        elemDiv1.setAttribute('class', 'h-auto w-72 flex justify-evenly items-center md:justify-between sm:w-80 md:w-96')
        elemDiv2.setAttribute('class', 'h-auto w-40 flex justify-evenly items-center sm:w-80 lg:w-[440px]')
        playNowElem.setAttribute('class', 'p-2 px-6 bg-green-400 mx-1 rounded-xl cursor-pointer text-sm flex items-center justify-center text-white font-newFont font-bold gap-2 active:bg-green-600 md:px-8 md:hover:bg-green-600 sm:text-lg md:hover:scale-105 md:duration-300 md:p-3 md:gap-3 md:px-7')
        watchlistElem.setAttribute('class', 'p-2 cursor-pointer border-[1px] border-white flex justify-center gap-2 items-center rounded-lg sm:p-1.5 md:p-2.5 md:px-6 active:bg-slate-500 md:hover:bg-slate-500 md:duartion-300')
        likedElem.setAttribute('class', 'p-2 border-[1px] border-white flex cursor-pointer justify-center items-center rounded-lg sm:gap-2 sm:px-4 md:p-2.5 md:px-6 active:bg-slate-500 md:hover:bg-slate-500 md:duartion-300')
        downloadElem.setAttribute('class', 'p-2 border-[1px] border-white flex cursor-pointer justify-center items-center rounded-lg sm:gap-2 sm:px-4 md:p-2.5 md:px-6 active:bg-slate-500 md:hover:bg-slate-500 md:duartion-300')
        shareElem.setAttribute('class', 'p-2 border-[1px] border-white  rounded-lg hidden lg:flex lg:justify-center lg:items-center lg:gap-2 lg:p-2.5 lg:px-6 active:bg-slate-500 md:hover:bg-slate-500 md:duartion-300')
        heading.setAttribute('class', 'text-white text-xl font-semibold font-newFont mt-5 md:text-2xl xl:text-3xl')
        summaryElem.setAttribute('class', 'text-lg text-gray-300 font-semibold font-mono my-3 md:text-xl xl:text-2xl')

        //appending content inside elements
        playNowElem.innerHTML = '<span class="mx-1 w-5 h-5 bg-white rounded-full flex justify-center items-center sm:p-3"><i class="fa-solid fa-play" style="color: #4ade80;"></i></span><span class="h-6 w-auto flex justify-center items-center lg:text-lg">Play Now</span>'
        watchlistElem.innerHTML = '<i class="fa-regular fa-bookmark" style="color: #ffffff;"></i>' + '<span class="hidden font-newFont text-white text-lg sm:inline"> Add Watchlist</span>'
        nameElem.innerHTML = name
        infoElem.innerHTML = movieRuntime + " • " + release.slice(0, 4) + " • " + arrayGenres
        likedElem.innerHTML = '<i class="fa-regular fa-thumbs-up" style="color: #ffffff;"></i>' + '<span class="text-white hidden font-newFont text-lg sm:inline"> Like</span>'
        downloadElem.innerHTML = '<i class="fa-solid fa-download" style="color: #ffffff;"></i>' + '<span class="text-white hidden font-newFont text-lg sm:inline"> Download</span>'
        shareElem.innerHTML = '<i class="fa-solid fa-share-nodes" style="color: #ffffff;"></i>' + '<span class="text-white font-newFont text-lg"> Share</span>'
        heading.innerHTML = 'Story Line :'
        summaryElem.innerHTML = overview + tagline

        //appending elements
        elemDiv1.appendChild(playNowElem)
        elemDiv1.appendChild(watchlistElem)
        elemDiv2.appendChild(likedElem)
        elemDiv2.appendChild(downloadElem)
        elemDiv2.appendChild(shareElem)
        elemDiv.appendChild(elemDiv1)
        elemDiv.appendChild(elemDiv2)
        mainDivElem.appendChild(nameElem)
        mainDivElem.appendChild(infoElem)
        mainDivElem.appendChild(elemDiv)
        mainDivElem.appendChild(heading)
        mainDivElem.appendChild(summaryElem)
        mainDiv.appendChild(mainDivElem)
        loading = false
        let a = document.querySelector('html')
        if (a.clientWidth < '640') {
            watchlistElem.addEventListener('click', function (e) {
                e.preventDefault()
                watchlistElem.classList.toggle('bg-slate-500')
            })
            likedElem.addEventListener('click', function (e) {
                e.preventDefault()
                likedElem.classList.toggle('bg-slate-500')
            })
        } else {
            watchlistElem.addEventListener('click', function (e) {
                e.preventDefault()
                watchlistElem.classList.add('bg-slate-500')
                watchlistElem.innerHTML = '<i class="fa-regular fa-bookmark" style="color: #ffffff;"></i>' + '<span class="hidden font-newFont text-white text-lg sm:inline"> Added</span>'
            })
            likedElem.addEventListener('click', function (e) {
                e.preventDefault()
                likedElem.classList.add('bg-slate-500')
                likedElem.innerHTML = '<i class="fa-regular fa-thumbs-up" style="color: #ffffff;"></i>' + '<span class="text-white hidden font-newFont text-lg sm:inline"> Liked</span>'
            })
        }
    }
    //moviesDetails functionality ends

    //Top Cast functionality starts
    const topCastSlider = document.querySelector('.topCastSlider')
    const topCastSliderMainDiv = document.querySelector('.topCastSliderMainDiv')
    const leftArrowTopCastSlider = document.querySelector('.leftArrowTopCastSlider')
    const rightArrowTopCastSlider = document.querySelector('.rightArrowTopCastSlider')

    crewMember.then((val) => {
        const cast = val.cast.slice(0, 10)
        if (cast.length < 1) {
            topCastSliderMainDiv.classList.add('hidden')
        }
        cast.map((items) => {
            //console.log(items);
            const characterName = items.character || items.original_name
            const realName = items.original_name
            const image = items.profile_path
            topCastFunc(image, characterName, realName)
            if (loading) {
                console.log('loading');
            } else {
                loader.classList.add('hidden')
            }
        })
    })

    function topCastFunc(images, characterName, realName) {
        const castSlider = document.createElement('div')
        const imgDiv = document.createElement('div')
        const infoDiv = document.createElement('div')
        const imageSpanElem = document.createElement('span')
        const image = document.createElement('img')
        const charName = document.createElement('p')
        const realNameElem = document.createElement('p')

        castSlider.setAttribute('class', 'h-20 w-auto flex justify-center gap-2 items-center')
        imgDiv.setAttribute('class', 'h-20 w-24 flex justify-center items-center')
        infoDiv.setAttribute('class', 'h-full w-auto flex flex-col justify-center')
        imageSpanElem.setAttribute('class', 'h-20 w-24 rounded-full p-3 flex justify-center items-center')
        image.setAttribute('class', 'h-20 w-24 rounded-full object-cover text-white text-xs')
        charName.setAttribute('class', 'h-auto w-32 font-semibold text-white text-sm font-newFont lg:text-lg lg:w-40')
        realNameElem.setAttribute('class', 'h-auto w-32 font-semibold text-gray-500 text-xs font-newFont lg:text-base lg:w-40')

        image.src = `https://image.tmdb.org/t/p/w500${images}`
        image.alt = 'image Unavailable'
        charName.innerHTML = characterName.slice(0, 33)
        realNameElem.innerHTML = realName

        imageSpanElem.appendChild(image)
        imgDiv.appendChild(imageSpanElem)
        infoDiv.appendChild(charName)
        infoDiv.appendChild(realNameElem)
        castSlider.appendChild(imgDiv)
        castSlider.appendChild(infoDiv)
        topCastSlider.appendChild(castSlider)
        loading = false
    }

    rightArrowTopCastSlider.addEventListener('click', function (e) {
        e.preventDefault()
        topCastSlider.scrollLeft += 300
    })

    leftArrowTopCastSlider.addEventListener('click', function (e) {
        e.preventDefault()
        topCastSlider.scrollLeft -= 300

    })
    //Top Cast functionality ends

    //Recommended movies slider starts
    const recommendedMoviesSlider = document.querySelector('.recommendedMoviesSlider')
    const recommendedMoviesSliderDiv = document.querySelector('.recommendedMoviesSliderDiv')
    const leftArrowRecommendedMoviesSlider = document.querySelector('.leftArrowRecommendedMoviesSlider')
    const rightArrowRecommendedMoviesSliderDiv = document.querySelector('.rightArrowRecommendedMoviesSlider')

    recommended.then((val) => {
        const arrMovie = val.results
        if (arrMovie.length < 1) {
            recommendedMoviesSliderDiv.classList.add('hidden')
        }
        arrMovie.map((items) => {
            let thumbnail = items.backdrop_path ? items.backdrop_path : items.poster_path
            //console.log(items);
            if (thumbnail) {
                const id = items.id
                const name = items.title
                const rating = items.vote_average
                const genres = items.genre_ids
                const type = items.media_type
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
                recommendedMoviesFunc(name, rating, thumbnail, matchingNames, type, id)
                if (loading) {
                    console.log('loading');
                } else {
                    loader.classList.add('hidden')
                }
            }
        })
    })

    function recommendedMoviesFunc(name, rating, thumbnail, matchingNames, type, id) {
        const mainAnchor = document.createElement('a')
        const image = document.createElement('img')
        const nameElem = document.createElement('p')
        const ratingGenresElem = document.createElement('p')
        const mainType = type + 's'

        mainAnchor.setAttribute('class', 'h-full min-w-[64vw] flex flex-col sm:min-w-[44vw] md:min-w-[35vw] lg:min-w-[30vw] xl:min-w-[24vw] 2xl:min-w-[19vw]')
        image.setAttribute('class', 'h-40 w-full rounded-xl object-cover text-white text-xs')
        nameElem.setAttribute('class', 'text-sm font-semibold text-white px-3 mt-2 mb-1')
        ratingGenresElem.setAttribute('class', 'text-sm font-semibold text-white px-3 mb-1.5')

        mainAnchor.href = `singleItemInfo.html?param=${mainType + id}`
        image.src = `https://image.tmdb.org/t/p/w500${thumbnail}`
        image.alt = 'image unavailable'
        nameElem.innerHTML = name
        ratingGenresElem.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating.toFixed(1)}` + `<span class="ml-1.5 text-sm text-gray-500">${matchingNames[0]} • ${type.toUpperCase()}</span>`


        mainAnchor.appendChild(image)
        mainAnchor.appendChild(nameElem)
        mainAnchor.appendChild(ratingGenresElem)
        recommendedMoviesSlider.appendChild(mainAnchor)
        loading = false
    }

    rightArrowRecommendedMoviesSliderDiv.addEventListener('click', function (e) {
        e.preventDefault()
        recommendedMoviesSlider.scrollLeft += 500
    })

    leftArrowRecommendedMoviesSlider.addEventListener('click', function (e) {
        e.preventDefault()
        recommendedMoviesSlider.scrollLeft -= 500
    })
    //Recommended movies slider ends

    //Similar movies Slider Starts
    const similarMoviesSlider = document.querySelector('.similarMoviesSlider')
    const similarMoviesSliderDiv = document.querySelector('.similarMoviesSliderDiv')
    const leftArrowSimilarMoviesSlider = document.querySelector('.leftArrowSimilarMoviesSlider')
    const rightArrowSimilarMoviesSliderDiv = document.querySelector('.rightArrowSimilarMoviesSlider')

    similar.then((val) => {
        const arrSimilar = val.results
        if (arrSimilar.length < 1) {
            similarMoviesSliderDiv.classList.add('hidden')
        }
        arrSimilar.map((items) => {
            //console.log(items);
            let thumbnail = items.backdrop_path ? items.backdrop_path : items.poster_path
            if (thumbnail) {
                const id = items.id
                const name = items.title
                const rating = items.vote_average
                const genres = items.genre_ids
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
                similarMoviesFunc(name, rating, thumbnail, matchingNames, id)
                if (loading) {
                    console.log('loading');
                } else {
                    loader.classList.add('hidden')
                }
            }
        })
    })

    function similarMoviesFunc(name, rating, thumbnail, matchingNames, id) {
        const mainAnchor = document.createElement('a')
        const image = document.createElement('img')
        const nameElem = document.createElement('p')
        const ratingGenresElem = document.createElement('p')
        const mainType = 'movies'

        mainAnchor.setAttribute('class', 'h-full min-w-[64vw] flex flex-col sm:min-w-[44vw] md:min-w-[35vw] lg:min-w-[30vw] xl:min-w-[24vw] 2xl:min-w-[19vw]')
        image.setAttribute('class', 'h-40 w-full rounded-xl object-cover text-white text-xs')
        nameElem.setAttribute('class', 'text-sm font-semibold text-white px-3 mt-2 mb-1')
        ratingGenresElem.setAttribute('class', 'text-sm font-semibold text-white px-3 mb-1.5')

        mainAnchor.href = `singleItemInfo.html?param=${mainType + id}`
        image.src = `https://image.tmdb.org/t/p/w500${thumbnail}`
        image.alt = 'image unavailable'
        nameElem.innerHTML = name
        ratingGenresElem.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating.toFixed(1)}` + `<span class="ml-1.5 text-sm text-gray-500">${matchingNames[0]} • ${matchingNames[1] ? matchingNames[1] : 'Action'}</span>`


        mainAnchor.appendChild(image)
        mainAnchor.appendChild(nameElem)
        mainAnchor.appendChild(ratingGenresElem)
        similarMoviesSlider.appendChild(mainAnchor)
        loading = false
    }
    rightArrowSimilarMoviesSliderDiv.addEventListener('click', function (e) {
        e.preventDefault()
        similarMoviesSlider.scrollLeft += 500
    })

    leftArrowSimilarMoviesSlider.addEventListener('click', function (e) {
        e.preventDefault()
        similarMoviesSlider.scrollLeft -= 500
    })
    //Similar movies Slider Ends
}
else {

    //loading functionality starts
    const loader = document.querySelector('.loading')
    var loading = true
    //loading functionality ends    
    async function imagesForSeries() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/tv/${paramValue}/images`, options)
        const data = await response.json()
        return data
    }

    async function detailsForSeries() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/tv/${paramValue}?language=en-US&page=1`, options)
        const data = await response.json()
        return data
    }

    async function seriesCrew() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/tv/${paramValue}/credits?language=en-US&page=1`, options)
        const data = await response.json()
        return data
    }

    async function recommendedSeries() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/tv/${paramValue}/recommendations?language=en-US&page=1`, options)
        const data = await response.json()
        return data
    }

    async function similarSeries() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/tv/${paramValue}/similar?language=en-US&page=1`, options)
        const data = await response.json()
        return data
    }

    async function seasonsEpisodes(epiNum = 1) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${Api_Key}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/tv/${paramValue}/season/${epiNum}?language=en-US`, options)
        const data = await response.json()
        return data
    }

    const imagesListSeries = imagesForSeries()
    const seriesDetails = detailsForSeries()
    const crewMember = seriesCrew()
    const recommended = recommendedSeries()
    const similar = similarSeries()
    const episodes = seasonsEpisodes()

    const seasonsEpisodesDiv = document.querySelector('.seasonsEp')
    const recommendedH1 = document.querySelector('.recommendedH1 ')
    const recommendedH1Elem2 = document.querySelector('.recommendedH2 ')
    recommendedH1.innerHTML = 'Recommended Series'
    recommendedH1Elem2.innerHTML = 'Similar Series for you'

    //image Slider functionality starts
    const imagesSlider = document.querySelector('.imagesSlider')
    const imagesSliderDiv = document.querySelector('.imagesSliderDiv')
    const imagesSliderLeftArrow = document.querySelector('.leftArrowSlider')
    const imagesSliderRightArrow = document.querySelector('.rightArrowSlider')

    imagesListSeries.then((val) => {
        const valueArray = val.backdrops.slice(0, 20)
        if (valueArray.length < 1) {
            imagesSliderDiv.classList.add('hidden')
        }
        //const valueArray = val.logos.slice(0,20)
        //const valueArray = val.posters.slice(0,20)
        valueArray.map((items) => {
            const image = items.file_path
            imageSliderFunc(image)
        })
    })

    function imageSliderFunc(images) {
        const imageElem = document.createElement('img')
        imageElem.setAttribute('class', 'h-full min-w-full object-cover xl:object-contain')
        imageElem.src = `https://image.tmdb.org/t/p/w500${images}`
        imageElem.alt = 'image'
        imagesSlider.appendChild(imageElem)
    }

    imagesSliderRightArrow.addEventListener('click', function (e) {
        e.preventDefault()
        imagesSlider.scrollLeft += imagesSlider.clientWidth
    })

    imagesSliderLeftArrow.addEventListener('click', function (e) {
        e.preventDefault()
        imagesSlider.scrollLeft -= imagesSlider.clientWidth

    })
    //image Slider functionality ends

    //Series Details functionality starts
    const mainDiv = document.querySelector('.mainDiv')
    const seaonsNum = document.querySelector('.seriesSeasonNum')

    seriesDetails.then((val) => {
        const name = val.name
        const genres = val.genres
        const overview = val.overview
        const release = val.first_air_date
        const tagline = val.tagline
        const seasons = val.number_of_seasons
        const episodes = val.number_of_episodes
        let arrayGenres = []
        genres.map((items) => {
            arrayGenres.push(items.name)
        })
        moviesDetailsFunc(name, overview, release, tagline, arrayGenres, seasons, episodes)
        if (loading) {
            console.log('loading');
        } else {
            loader.classList.add('hidden')
        }
        document.title = name + "-" + tagline
    })

    function moviesDetailsFunc(name, overview, release, tagline, arrayGenres, seasons, episodes) {
        const mainDivElem = document.createElement('div')
        const elemDiv = document.createElement('div')
        const elemDiv1 = document.createElement('div')
        const elemDiv2 = document.createElement('div')
        const playNowElem = document.createElement('span')
        const watchlistElem = document.createElement('span')
        const shareElem = document.createElement('span')
        const likedElem = document.createElement('span')
        const downloadElem = document.createElement('span')
        const heading = document.createElement('h1')
        const nameElem = document.createElement('p')
        const infoElem = document.createElement('p')
        const summaryElem = document.createElement('p')

        //Seasons Functionality starts
        for (let index = 1; index <= seasons; index++) {
            const div = document.createElement('div')
            const p = document.createElement('p')
            div.setAttribute('class', 'h-full min-w-32')
            p.setAttribute('id', index)
            p.setAttribute('class', 'seasonsNum h-full text-white text-lg font-bold cursor-pointer')
            p.innerHTML = 'Season ' + index
            div.appendChild(p)
            seaonsNum.appendChild(div)
            const seasons = document.querySelectorAll('.seasonsNum')
            let a = seasons[0]
            a.classList.add('underline', 'underline-offset-8')
            seasons.forEach(span => {
                span.addEventListener('click', () => {
                    seasons.forEach(s => {
                        s.classList.remove('underline', 'underline-offset-8');
                    });
                    span.classList.add('underline', 'underline-offset-8');
                });
            });
            p.addEventListener('click', function (e) {
                e.preventDefault()
                seasonsEpisodesDiv.innerHTML = ''
                const id = e.target.id
                const episodes = seasonsEpisodes(id)
                episodes.then((val) => {
                    const epArr = val.episodes
                    epArr.map((items) => {
                        //console.log(items);
                        const date = items.air_date
                        const epNum = items.episode_number
                        const image = items.still_path
                        seasonEpFunc(date, epNum, image)
                    })
                })
            })
        }
        //Seasons Functionality ends

        //setting attributes to the elements and also setting css
        infoElem.setAttribute('class', 'text-xs text-gray-500 font-newFont md:text-sm xl:text-base')
        mainDivElem.setAttribute('class', 'h-auto w-full px-3 mt-5 flex flex-col')
        nameElem.setAttribute('class', 'h-auto w-full text-white text-2xl font-bold font-newFont md:text-4xl xl:text-5xl')
        elemDiv.setAttribute('class', 'h-auto w-full flex justify-between items-center my-3')
        elemDiv1.setAttribute('class', 'h-auto w-72 flex justify-evenly items-center md:justify-between sm:w-80 md:w-96')
        elemDiv2.setAttribute('class', 'h-auto w-40 flex justify-evenly items-center sm:w-80 lg:w-[440px]')
        playNowElem.setAttribute('class', 'p-2 px-6 bg-green-400 mx-1 rounded-xl cursor-pointer text-sm flex items-center justify-center text-white font-newFont font-bold gap-2 active:bg-green-600 md:px-8 md:hover:bg-green-600 sm:text-lg md:hover:scale-105 md:duration-300 md:p-3 md:gap-3 md:px-7')
        watchlistElem.setAttribute('class', 'p-2 cursor-pointer border-[1px] border-white flex justify-center gap-2 items-center rounded-lg sm:p-1.5 md:p-2.5 md:px-6 active:bg-slate-500 md:hover:bg-slate-500 md:duartion-300')
        likedElem.setAttribute('class', 'p-2 border-[1px] border-white flex cursor-pointer justify-center items-center rounded-lg sm:gap-2 sm:px-4 md:p-2.5 md:px-6 active:bg-slate-500 md:hover:bg-slate-500 md:duartion-300')
        downloadElem.setAttribute('class', 'p-2 border-[1px] border-white flex cursor-pointer justify-center items-center rounded-lg sm:gap-2 sm:px-4 md:p-2.5 md:px-6 active:bg-slate-500 md:hover:bg-slate-500 md:duartion-300')
        shareElem.setAttribute('class', 'p-2 border-[1px] border-white  rounded-lg hidden lg:flex lg:justify-center lg:items-center lg:gap-2 lg:p-2.5 lg:px-6 active:bg-slate-500 md:hover:bg-slate-500 md:duartion-300')
        heading.setAttribute('class', 'text-white text-xl font-semibold font-newFont mt-5 md:text-2xl xl:text-3xl')
        summaryElem.setAttribute('class', 'text-lg text-gray-300 font-semibold font-mono my-3 md:text-xl xl:text-2xl')

        //appending content inside elements
        playNowElem.innerHTML = '<span class="mx-1 w-5 h-5 bg-white rounded-full flex justify-center items-center sm:p-3"><i class="fa-solid fa-play" style="color: #4ade80;"></i></span><span class="h-6 w-auto flex justify-center items-center lg:text-lg">Play Now</span>'
        watchlistElem.innerHTML = '<i class="fa-regular fa-bookmark" style="color: #ffffff;"></i>' + '<span class="hidden font-newFont text-white text-lg sm:inline"> Add Watchlist</span>'
        nameElem.innerHTML = name
        infoElem.innerHTML = seasons + `${seasons === 1 ? ' Season ' : ' Seasons '}` + episodes + ' Episodes' + " • " + release.slice(0, 4) + " • " + arrayGenres
        likedElem.innerHTML = '<i class="fa-regular fa-thumbs-up" style="color: #ffffff;"></i>' + '<span class="text-white hidden font-newFont text-lg sm:inline"> Like</span>'
        downloadElem.innerHTML = '<i class="fa-solid fa-download" style="color: #ffffff;"></i>' + '<span class="text-white hidden font-newFont text-lg sm:inline"> Download</span>'
        shareElem.innerHTML = '<i class="fa-solid fa-share-nodes" style="color: #ffffff;"></i>' + '<span class="text-white font-newFont text-lg"> Share</span>'
        heading.innerHTML = 'Story Line :'
        summaryElem.innerHTML = overview + tagline

        //appending elements
        elemDiv1.appendChild(playNowElem)
        elemDiv1.appendChild(watchlistElem)
        elemDiv2.appendChild(likedElem)
        elemDiv2.appendChild(downloadElem)
        elemDiv2.appendChild(shareElem)
        elemDiv.appendChild(elemDiv1)
        elemDiv.appendChild(elemDiv2)
        mainDivElem.appendChild(nameElem)
        mainDivElem.appendChild(infoElem)
        mainDivElem.appendChild(elemDiv)
        mainDivElem.appendChild(heading)
        mainDivElem.appendChild(summaryElem)
        mainDiv.appendChild(mainDivElem)
        loading = false
        let a = document.querySelector('html')
        if (a.clientWidth < '640') {
            watchlistElem.addEventListener('click', function (e) {
                e.preventDefault()
                watchlistElem.classList.toggle('bg-slate-500')
            })
            likedElem.addEventListener('click', function (e) {
                e.preventDefault()
                likedElem.classList.toggle('bg-slate-500')
            })
        } else {
            watchlistElem.addEventListener('click', function (e) {
                e.preventDefault()
                watchlistElem.classList.add('bg-slate-500')
                watchlistElem.innerHTML = '<i class="fa-regular fa-bookmark" style="color: #ffffff;"></i>' + '<span class="hidden font-newFont text-white text-lg sm:inline"> Added</span>'
            })
            likedElem.addEventListener('click', function (e) {
                e.preventDefault()
                likedElem.classList.add('bg-slate-500')
                likedElem.innerHTML = '<i class="fa-regular fa-thumbs-up" style="color: #ffffff;"></i>' + '<span class="text-white hidden font-newFont text-lg sm:inline"> Liked</span>'
            })
        }
    }
    //Series Details functionality ends

    //Top Cast functionality starts
    const topCastSlider = document.querySelector('.topCastSlider')
    const topCastSliderMainDiv = document.querySelector('.topCastSliderMainDiv')
    const leftArrowTopCastSlider = document.querySelector('.leftArrowTopCastSlider')
    const rightArrowTopCastSlider = document.querySelector('.rightArrowTopCastSlider')

    crewMember.then((val) => {
        const cast = val.cast.slice(0, 15)
        if (cast.length < 1) {
            topCastSliderMainDiv.classList.add('hidden')
        }
        cast.map((items) => {
            //console.log(items);
            const characterName = items.character
            const realName = items.original_name
            const image = items.profile_path
            topCastFunc(image, characterName, realName)
            if (loading) {
                console.log('loading');
            } else {
                loader.classList.add('hidden')
            }
        })
    })

    function topCastFunc(images, characterName, realName) {
        const castSlider = document.createElement('div')
        const imgDiv = document.createElement('div')
        const infoDiv = document.createElement('div')
        const imageSpanElem = document.createElement('span')
        const image = document.createElement('img')
        const charName = document.createElement('p')
        const realNameElem = document.createElement('p')

        castSlider.setAttribute('class', 'h-20 w-auto flex justify-center gap-2 items-center')
        imgDiv.setAttribute('class', 'h-20 w-24 flex justify-center items-center')
        infoDiv.setAttribute('class', 'h-full w-auto flex flex-col justify-center')
        imageSpanElem.setAttribute('class', 'h-20 w-24 rounded-full p-3 flex justify-center items-center')
        image.setAttribute('class', 'h-20 w-24 rounded-full object-cover text-white text-xs')
        charName.setAttribute('class', 'h-auto w-32 font-semibold text-white text-sm font-newFont lg:text-lg lg:w-40')
        realNameElem.setAttribute('class', 'h-auto w-32 font-semibold text-gray-500 text-xs font-newFont lg:text-base lg:w-40')

        image.src = `https://image.tmdb.org/t/p/w500${images}`
        image.alt = 'image Unavailable'
        charName.innerHTML = characterName.slice(0, 30)
        realNameElem.innerHTML = realName.slice(0, 20)

        imageSpanElem.appendChild(image)
        imgDiv.appendChild(imageSpanElem)
        infoDiv.appendChild(charName)
        infoDiv.appendChild(realNameElem)
        castSlider.appendChild(imgDiv)
        castSlider.appendChild(infoDiv)
        topCastSlider.appendChild(castSlider)
        loading = false
    }

    rightArrowTopCastSlider.addEventListener('click', function (e) {
        e.preventDefault()
        topCastSlider.scrollLeft += 300
    })

    leftArrowTopCastSlider.addEventListener('click', function (e) {
        e.preventDefault()
        topCastSlider.scrollLeft -= 300

    })
    //Top Cast functionality ends

    //Recommended movies slider starts
    const recommendedMoviesSlider = document.querySelector('.recommendedMoviesSlider')
    const recommendedMoviesSliderDiv = document.querySelector('.recommendedMoviesSliderDiv')
    const leftArrowRecommendedMoviesSlider = document.querySelector('.leftArrowRecommendedMoviesSlider')
    const rightArrowRecommendedMoviesSliderDiv = document.querySelector('.rightArrowRecommendedMoviesSlider')

    recommended.then((val) => {
        const arrMovie = val.results
        if (arrMovie.length < 1) {
            recommendedMoviesSliderDiv.classList.add('hidden')
        }
        arrMovie.map((items) => {
            let thumbnail = items.backdrop_path ? items.backdrop_path : items.poster_path
            if (thumbnail) {
                const id = items.id
                const name = items.name
                const rating = items.vote_average
                const genres = items.genre_ids
                const type = items.media_type
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
                recommendedMoviesFunc(name, rating, thumbnail, matchingNames, type, id)
                if (loading) {
                    console.log('loading');
                } else {
                    loader.classList.add('hidden')
                }
            }
        })
    })

    function recommendedMoviesFunc(name, rating, thumbnail, matchingNames, type, id) {
        const mainAnchor = document.createElement('a')
        const image = document.createElement('img')
        const nameElem = document.createElement('p')
        const ratingGenresElem = document.createElement('p')
        const mainType = 'series'

        mainAnchor.setAttribute('class', 'h-full min-w-[64vw] flex flex-col sm:min-w-[44vw] md:min-w-[35vw] lg:min-w-[30vw] xl:min-w-[24vw] 2xl:min-w-[19vw]')
        image.setAttribute('class', 'h-40 w-full rounded-xl object-cover text-white text-xs')
        nameElem.setAttribute('class', 'text-sm font-semibold text-white px-3 mt-2 mb-1')
        ratingGenresElem.setAttribute('class', 'text-sm font-semibold text-white px-3 mb-1.5')

        mainAnchor.href = `singleItemInfo.html?param=${mainType + id}`
        image.src = `https://image.tmdb.org/t/p/w500${thumbnail}`
        image.alt = 'image unavailable'
        nameElem.innerHTML = name
        ratingGenresElem.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating.toFixed(1)}` + `<span class="ml-1.5 text-sm text-gray-500">${matchingNames[0]} • ${type.toUpperCase()}</span>`


        mainAnchor.appendChild(image)
        mainAnchor.appendChild(nameElem)
        mainAnchor.appendChild(ratingGenresElem)
        recommendedMoviesSlider.appendChild(mainAnchor)
        loading = false
    }

    rightArrowRecommendedMoviesSliderDiv.addEventListener('click', function (e) {
        e.preventDefault()
        recommendedMoviesSlider.scrollLeft += 500
    })

    leftArrowRecommendedMoviesSlider.addEventListener('click', function (e) {
        e.preventDefault()
        recommendedMoviesSlider.scrollLeft -= 500
    })
    //Recommended movies slider ends

    //Similar movies Slider Starts
    const similarMoviesSlider = document.querySelector('.similarMoviesSlider')
    const similarMoviesSliderDiv = document.querySelector('.similarMoviesSliderDiv')
    const leftArrowSimilarMoviesSlider = document.querySelector('.leftArrowSimilarMoviesSlider')
    const rightArrowSimilarMoviesSliderDiv = document.querySelector('.rightArrowSimilarMoviesSlider')

    similar.then((val) => {
        const arrSimilar = val.results
        if (arrSimilar.length < 1) {
            similarMoviesSliderDiv.classList.add('hidden')
        }
        arrSimilar.map((items) => {
            let thumbnail = items.backdrop_path ? items.backdrop_path : items.poster_path
            if (thumbnail) {
                const id = items.id
                const name = items.name
                const rating = items.vote_average
                const genres = items.genre_ids
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
                similarMoviesFunc(name, rating, thumbnail, matchingNames, id)
                if (loading) {
                    console.log('loading');
                } else {
                    loader.classList.add('hidden')
                }
            }
        })
    })

    function similarMoviesFunc(name, rating, thumbnail, matchingNames, id) {
        const mainAnchor = document.createElement('a')
        const image = document.createElement('img')
        const nameElem = document.createElement('p')
        const ratingGenresElem = document.createElement('p')
        const mainType = 'movies'

        mainAnchor.setAttribute('class', 'h-full min-w-[64vw] flex flex-col sm:min-w-[44vw] md:min-w-[35vw] lg:min-w-[30vw] xl:min-w-[24vw] 2xl:min-w-[19vw]')
        image.setAttribute('class', 'h-40 w-full rounded-xl object-cover text-white text-xs')
        nameElem.setAttribute('class', 'text-sm font-semibold text-white px-3 mt-2 mb-1')
        ratingGenresElem.setAttribute('class', 'text-sm font-semibold text-white px-3 mb-1.5')

        mainAnchor.href = `singleItemInfo.html?param=${mainType + id}`
        image.src = `https://image.tmdb.org/t/p/w500${thumbnail}`
        image.alt = 'image unavailable'
        nameElem.innerHTML = name
        ratingGenresElem.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating.toFixed(1)}` + `<span class="ml-1.5 text-sm text-gray-500">${matchingNames[0]} • ${matchingNames[1] ? matchingNames[1] : 'Action'}</span>`


        mainAnchor.appendChild(image)
        mainAnchor.appendChild(nameElem)
        mainAnchor.appendChild(ratingGenresElem)
        similarMoviesSlider.appendChild(mainAnchor)
        loading = false
    }

    rightArrowSimilarMoviesSliderDiv.addEventListener('click', function (e) {
        e.preventDefault()
        similarMoviesSlider.scrollLeft += 500
    })

    leftArrowSimilarMoviesSlider.addEventListener('click', function (e) {
        e.preventDefault()
        similarMoviesSlider.scrollLeft -= 500
    })
    //Similar movies Slider Ends

    //Seasons and Episodes functionality starts
    const seaonsNumDiv = document.querySelector('.seriesSeasonDiv')
    const leftArrowSeasonSlider = document.querySelector('.leftArrowSeasonSlider')
    const rightArrowSeasonSlider = document.querySelector('.rightArrowSeasonSlider')
    seaonsNumDiv.classList.remove('hidden')
    episodes.then((val) => {
        const epArr = val.episodes
        epArr.map((items) => {
            //console.log(items);
            const date = items.air_date
            const epNum = items.episode_number
            const image = items.still_path
            seasonEpFunc(date, epNum, image)
            if (loading) {
                console.log('loading');
            } else {
                loader.classList.add('hidden')
            }
        })
    })

    function seasonEpFunc(date, epNum, image) {
        const mainDiv = document.createElement('div')
        const imgDiv = document.createElement('div')
        const img = document.createElement('img')
        const epNumElem = document.createElement('p')
        const dateElem = document.createElement('p')

        mainDiv.setAttribute('class', 'group h-auto w-full flex justify-center shadow-lg shadow-gray-900 border-[1px] border-gray-600 rounded-md sm:min-w-80 cursor-pointer')
        imgDiv.setAttribute('class', 'h-auto w-full min-h-20 text-xs text-white relative sm:h-full')
        img.setAttribute('class', 'h-auto min-w-full object-contain rounded-md sm:h-full sm:group-hover:opacity-60 group-active:opacity-60')
        epNumElem.setAttribute('class', 'text-white font-bold text-lg absolute bottom-0 left-1 sm:bottom-3')
        dateElem.setAttribute('class', 'text-gray-300 font-bold text-xs text-end absolute bottom-0 right-2 sm:bottom-1')

        img.src = `https://image.tmdb.org/t/p/w500${image}`
        img.alt = 'image unavailable'
        epNumElem.innerHTML = 'Episode No. ' + epNum
        dateElem.innerHTML = date


        imgDiv.appendChild(img)
        imgDiv.appendChild(epNumElem)
        imgDiv.appendChild(dateElem)
        mainDiv.appendChild(imgDiv)
        seasonsEpisodesDiv.appendChild(mainDiv)
        loading = false
    }
    rightArrowSeasonSlider.addEventListener('click', function (e) {
        e.preventDefault()
        seasonsEpisodesDiv.scrollLeft += 500
    })

    leftArrowSeasonSlider.addEventListener('click', function (e) {
        e.preventDefault()
        seasonsEpisodesDiv.scrollLeft -= 500
    })
    //Seasons and Episodes functionality ends
}