import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const ListItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={props.className}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {props.children}
    </div>
  );
};

export default ListItem;
