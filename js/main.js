let temp = document.getElementById("temp")
let humidity = document.getElementById("humidity")
let heigth = document.getElementById("heigth")
let pression = document.getElementById("pression")
let lumos = document.getElementById("lumos")
let date = document.getElementById("date")
let hour = document.getElementById("hour")
let weekday = document.getElementById("weekday")
let wt_icon = document.getElementById("weather_icon")
let list = document.getElementById("list")


/**
 * URLs APIS
 */
const thingspeakURL = "https://api.thingspeak.com/channels/1663124/feed.json"

/**
 * No  inicio invocamos putWeather()
 */
putWeather()

let feed
function putWeather() {

    fetch(thingspeakURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherJson) {

            let start = weatherJson.feeds.length-8;
            weatherJson.feeds.slice(start,weatherJson.feeds.length).forEach(addEntry);

            feed = weatherJson.feeds.find(obj => {
                return obj.entry_id === weatherJson.channel.last_entry_id
            })
            console.log(feed)

            displayEntry(feed)


        }).catch(function () {
            console.log(`Erro GET from ${thingspeakURL}`);
        });
}

function addEntry(feed) {
    var tag = document.createElement("li")
    let day = new Date(feed.created_at)
    tag.innerHTML = feed.entry_id+": "+day.toLocaleDateString('pt', {year: 'numeric', month: 'numeric', day: 'numeric' })+" "+day.toLocaleTimeString([], { timeStyle: 'short' })
    list.appendChild(tag)
}

function displayEntry(feed) {
    let day = new Date(feed.created_at)
    hour.innerHTML = day.toLocaleTimeString([], { timeStyle: 'short' })
    date.innerHTML += " - " + day.toLocaleDateString('pt', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    temp.innerHTML = feed.field1 + "ºC"
    humidity.innerHTML = feed.field2 + "%"
    pression.innerHTML = feed.field3 + " hPa"
    heigth.innerHTML = feed.field4 + " metros"
    lumos.innerHTML = feed.field5 + " Lux"
}

let celsius = true
temp.onclick = function () {
    if (celsius) {
        temp.innerHTML = String(Math.floor((feed.field1 * 1.8) + 32)) + "ºF"
    } else {
        temp.innerHTML = feed.field1 + "ºC"
    }

    celsius = !celsius
}
