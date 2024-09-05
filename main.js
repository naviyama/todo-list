const inputText = document.getElementById('inputText')
const addBtn = document.getElementById('addBtn')
const todoList = document.getElementById('todo-list-container')
const sortBtn = document.getElementById('sortBtn')

//show sort button if there are more than 2 list
function updateSortBtnVisibility(){
  const todoList = document.getElementById('todo-list-container')

  const itemCount = todoList.children.length

  if(itemCount > 1){
    sortBtn.style.display = 'block'
  } else {
    sortBtn.style.display = 'none'
  }
}

//reverse list order
function reverseListOrder(){
  const todoList = document.getElementById('todo-list-container')
  
  const lists = Array.from(todoList.children)
  console.log('lists:', lists)
  lists.reverse()

  todoList.innerHTML = ''

  lists.forEach(list => todoList.appendChild(list))
}

sortBtn.addEventListener('click', (e) => {
  e.preventDefault()
  reverseListOrder()
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
  todoList.appendChild(listTag)

//reset input value
  inputText.value = ''
  
  updateSortBtnVisibility()
})


todoList.addEventListener('click', (e) => {
  //edit button clicked
  if(e.target.classList.contains('edit-btn')){
    const li = e.target.closest('li')
    const label = li.querySelector('label')
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
      }
    })
    //while editing mode, outside of the input field is clicked, it saves and change input tag to label tag
    document.addEventListener('click', function outsideClickListener(e){
      if(e.target !== input){
        const newText = input.value
        const newLabel = document.createElement('label')
        newLabel.innerText = newText

        if(li.contains(input)){
          li.replaceChild(newLabel, input)
        }

        document.removeEventListener('click', outsideClickListener)
      }
    }, true)
  }

//delete button clicked
  if(e.target.classList.contains('delete-btn')){
    const li = e.target.closest('li')
    todoList.removeChild(li)
  }
  updateSortBtnVisibility()
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

    input.addEventListener('blur', ()=>{
      const newText = input.value
      const newLabel = document.createElement('label')
      newLabel.innerText = newText
      input.replaceWith(newLabel)
    })

    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        const newText = input.value
        const newLabel = document.createElement('label')
        newLabel.innerText = newText
        input.replaceWith(newLabel)
      }
    })
  }
})



{/* <li>
  <input type="checkbox" />
  <label htmlFor="">inputText.value</label>
  <div class='imgBtnContainer'>
    <img id='editBtn' src="" alt="" />
    <img id='deleteBtn' src="" alt="" />
  </div>
</li> */}