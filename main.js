const inputText = document.getElementById('inputText')
const addBtn = document.getElementById('addBtn')
const todoList = document.getElementById('todo-list-container')




addBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  const listTag = document.createElement('li')

  const inputTag = document.createElement('input')
  inputTag.type = 'checkbox'

  const labelTag = document.createElement('label')
  // labelTag.htmlFor = 'todo-list'
  labelTag.innerText = inputText.value
  // inputTag.appendChild(listTag)
  // labelTag.appendChild(listTag)
  
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

//edit button clicked
  editBtn.addEventListener('click', () => {
    console.log('edit button clicked')
  })

//delete button clicked
  deleteBtn.addEventListener('click', () => {
    console.log('delete button clicked')
  })

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
})

{/* <li>
  <input type="checkbox" />
  <label htmlFor="">inputText.value</label>
  <div class='imgBtnContainer'>
    <img id='editBtn' src="" alt="" />
    <img id='deleteBtn' src="" alt="" />
  </div>
</li> */}