// If the task has an endDate property that is set to a day before the current date,
// the task will be automatically marked as completed.

export const taskStatusHandler = (userTasks) => {
  const d = new Date();
  const currentDay = d.getDate();
  const currentMonth = d.getMonth() + 1;
  const currentYear = d.getFullYear();

  for (let i = 0; i < userTasks.length; i++) {
    if (
      userTasks[i].completed === false &&
      userTasks[i].endDate &&
      currentYear > Number(userTasks[i].endDate.slice(0, 4))
    ) {
      const body = {
        id: userTasks[i].id,
        title: userTasks[i].title,
        description: userTasks[i].description,
        completed: true,
        startDate: userTasks[i].startDate,
        endDate: userTasks[i].endDate,
        personId: userTasks[i].personId,
      };
      fetch("http://localhost:3001/tasks/" + userTasks[i].id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => {
          window.location.reload();
          console.log("Task Modified");
        })
        .catch((err) => console.log(err.message));
    } else {
      if (
        userTasks[i].completed === false &&
        userTasks[i].endDate &&
        currentYear === Number(userTasks[i].endDate.slice(0, 4)) &&
        currentMonth > Number(userTasks[i].endDate.slice(5, 7))
      ) {
        const body = {
          id: userTasks[i].id,
          title: userTasks[i].title,
          description: userTasks[i].description,
          completed: true,
          startDate: userTasks[i].startDate,
          endDate: userTasks[i].endDate,
          personId: userTasks[i].personId,
        };
        fetch("http://localhost:3001/tasks/" + userTasks[i].id, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((res) => {
            window.location.reload();
            console.log("Task Modified");
          })
          .catch((err) => console.log(err.message));
      } else {
        if (
          userTasks[i].completed === false &&
          userTasks[i].endDate &&
          currentYear === Number(userTasks[i].endDate.slice(0, 4)) &&
          currentMonth === Number(userTasks[i].endDate.slice(5, 7)) &&
          currentDay > Number(userTasks[i].endDate.slice(8, 10))
        ) {
          const body = {
            id: userTasks[i].id,
            title: userTasks[i].title,
            description: userTasks[i].description,
            completed: true,
            startDate: userTasks[i].startDate,
            endDate: userTasks[i].endDate,
            personId: userTasks[i].personId,
          };
          fetch("http://localhost:3001/tasks/" + userTasks[i].id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((res) => {
              window.location.reload();
              console.log("Task Modified");
            })
            .catch((err) => console.log(err.message));
        }
      }
    }
  }
};
