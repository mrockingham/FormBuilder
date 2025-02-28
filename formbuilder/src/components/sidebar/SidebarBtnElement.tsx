import React from "react";
import { FormElement, InputSize } from "../FormElements";
import { Button, LinearProgress } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";

// Map each InputSize to a percentage value
const sizeMap: Record<InputSize, number> = {
  "1/2": 50,
  "1/3": 33,
  "2/3": 66,
  "1/4": 25,
  "3/4": 75,
  "1/6": 17,
  "5/6": 83,
  "100%": 100,
};

interface SidebarBtnElementProps {
  formElement: FormElement<any>;
  sizeOverride?: InputSize;
  labelOverride?: string;
  disableDrag?: boolean;
}

const SidebarBtnElement: React.FC<SidebarBtnElementProps> = ({
  formElement,
  sizeOverride,
  labelOverride,
  disableDrag,
}) => {
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}-${sizeOverride || "default"}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
      sizeOverride,
    },
  });
  const { label, icon: Icon } = formElement.designerBtnElement;

  // Create a default instance to extract the default size.
  // (Assuming the construct function is pure and returns a default instance.)
  const defaultInstance = formElement.construct("dummy-id");

  // Use the override if provided, otherwise use the default instance's size.
  const usedSize = sizeOverride || (defaultInstance.size as InputSize);
  const progressValue = sizeMap[usedSize] || 100;

  // Use the label override if provided, otherwise use the element's designer label.
  const usedLabel = labelOverride || label;

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        gap: "1px",
        cursor: "grab",
        border: draggable.isDragging ? "1px solid red" : "1px solid lightgray",
        boxShadow: draggable.isDragging ? "0 0 10px red" : "0 0 8px gray",
        maxWidth: "80px",
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
      <div style={{ color: "limegreen", fontSize: "10px" }}>
        {usedLabel}
        <LinearProgress
          style={{ width: "40px", color: "limegreen" }}
          color="inherit"
          variant="determinate"
          value={progressValue}
        />
      </div>
    </Button>
  );
};

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement<any>;
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
