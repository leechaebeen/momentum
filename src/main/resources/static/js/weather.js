const weather = document.querySelector(".js-date");
const COORDS = "coords";
const API_KEY = "";

function getWeather(lat, lon)
{
    // then() : 데이터가 완전히 넘어오고 난 뒤 호출되는 함수
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function (response){
        // api 로부터 데이터가 넘어오면 데이터를 JSON 형식으로 반환한다
        return response.json()
    }).then(function (json){
        // 넘어온 json 데이터를 화면에서 보여준다.
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} @${place}`;

    });


}


function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
            // 객체의 키과 값이 같다면 이렇게 표현할 수 있다.
            latitude,
            longitude
        };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError()
{
    console.log("Cant access geo location");
}

function askForCoords()
{
    // ■  Geolocation API
    //    : 사용자의 현재 위치를 가져오는 API, navigator.geolocation 객체를 통해 사용한다.
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError );
}

function loadCoords()
{
    const loadedCords = localStorage.getItem(COORDS);

    if(loadedCords === null)
    {
        askForCoords();
    }
    else
    {
        // getWeather()
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init()
{
    loadCoords();
}

init();