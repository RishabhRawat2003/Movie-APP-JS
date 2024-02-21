const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');


async function topBoxOffice() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'daf59ec7bamsh1a62797a8782ef7p12ae99jsna6c0fc4a8c54',
            'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
        }
    };

    const response = await fetch('https://moviesverse1.p.rapidapi.com/top-box-office', options)
    const data = await response.json()
    return data
}

const topMovie = topBoxOffice()


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
