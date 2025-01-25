import React from "react";
import { FormElement } from "../FormElements";
import { Button, LinearProgress } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1px",

        cursor: "grab",
        border: draggable.isDragging ? "1px solid red" : "1px solid lightgray",
        boxShadow: draggable.isDragging ? "0 0 10px red" : "0 0 8px gray",
      }}
      startIcon={
        <Icon
          style={{
            paddingLeft: "8px",
            color: "limegreen",
          }}
        />
      }
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <div style={{ color: "limegreen" }}>
        {label}
        <LinearProgress
          style={{ width: "40px", color: "limegreen" }}
          color="inherit"
          variant="determinate"
          value={
            formElement.type?.includes("Small")
              ? 33
              : formElement.type?.includes("Medium")
              ? 66
              : 100
          }
        />
      </div>
    </Button>
  );
};

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  return (
    <Button
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "120px",
        width: "120px",
        cursor: "grab",
        border: "1px solid blue",
      }}
      startIcon={<Icon />}
    >
      {label}
    </Button>
  );
};

export default SidebarBtnElement;
