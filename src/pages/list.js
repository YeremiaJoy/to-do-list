import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initTodo } from "../helper/function";
import Todo from "../components/todo";
import Done from "../components/done";
//Tabs ANTD
import { Tabs } from "antd";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function List() {
  const dispatch = useDispatch();

  useEffect(() => {
    initTodo(dispatch);
  }, [dispatch]);

  //get state value of todo using useSelector
  const data = useSelector((state) => state.todo.value);

  //data for todo, filter which data have status == 0 and sort ascending based on createdAt
  const todo = data
    .filter((val) => val.status === 0)
    .sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt); //descending a-b
    });
    
  //data for done todo, filter which data have status == 1 and sort descending based on createdAt
  const todoDone = data
    .filter((val) => val.status === 1)
    .sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt); //descending b-a
    });

  return (
    <div className="page">
      <h3>TO-DO-LIST APPLICATION</h3>
      <Tabs centered>
        {/* Tab Todo List */}
        <TabPane
          tab={
            <span>
              <ClockCircleOutlined />
              To Do
            </span>
          }
          key="1"
        >
          <Todo todo={todo} data={data} dispatch={dispatch} />
        </TabPane>
        {/* Tab Done Todo List */}
        <TabPane
          tab={
            <span>
              <CheckCircleOutlined />
              Done
            </span>
          }
          key="2"
        >
          <Done todoDone={todoDone} data={data} dispatch={dispatch} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default List;
