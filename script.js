const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

const getTods = () => {
    fetch(apiUrl + '?_limit=5')
    .then(res => res.json())
    .then((data) => {
        data.forEach((todo) => addDataToDom(todo))
    })
}

function addDataToDom(todo) {
    const div = document.createElement('div')
    div.appendChild(document.createTextNode(todo.title))
    div.setAttribute('data-id',todo.name)

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

const init = () =>{
    document.addEventListener('DOMContentLoaded', getTods)
    document.querySelector('#todo-form').addEventListener('submit', createTodo )
}

init();