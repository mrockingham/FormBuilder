import { useEffect } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Designer from "../components/designer/Designer";
import useFormStore from "../stores/formStore";
import useBuilderStore from "../stores/designBuilderStore";
import DragOverlayWrapper from "../components/designer/DragOverlayWrapper";
import PreviewDialogBtn from "../components/preview/PreviewDialogBtn";
import { Box } from "@mui/material";
import SaveFormBtn from "../components/designer/SaveFormBtn";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { mockData } from "../components/MockData";

import { FormElementInstance } from "../components/FormElements";
const FormBuilder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { currentForm, setCurrentForm } = useFormStore();
  const { elements, setElements } = useBuilderStore();
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
  const location = useLocation();
  console.log("useNavigate", location);

  const sensors = useSensors(mouseSensor, touchSensor);
  useEffect(() => {
    if (!currentForm && params.id) {
      console.log("params.id", params);
      const form = mockData.find((f) => f.id === params.id);

      if (form) {
        setCurrentForm(form);

        setElements(form?.elements as unknown as FormElementInstance[]);
      }
    }
  }, []);
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
      <Box
        style={{
          padding: "6px",
          fontWeight: "bold",
          fontSize: "20px",
          width: "100%",
          backgroundColor: "white",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>FormBuilder: {currentForm?.name}</Box>
        <Box flexDirection="row">
          <SaveFormBtn
            edit={location.pathname.includes("edit")}
            id={Number(params?.id)}
          />
          <PreviewDialogBtn />
        </Box>
      </Box>
      <DndContext sensors={sensors}>
        <div
          style={{
            display: "flex",
            width: "100%",

            overflowY: "auto",

            height: "100%",
            flexGrow: 1,
          }}
        >
          <Designer />
        </div>

        <DragOverlayWrapper />
      </DndContext>
    </div>
  );
};

export default FormBuilder;
