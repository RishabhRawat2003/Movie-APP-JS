const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');
console.log(paramValue);

async function allShowsInfo() {
    const response = await fetch(`https://api.tvmaze.com/shows/${paramValue}`)
    const data = await response.json()
    return data
}
async function allShowsSeasonsInfo() {
    const response = await fetch(`https://api.tvmaze.com/shows/${paramValue}/seasons`)
    const data = await response.json()
    return data
}
async function allShowsImages() {
    const response = await fetch(`https://api.tvmaze.com/shows/${paramValue}/images`)
    const data = await response.json()
    return data
}
async function allShowsCrewDetails() {
    const response = await fetch(`https://api.tvmaze.com/shows/${paramValue}/crew`)
    const data = await response.json()
    return data
}

const allShowDetails = allShowsInfo()
const allShowSeasonsDetails = allShowsSeasonsInfo()
const allShowImagesList = allShowsImages()
const allShowsCrewDetailsList = allShowsCrewDetails()

//console.log(allShowDetails);
//console.log(allShowSeasonsDetails);

//body functionality starts
const detailsDiv = document.querySelector('.mainDiv')
const imagesSliderDiv = document.querySelector('.imagesSlider')
const SliderArrowLeft = document.querySelector('.leftArrowSlider')
const SliderArrowRight = document.querySelector('.rightArrowSlider')


//Slider functionality starts
allShowImagesList.then((val) => {
    const imagesList = val
    imagesList.map((items) => {
        if (items.type === 'background') {
            const imagesForSlider = items.resolutions.original.url
            imagesSlider(imagesForSlider)
        }
    })
})

function imagesSlider(images) {
    const imagesElem = document.createElement('img')
    imagesElem.setAttribute('class', 'min-h-full min-w-full object-cover lg:object-contain')
    imagesElem.src = images
    imagesElem.alt = 'img'
    imagesSliderDiv.appendChild(imagesElem)
}

SliderArrowRight.addEventListener('click', function (e) {
    e.preventDefault()
    imagesSliderDiv.scrollLeft += imagesSliderDiv.offsetWidth
})

SliderArrowLeft.addEventListener('click', function (e) {
    e.preventDefault()
    imagesSliderDiv.scrollLeft -= imagesSliderDiv.offsetWidth
})
//Slider functionality Ends


allShowDetails.then((val)=>{
    //console.log(val)
    const genres = val.genres
    const language = val.language 
    const name = val.name
    const watchLink = val.url
    const premiered = val.premiered
    const officialSite = val.officialSite
    const rating = val.rating.average
    const status = val.status
    const summary = val.summary
    showDetailsFunc(genres , language , name , watchLink , premiered , officialSite , rating , status , summary)
})

function showDetailsFunc(genres , language , name , watchLink , premiered , officialSite , rating , status , summary){
    const mainDiv = document.createElement('div')
    const nameDiv = document.createElement('div')
    const showDetailDiv = document.createElement('div')
    const summaryDiv = document.createElement('div')
    const nameElem = document.createElement('span')
    const watchNowElem = document.createElement('a')
    const languageElem = document.createElement('p')
    const genresElem = document.createElement('p')
    const premieredElem = document.createElement('p')
    const officialSiteElem = document.createElement('p')
    const ratingElem = document.createElement('p')
    const statusElem = document.createElement('p')
    const summaryElem = document.createElement('p')

    mainDiv.setAttribute('class','h-auto w-full flex flex-col')
    nameDiv.setAttribute('class','h-auto w-full flex justify-between mt-7 px-3')
    nameElem.setAttribute('class','text-base font-bold font-newFont text-white font-bold sm:text-lg xl:text-xl')
    watchNowElem.setAttribute('class','p-1.5 bg-green-400 mx-1 rounded-lg cursor-pointer text-sm flex items-center justify-center text-white font-newFont font-bold active:bg-green-600 md:hover:bg-green-600 md:hover:scale-105 md:duration-300 lg:w-44 lg:gap-3 sm:text-lg sm:gap-2 xl:text-xl')
    showDetailDiv.setAttribute('class','h-auto w-full px-3 flex flex-col')
    languageElem.setAttribute('class','text-white text-sm font-bold font-newFont sm:text-base xl:text-lg')
    genresElem.setAttribute('class','text-white text-sm font-bold font-newFont sm:text-base xl:text-lg')
    premieredElem.setAttribute('class','text-white text-sm font-bold font-newFont sm:text-base xl:text-lg')
    officialSiteElem.setAttribute('class','text-white text-sm font-bold font-newFont sm:text-base xl:text-lg')
    ratingElem.setAttribute('class','text-white text-sm font-bold font-newFont sm:text-base xl:text-lg')
    statusElem.setAttribute('class','text-white text-sm font-bold font-newFont sm:text-base xl:text-lg')
    summaryDiv.setAttribute('class','h-auto w-full px-3')
    summaryElem.setAttribute('class','text-sm text-white font-newFont h-auto w-auto my-4 sm:text-base xl:text-lg')


    watchNowElem.href = watchLink
    watchNowElem.target = '_blank'
    nameElem.innerHTML = name + `<span class="text-xs text-gray-500 sm:sm "> (${premiered.slice(0,4)})</span>`
    watchNowElem.innerHTML = `<span class="mx-1 w-5 h-5 bg-white rounded-full flex justify-center items-center sm:p-3.5"><i class="fa-solid fa-play" style="color: #4ade80;"></i></span>Watch Now`
    languageElem.innerHTML = 'language :' + `<span class="text-gray-500 font-semibold text-xs sm:text-sm xl:text-base"> ${language}</span>`
    genresElem.innerHTML = 'Genres :' + `<span class="text-gray-500 font-semibold text-xs sm:text-sm xl:text-base"> ${genres}</span>`
    premieredElem.innerHTML = 'Premiered At :' + `<span class="text-gray-500 font-semibold text-xs sm:text-sm xl:text-base"> ${premiered}</span>`
    officialSiteElem.innerHTML = 'Official Site :' + `<span class="text-blue-500 underline font-semibold text-xs cursor-pointer sm:text-sm xl:text-base"> ${officialSite}</span>`
    ratingElem.innerHTML = 'Rating : ' + `<i class="fa-solid fa-star" style="color: #FFD43B;"></i><span class="text-gray-500 text-xs sm:text-sm xl:text-base"> ${rating}</span>` 
    statusElem.innerHTML = 'Status :' + `<span class="text-gray-500 font-semibold text-xs sm:text-sm xl:text-base"> ${status}</span>`
    summaryElem.innerHTML = `<p class="text-xl text-gray-500 underline my-3 lg:my-1">About Show :</p>` + summary



    nameDiv.appendChild(nameElem)
    nameDiv.appendChild(watchNowElem)
    showDetailDiv.appendChild(genresElem)
    showDetailDiv.appendChild(languageElem)
    showDetailDiv.appendChild(premieredElem)
    showDetailDiv.appendChild(statusElem)
    showDetailDiv.appendChild(ratingElem)
    showDetailDiv.appendChild(officialSiteElem)
    summaryDiv.appendChild(summaryElem)
    mainDiv.appendChild(nameDiv)
    mainDiv.appendChild(showDetailDiv)
    mainDiv.appendChild(summaryDiv)
    detailsDiv.appendChild(mainDiv)
}