import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { MdPreview } from "react-icons/md";
import useBuilderStore from "../../stores/designBuilderStore";
import { MdClose } from "react-icons/md";
import { FormElements } from "../FormElements";

const PreviewDialogBtn = () => {
  const { elements } = useBuilderStore();
  const [open, setOpen] = useState(false);

  console.log("elements", elements);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <MdPreview size={20} />
        Preview
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <DialogTitle style={{ display: "flex", alignItems: "center" }}>
              <div>Preview</div>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={() => ({
                color: "red",
              })}
            >
              <MdClose />
            </IconButton>
          </div>
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
            <div
              style={{
                height: "80vh",
                width: "620px",

                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  flexGrow: 1,
                  //   height: "100%",
                  width: "100%",
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  overflowY: "auto",
                  backgroundColor: "white",
                  transform: "scale(0.8)",
                  transformOrigin: "top left",
                }}
              >
                {elements?.map((element) => {
                  const FormComponent =
                    FormElements[element.type]?.formComponent;
                  return (
                    <div
                      key={element?.id}
                      style={{
                        width:
                          element?.size === "1/6"
                            ? "100%"
                            : element?.size === "1/4"
                            ? "45%"
                            : "24%",
                        padding: "20px",
                        overflowY: "auto",
                      }}
                    >
                      <FormComponent
                        key={element.id}
                        elementInstance={element}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PreviewDialogBtn;
