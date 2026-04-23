// const array = [10, 20, 30]

// console.log(array);
// console.log(array.length);
// console.log(array[0]);

// array.push(100);
// console.log(array);

// array.splice(0, 1); // 0: index of remove, 1: number of values to remove
// console.log(array);

const array1 = [1, 2, 3];
//const array2 = array1;
const array2 = array1.slice(); // copied the values inside array1 to array2
array2.push(4); //then adding new number to array2

//console.log(array1);
//console.log(array2);

const [first, second, thired] = [1, 2, 3];
//console.log(second);

/*=================================================*/
//const todoList = ['Make dinner', 'Homework'];

const todoList = [
  {
    name: 'Make dinner',
    date: '2024.11.15'
  },
  {
    name: 'Homework',
    date: '2024.11.16'
  }
];
renderTddoList();

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-date-input');
  const date = dateInputElement.value;

  todoList.push({
    name: name, //or just name and date because thy have same "name"
    date: date
  });
  renderTddoList();
  // clear the input box after adding an Element
  inputElement.value = "";
  dateInputElement.value = "";
}

function enter(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

/*
function renderTddoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    //const name = todoList[i].name;
    //const date = todoList[i].date;
    // Shortcut: every Object from todoList has to attributs
    const { name, date } = todoList[i];
    todoListHTML += `
      <div class="name-todo" >${name}</div> <!-- that is a Shortcut -->
      <div class="date-todo">${date}</div> <!-- that is a Shortcut -->
        <!--${todoList[i].name}-->
        <!--${todoList[i].date}-->
        <button class="delete-todo-button" onclick="
          todoList.splice(${i}, 1);
          renderTddoList();
        ">Delete</button>
    `;
    //<div> make the layout better because <p> takes a whole Line
  }
  //console.log(todoListHTML);
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}
*/
function renderTddoList() {
  let todoListHTML = '';
  todoList.forEach((todoObject, index) => {
    const { name, date } = todoObject;
    todoListHTML += `
      <div class="name-todo" >${name}</div>
      <div class="date-todo">${date}</div>
        <button class="delete-todo-button js-delete-todo-button">Delete</button>`;
  });
  //console.log(todoListHTML);
  // we need to write the addLsitener after putting HTML-Code then working with it!
  // because until now it is just a String!
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  // at this point and selectorAll because there are many 'delete-button'
  // and selector used for first button!
  console.log(document.querySelectorAll('.js-delete-todo-button')); // list of alle buttons.
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTddoList();
      });
    });
  // Closure: index - index
  // if a function has access to value 
  // it will always have access to that value
  // value gets packaged together (enclosed) with the function
}

