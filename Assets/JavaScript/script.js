const escreveTarefa = document.querySelector(".writeTasks");
const btnAdiciona = document.querySelector("#addTasks");
const tarefas = document.querySelector(".tasksToDo");

function newTask(text) {
    const li = createLi();
    li.innerText = text;
    tarefas.appendChild(li);
    createButton(li)
    limpaOInput();
    saveTasks();
}

function createLi(){
    const li = document.createElement("li");
    return li;
}

function createButton(li) {
    li.innerText += ` `;
    const botaoApagaTarefa = document.createElement("button");
    botaoApagaTarefa.innerText = ``;
    botaoApagaTarefa.setAttribute("class", "apagar")
    botaoApagaTarefa.setAttribute("title", "Apagar essa tarefa?")
    li.appendChild(botaoApagaTarefa);
}

function limpaOInput(){
    escreveTarefa.value = ` `;
    escreveTarefa.focus();
}

function saveTasks(){
    const AllLis = tarefas.querySelectorAll("li");
    const TaskList = [];

    for (let tarefinha of AllLis){
        let tarefa = tarefinha.innerText;
        tarefa = tarefa.replace("Apagar", "").trim();
        TaskList.push(tarefa);
    }

    const tarefasJSON = JSON.stringify(TaskList);
    localStorage.setItem("tarefas", tarefasJSON);
}

function addSavedTasks(){
    if(!localStorage.getItem("tarefas")) return;
    const pegandoTarefas = localStorage.getItem("tarefas");
    const lista = JSON.parse(pegandoTarefas);
    for (let i of lista){
        newTask(i);
    }
} addSavedTasks();

btnAdiciona.addEventListener('click', function(){
    if (!escreveTarefa.value) return;
    newTask(escreveTarefa.value);
});

escreveTarefa.addEventListener("keypress", function(e){
    if (e.keyCode === 13){
        if (!escreveTarefa.value) return;
        newTask(escreveTarefa.value); 
    }
});

document.addEventListener("click", (e) => {
    const element  = e.target;
    
    if(element.classList.contains("apagar")){
        element.parentElement.remove();
        saveTasks();
    }
});

try {
    addSaveTasks();
    console.log(`SEM ERRO!`);
} catch(e){
    console.log(`Tem algum erro aí`);
}