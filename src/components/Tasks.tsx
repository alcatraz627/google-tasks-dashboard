import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export interface TaskList {
  kind: string;
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
}

export interface Task {
  kind: string;
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
  parent: string;
  position: string;
  notes: string;
  status: string;
  due: string;
  completed: string;
  deleted: boolean;
  hidden: boolean;
}

export const Tasks = () => {
  const accessToken = Cookies.get("access_token");

  const [taskList, setTaskList] = useState<TaskList[]>([]);
  const [tasksMap, setTasksMap] = useState<Record<string, Task[]>>({});

  const getTaskList = async () => {
    const response = await fetch(
      `https://tasks.googleapis.com/tasks/v1/users/@me/lists?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setTaskList(data.items);
  };

  const loadTasksForList = async (taskListId) => {
    const response = await fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setTasksMap((state) => ({ ...state, [taskListId]: data.items }));
  };

  useEffect(() => {
    getTaskList();
  }, []);
  console.log({ tasksMap });

  return (
    <div>
      <h3>Task Lists</h3>
      {taskList.map((listItem) => (
        <li key={listItem.id}>
          {listItem.title} | {listItem.updated}
          <div style={{ paddingLeft: 16 }}>
            <h4>Tasks </h4>
            {tasksMap[listItem.id] ? (
              <ul>
                {tasksMap[listItem.id].map((item) => (
                  <li>
                    <strong>{item.title}</strong> | <kbd>{item.due}</kbd>
                    <br />
                    <small>{item.notes}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <button onClick={() => loadTasksForList(listItem.id)}>
                Load Tasks
              </button>
            )}
          </div>
        </li>
      ))}
    </div>
  );
};
