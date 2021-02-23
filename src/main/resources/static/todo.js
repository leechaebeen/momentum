const todoForm = document.querySelector(".js-todoForm"),
    toDoInput = todoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todoList");

const TODOS_LS = 'toDos';

// array 의 모든 아이템을 통해 함수를 실행하고
// true 인 아이템만 가지고 새로운 array 를 만들고.
// 이 새로운 array 를 보여주겠지

/*
function filterFn(toDo)
{
    return toDo.id === 1
}
*/

let toDos = [];

function deleteToDo(event)
{
    // ■ target : 이벤트의 대상 정보 출력
    // console.log(event.target);

    // ■ console.dir : 자바스크립트 객체의 속성들을 출력
    // console.dir(event.target);

    // console.log(event.target.parentNode);

    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    // ■ array.filter() → 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환한다.
    //                  → forEach() 와 유사하다.
    // 여기서는 클릭한 아이디와 같지 않은 나머지 toDos 를 모아 새로운 배열을 만드는 것이다.
    const cleanToDos = toDos.filter(function (toDo)
    {
            return toDo.id !== parseInt(li.id);
    });

    // 새로운 배열을 기존 배열에 넣어주고 저장한다.
    toDos = cleanToDos;
    saveToDos();

}

// 사용자로부터 입력받은 todos 를 localStorage에 저장하는 함수
function saveToDos()
{
    // ■ localStorage 는 문자열 형식으로 데이터를 저장한다.
    // 따라서 아래처럼 객체(toDos)를 저장할 수 없다.
    // localStorage.setItem(TODOS_LS, toDos);

    // ■ JSON.stringify() 는 javascript 객체를 문자열로 변환해주는 함수이다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

let idNumber = 1;

function paintTodo(text)
{
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumber;
    idNumber++;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    // ■ appendChild() : 자식 요소를 추가함
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    // toDo를 담을 객체
    const toDoObj = {
            text : text,
            id : newId
    };

    // 배열에 객체 추가
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}

function loadToDos()
{
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null)
    {
        // ■ JSON.parse() : JSON 형식의 문자열을 객체로 변환
        const parsedToDos = JSON.parse(loadedToDos);

        // ■ forEach() : array 에 담겨있는 요소들 각각에 한번씩 함수를 실행시켜주는 함수
        parsedToDos.forEach(function (toDo) {
            paintTodo(toDo.text);
        });

    }
}

function init()
{
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}



init();