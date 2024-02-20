const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');
console.log(paramValue)



async function topBoxOffice(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'daf59ec7bamsh1a62797a8782ef7p12ae99jsna6c0fc4a8c54',
            'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
        }
    };

    const response = await fetch('https://moviesverse1.p.rapidapi.com/top-box-office',options)
    const data = await response.json()
    return data
}

const topMovie = topBoxOffice()




const sideBarIcon = document.querySelector('.sidebarIcon')
const dropDown = document.querySelector('.dropDownSidebar')
const userNameFirstLetter = document.querySelector('.firstLetter')
const userName = document.querySelector('.userName')
const userNameFirstLetter2 = document.querySelector('.firstLetter2') //for big screens
const userName2 = document.querySelector('.userName2') //for big screens
const editProfile = document.querySelector('.editProfile')
const loginLogout = document.querySelector('.loginLogout')

userNameFirstLetter.innerHTML = paramValue.slice(0,1)
userNameFirstLetter2.innerHTML = paramValue.slice(0,1)


sideBarIcon.addEventListener('click',function(e){
    e.preventDefault()
    const trueOrFalse = sideBarIcon.classList.contains('fa-bars-staggered')
    if(trueOrFalse){
        sideBarIcon.classList.remove('fa-bars-staggered')
        sideBarIcon.classList.add('fa-xmark')
        dropDown.setAttribute('class','dropDownSidebar bg-slate-700 opacity-90 h-80 w-44 absolute top-16 right-5 rounded-md')
    }
    else{
        sideBarIcon.classList.remove('fa-xmark')
        sideBarIcon.classList.add('fa-bars-staggered')
        dropDown.setAttribute('class','dropDownSidebar bg-slate-700 hidden opacity-90 h-0 w-44 absolute top-16 right-5 rounded-md')
    }
})

if(paramValue==='Guest'){
    userName.innerHTML = paramValue + ' Account'
    userName2.innerHTML = paramValue + ' Account'
    loginLogout.innerHTML = 'Login'
    editProfile.classList.add('hidden')
    loginLogout.addEventListener('click',function(e){
        e.preventDefault()
        window.location.href = 'index.html'
    })
}else{
    userName.innerHTML = paramValue.slice(0,8)
    userName2.innerHTML = paramValue.slice(0,8)
    editProfile.classList.remove('hidden')
    loginLogout.innerHTML = 'Logout'
    editProfile.classList.remove('hidden')
}
