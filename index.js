// const API_key = "8214cae20a86d1c6e5ab0d1d45570f9d";
// let btn = document.querySelector(".btn");

// async function fetchWeather() {
//     let city_name = document.querySelector(".city").value;


//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`);

//     const data = await response.json();

//     console.log("weather-->" , data);
//     dispWeather(data);
// }

// async function dispWeather(data){
//     let para = document.createElement("p");
//     let temp = `${(data?.main?.temp/10).toFixed(2)}`;
//     //console.log(temp);
//     para.textContent = `Temprature--> ${temp} C`;

//     document.body.appendChild(para);

// }
//  // search button
// btn.addEventListener('click', (e) => {
//     // console.log(`${city_name}`);

//     try {
//         fetchWeather();
//     }
    
//     catch(err){
//         console.log("error" , err);
//     }})

const userTab = document.querySelector("[user-tab]");
const searchTab = document.querySelector("[search-tab]");
const grantContainer = document.querySelector(".grant-container");
const searchForm = document.querySelector("[data-search]");
const loadingScreen = document.querySelector(".loading");
const outputInfo = document.querySelector("[display-output]");
let currentTab = userTab;
const API_key = "8214cae20a86d1c6e5ab0d1d45570f9d";
currentTab.classList.add("current");
getfromSessionStorage();
loadingScreen.classList.add("active");

function switchh(newTab){
    if(newTab!= currentTab){
        currentTab.classList.remove("current");
        currentTab = newTab;
        currentTab.classList.add("current");

        if(!searchForm.classList.contains("active")){
            grantContainer.classList.remove("active");
            outputInfo.classList.remove("active");
            //searchForm.classList.add("active");
        }

        //your weather
        else{
            //make your weather visible
            searchForm.classList.remove("active");
            outputInfo.classList.add("active");
            getfromSessionStorage();
        }
    }

}

userTab.addEventListener("click", () => {
    switchh(userTab);
})

searchTab.addEventListener("click", () => {
    switchh(searchTab);
})


//check for the coordintes
function getfromSessionStorage(){
    const localCordinates = sessionStorage.getItem("coordinates");

    //if coordinates not present
    if(!localCordinates){
        grantContainer.classList.add("active");
    }

    else{
        const coordinates = JSON.parse(localCordinates);
        fetchWeather(coordinates);
    }
}



async function fetchWeather(coordinates){
    const {lat , lon} = coordinates;
    
    //make grant invisible 
    grantContainer.classList.remove("active");

    //make loader visible
    loadingScreen.classList.add("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
        const data = response.json();
        loadingScreen.classList.remove("active");
        outputInfo.classList.add("active");

        renderInfo(data);
    }
    catch(error){
        console.log("error" , error);
    }
}

function renderInfo(data){
    const city = document.querySelector("#city-name");
    const flag = document.querySelector("#flag");
    const status = document.querySelector(".weather-status");
    const weatherIcon = document.querySelector('[weather-img]');
    const temp = document.querySelector("[temp-output]");
    const clouds = document.querySelector("[clouds-output]");
    const humidity = document.querySelector("[humidity-output]");
    const wind = document.querySelector("[wind-output]");

    
    temp.innerHTML  = `${(data?.main?.temp/10).toFixed(2)}`;
    clouds.innerHTML  = `${data?.clouds?.all}`;
    humidity.innerHTML  = `${data?.main?.humidity}`;
    wind.innerHTML  = `${data?.wind?.speed}`;
    city.innerHTML  = `${data?.name}`;
    flag.src  = `https://flagcdn.com/144x108/${(data?.sys?.country).toLowercase()}.png`;
    status.innerHTML  = `${data?.weather?.[0]?.description}`;
    weatherIcon.src  = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}png`;
    // temp.innerHTML =   `${((data?.main?.temp)/10).toFixed(2)}`
    // wind.innerHTML =   ``
}

function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("no geolocation support available");
    }
}

function showPosition(position) {
    const userCoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    if(latitude){
        console.log("coords");
    }

    sessionStorage.setItem("coordinates",JSON.stringify(userCoordinates));
}

const grantAccess = document.querySelector("[grant-data-access]");
grantAccess.addEventListener("click", getLocation);

const inputData = document.querySelector("[data-input]");

searchForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    let city_name = searchForm.ariaValueMax;

    if(city_name==="")
        return;
    else{fetchSearchWeather(city_name);}
} )

async function fetchSearchWeather (city_name) {
    loadingScreen.classList.add("active");
    userTab.classList.remove("active");
    grantContainer.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
        const data = response.json();
        loadingScreen.classList.remove("active");
        userTab.classList.add("active");
        renderInfo(data);
    }
    catch(err){
        console.log('error' + err);
        alert("couldn't fetch the data");
    }
}