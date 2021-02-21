const todoForm = document.querySelector(".js-todoForm"),
    toDoInput = todoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todoList");

const TODOS_LS = 'toDos';

const toDos = [];

// 사용자로부터 입력받은 todos 를 localStorage에 저장하는 함수
function saveToDos()
{
    // ■ localStorage 는 문자열 형식으로 데이터를 저장한다.
    // 따라서 아래처럼 객체(toDos)를 저장할 수 없다.
    // localStorage.setItem(TODOS_LS, toDos);

    // ■ JSON.stringify() 는 javascript 객체를 문자열로 변환해주는 함수이다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text)
{
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
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