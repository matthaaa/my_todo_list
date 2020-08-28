export const dueToday = task => (
  task.dueDate === new Date().toDateString()
);

// TODO: Fix so that this does not include dueToday tasks;
export const pastDue = task => (
  Date.parse(task.dueDate) < new Date()
);