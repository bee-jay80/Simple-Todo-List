const form = document.querySelector("form")
const input = document.querySelector("input")
const taskContainer = document.querySelector(".task-container")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const taskValue = input.value;

    let current_tasks = document.querySelectorAll("#taskName") // ["Go to school", "sleep early"]
    const current_tasks_Value = []
    current_tasks.forEach(tasks => {
        current_tasks_Value.push(tasks.textContent.trim().toLowerCase())
    })

    if(taskValue.trim() == ""){
        alert("Please enter a task")
        return
    }else if(current_tasks_Value.includes(taskValue.trim().toLowerCase())) {
        alert("Task already exists")
        return
    }else {
        // Task container
        const newTask = document.createElement("div")
        newTask.classList.add("task")

        // Task name
        const taskName = document.createElement("span")
        taskName.textContent = taskValue
        taskName.setAttribute("id","taskName")

        // Edit task button
        const editTask = document.createElement("button")
        editTask.classList.add("edit")
        editTask.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
        editTask.addEventListener("click", ()=>{
            let newTask = prompt("Edit task",taskName.textContent)
            if (newTask.trim() && newTask.trim() !==  taskName.textContent) {
                let accept = confirm("Do you want to save the current task?") // ok == true, cancel == false
                if (accept) {
                    taskName.textContent = newTask
                    saveData()
                }
            }
        })

        // Delete task button
        const deleteTask = document.createElement("button")
        deleteTask.classList.add("delete")
        deleteTask.innerHTML = `<i class="fa-solid fa-trash"></i>`
        deleteTask.addEventListener("click",()=>{
            newTask.remove()
            saveData()
        })

        // Append to task container
        newTask.appendChild(taskName)
        newTask.appendChild(editTask)
        newTask.appendChild(deleteTask)
        taskContainer.appendChild(newTask)

        saveData()
    }
    
    // Clear input field
    input.value = ""
})



function saveData(){
    localStorage.setItem("list",taskContainer.innerHTML)
}

function getData(){
    let data = localStorage.getItem("list")
    if(data){
        taskContainer.innerHTML = data
    }
}

getData()



let edits = document.querySelectorAll(".edit") // ['editBtn','editBtn','editBtn','editBtn']

for(let i = 0; i < edits.length; i++){
    edits[i].addEventListener("click", function(){
        console.log("Clicked")
        let taskName = this.parentElement.querySelector("#taskName")
        let newTask = prompt("Edit task",taskName.textContent)
        if (newTask.trim() && newTask.trim() !==  taskName.textContent) {
            let accept = confirm("Do you want to save the current task?") // ok == true, cancel == false
            if (accept) {
                taskName.textContent = newTask
                saveData()
            }
        }
    })
}

let deleteBtn = document.querySelectorAll(".delete")

for(let i = 0; i < deleteBtn.length; i++){
    deleteBtn[i].addEventListener("click", function(){
        this.parentElement.remove()
        saveData()
    })
}


