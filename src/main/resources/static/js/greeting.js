// ■ querySelector : 찾은 첫번째 것을 가져온다.
// ■ querySelectorAll : 찾은 모든 것을 배열 형식으로 가져온다.

const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

// ■ localStorage : 사용자가 지우지 않는 이상 브라우저를 닫아도 남아있는 데이터

const USER_LS = "currentUser",
    SHOWING_CN = "showing";


function saveName(text)
{
    localStorage.setItem(USER_LS, text);
}


// ■ event.preventDefault : 기본 이벤트 발생을 막는다.
//                           이 프로젝트에서는 입력 창에 이름 입력후 enter 입력해도 입력한 내용이 제출되지 않도록 한다.
function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);


    //console.log(currentValue);

    /*
    input 태그 속성 접근 방법
    input.placeholder
    input.value
    */
}

function askForName()
{
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

// 유저 이름이 등록되어있을 때 인사 출력 여부를 설정하는 함수
function paintGreeting(text)
{
    // 폼을 보이지 않게 하고 문구를 보이게 설정한다.
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);

    greeting.innerHTML = `Hello ${text}`;
}

// 사용자 이름이 등록 되어있는지 확인하고 분기 처리하는 함수
// 등록되어 있는 경우     : paintGreeting() 호출
// 등록되어 있지 않은 경우 : askForName() 호출
function loadName()
{
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null)
    {
        askForName();
    }
    else
    {
        paintGreeting(currentUser);
    }

}

function init()
{
    loadName();
}

init();