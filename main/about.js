const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');

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
const genreBtn = document.querySelectorAll('.genreBtn')

homeBtn.forEach((items) => {
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `mainWindow.html?param=${paramValue}`;
    })
})
moviesNews.forEach((items)=>{
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `moviesNews.html?param=${paramValue}`;
    
    })
})
genreBtn.forEach((items)=>{
    items.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.href = `genreWindow.html?param=${paramValue}`;
    
    })
})


//Navbar Click Event Listener Functionality Ends
//Header Functionality Ends