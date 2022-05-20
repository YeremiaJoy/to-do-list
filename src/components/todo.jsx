import React, { useState } from "react";
import { Button, Card } from "antd";
import moment from "moment";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { deleteTodo, statusTodo } from "../helper/function";
import ModalTodo from "./modal";

function Todo({ todo, data, dispatch }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [value, setValue] = useState();

  return (
    <div className="card-container">
      <Button
        icon={<PlusOutlined />}
        onClick={() => {
          setIsModalVisible(true);
          setTitleModal("Add Todo");
          setValue(null);
        }}
      >
        Add Todo
      </Button>
      {todo.map((val) => {
        return (
          <Card key={val.id}>
            <div className="card-content">
              <div className="title">{val.title}</div>
              <div className="desc">{val.description}</div>
              <div className="createdAt">
                {moment(val.createdAt).format("DD MMMM YYYY, HH:mm")}
              </div>
            </div>
            <div className="action-button">
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => deleteTodo(val.id, data, dispatch)}
              />
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsModalVisible(true);
                  setTitleModal("Update Todo");
                  setValue(val);
                }}
              />
              <Button
                icon={<CheckOutlined />}
                onClick={() => statusTodo(val, data, dispatch)}
              />
            </div>
          </Card>
        );
      })}
      <ModalTodo
        title={titleModal}
        visible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
        data={data}
        dispatch={dispatch}
        val={value}
      />
    </div>
  );
}

export default Todo;
