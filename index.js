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
const usercontainer = document.querySelector(".infocontainer");
const searchForm = document.querySelector("[data-search]");
const loadingScreen = document.querySelector(".loading")
const userInfo = document.querySelector("[display-output]");
