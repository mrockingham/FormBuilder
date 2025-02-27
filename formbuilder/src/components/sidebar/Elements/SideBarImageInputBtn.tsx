import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { MdImage } from "react-icons/md";
import { MdOndemandVideo } from "react-icons/md";
import SideBarElementsSelectSize from "./SideBarElementsSelectSize";

const SideBarImageInputBtn = () => {
  const [showSelectedElement, setShowSelectedElement] = useState({
    showElements: false,
    Element: "",
  });

  return (
    <>
      {!showSelectedElement.showElements ? (
        <Box>
          <Box textAlign="center" fontWeight={600} m={2}>
            Multmed Elements
          </Box>
          <Box mb={2} display="flex" justifyContent="space-around">
            <div>
              <Box mb={1}>Image Uploader</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "imageUploader",
                  })
                }
                sx={{
                  height: "100px",
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ECF4E6",
                  border: "1px solid lightgray",
                  boxShadow: "0 0 8px gray",
                  "&:hover": {
                    backgroundColor: "#C6E2B5",
                    boxShadow: "0 0 12px gray",
                    cursor: "pointer",
                  },
                }}
              >
                <MdImage
                  style={{
                    border: "1px solid limegreen",
                    width: "60px",
                    boxShadow: `16px 10px 40px #5e625c,
                                -16px -10px 32px #ffffff`,
                  }}
                  size={20}
                />
              </Button>
            </div>
            <div>
              <Box mb={1}>Video Uploader</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "videoUploader",
                  })
                }
                sx={{
                  height: "100px",
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ECF4E6",
                  border: "1px solid lightgray",
                  boxShadow: "0 0 8px gray",
                  "&:hover": {
                    backgroundColor: "#C6E2B5",
                    boxShadow: "0 0 12px gray",
                    cursor: "pointer",
                  },
                }}
              >
                <MdOndemandVideo
                  style={{
                    border: "1px solid limegreen",
                    width: "60px",
                    boxShadow: `16px 10px 40px #5e625c,
                                -16px -10px 32px #ffffff`,
                  }}
                  size={20}
                />
              </Button>
            </div>
          </Box>
        </Box>
      ) : (
        <>
          {showSelectedElement.Element === "imageUploader" && (
            <SideBarElementsSelectSize
              input={"imageInput"}
              setShowSelectedElement={setShowSelectedElement}
            />
          )}
          {showSelectedElement.Element === "videoUploader" && (
            <SideBarElementsSelectSize
              input={"videoInput"}
              setShowSelectedElement={setShowSelectedElement}
            />
          )}
        </>
      )}
    </>
  );
};

export default SideBarImageInputBtn;
