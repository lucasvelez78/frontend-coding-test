// If the task has an endDate property that is set to a day before the current date,
// the task will be automatically marked as completed.

export const markTaskStatusCompletedIfOverdue = (memberTasks) => {
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const updateTask = (i) => {
    const body = {
      id: memberTasks[i].id,
      title: memberTasks[i].title,
      description: memberTasks[i].description,
      completed: true,
      startDate: memberTasks[i].startDate,
      endDate: memberTasks[i].endDate,
      personId: memberTasks[i].personId,
    };
    fetch("/api/task/" + memberTasks[i].id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        window.location.reload();
        console.log("Task Modified");
      })
      .catch((err) => console.log(err.message));
  };

  for (let i = 0; i < memberTasks.length; i++) {
    if (
      memberTasks[i].completed === false &&
      memberTasks[i].endDate &&
      currentYear > Number(memberTasks[i].endDate.slice(0, 4))
    ) {
      updateTask(i);
    } else if (
      memberTasks[i].completed === false &&
      memberTasks[i].endDate &&
      currentYear === Number(memberTasks[i].endDate.slice(0, 4)) &&
      currentMonth > Number(memberTasks[i].endDate.slice(5, 7))
    ) {
      updateTask(i);
    } else if (
      memberTasks[i].completed === false &&
      memberTasks[i].endDate &&
      currentYear === Number(memberTasks[i].endDate.slice(0, 4)) &&
      currentMonth === Number(memberTasks[i].endDate.slice(5, 7)) &&
      currentDay > Number(memberTasks[i].endDate.slice(8, 10))
    ) {
      updateTask(i);
    }
  }
};
