let fillData = function (data) {
  let todoList = "";
  data.forEach(element => {
    let done = element.done;
    let id = element.id;
    todoList += `<p><b>${element.text}<b>
    <input type="button" onclick="${done ? 'markUndone' : 'markDone'}(${element.id})"
    value=${done ? 'undone' : 'done'}>
        <input type="button" onclick="deleteItem(${id})"
        value="delete"><p>`;
  });
  document.getElementById('list').innerHTML = todoList;
}

let markDone = function (id) {
  let title = getTitle();
  let req = new XMLHttpRequest();
  req.open('put', `/todolist/alltodo`);
  req.addEventListener('load', refresh);
  req.send(`title=${title}&id=${id}&done=true`);
}

let deleteItem = function (id) {
  let title = getTitle();
  let req = new XMLHttpRequest();
  req.open('delete', `/todolist/alltodo`);
  req.addEventListener('load', refresh);
  req.send(`title=${title}&id=${id}`);
}

let markUndone = function (id) {
  let title = getTitle();
  let req = new XMLHttpRequest();
  req.open('put', `/todolist/alltodo`);
  req.addEventListener('load', refresh);
  req.send(`title=${title}&id=${id}&done=false`);
}

let renderList = function () {
  let response = this.responseText;
  let todoList = JSON.parse(response);
  fillData(todoList);
}

let getTitle = function () {
  let url = window.location.href;
  return url.split('?').pop().split('=').pop();
}

let loadTodoList = function () {
  let title = getTitle();
  let req = new XMLHttpRequest();
  req.open('get', `/todolist/alltodo?title=${title}`);
  req.addEventListener('load', renderList);
  req.send();
}

let refresh = () => {
  window.location.reload();
};

let postTodo = function () {
  let text = document.getElementById('text').value;
  let title = getTitle();
  let req = new XMLHttpRequest();
  req.open('post', `/todolist/alltodo`);
  req.addEventListener('load', refresh);
  req.send(`title=${title}&text=${text}`);
}

window.onload = loadTodoList;