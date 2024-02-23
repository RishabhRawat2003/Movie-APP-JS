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
        const trailer = items.url
        console.log(items)
        silderImages(images,name,genres,year,summary ,rating,trailer,id)
    })
})

function silderImages(img,nameOfTheShow ,generes, year , summary , rating ,trailer,id) {
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
    yearGenres.setAttribute('class','absolute bottom-52 mx-5 w-full z-10 text-gray-400 font-bold text-sm font-newFont')
    image.setAttribute('class', 'min-h-full min-w-full object-cover opacity-40 overflow-hidden')
    anchor.setAttribute('class', 'min-h-full min-w-full overflow-hidden')
    name.setAttribute('class','absolute bottom-60 mx-5 w-full z-10 text-white font-bold text-4xl font-newFont')
    summaryText.setAttribute('class','absolute bottom-20 w-[94%] ml-5 z-10 text-white text-xs font-bold font-newFont')
    ratingStar.setAttribute('class','absolute top-2 z-10 mx-4 w-14 text-white font-bold text-lg')
    div.setAttribute('class', 'absolute bottom-0 z-10 w-[97%] my-4 h-auto flex justify-evenly items-center')
    watchTrailer.setAttribute('class','p-3 bg-green-400 mx-1 rounded-xl cursor-pointer text-sm flex text-white font-newFont font-bold z-10 ')
    watchlist.setAttribute('class','text-white p-3 border-[1px] border-white rounded-xl text0sm font-newFont font-bold z-10 ')

    
    //appending content inside elements
    watchTrailer.target = '_blank'
    watchTrailer.href = trailer
    watchTrailer.innerHTML = '<span class="mx-1 w-5  bg-white rounded-full flex justify-center items-center"><i class="fa-solid fa-play" style="color: #4ade80;"></i></span> Watch Trailer'
    watchlist.innerHTML = '<i class="fa-regular fa-bookmark mx-1"></i> Add Watchlist'
    ratingStar.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating}`
    summaryText.innerHTML += `${summary.slice(0,350)} <a href='singleItemInfo.html?param=${id}' class='text-blue-500 select-none cursor-pointer active:text-blue-700 active:underline font-bold font-newFont'>See More</a> `
    yearGenres.innerHTML += `${year.slice(0,4)} • ${generes}`
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
    if(slides.scrollLeft >= a){
        slides.scrollLeft = 0
    }else{
        slides.scrollLeft += slides.firstElementChild.offsetWidth
    }
    console.log(slides.scrollLeft);
}, 7000);
