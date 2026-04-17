const form = document.getElementById('task-form');
const input = document.getElementById('new-task-input');
const taskList = document.getElementById('lista-de-tarefas');
const countSpan = document.getElementById('task-count');
const completedSpan = document.getElementById('completed-count');

const modal = document.getElementById('modal-overlay');
const editInput = document.getElementById('edit-input');
const btnCancel = document.getElementById('modal-cancel');
const btnOk = document.getElementById('modal-ok');
let taskToEdit = null; 

form.addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    addTask();
});

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;
    
    const li = document.createElement('li');
    
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = taskText;
    
    const actionDiv = document.createElement('div');
    actionDiv.className = 'actions';
    
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.className = 'btn-edit';
    
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.className = 'btn-delete';
    
    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(delBtn);
    li.appendChild(textSpan);
    li.appendChild(actionDiv);
    taskList.appendChild(li); 

    // Marcar como concluída ao clicar na linha
    li.addEventListener('click', function() {
        li.classList.toggle('concluded');
        updateStats();
    });

    // Abrir modal de edição (Sem disparar o evento da linha pai)
    editBtn.addEventListener('click', function(e) {
        e.stopPropagation(); 
        taskToEdit = textSpan;
        editInput.value = textSpan.textContent;
        modal.style.display = 'flex'; 
    });

    // Deletar tarefa (Sem disparar o evento da linha pai)
    delBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
        updateStats();
    });

    updateStats(); 
    input.value = '';
}

// Fechar modal no cancelar
btnCancel.addEventListener('click', () => { 
    modal.style.display = 'none'; 
});

// Confirmar edição no modal
btnOk.addEventListener('click', () => {
    if (taskToEdit && editInput.value.trim() !== "") {
        taskToEdit.textContent = editInput.value;
        modal.style.display = 'none';
    }
});

// Atualiza os contadores em tempo real
function updateStats() {
    const total = document.querySelectorAll('#lista-de-tarefas li').length;
    const concluidas = document.querySelectorAll('#lista-de-tarefas li.concluded').length;
    
    countSpan.textContent = total;
    completedSpan.textContent = concluidas;
}