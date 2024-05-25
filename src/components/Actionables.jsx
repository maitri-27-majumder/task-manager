import {
  DownOutlined,
  FunnelPlotOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import TaskDrawer from "./TaskDrawer";

const Actionables = ({ task, setTask }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex flex-col-reverse gap-4 justify-between z-10 relative mt-4 md:flex-row md:justify-between md:px-8">
      <div className="flex gap-4 items-center justify-between">
        <div className="text-white text-sm pl-2">{task?.length} tasks</div>
        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          className="rounded-2xl"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add New
        </Button>
      </div>
      <div className="flex gap-4 ">
        <Input
          placeholder="Type to search"
          prefix={<SearchOutlined />}
          className="bg-transparent hover:bg-transparent focus:bg-transparent blur:bg-transparent focus-within:bg-transparent text-white border-slate-700 rounded-2xl"
        />
        <div className="rounded-2xl bg-neutral-800 hover:bg-neutral-900 flex items-center text-white px-4 py-1 text-xs gap-2 cursor-pointer">
          <FunnelPlotOutlined />
          Filters
          <DownOutlined />
        </div>
      </div>
      <TaskDrawer open={open} setOpen={setOpen} setTask={setTask}/>
    </div>
  );
};

export default Actionables;
