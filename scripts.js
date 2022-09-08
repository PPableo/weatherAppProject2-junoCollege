// GOAL Weather App
// Create Variable to hold key and base
const api = {
    key: "4df7105bf624f27c2f1538a3a4757a10",
    base: "api.openweathermap.org"
}

// Create variable that will grab from html > text area > classed > searchbox.
// I don't know why i can't make the $("") function work with these "grabs". I think it was because i don't have my document ready, or it's not an init fuction?. Had to do some research to get the parts moving again and deciding to keep using querySelector in the next folloing functions.
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery)

// Had to figure out how to create a function that will let you make an "event" for pressing the enter key. Didn't no it wasn't similiar things to input and submit. Found different solutions and came to this codeblock to have it work.
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value)
        console.log(searchBox.value)
    }
}

// Using ajax varation vs fetch to grab data, have it return a promise of "information", we "then" run the "data/weather information > by city > once recieved we "then" run the function displayResults which we had to set up after knowing that we recieved the "promise" of "information".
function getResults (cityName) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api.key}&units=metric`,
        method: 'GET',
    }).then(weather => {
        return weather;

    }).then(displayResults);
}

// When trying to figure out if i had to use supposedly built in geolocation when information is communicated to? similiar to tracking of ip.
// let opts = {
//     enableHighAccuracy = true,
//     timeout: 1000 * 10,
//     maximumAge: 1000 * 60 * 5.
// };


function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherElement = document.querySelector('.current .weather');
    weatherElement.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `Low ${Math.round(weather.main.temp_min)}°c /  High ${Math.round(weather.main.temp_max)}°c`
// Couldn't figure out how to get the icon from the given "displayResults .weather > array > icon
    let icon = document.querySelector('.current  .icon')
    document.querySelector('icon').src = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"

}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decem ber"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[d.getDay()];
let dateActual = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();

return `${day} ${dateActual} ${month} ${year}`;
}

