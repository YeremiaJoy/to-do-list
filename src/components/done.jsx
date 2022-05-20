import React, { useState } from "react";
import { Button, Card } from "antd";
import moment from "moment";
import { EditOutlined, RollbackOutlined } from "@ant-design/icons";
import { statusTodo } from "../helper/function";
import ModalTodo from "./modal";

function Done({ todoDone, data, dispatch }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState();

  return (
    <div className="card-container">
      {todoDone.map((val) => {
        return (
          <Card key={val.id}>
            <div className="card-content">
              <div className="title">{val.title}</div>
              <div className="description">{val.description}</div>
              <div className="createdAt">
                {moment(val.createdAt).format("DD MMMM YYYY, HH:mm")}
              </div>
            </div>
            <div className="action-button">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsModalVisible(true);
                  setValue(val);
                }}
              />
              <Button
                type="danger"
                icon={<RollbackOutlined />}
                onClick={() => statusTodo(val, data, dispatch)}
              />
            </div>
          </Card>
        );
      })}
      <ModalTodo
        title="Update Todo"
        visible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
        data={data}
        dispatch={dispatch}
        val={value}
      />
    </div>
  );
}

export default Done;
