// ■ querySelector : element 의 자식을 탐색한다.
const clockContainer = document.querySelector(".js-clock");

// clock 클래스의 자식을 탐색하고 싶은 경우
const clockTitle = clockContainer.querySelector("h1");

// 호출되는 순간의 시,분,초를 얻어오는 함수
function getTime()
{
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours }:${minutes < 10? `0${minutes}`: minutes}:${ seconds < 10 ? `0${seconds}`: seconds}`;

}

// ■ setInterval() : 일정한 시간 간격으로 작업을 수행하기 위해 사용하는 함수
//    setInterval(실행할 함수명, 실행하고 싶은 간격 - millisecond 단위)
//    ex) setInterval(fn,1000)

function init()
{
    getTime();
    setInterval(getTime, 1000);
}

init();
