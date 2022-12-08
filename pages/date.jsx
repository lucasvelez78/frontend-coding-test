import { useEffect } from "react";

function dateDemo() {
  const d = new Date();
  const currentDay = d.getDate();
  const currentMonth = d.getMonth() + 1;
  const currentYear = d.getFullYear();

  let pom = "2022-10-16";
  const year = Number(pom.slice(0, 4));
  const month = Number(pom.slice(5, 7));
  const day = Number(pom.slice(8, 10));
  //   console.log(year);
  //   console.log(month);
  //   console.log(day);

  const userTasks = [
    { id: 1, endDate: "2022-11-11" },
    { id: 2, endDate: "2022-12-04" },
    { id: 3, endDate: null },
  ];

  let trial = null;

  for (let i = 0; i < userTasks.length; i++) {
    if (
      userTasks[i].endDate &&
      currentYear > Number(userTasks[i].endDate.slice(0, 4)) &&
      trial
    ) {
      console.log(
        "el id: " + userTasks[i].id + "se actualiza la endDate por el año"
      );
    } else {
      if (
        userTasks[i].endDate &&
        currentMonth > Number(userTasks[i].endDate.slice(5, 7))
      ) {
        console.log(
          "el id: " + userTasks[i].id + "se actualiza la endDate por el mes"
        );
      } else {
        if (
          userTasks[i].endDate &&
          currentDay > Number(userTasks[i].endDate.slice(8, 10))
        ) {
          console.log(
            "el id: " + userTasks[i].id + "se actualiza la endDate por el dia"
          );
        }
      }
    }
  }

  return (
    <div>
      <h2></h2>
      <h2></h2>
      <h2></h2>
    </div>
  );
}

export default dateDemo;
