const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

const getTods = () => {
    fetch(apiUrl + '?_limit=10')
    .then(res => res.json())
    .then((data) => {
        data.forEach((todo) => addDataToDom(todo))
    })
}

function addDataToDom(todo) {
    const div = document.createElement('div')
    div.classList.add('todo-li')
    div.appendChild(document.createTextNode(todo.title))
    div.setAttribute('data-id',todo.id)

    if (todo.completed) {
        div.classList.add('done')
    } 

    document.getElementById('todo-list').appendChild(div)
}

const createTodo = (e) => {
    e.preventDefault()
    
    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
      .then(data => addDataToDom(data))
}

const toggleCompleted = (e) =>{
    if (e.target.classList.contains('todo-li')) {
        e.target.classList.toggle('done');

        upDateTodo(e.target.dataset.id, e.target.classList.contains('done'))
        
    }
}

const upDateTodo = (id, completed) =>{
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    // .then((res)=> res.json())
    // .then((data) => console.log(data))
}

const deleteTodos = (e)=> {
    if (e.target.classList.contains('todo-li')) {
        const id = e.target.dataset.id
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE', //for delete req we need not pass any body or the header its just a del so id pass is delete
        })
        .then(res => res.json())
        .then(() => e.target.remove())
    }
}


const init = () =>{
    document.addEventListener('DOMContentLoaded', getTods)

    document.querySelector('#todo-form').addEventListener('submit', createTodo )

    document.querySelector('#todo-list').addEventListener('click', toggleCompleted)

    document.querySelector('#todo-list').addEventListener('click' ,deleteTodos)
}

init();