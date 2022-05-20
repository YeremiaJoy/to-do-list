import { setTodo } from "../redux/reducer";
import axios from "axios";
import moment from "moment";

//function for fetch Todo List data from API
export const initTodo = async function getTodo(dispatch) {
  //set state use dispatch
  dispatch(
    setTodo(
      await axios
        .get("https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list")
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    )
  );
};
//function for delete a Todo List
export const deleteTodo = async function deleteTodo(id, data, dispatch) {
  //create a new array without clicked items, then set it to redux
  dispatch(setTodo(data.filter((val) => val.id !== id)));
};
//function for update a Todo List
export const updateTodo = async function updateTodo(form, val, data, dispatch) {
  let newArray = [...data];
  //set payload for new title or new description
  let payload = {
    id: val.id,
    title: form.title,
    description: form.description,
    status: val.status,
    createdAt: val.createdAt,
  };
  //find the index item you want to update
  let itemIndex = data.findIndex((data) => data.id === val.id);
  //replace element value with new payload
  newArray[itemIndex] = payload;
  //set new state to redux 
  dispatch(setTodo(newArray));
};
//function for done a Todo List
export const statusTodo = async function doneTodo(val, data, dispatch) {
  let newArray = [...data];
  //only update the status
  let payload = { ...val, status: val.status === 1 ? 0 : 1 }; //status 1 that's mean todo list is done
  //find the index item you want to update
  let itemIndex = data.findIndex((data) => data.id === val.id);
  //replace element value with new payload
  newArray[itemIndex] = payload;
  dispatch(setTodo(newArray));
};
//function for create a Todo List
export const createTodo = async function createTodo(form, data, dispatch) {
  let newArray = [...data];
  //random id for new item todo
  const newId = Math.random() * 10;
  let payload = {
    id: newId,
    title: form.title,
    description: form.description,
    status: 0,
    createdAt: moment().format("YYYY-MM-DD HH:mm"),
  };
  //push to array newArray
  newArray.push(payload);
  //set new state to redux
  dispatch(setTodo(newArray));
};
