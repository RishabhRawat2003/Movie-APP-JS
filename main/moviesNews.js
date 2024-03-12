const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');

const Api_key = 'API_KEY'

async function moviesNews() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${Api_key}`,
            'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
        }
    };

    const response = await fetch('https://moviesverse1.p.rapidapi.com/get-movie-news', options)
    const data = await response.json()
    return data
}

async function celebritiesNews() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${Api_key}`,
            'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
        }
    };

    const response = await fetch('https://moviesverse1.p.rapidapi.com/get-celebrities-news', options)
    const data = await response.json()
    return data
}

const celebritieNews = celebritiesNews()
const movieNews = moviesNews()


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
const homeBtn = document.querySelectorAll('.homeBtn')
const genreBtn = document.querySelectorAll('.genreBtn')

genreBtn.forEach((items)=>{
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `genreWindow.html?param=${paramValue}`;
    
    })
})
homeBtn.forEach((items) => {
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `mainWindow.html?param=${paramValue}`;
    })
})

//Navbar Click Event Listener Functionality Ends
//Header Functionality Ends

//body Functionality Stars
const moviesNewsBtn = document.querySelector('.moviesNewsSpan')
const celebritieNewsBtn = document.querySelector('.celebritiesNewsSpan')
const ball = document.querySelector('.ball')
const moviesNewsDiv = document.querySelector('.newsAboutMovies')
const celebritiesNewsDiv = document.querySelector('.newsAboutCelebrities')
const footer = document.querySelector('.footer')
//Event Listener in MoviesNews and CelebritiesNews button Starts

celebritiesNewsDiv.classList.add('hidden')
moviesNewsBtn.addEventListener('click', function (e) {
    e.preventDefault()
    ball.classList.add('left-0')
    ball.classList.remove('right-0')
    ball.classList.remove('w-36')
    moviesNewsDiv.classList.remove('hidden')
    celebritiesNewsDiv.classList.add('hidden')
})
celebritieNewsBtn.addEventListener('click', function (e) {
    e.preventDefault()
    ball.classList.remove('left-0')
    ball.classList.add('right-0')
    ball.classList.add('w-36')
    celebritiesNewsDiv.classList.remove('hidden')
    moviesNewsDiv.classList.add('hidden')
})
//Event Listener in MoviesNews and CelebritiesNews button Ends

//Movies News Functionlaity stars
movieNews.then((val)=>{
    const allValues = val.news
    allValues.map((items)=>{
        //console.log(items);
        const mainImage = items.image
        const title = items.title
        const overview = items.description
        const mainLink = items.link
        moviesNewsFunc(mainImage , title , overview , mainLink)
    })
})

function moviesNewsFunc(mainImg , title , overview , mainLink){
    const mainDiv = document.createElement('a')
    const imageElm = document.createElement('img')
    const contentDiv = document.createElement('div')
    const titlePara = document.createElement('p')
    const overviewPara = document.createElement('p')

    mainDiv.setAttribute('class','w-full h-20 flex bg-slate-500 my-2 py-2 rounded-lg md:flex-col md:h-80 md:w-80 md:mx-3 md:py-0 xl:h-96 xl:py-3')
    imageElm.setAttribute('class','min-w-24 h-full object-cover rounded-lg md:min-w-full md:min-h-44')
    contentDiv.setAttribute('class','w-auto h-full ml-3 flex flex-col items-center md:gap-3')
    titlePara.setAttribute('class','w-auto h-auto text-xs text-white font-semibold font-newFont sm:text-sm md:mt-2 xl:text-base')
    overviewPara.setAttribute('class','w-auto h-auto text-slate-800 text-sm hidden md:block')

    imageElm.alt = 'img'
    overviewPara.innerHTML = overview.slice(0,100) + `<a href=${mainLink} class="text-sm text-indigo-700 font-semibold hover:text-blue-900 hover:underline">  See More</a>`
    titlePara.innerHTML = title
    imageElm.src = mainImg
    mainDiv.target = '_blank'
    mainDiv.href = mainLink

    contentDiv.appendChild(titlePara)
    contentDiv.appendChild(overviewPara)
    mainDiv.appendChild(imageElm)
    mainDiv.appendChild(contentDiv)
    moviesNewsDiv.appendChild(mainDiv)
    footer.classList.remove('hidden')
}
//Movies News Functionlaity ends

//Celebrities News Functionlaity stars
celebritieNews.then((val)=>{
    const allValues = val.news
    allValues.map((items)=>{
        //console.log(items);
        const mainImage = items.image
        const title = items.title
        const overview = items.description
        const mainLink = items.link
        celebritiesNewsFunc(mainImage , title , overview , mainLink)
    })
})

function celebritiesNewsFunc(mainImg , title , overview , mainLink){
    const mainDiv = document.createElement('a')
    const imageElm = document.createElement('img')
    const contentDiv = document.createElement('div')
    const titlePara = document.createElement('p')
    const overviewPara = document.createElement('p')

    mainDiv.setAttribute('class','w-full h-20 flex bg-slate-500 my-2 py-2 rounded-lg md:flex-col md:h-80 md:w-80 md:mx-3 md:py-0 xl:h-96 xl:py-3')
    imageElm.setAttribute('class','min-w-24 h-full object-cover rounded-lg md:min-w-full md:min-h-44')
    contentDiv.setAttribute('class','w-auto h-full ml-3 flex flex-col items-center md:gap-3')
    titlePara.setAttribute('class','w-auto h-auto text-xs text-white font-semibold font-newFont sm:text-sm md:mt-2 xl:text-base')
    overviewPara.setAttribute('class','w-auto h-auto text-slate-800 text-sm hidden md:block')

    imageElm.alt = 'img'
    overviewPara.innerHTML = overview.slice(0,100) + `<a href=${mainLink} class="text-sm text-indigo-700 font-semibold hover:text-blue-900 hover:underline">  See More</a>`
    titlePara.innerHTML = title
    imageElm.src = mainImg
    mainDiv.target = '_blank'
    mainDiv.href = mainLink

    contentDiv.appendChild(titlePara)
    contentDiv.appendChild(overviewPara)
    mainDiv.appendChild(imageElm)
    mainDiv.appendChild(contentDiv)
    celebritiesNewsDiv.appendChild(mainDiv)
}
//Celebrities News Functionlaity ends
