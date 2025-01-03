import React, { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { ElementsType, FormElements } from "../FormElements";
import { SidebarBtnElementDragOverlay } from "../sidebar/SidebarBtnElement";
import useBuilderStore from "../../stores/designBuilderStore";
import Designer from "./Designer";

const DragOverlayWrapper = () => {
  const { elements } = useBuilderStore();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;
  let node = <div>no drag overlay</div>;

  const isSideBarBtnElement = draggedItem?.data.current?.isDesignerBtnElement;

  if (isSideBarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;

    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;

    const isDesignerElement = draggedItem?.data.current?.isDesignerElement;
    if (isDesignerElement) {
      const elementId = draggedItem?.data.current?.elementId;
      const element = elements.find((element) => element.id === elementId);
      if (!element) {
        node = <div>element not found</div>;
      } else {
        const DesignerElementComponent =
          FormElements[element.type].designerCompontent;
        node = <DesignerElementComponent elementInstance={element} />;
      }
    }
    return <DragOverlay>{node}</DragOverlay>;
  }
};
export default DragOverlayWrapper;
