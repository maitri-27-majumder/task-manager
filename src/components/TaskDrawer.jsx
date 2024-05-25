import React from "react";
import { Button, DatePicker, Drawer, Form, Input } from "antd";
import dayjs from "dayjs";
const TaskDrawer = ({ open, setOpen, setTask, currentTask }) => {
  const onClose = () => {
    setOpen(false);
  };
  const onSubmit = (values) => {
    if (currentTask) {
      setTask((prev) => {
        const prevArr = prev;
        prevArr.splice(currentTask.index, 1, {
          id: currentTask.task.id,
          Title: values.title,
          Description: values.description,
          "Due Date": dayjs(values.dueDate).format().slice(0, 10),
          Status: "Not Completed",
        });
        return prevArr;
      });
      onClose();
      return;
    }
    setTask((prev) => [
      ...prev,
      {
        id: generateRandomId(),
        Title: values.title,
        Description: values.description,
        "Due Date": dayjs(values.dueDate).format().slice(0, 10),
        Status: "Not Completed",
      },
    ]);
    onClose();
  };

  function generateRandomId() {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 9);
    return timestamp + randomNum;
  }

  return (
    <Drawer
      title="Add a new task"
      width={720}
      onClose={onClose}
      open={open}
      className="drawer__wrapper"
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please enter task title",
            },
          ]}
          initialValue={(currentTask && currentTask.task["Title"]) || ""}
        >
          <Input placeholder="Enter Task Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "please enter url description",
            },
          ]}
          initialValue={(currentTask && currentTask.task["Description"]) || ""}
        >
          <Input.TextArea rows={4} placeholder="Please enter the description" />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[
            {
              required: true,
              message: "Please choose the due date",
            },
          ]}
        >
          <DatePicker
            style={{
              width: "100%",
            }}
            getPopupContainer={(trigger) => trigger.parentElement}
            defaultValue={
              currentTask && dayjs(new Date(currentTask.task["Due Date"]))
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
export default TaskDrawer;
