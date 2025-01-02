import React, { useState } from "react";
import SideBar from "./SideBar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import useBuilderStore from "../stores/designBuilderStore";
import { idGenerator } from "./utils/idGenerator";
import { Button } from "@mui/material";
import { BiSolidTrash } from "react-icons/bi";

////May Seperate
const Designer = () => {
  const { elements, addElement, selectedElement, setSelectedElement } =
    useBuilderStore();
  // const [elements, setElements] = useState<FormElementInstance[]>([])
  const droppable = useDroppable({
    id: "dropArea",
    data: {
      isDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(0, newElement);
      }
    },
  });
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
      }}
    >
      <div
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
        style={{ padding: "10px", width: "100%", height: "100%" }}
      >
        <div
          ref={droppable.setNodeRef}
          style={{
            backgroundColor: "gray", // Replace with your desired color
            maxWidth: "920px",
            height: "100%", // 'h-full'
            margin: "auto", // 'm-auto'
            borderRadius: "1rem", // 'rounded-xl'
            display: "flex", // 'flex'
            flexDirection: "column", // 'flex-col'
            flexGrow: 1, // 'flex-grow'
            alignItems: "center", // 'items-center'
            justifyContent: "flex-start", // 'justify-start'
            overflowY: "auto", // 'overflow-y-auto'
            border: droppable.isOver ? "4px solid blue" : "",
          }}
        >
          {!droppable.isOver && elements?.length === 0 && (
            <div
              style={{
                fontSize: "2rem", // 'text-2xl'
                fontWeight: "bold", // 'font-bold'
                display: "flex", // 'flex'
                flexGrow: 1, // 'flex-grow'
                alignItems: "center", // 'items-center'
                justifyContent: "center", // 'justify-center'
              }}
            >
              Drop Here
            </div>
          )}
          {droppable.isOver && elements?.length === 0 && (
            <div style={{ padding: "4px", width: "100%" }}>
              <div style={{ backgroundColor: "black", height: "120px" }}></div>
            </div>
          )}
          {elements?.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "10px",
                padding: "4px",
              }}
            >
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <SideBar />
    </div>
  );
};

/////May Seperate
const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement, setSelectedElement, selectedElement } =
    useBuilderStore();

  const topHalf = useDroppable({
    id: element.id + "-topHalf",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
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

  if (draggable.isDragging) return null;
  const DesignerElement = FormElements[element.type].designerCompontent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      style={{
        position: "relative",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
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
        style={{ position: "absolute", width: "100%", height: "50%" }}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "50%",
          bottom: "0",
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
                backgroundColor: "orange",
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
              top: " 50%",
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
            top: "0",
            width: "100%",
            height: "7px",
            backgroundColor: "blue",
          }}
        ></div>
      )}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "120px",
          alignItems: "center",
          border: "1px solid black",
          //   borderTop: topHalf.isOver ? "1px solid blue" : "",
          //   borderBottom: bottomHalf.isOver ? "1px solid blue" : "",
          backgroundColor: mouseIsOver
            ? "rgba(236, 240, 241, 0.5)"
            : " rgba(236, 240, 241)",
        }}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div
          style={{
            position: "absolute",
            bottom: "0",
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
