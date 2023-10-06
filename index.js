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
const inputData = document.querySelector("[data-input]");
const searchButton = document.querySelector(".search");
const loadingScreen = document.querySelector(".loading");
const outputInfo = document.querySelector("[display-output]");
const grantAccess = document.querySelector("[grant-data-access]");
const API_key = "8214cae20a86d1c6e5ab0d1d45570f9d";
loadingScreen.style.display="none";
searchForm.style.display="none";
outputInfo.style.display="none";
console.log(`items in session storage ${sessionStorage?.length}`);


function switchh(Tab){
    if(Tab!= userTab){
        userTab.style.background = "none";
        searchTab.style.background = "rgba(255, 255, 255, 0.441)";
        searchForm.style.display="flex";
        grantContainer.style.display="none";
        outputInfo.style.display="none";
        Tab = searchTab;
    }

    //your weather
    else{
        //make your weather visible
        searchTab.style.background = "none";
        userTab.style.background = "rgba(255, 255, 255, 0.441)";
        searchForm.style.display="none";
        if(sessionStorage?.length===0){
            outputInfo.style.display = "none";
            grantContainer.style.display="flex";
        }
        else {

            grantContainer.style.display="none";
            getfromSessionStorage();
        }
        // getfromSessionStorage();
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
    const userCoordinates = {
        lat,
        lon
    }
    if (userCoordinates) {
        console.log('coords found' , userCoordinates);
        grantContainer.style.display = "none";
    }
    sessionStorage.setItem("coordinates",JSON.stringify(userCoordinates));
    console.log(`items in session storage ${sessionStorage?.length}`);
    getfromSessionStorage();
}

//check for the coordintes
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem('coordinates');
    console.log('got local coordinates from sessionstorage',localCoordinates);

    //if coordinates not present
    if(!localCoordinates){
        switchh(userTab);        
    }

    else{
        const coordinates = JSON.parse(localCoordinates);
        console.log('coordinates',coordinates);
        fetchWeather(coordinates);
        // outputInfo.style.display = "flex";
        console.log('till here');
    }
}

searchButton.addEventListener("click", (e)=> {
    e.preventDefault();
    let city_name = inputData.value;
    console.log(`city value: ${city_name}`);

    if(city_name==="")
        return;
    else fetchSearchWeather(city_name);
} )


async function fetchWeather(coords){

    //make loader visible
    loadingScreen.style.display = "flex";
    console.log(coords?.lat);

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_key}`);
        const data = await response.json();
        console.log('yep');
        loadingScreen.style.display = "none";
        renderInfo(data);
        outputInfo.style.display = "flex";
    }
    catch(error){
        console.log("error" , error);
        console.log('nope');
    }
}

async function fetchSearchWeather(city_name) {
    loadingScreen.style.display = "flex";
    console.log(city_name);
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`);
        const data = await response.json();
        console.log(data);
        searchForm.style.display = "none";
        loadingScreen.style.display = "none";
        renderInfo(data);
        outputInfo.style.display = "flex";
    }
    catch(error){
        console.log('error:' + error);
        alert("couldn't fetch the data");
    }
}
// async function fetchCoordinates(name) {
//     try{
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_key}`);
//         const dt = await response.json();
//         console.log(dt);

//     }
//     catch(err) {
//         console.log(err);
//         console.log('nope');
//     }
// }


function renderInfo(dt){
    const city = document.querySelector("#city-name");
    const flag = document.querySelector("#flag");
    const status = document.querySelector(".weather-status");
    const weatherIcon = document.querySelector('[weather-img]');
    const temp = document.querySelector("[temp-output]");
    const clouds = document.querySelector("[clouds-output]");
    const humidity = document.querySelector("[humidity-output]");
    const wind = document.querySelector("[wind-output]");

    
    temp.innerHTML  = `${(dt?.main?.temp/10).toFixed(2)} deg`;
    clouds.innerHTML  = `${dt?.clouds?.all} %`;
    humidity.innerHTML  = `${dt?.main?.humidity} %`;
    wind.innerHTML  = `${dt?.wind?.speed} m/s` ;
    city.innerHTML  = dt?.name;
    flag.alt = dt?.sys?.country.toLowerCase();
    flag.src  = `https://flagcdn.com/144x108/${dt?.sys?.country.toLowerCase()}.png`;
    status.innerHTML  = dt?.weather?.[0]?.description;
    weatherIcon.src  = `https://openweathermap.org/img/wn/${dt?.weather?.[0]?.icon}.png`;
    // temp.innerHTML =   `${((data?.main?.temp)/10).toFixed(2)}`
    // wind.innerHTML =   ``
}
