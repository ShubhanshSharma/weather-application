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
let Tab = userTab;
const grantContainer = document.querySelector(".grant-container");
const searchForm = document.querySelector("[data-search]");
const loadingScreen = document.querySelector(".loading");
const outputInfo = document.querySelector("[display-output]");
const grantAccess = document.querySelector("[grant-data-access]");
const API_key = "8214cae20a86d1c6e5ab0d1d45570f9d";
const inputData = document.querySelector("[data-input]");
loadingScreen.style.display="none";
searchForm.style.display="none";
outputInfo.style.display="none";


function switchh(Tab){
    if(Tab!= userTab){
        searchForm.style.display="flex";
        grantContainer.style.display="none";
        outputInfo.style.display="none";
        Tab = searchTab;
        getfromSessionStorage();

    }

    //your weather
    else{
        //make your weather visible
        searchForm.style.display="none";
        grantContainer.style.display="flex";
        getfromSessionStorage();
    }

}

userTab.addEventListener("click", (e) => {
    switchh(userTab);
})

searchTab.addEventListener("click", (e) => {
    switchh(searchTab);
})

grantAccess.addEventListener("click", (e) => {
    getLocation();
} )

function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
        
    }
    else{
        alert("no geolocation support available");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const userCoordinates = [lat, lon];
    if (userCoordinates) {
        console.log('coords found' , userCoordinates);
        outputInfo.style.display = "flex";
        grantContainer.style.display = "none";
    }

    sessionStorage.setItem("coordinates",JSON.stringify(userCoordinates));
}

searchForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    let city_name = searchForm.ariaValueMax;

    if(city_name==="")
        return;
    else{fetchSearchWeather(city_name);}
} )

//check for the coordintes
function getfromSessionStorage(){
    const localCordinates = sessionStorage.getItem("coordinates");
    console.log('local coordinates found' , localCordinates);

    //if coordinates not present
    if(!localCordinates){
        switchh(userTab);        
    }

    else{
        const coordinates = JSON.parse(localCordinates);
        console.log(coordinates);
        fetchWeather(coordinates);
    }
}



async function fetchWeather(coordinates){

    //make loader visible
    loadingScreen.style.display = "flex";

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