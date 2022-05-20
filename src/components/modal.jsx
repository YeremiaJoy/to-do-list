import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { createTodo, updateTodo } from "../helper/function";

function ModalTodo({ title, visible, closeModal, data, dispatch, val }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const value = data.find((data) => data.id === val?.id);
    setForm({
      title: value ? value.title : "",
      description: value ? value.description : "",
    });
  }, [visible, data, val?.id]);

  const handleOk = () => {
    closeModal();
    if (title === "Add Todo") createTodo(form, data, dispatch);
    else updateTodo(form, val, data, dispatch);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      okButtonProps={{
        disabled: form.title && form.description ? false : true,
      }}
      onCancel={closeModal}
    >
      <div style={{ display: "grid", gap: 10 }}>
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
    </Modal>
  );
}

export default ModalTodo;
