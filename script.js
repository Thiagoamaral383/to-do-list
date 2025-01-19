const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const filterInput = document.getElementById('filter-input');
const taskDateInput = document.getElementById('task-date');

// Função para adicionar uma tarefa à lista
function addTask() {
  const taskText = taskInput.value.trim(); // Pega o valor do campo e remove espaços
  const taskDate = taskDateInput.value;

  if (taskText === '') {
    alert('Por favor, insira uma tarefa!');
    return;
  }

  if (taskDate === '') {
    alert('Por favor, selecione uma data!');
    return;
  }

  const [year, month, day] = taskDate.split('-'); // Divide o formato YYYY-MM-DD
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  );
  const extractedMonth = parseInt(formattedDate.split('/')[1], 10); // Converte para número

  // Verificar se a tarefa já existe na lista
  const tasks = document.querySelectorAll('li');
  for (let task of tasks) {
    const taskContent = task.querySelector('span:first-child')?.textContent; // Texto da tarefa
    const taskDateContent = task
      .querySelector('span:nth-child(2)')
      ?.textContent.trim(); // Data da tarefa

    if (taskContent === taskText && taskDateContent === `(${formattedDate})`) {
      alert('Esta tarefa já está adicionada para esta data!');
      return;
    }
  }

  // Cria os elementos da tarefa
  const li = document.createElement('li');
  const span = document.createElement('span');
  const dateSpan = document.createElement('span');
  const removeButton = document.createElement('button');
  const checkbox = document.createElement('input'); // Cria o checkbox

  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox'; // Classe para estilização futura

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      span.classList.add('completed'); // Adiciona a classe
      dateSpan.classList.add('completed'); // Adiciona a classe
    } else {
      span.classList.remove('completed'); // Remove a classe
      dateSpan.classList.remove('completed'); // Remove a classe
    }
  });

  span.textContent = taskText;
  dateSpan.textContent = ` (${formattedDate})`; // Adiciona a data formatada
  dateSpan.className = '.date-task';
  removeButton.textContent = 'Excluir';
  removeButton.className = 'delete-btn';

  span.prepend(checkbox); // Insere o checkbox antes do texto
  li.appendChild(span);
  li.appendChild(dateSpan);
  li.appendChild(removeButton);

  // Evento para excluir a tarefa
  removeButton.addEventListener('click', () => {
    li.remove();
  });

  switch (extractedMonth) {
    case 1:
      document.querySelector('#jan-box').appendChild(li);
      break;
    case 2:
      document.querySelector('#fev-box').appendChild(li);
      break;
    case 3:
      document.querySelector('#mar-box').appendChild(li);
      break;
    case 4:
      document.querySelector('#apr-box').appendChild(li);
      break;
    case 5:
      document.querySelector('#may-box').appendChild(li);
      break;
    case 6:
      document.querySelector('#jun-box').appendChild(li);
      break;
    case 7:
      document.querySelector('#jul-box').appendChild(li);
      break;
    case 8:
      document.querySelector('#aug-box').appendChild(li);
      break;
    case 9:
      document.querySelector('#sep-box').appendChild(li);
      break;
    case 10:
      document.querySelector('#oct-box').appendChild(li);
      break;
    case 11:
      document.querySelector('#nov-box').appendChild(li);
      break;
    case 12:
      document.querySelector('#dec-box').appendChild(li);
      break;
  }

  // Limpa o campo de entrada
  taskInput.value = '';
  taskDateInput.value = '';
  taskInput.focus();
}
function filter() {
  const filterText = filterInput.value.toLowerCase();
  const task = document.querySelectorAll('li');

  task.forEach((task) => {
    const tasktext = task.textContent.toLowerCase();
    const taskDateContent = task
      .querySelector('span:nth-child(2)')
      ?.textContent.trim(); // Data da tarefa

    if (tasktext.includes(filterText) || taskDateContent.includes(filterText)) {
      task.style.display = '';
    } else {
      task.style.display = 'none';
    }
  });
}

// Evento de clique no botão para adicionar a tarefa
addTaskButton.addEventListener('click', addTask);

// Evento de teclado para adicionar a tarefa com Enter
taskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

taskDateInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

filterInput.addEventListener('input', filter);
