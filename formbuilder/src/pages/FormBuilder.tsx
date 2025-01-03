import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Designer from "../components/designer/Designer";
import useFormStore from "../stores/formStore";
import DragOverlayWrapper from "../components/designer/DragOverlayWrapper";
import PreviewDialogBtn from "../components/preview/PreviewDialogBtn";

const FormBuilder = () => {
  const { forms, currentForm } = useFormStore();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <>
      <h1 style={{ borderBottom: "1px solid black", width: "100%" }}>
        FormBuilder: {currentForm?.name}
      </h1>
      <PreviewDialogBtn />
      <DndContext sensors={sensors}>
        <div style={{ height: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflowY: "auto",
              height: "100%",
              backgroundColor: "lightsteelblue",
              backgroundImage: `url(./diagonal-lines.svg)`,
            }}
          >
            <Designer />
          </div>
        </div>
        <DragOverlayWrapper />
      </DndContext>
    </>
  );
};

export default FormBuilder;
