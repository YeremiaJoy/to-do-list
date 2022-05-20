import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodo } from "../redux/reducer";
import axios from "axios";

function List() {
  const dispatch = useDispatch();

  async function getTodo() {
    dispatch(
      setTodo(
        await axios
          .get(
            "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list"
          )
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            // handle error
            console.log(error);
          })
      )
    );
  }

  useEffect(() => {
    console.log("get Todo");
    getTodo();
  }, []);

  const todo = useSelector((state) => state.todo.value);

  return (
    <div className="page">
      {todo.map((val) => {
        return (
          <div key={val.id}>
            <div>{val.title}</div>
            <div>{val.status}</div>
          </div>
        );
      })}
    </div>
  );
}

export default List;
