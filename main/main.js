const header = document.querySelector('.header')
const header2 = document.querySelector('.header2')
const mainForm = document.querySelector('.loginForm')

setTimeout(() => {
    header.setAttribute('class','header absolute animate-[comesontop_1s_ease-in-out] text-white font-newFont text-2xl top-[10vh] font-bold md:text-3xl xl:text-5xl')
    header2.setAttribute('class','header2 absolute text-white animate-[comesontop2_1s_ease-in-out] text-base top-[14vh] font-semibold font-newFont md:text-lg lg:top-[15vh] xl:text-2xl xl:top-[16vh')
}, 3000);

setTimeout(() => {
    mainForm.classList.remove('opacity-0')
}, 4000);


