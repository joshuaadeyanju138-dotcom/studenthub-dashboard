const taskList = document.querySelector('#task-list');
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const remainingCount = document.querySelector('#remaining-count');
const navTaskCount = document.querySelector('#nav-task-count');
const taskFootnote = document.querySelector('#task-footnote');

function updateTaskCounts() {
  const tasks = [...taskList.querySelectorAll('.task-item')];
  const remaining = tasks.filter(task => !task.querySelector('input').checked).length;
  remainingCount.textContent = String(remaining).padStart(2, '0');
  navTaskCount.textContent = remaining;
  taskFootnote.textContent = remaining === 0
    ? 'All done! Great work — take a well-earned break.'
    : `${remaining} task${remaining === 1 ? '' : 's'} left. One task at a time.`;
}

taskList.addEventListener('change', event => {
  if (event.target.matches('input[type="checkbox"]')) updateTaskCounts();
});

document.querySelector('#add-task-button').addEventListener('click', () => {
  taskForm.hidden = !taskForm.hidden;
  if (!taskForm.hidden) taskInput.focus();
});

taskForm.addEventListener('submit', event => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  const item = document.createElement('label');
  item.className = 'task-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const customCheck = document.createElement('span');
  customCheck.className = 'custom-check';

  const copy = document.createElement('span');
  copy.className = 'task-copy';

  const strong = document.createElement('strong');
  strong.textContent = title;

  const small = document.createElement('small');
  small.textContent = 'Personal task · Added just now';

  const priority = document.createElement('span');
  priority.className = 'priority low';
  priority.textContent = 'New';

  copy.append(strong, small);
  item.append(checkbox, customCheck, copy, priority);
  taskList.append(item);
  taskInput.value = '';
  taskForm.hidden = true;
  updateTaskCounts();
});

const menuToggle = document.querySelector('#menu-toggle');
const backdrop = document.querySelector('#sidebar-backdrop');

function closeMenu() {
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
backdrop.addEventListener('click', closeMenu);
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));

document.querySelector('#theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

const today = new Date();
document.querySelector('#today-label').textContent = today.toLocaleDateString('en', {
  weekday: 'short', day: 'numeric', month: 'short'
});

updateTaskCounts();
