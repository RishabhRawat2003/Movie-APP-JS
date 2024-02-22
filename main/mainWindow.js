const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');

async function allShows() {
    const response = await fetch('https://api.tvmaze.com/shows')
    const data = await response.json()
    return data
}

const shows = allShows()




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
        dropDown.setAttribute('class', 'dropDownSidebar bg-slate-700 opacity-90 h-80 w-44 absolute top-16 right-5 rounded-md')
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
        console.log(items)
        silderImages(images,name,genres,year,summary)
    })
})

function silderImages(img,nameOfTheShow ,generes, year , summary) {
    let anchor = document.createElement('a')
    let image = document.createElement('img')
    let name = document.createElement('span')
    let yearGenres = document.createElement('p')
    let summaryText = document.createElement('span')
    let watchTrailer = document.createElement('span')
    let watchlist = document.createElement('span')
    yearGenres.setAttribute('class','absolute bottom-52 mx-5 w-full z-10 text-gray-400 font-bold text-sm font-newFont')
    summaryText.setAttribute('class','absolute mt-2 bottom-16 mx-5 w-80 z-10 text-white font-bold text-xs font-newFont')
    image.setAttribute('class', 'min-h-full min-w-full object-cover opacity-40 overflow-hidden')
    anchor.setAttribute('class', 'min-h-full min-w-full overflow-hidden')
    name.setAttribute('class','absolute bottom-60 mx-5 w-full z-10 text-white font-bold text-4xl font-newFont')
    watchTrailer.setAttribute('class','absolute bottom-0 mx-5 w-40 z-10 text-white font-bold text-lg font-newFont')
    watchlist.setAttribute('class','absolute top-0 mx-5 w-40 z-10 text-white font-bold text-lg font-newFont')
    summaryText.innerHTML += `${summary.slice(0,400)} <a class="select-none text-blue-500 cursor-pointer active:underline active:text-blue-700">See More</a>` 
    yearGenres.innerHTML += `${year.slice(0,4)} • ${generes}`
    watchTrailer.innerHTML = 'Watch trailer'
    watchlist.innerHTML = 'Add Watchlist'
    name.innerHTML = nameOfTheShow
    image.src = img
    anchor.appendChild(name)
    anchor.appendChild(yearGenres)
    anchor.appendChild(summaryText)
    anchor.appendChild(watchTrailer)
    anchor.appendChild(watchlist)
    anchor.appendChild(image)
    slides.appendChild(anchor)
}

/*
setInterval(() => {
    let a = slides.firstElementChild.offsetWidth * 9
    if(slides.scrollLeft >= a){
        slides.scrollLeft = 0
    }else{
        slides.scrollLeft += slides.firstElementChild.offsetWidth
    }
    console.log(slides.scrollLeft);
}, 7000);
*/