import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useRef, useState } from "react";
import ListItem from "./ListItem";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import TaskDrawer from "../TaskDrawer";

const ListView = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const currentTask = useRef(null);
  const reorderTaskList = (e) => {
    if (e.active.id === e.over.id) return;

    setData((data) => {
      const oldIdx = data.findIndex((item) => item.id === e.active.id);
      const newIdx = data.findIndex((item) => item.id === e.over.id);

      return arrayMove(data, oldIdx, newIdx);
    });
  };
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="list__wrapper">
      <DndContext
        onDragEnd={reorderTaskList}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <div className="list__table">
          <div className="list__header">
            <div>Task Name</div>
            <div>Description</div>
            <div>Due Date</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <div className="list__entries">
            <SortableContext
              items={data}
              strategy={verticalListSortingStrategy}
            >
              {data.map((item, index) => (
                <ListItem
                  key={`list-entries-${index}`}
                  id={item.id}
                  className="list__entries-item"
                >
                  <div>{item["Title"]}</div>
                  <div>{item["Description"]}</div>
                  <div>{item["Due Date"]}</div>
                  <div>
                    <span
                      className={`list__entries-item-status ${item["Status"]
                        .replace(" ", "")
                        .toLowerCase()}`}
                    >
                      {item["Status"]}
                    </span>
                  </div>
                  <div data-no-dnd={true}>
                    <CheckCircleOutlined
                      title="Mark as Completed"
                      onMouseDown={() => {
                        setData((prev) => {
                          const prevArr = prev;
                          prevArr.splice(index, 1, {
                            ...item,
                            Status: "Completed",
                          });
                          return [...prevArr];
                        });
                      }}
                    />

                    <EditOutlined
                      title="Edit Task"
                      onMouseDown={() => {
                        setOpen(true);
                        currentTask.current = { task: item, index: index };
                      }}
                    />
                    <DeleteOutlined
                      title="Delete Task"
                      onMouseDown={() => {
                        setData((prev) => {
                          const prevArr = prev;
                          prevArr.splice(index, 1);
                          return [...prevArr];
                        });
                      }}
                    />
                  </div>
                </ListItem>
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>
      {open && (
        <TaskDrawer
          open={open}
          setOpen={setOpen}
          setTask={setData}
          currentTask={currentTask.current}
        />
      )}
    </div>
  );
};

export default ListView;
