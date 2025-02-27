// Designer.tsx
import React, { useState } from "react";
import SideBar from "../sidebar/SideBar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { FormElementInstance, FormElements } from "../FormElements";
import useBuilderStore from "../../stores/designBuilderStore";
import { idGenerator } from "../utils/idGenerator";
import { Button } from "@mui/material";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useBuilderStore();

  const droppable = useDroppable({
    id: "dropArea",
    data: { isDropArea: true },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;

      const isDroppingOverDesignerDropArea = over.data.current?.isDropArea;
      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;

      // First Part: Dropping a new element onto the drop area
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type: keyof typeof FormElements = active.data.current?.type;
        // Get size override from the drag data, if available
        const sizeOverride = active.data.current?.sizeOverride;
        const newElement = FormElements[type].construct(
          idGenerator(),
          sizeOverride
        );
        addElement(elements?.length, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data.current?.isDesignerElement;

      const droppingSidebarBtnOverDesignElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;
      const droppingSidebarBtnOverDesignElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;
      const droppingSidebarBtnOverDesignElementLeftHalf =
        over.data?.current?.isLeftHalfDesignerElement;
      const droppingSidebarBtnOverDesignElementRightHalf =
        over.data?.current?.isRightHalfDesignerElement;

      const isDroppingOverDesignerElement =
        droppingSidebarBtnOverDesignElementTopHalf ||
        droppingSidebarBtnOverDesignElementBottomHalf ||
        droppingSidebarBtnOverDesignElementLeftHalf ||
        droppingSidebarBtnOverDesignElementRightHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      // Second Part: Dropping a new element over an existing element
      if (droppingSidebarBtnOverDesignerElement) {
        const type: keyof typeof FormElements = active.data.current?.type;
        const sizeOverride = active.data.current?.sizeOverride;
        const newElement = FormElements[type].construct(
          idGenerator(),
          sizeOverride
        );
        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex(
          (element) => element.id === overId
        );
        if (overElementIndex === -1) throw new Error("Element not found");
        let indexForNewElement = overElementIndex; // assume top half
        if (droppingSidebarBtnOverDesignElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        } else if (droppingSidebarBtnOverDesignElementLeftHalf) {
          indexForNewElement = overElementIndex; // Handle left-side drop
        } else if (droppingSidebarBtnOverDesignElementRightHalf) {
          indexForNewElement = overElementIndex + 1; // Handle right-side drop
        }
        addElement(indexForNewElement, newElement);
        return;
      }

      // Third Part: Reordering existing elements by dragging over another element
      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;
      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data.current?.elementId;
        const overId = over.data.current?.elementId;
        const activeElementIndex = elements.findIndex(
          (element) => element.id === activeId
        );
        const overElementIndex = elements.findIndex(
          (element) => element.id === overId
        );
        if (activeElementIndex === -1 || overElementIndex === -1)
          throw new Error("Element not found");
        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);
        let indexForNewElement = overElementIndex; // assume top half
        if (droppingSidebarBtnOverDesignElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        } else if (droppingSidebarBtnOverDesignElementLeftHalf) {
          indexForNewElement = overElementIndex; // Handle left-side drop
        } else if (droppingSidebarBtnOverDesignElementRightHalf) {
          indexForNewElement = overElementIndex + 1; // Handle right-side drop
        }
        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div
      style={{
        maxWidth: "100%",
        display: "flex",
        backgroundColor: "#ECF4E6",
        flexGrow: 1,
      }}
    >
      <SideBar />
      <div
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
        style={{ padding: "30px", width: "100%", display: "flex" }}
      >
        <div
          ref={droppable.setNodeRef}
          style={{
            maxWidth: "1120px",
            height: "100%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "1rem",
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            border: "1px solid lightgray",
            boxShadow: "0 0 8px gray",
            paddingRight: "10px",
          }}
        >
          {!droppable.isOver && elements?.length === 0 && (
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "1120px",
                backgroundImage: `url(./diagonal-lines.svg)`,
              }}
            >
              Drop Here
            </div>
          )}
          {droppable.isOver && elements?.length === 0 && (
            <div style={{ padding: "4px", width: "100%" }}></div>
          )}
          {elements?.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                alignItems: "flex-start",
                maxWidth: "1120px",
                gap: "20px",
                padding: "20px",
              }}
            >
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Map your unified size strings to a width percentage
const widthMap: Record<string, string> = {
  "1/2": "47%",
  "1/3": "31.33%",
  "2/3": "64.66%",
  "1/4": "23%",
  "3/4": "73%",
  "1/6": "13.66%",
  "5/6": "81.33%",
  "100%": "100%",
};

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement, setSelectedElement } = useBuilderStore();

  const topHalf = useDroppable({
    id: element.id + "-topHalf",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const rightHalf = useDroppable({
    id: element.id + "-rightHalf",
    data: {
      type: element.type,
      elementId: element.id,
      isRightHalfDesignerElement: true,
    },
  });

  const leftHalf = useDroppable({
    id: element.id + "-leftHalf",
    data: {
      type: element.type,
      elementId: element.id,
      isLeftHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottomHalf",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  // Determine the element’s width using the mapping.
  const elementWidth = widthMap[element.size as string] || "100%";

  // If the element is being dragged, you might choose to render it differently.
  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerCompontent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      style={{
        position: "relative",
        height: "100px",
        border: "1px solid lightgray",
        boxShadow: "0 0 10px lightgray",
        backgroundColor: "transparent",
        padding: "10px",
        width: elementWidth,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();

        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          width: "100%",
          height: "50%",
          top: 0,
        }}
      ></div>
      <div
        ref={rightHalf.setNodeRef}
        style={{ position: "absolute", width: "50%", height: "100%", right: 0 }}
      ></div>
      <div
        ref={leftHalf.setNodeRef}
        style={{ position: "absolute", width: "50%", height: "100%", left: 0 }}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "50%",
          bottom: 0,
        }}
      ></div>

      {mouseIsOver && (
        <>
          <div style={{ position: "absolute", right: "0", height: "100%" }}>
            <Button
              variant="outlined"
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <BiSolidTrash color="white" size={25} />
            </Button>
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "pulse 1s infinite",
            }}
          >
            <p>Click for Properties or drag to move</p>
          </div>
        </>
      )}

      {topHalf.isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "7px",
            backgroundColor: "blue",
          }}
        ></div>
      )}
      {rightHalf.isOver && (
        <div
          style={{
            position: "absolute",
            right: 0,
            height: "100%",
            width: "7px",
            backgroundColor: "red",
          }}
        ></div>
      )}
      {leftHalf.isOver && (
        <div
          style={{
            position: "absolute",
            left: 0,
            height: "100%",
            width: "7px",
            backgroundColor: "red",
          }}
        ></div>
      )}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "120px",

          justifyContent: "center",
          backgroundColor: mouseIsOver ? "limegreen" : "#ECF4E6",
        }}
      >
        {!mouseIsOver && <DesignerElement elementInstance={element} />}
      </div>
      {bottomHalf.isOver && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "7px",
            backgroundColor: "blue",
          }}
        ></div>
      )}
    </div>
  );
};

export default Designer;
