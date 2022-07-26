class Todo {
  constructor(text) {
    this.text = text;
  }

  createNewTodo() {
    if (inputField.value !== "") {
      const liElement = document.createElement("li");
      liElement.classList.add("todo-list__item");
      liElement.textContent = this.text;

      const divElement = document.createElement("div");
      divElement.classList.add("todo-list__container", "flex-row");

      const iconDelete = document.createElement("i");
      iconDelete.classList.add("fa-solid", "fa-trash", "fa-xl");

      const btnEdit = document.createElement("i");
      btnEdit.classList.add("fa-solid", "fa-edit", "fa-xl");

      divElement.append(liElement, btnEdit, iconDelete);
      olElement.prepend(divElement);

      inputField.value = "";
    }
    return;
  }

  removeTodo(deleteTarget) {
    deleteTarget.remove();
  }

  editTodo(liElement, target) {
    const parent = liElement.parentNode;
    const editInputField = document.createElement(`input`);
    editInputField.classList.add("new-todo__input--edit");
    liElement.replaceWith(editInputField);

    parent.prepend(editInputField);
    editInputField.focus();

    const btnEditCheck = document.createElement("i");
    btnEditCheck.classList.add("fa-solid", "fa-circle-check", "fa-xl");
    target.replaceWith(btnEditCheck);

    editInputField.value = liElement.textContent;

    btnEditCheck.addEventListener("click", () => {
      if (editInputField.value !== "") {
        this.text = editInputField.value;
        editInputField.replaceWith(liElement);
        liElement.textContent = this.text;
        btnEditCheck.replaceWith(target);
      }
    });
  }
}

const inputField = document.querySelector(".new-todo__input");
const olElement = document.querySelector(".todo-list");
const btnAdd = document.querySelector(".fa-plus");
const todos = [];

btnAdd.addEventListener("click", () => {
  const todo = new Todo(inputField.value);
  todos.push(todo);

  todo.createNewTodo();
});

olElement.addEventListener("click", (e) => {
  if (e.target.className === "fa-solid fa-trash fa-xl") {
    const deleteTarget = e.target.parentNode;
    new Todo().removeTodo(deleteTarget);
  }
});

olElement.addEventListener("click", ({ target }) => {
  if (target.className === "fa-solid fa-edit fa-xl") {
    const liElement = target.previousSibling;
    new Todo().editTodo(liElement, target);
  }
});
