import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Actionables from "../components/Actionables";
import ListView from "../components/task-list/ListView";

const TaskManager = () => {
  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("taskData")) || [
      {
        id: 1,
        Title: "Buy Groceries",
        Description: "Milk, Bread, Eggs",
        "Due Date": "2024-05-20",
        Status: "Not Completed",
      },
      {
        id: 2,
        Title: "Prepare Presentation",
        Description: "Prepare slides for the Monday meeting",
        "Due Date": "2024-05-21",
        Status: "Not Completed",
      },
      {
        id: 3,
        Title: "Exercise",
        Description: "30 minutes of cardio",
        "Due Date": "2024-05-19",
        Status: "Completed",
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(task));
  }, [task]);

  return (
    <div>
      <Header />
      <Actionables task={task} setTask={setTask} />
      <ListView data={task} setData={setTask} />
    </div>
  );
};

export default TaskManager;
