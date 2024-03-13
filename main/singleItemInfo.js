const urlParams = new URLSearchParams(window.location.search);
const paramValue1 = urlParams.get('param');
const paramValue = paramValue1.slice(6)
const moviesOrSeriesParam = paramValue1.slice(0, 6)


const Api_Key = 'API_KEY'


if (moviesOrSeriesParam === 'movies') {

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

    const imagesListMovies = imagesForMovies()
    const moviesDetails = detailsForMovies()
    const crewMember = moviesCrew()

    //image Slider functionality starts
    const imagesSlider = document.querySelector('.imagesSlider')
    const imagesSliderLeftArrow = document.querySelector('.leftArrowSlider')
    const imagesSliderRightArrow = document.querySelector('.rightArrowSlider')

    imagesListMovies.then((val) => {
        const valueArray = val.backdrops.slice(0, 20)
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
    }
    //moviesDetails functionality ends

    //Top Cast functionality stars
    const topCastSlider = document.querySelector('.topCastSlider')

    crewMember.then((val)=>{
        const cast = val.cast
        const heading = document.createElement('h1')
        heading.setAttribute('class','my-4 px-3 text-lg text-white font-semibold font-newFont')
        heading.innerHTML = 'Top Cast :'
        mainDiv.appendChild(heading)
        cast.map((items)=>{
            //console.log(items);
            const characterName = items.character
            const realName = items.original_name
            const image = items.profile_path 
            topCastFunc(image , characterName , realName)
            
        })
    })

    function topCastFunc(images , characterName , realName){
        const castSlider = document.createElement('div')
        const imgDiv = document.createElement('div')
        const infoDiv = document.createElement('div')
        const image = document.createElement('img')
        const charName = document.createElement('p')
        const realNameElem = document.createElement('p')

        castSlider.setAttribute('class','h-20 w-auto flex justify-center items-center')
        imgDiv.setAttribute('class','h-full w-auto flex justify-center items-center')
        infoDiv.setAttribute('class','h-full w-auto flex flex-col')
        image.setAttribute('class','rounded-full p-3 object-cover flex justify-center items-center')
        charName.setAttribute('class','text-white text-sm font-newFont')
        realNameElem.setAttribute('class','text-gray-500 text-xs font-newFont')

        image.src = `https://image.tmdb.org/t/p/w500${images==='null'?'' : images}`
        image.alt = 'image'
        charName.innerHTML = characterName
        realNameElem.innerHTML = realName

        imgDiv.appendChild(image)
        infoDiv.appendChild(charName)
        infoDiv.appendChild(realNameElem)
        castSlider.appendChild(imgDiv)
        castSlider.appendChild(infoDiv)
        topCastSlider.appendChild(castSlider)
    }

    //Top Cast functionality stars
}
else {
    console.log('will make for series');
}