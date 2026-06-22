// TO-DO LIST - script.js
// This file controls all the actions:
// adding tasks, deleting tasks, and marking done
// =============================================


// ---- STEP 1: Get references to HTML elements ----
// We grab the input box, the task list, and the empty state div
const taskInput  = document.getElementById('taskInput');
const taskList   = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const taskCount  = document.getElementById('taskCount');


// ---- STEP 2: Add a Task ----
// This function runs when the user clicks "Add" or presses Enter
function addTask() {

  // Read what the user typed and remove extra spaces
  const text = taskInput.value.trim();

  // If the input is empty, show an alert and stop
  if (text === '') {
    alert('Please type a task first!');
    return;
  }

  // ---- Create the <li> (list item) element ----
  const li = document.createElement('li');

  // ---- Create the Check (complete) button ----
  const checkBtn = document.createElement('button');
  checkBtn.className  = 'check-btn';
  checkBtn.textContent = '✓';
  checkBtn.title = 'Mark as done';

  // When clicked, toggle the "done" style on the task
  checkBtn.onclick = function () {
    toggleDone(checkBtn, taskLabel);
  };

  // ---- Create the Task Text label ----
  const taskLabel = document.createElement('span');
  taskLabel.className  = 'task-text';
  taskLabel.textContent = text;  // The actual task text from the input

  // ---- Create the Delete button ----
  const deleteBtn = document.createElement('button');
  deleteBtn.className  = 'delete-btn';
  deleteBtn.textContent = '🗑️';
  deleteBtn.title = 'Delete task';

  // When clicked, remove this task from the list
  deleteBtn.onclick = function () {
    deleteTask(li);
  };

  // ---- Assemble: put all parts inside the <li> ----
  li.appendChild(checkBtn);
  li.appendChild(taskLabel);
  li.appendChild(deleteBtn);

  // ---- Add the <li> to the task list on the page ----
  taskList.appendChild(li);

  // ---- Clear the input box so user can type the next task ----
  taskInput.value = '';

  // ---- Update the task counter and empty state ----
  updateUI();

  // Keep focus on the input for quick typing
  taskInput.focus();
}


// ---- STEP 3: Toggle Done (Mark / Unmark a task) ----
// This runs when the user clicks the circle check button
function toggleDone(checkBtn, taskLabel) {

  // Toggle means: if it's "done" → remove done, if not → add done
  checkBtn.classList.toggle('done');
  taskLabel.classList.toggle('done');

  // Update the counter (done tasks don't count as "remaining")
  updateUI();
}


// ---- STEP 4: Delete a Task ----
// This removes the task <li> from the list
function deleteTask(li) {

  // Add a quick fade-out effect before removing
  li.style.transition = 'opacity 0.2s, transform 0.2s';
  li.style.opacity    = '0';
  li.style.transform  = 'translateX(20px)';

  // Wait for the animation to finish, then remove from DOM
  setTimeout(function () {
    li.remove();
    updateUI(); // Refresh the counter after deleting
  }, 200);
}


// ---- STEP 5: Update Task Counter and Empty State ----
// Counts how many tasks are NOT completed, and shows/hides the empty message
function updateUI() {

  // Get all <li> items in the list
  const allTasks = taskList.querySelectorAll('li');

  // Count tasks that are NOT marked as done
  // (we check if the taskLabel span does NOT have the 'done' class)
  let remaining = 0;
  allTasks.forEach(function (li) {
    const label = li.querySelector('.task-text');
    if (!label.classList.contains('done')) {
      remaining++;
    }
  });

  // Update the counter text
  if (remaining === 1) {
    taskCount.textContent = '1 task remaining';
  } else {
    taskCount.textContent = remaining + ' tasks remaining';
  }

  // Show the empty state message if there are no tasks at all
  if (allTasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
}


// ---- STEP 6: Allow pressing "Enter" to add a task ----
// Instead of always clicking the Add button, pressing Enter works too
taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});


// ---- STEP 7: Run updateUI once when the page first loads ----
// This sets the initial state (shows empty message if no tasks yet)
updateUI();