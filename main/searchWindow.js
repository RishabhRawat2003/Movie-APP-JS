const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');
const paramValue2 = urlParams.get('param1')

const Api_Key = 'API_KEY'

async function search() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${Api_Key}`
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${paramValue2}&include_adult=false&language=en-US&page=1`, options)
    const data = await response.json()
    return data
}

const searchItem = search()

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
const homeBtn = document.querySelectorAll('.homeBtn')
const moviesNews = document.querySelectorAll('.moviesNews')
const genreBtn = document.querySelectorAll('.genreBtn')
const about = document.querySelectorAll('.about')

homeBtn.forEach((items) => {
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `mainWindow.html?param=${paramValue}`;
    })
})

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


//body Functionality starts
const searchH1 = document.querySelector('.searchH1')
const searchResultsDiv = document.querySelector('.searchResultsDiv')

searchH1.innerHTML = 'Search Result For :' + `<span class="text-white font-semibold"> ${paramValue2}</span>`
document.title = 'Search For : ' + paramValue2

searchItem.then((val) => {
    const searchResults = val.results
    if(searchResults.length<1){
        searchResultsDiv.innerHTML = `<span class="text-white text-lg font-bold">No Result Found For : ${paramValue2}</span>`
     }
    searchResults.map((items) => {
        //console.log(items);
        if(items.poster_path){
            if (items.media_type === 'movie' || items.media_type === 'tv') {
                const image = items.poster_path
                const name = items.name || items.original_name || items.title || items.original_title
                const type = items.media_type
                const id = items.id
                const rating = items.vote_average || items.popularity
                searchResultsFunc(name, image, type, id, rating)
            }
        }
    })
})

function searchResultsFunc(name, thumbnail, type, id, rating) {
    let anchor = document.createElement('a')
    let img = document.createElement('img')
    let title = document.createElement('p')
    let ratingStar = document.createElement('p')
    let media_type = type ==='movie' ? 'movies' : 'series'

    //setting attributes and css
    anchor.setAttribute('class', 'h-60 w-40 relative rounded-md shadow-lg border-[1px] border-gray-700 sm:h-64 sm:w-48')
    img.setAttribute('class', 'h-full min-w-full object-cover rounded-md opacity-60 text-white text-xs')
    title.setAttribute('class', 'text-base text-slate-200 font-bold font-newFont absolute bottom-7 mx-2 md:text-lg md:my-2')
    ratingStar.setAttribute('class', 'text-sm mx-2 w-full text-white font-bold font-newFont absolute bottom-2 md:text-lg')

    //inserting content inside elements
    anchor.href = `singleItemInfo.html?param=${media_type + id}`
    img.src = `https://image.tmdb.org/t/p/w500${thumbnail}`
    img.alt = 'image unavailable'
    title.innerHTML = name
    ratingStar.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ${rating.toFixed(1)}` + `<span class="text-gray-400 text-xs md:text-base"> • ${type.toUpperCase()}</span>`

    //appending it in body
    anchor.appendChild(img)
    anchor.appendChild(title)
    anchor.appendChild(ratingStar)
    searchResultsDiv.appendChild(anchor)
}