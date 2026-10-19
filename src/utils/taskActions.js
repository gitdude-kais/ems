// status: 'active' | 'completed' | 'failed'
export const changeTaskStatus = (employees, email, taskIndex, status) =>
  employees.map((emp) => {
    if (emp.email !== email) return emp

    const task = emp.tasks[taskIndex]
    if (!task) return emp

    const current = task.newTask
      ? 'newTask'
      : task.active
      ? 'active'
      : task.completed
      ? 'completed'
      : 'failed'

    if (current === status) return emp

    const tasks = emp.tasks.map((t, i) =>
      i === taskIndex
        ? {
            ...t,
            newTask: false,
            active: status === 'active',
            completed: status === 'completed',
            failed: status === 'failed',
          }
        : t
    )

    const taskCounts = {
      ...emp.taskCounts,
      [current]: Math.max(0, emp.taskCounts[current] - 1),
      [status]: emp.taskCounts[status] + 1,
    }

    return { ...emp, tasks, taskCounts }
  })