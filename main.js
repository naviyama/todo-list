const inputText = document.getElementById('inputText')
const addBtn = document.getElementById('addBtn')
const todoList = document.getElementById('todo-list-container')
const sortBtn = document.getElementById('sortBtn')
const resetBtn = document.getElementById('resetBtn')
let isReversed = false

//Load the saved list from localStorage when the page loads
window.addEventListener('DOMContentLoaded', () => {
  loadTodoList()
  updateSortBtnVisibility()
})

//show sort button if there are more than 2 list
function updateSortBtnVisibility(){
  const itemCount = todoList.children.length

  if(itemCount > 1){
    sortBtn.style.display = 'block'
  } else {
    sortBtn.style.display = 'none'
  }
}

// Save the list to localStorage
function saveTodoList(){
  const todos = []
  const lists = Array.from(todoList.children)
  lists.forEach(list => {
    const labelText = list.querySelector('input').innerText
    const isChecked = list.querySelector('input[type="checkbox"]').checked
    todos.push({labelText, isChecked})
  })
  localStorage.setItem('todoList', JSON.stringify(todos))
}

//Load the list from localStorage
function loadTodoList(){
  const savedTodos = JSON.parse(localStorage.getItem('todoList'))
  if(savedTodos){
    savedTodos.forEach(todo => {
      const listTag = document.createElement('li')
      const inputTag = document.createElement('input')
      inputTag.type = 'checkbox'
      inputTag.classList.add('checkbox')
      inputTag.checked = todo.isChecked

      const labelTag = document.createElement('label')
      labelTag.innerText = todo.labelText

      const divTag = document.createElement('div')
      divTag.classList.add('imgBtnContainer')

      const editBtn = document.createElement('img')
      editBtn.src = 'https://img.icons8.com/?size=100&id=42799&format=png&color=000000'
      editBtn.alt = 'edit icon'
      editBtn.classList.add('edit-btn')

      const deleteBtn = document.createElement('img')
      deleteBtn.src = 'https://img.icons8.com/?size=100&id=104338&format=png&color=000000'
      deleteBtn.alt = 'delete icon'
      deleteBtn.classList.add('delete-btn')

    //add elements to listTag
      listTag.appendChild(inputTag)
      listTag.appendChild(labelTag)
      divTag.appendChild(editBtn)
      divTag.appendChild(deleteBtn)
      listTag.appendChild(divTag) 

      todoList.appendChild(listTag)
    })
  }
}

//reverse list order
function reverseListOrder(){
  const lists = Array.from(todoList.children)
  // console.log('lists:', lists)
  lists.reverse()

  todoList.innerHTML = ''

  lists.forEach(list => todoList.appendChild(list))
  isReversed = !isReversed
}

sortBtn.addEventListener('click', (e) => {
  e.preventDefault()
  reverseListOrder()
})

resetBtn.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem("todoList")
  todoList.innerHTML = ''
  updateSortBtnVisibility()
  isReversed = false
})


addBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  const warning = document.getElementById('warning')
  const trimmedInputText = inputText.value.trim()

  if(trimmedInputText === ''){
    warning.style.display = 'block'
    return
  } else {
    warning.style.display = 'none'
  }

  const listTag = document.createElement('li')
  const inputTag = document.createElement('input')
  inputTag.type = 'checkbox'
  inputTag.classList.add('checkbox')
  const labelTag = document.createElement('label')
  labelTag.innerText = inputText.value
  
  //create edit and delete container and btns
  const divTag = document.createElement('div')
  divTag.classList.add('imgBtnContainer')

  const editBtn = document.createElement('img')
  editBtn.src = 'https://img.icons8.com/?size=100&id=42799&format=png&color=000000'
  editBtn.alt = 'edit icon'
  editBtn.classList.add('edit-btn')

  const deleteBtn = document.createElement('img')
  deleteBtn.src = 'https://img.icons8.com/?size=100&id=104338&format=png&color=000000'
  deleteBtn.alt = 'delete icon'
  deleteBtn.classList.add('delete-btn')

  //add elements to listTag
  listTag.appendChild(inputTag)
  listTag.appendChild(labelTag)
  divTag.appendChild(editBtn)
  divTag.appendChild(deleteBtn)
  listTag.appendChild(divTag)

  //add li to todoList(.todo-list-container)
  if(isReversed){
    todoList.prepend(listTag)
  }else{
    todoList.append(listTag)
  }

  //reset input value
  inputText.value = ''
  
  updateSortBtnVisibility()
  saveTodoList()
})


todoList.addEventListener('click', (e) => {
  //edit button clicked
  if(e.target.classList.contains('edit-btn')){
    const li = e.target.closest('li')
    if(!li){
      console.error('li element not found')
      return
    }
    const label = li.querySelector('label')
    if(!label){
      console.error('label element not found')
      return
    }
    const currentText = label.innerText

    const input = document.createElement('input')
    input.type = 'text'
    input.value = currentText
    input.classList.add('edit-input-field')

    li.replaceChild(input, label)

    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        const newText = input.value
        const newLabel = document.createElement('label')
        newLabel.innerText = newText
        li.replaceChild(newLabel, input)
        saveTodoList()
      }
    })
    //while editing mode, outside of the input field is clicked, it saves and changes input tag to label tag
    document.addEventListener('click', function outsideClickListener(e){
      if(e.target !== input){
        const newText = input.value
        const newLabel = document.createElement('label')
        newLabel.innerText = newText

        if(li.contains(input)){
          li.replaceChild(newLabel, input)
        }

        document.removeEventListener('click', outsideClickListener)
        saveTodoList()
      }
    }, true)
  }

//delete button clicked
  if(e.target.classList.contains('delete-btn')){
    const li = e.target.closest('li')
    todoList.removeChild(li)
  }
  updateSortBtnVisibility()
  saveTodoList()
})

//double click to edit list
todoList.addEventListener('dblclick', (e)=>{
  if(e.target.tagName === 'LABEL' ){
    const label = e.target
    const currentText = label.innerText

    const input = document.createElement('input')
    input.type = 'text'
    input.value = currentText
    input.classList.add('edit-input-field')
    label.replaceWith(input)
    input.focus()

    let isReplaced = false

    const replaceInputWithLabel = () => {
      if(isReplaced) return
      isReplaced = true
      const newText = input.value
      const newLabel = document.createElement('label')
      newLabel.innerText = newText
      input.replaceWith(newLabel)
      saveTodoList()
    }
    
    input.addEventListener('blur', ()=>{
      replaceInputWithLabel()
    })

    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        replaceInputWithLabel()
        input.removeEventListener('blur', replaceInputWithLabel)
      }
    })
  }
})