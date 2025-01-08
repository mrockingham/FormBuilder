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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        flexGrow: 1,
      }}
    >
      <h1 style={{ borderBottom: "1px solid black", width: "100%" }}>
        FormBuilder: {currentForm?.name}
      </h1>
      <DndContext sensors={sensors}>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflowY: "auto",
            backgroundColor: "var(--accent)", // Replace with your actual CSS variable or color code
            backgroundImage: `url(./diagonal-lines.svg)`,
            height: "100%",
            flexGrow: 1,
            // backgroundSize: "cover", // Add if you need the image to cover the background
            // backgroundRepeat: "no-repeat", // Add if the image should not repeat
            // backgroundPosition: "center", // Add if you want the image centered
          }}
        >
          <Designer />
        </div>
        <PreviewDialogBtn />

        <DragOverlayWrapper />
      </DndContext>
    </div>
  );
};

export default FormBuilder;
