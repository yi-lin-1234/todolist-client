import axios from "axios";
import { Body } from "./type";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

//prod
const instance = axios.create({
  baseURL: "https://todolist-server-railway-production.up.railway.app",
});

//==============================( POST )==============================

// create new task
export const createNewTask = async (body: Body) => {
  await instance.post("new", body);
};

//=======================( GET )===========================

// fetch all unfinished tasks
export const getAllUnfinishedTasks = async () => {
  const response = await instance.get("tasks/unfinished");
  return response.data;
};

// fetch all finished tasks
export const getAllFinishedTasks = async () => {
  const response = await instance.get("tasks/finished");
  return response.data;
};

// get task by id
export const getTaskById = async (id: string) => {
  const response = await instance.get(`task/${id}`);
  return response.data;
};

// fetch sorted task data based on a specified sorting field and order
export const getSortedTasks = async (order: string) => {
  const response = await instance.get(`sort-by-${order}`);
  return response.data;
};

//==============================( PUT )==============================

// PUT request to update the content of a task
export const updateTaskById = async (id: string, body: Body) => {
  await instance.put(`task/${id}`, body);
};

// PUT request to update the status of a task to "finished"
export const updateStatusToFinished = async (id: string) => {
  await instance.put(`update-status-finished/${id}`, {});
};

//==============================( DELETE )==============================

// delete a task by id
export const deleteTaskById = async (id: string) => {
  await instance.delete(`task/${id}`);
};
