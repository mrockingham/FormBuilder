import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Designer from "../components/Designer";
import useFormStore from "../stores/formStore";
import DragOverlayWrapper from "../components/DragOverlayWrapper";

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
    <DndContext sensors={sensors}>
      <div style={{ height: "100%" }}>
        <h1 style={{ borderBottom: "1px solid black", width: "100%" }}>
          FormBuilder: {currentForm?.name}
        </h1>
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
            //   backgroundColor: "yellow",
            backgroundImage: `url(./circuit-board.svg)`,
          }}
        >
          <Designer />
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
