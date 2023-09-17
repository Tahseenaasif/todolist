let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTakstodom(task){
     
    var li=document.createElement('li');
    li.innerHTML=
    `
  <input type="checkbox" id="${task.id}"  ${ task.done ? 'checked':' '} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="icons8-bin-100.png" class="delete" data-id="${task.id}" />
    

  `;
  taskList.append(li);
};
function renderList () {
   taskList.innerHTML='';

   for(let i=0;i<tasks.length;i++){
     addTakstodom(tasks[i]);

   }
  tasksCounter.innerHTML=tasks.length;
  
}

function togle (taskId) {
    const task=tasks.filter((tasks) =>{ 
        return tasks.id ==taskId
    }); 
     if(task.length>0){ 
        const currenttsk=task[0];
         currenttsk.done=!currenttsk.done
         renderList();
         showNotification("Task togled sucessfully");
         }
}

function deleteTask (taskId) {

    const newtask=tasks.filter((tasks) =>{
        return tasks.id !== taskId;
    })
    tasks=newtask;
    renderList();
    showNotification("task has been deleted");
}

function addTask (task) {
     if(task){
        tasks.push(task);
        renderList();
        showNotification("task added sucessfully");
        return;
     }
     showNotification("task can not be added");
}

function showNotification(text) {

    alert(text);
}

function handleInputKeypress(e){
    if(e.key == "Enter"){
       const text=e.target.value;
       console.log("text ",text);

       if(!text){
        showNotification("hey task can not be empty");
        return;
       }

       const task={
        text:text,
        id:Date.now().toString(),
        done:false

       }

       e.target.value='';
       addTask(task);
    }
}

addTaskInput.addEventListener('keyup',handleInputKeypress);

function handleInputClick(e){
   const target=e.target;
   console.log(target.className);
   if(target.className == "delete"){
             const taskid=target.dataset.id;
             deleteTask(taskid);
             return;
   }else if(target.className == "custom-checkbox"){
            const checked=target.id;
            togle(checked)
            return;
   }
}
document.addEventListener('click',handleInputClick);