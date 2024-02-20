const header = document.querySelector('.header')
const header2 = document.querySelector('.header2')
const mainForm = document.querySelector('.loginForm')
const passwordType = document.querySelector('.password')
const showIcon = document.querySelector('.icons')
const username = document.querySelector('.username')
const password = document.querySelector('.password')
const submitBtn = document.querySelector('.loginBtn')

//settimeout for both header animations
setTimeout(() => {
    header.setAttribute('class','header absolute animate-[comesontop_1s_ease-in-out] text-white font-newFont text-2xl top-[10vh] font-bold md:text-3xl xl:text-5xl')
    header2.setAttribute('class','header2 absolute text-white animate-[comesontop2_1s_ease-in-out] text-[10px] top-[14vh] font-semibold font-newFont md:text-lg lg:top-[15vh] xl:text-2xl xl:top-[16vh')
}, 3000);

//settimeout for chaning login form opacity
setTimeout(() => {
    mainForm.classList.add('opacity-80')
}, 4000);

//eventlistner for show password icon 
showIcon.addEventListener('click',function(e){
    e.preventDefault()
    if(passwordType.type ==='password'){
        passwordType.type = 'text'
        showIcon.classList.add('fa-eye')
        showIcon.classList.remove('fa-eye-slash')
    }
    else{
        passwordType.type = 'password'
        showIcon.classList.remove('fa-eye')
        showIcon.classList.add('fa-eye-slash')
    }
})

//username and password field will be empty when user reloads.
if(window.location.reload){
    username.value = ''
    password.value = ''
}

//eventlistner for login button to another webpage
submitBtn.addEventListener('click',function(e){
    e.preventDefault()
    if(username.value.length>='4' && password.value.length >= '4'){
        window.location.href = `mainWindow.html?param=${username.value}`;
    }
    else{
        alert('Enter Username and password.(Type Anything That would be more than 4 words or Continue as Guest)')
    }
})

