const COORDS = 'coords';

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

    saveCoords(coordsObj)
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
    }
}

function init()
{
    loadCoords();
}

init();