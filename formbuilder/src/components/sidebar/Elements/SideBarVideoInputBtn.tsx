import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { MdVideocam } from "react-icons/md";
import SideBarElementsSelectSize from "./SideBarElementsSelectSize";

const SideBarVideoInputBtn = () => {
  const [showSelectedElement, setShowSelectedElement] = useState({
    showElements: false,
    Element: "",
  });

  return (
    <>
      {!showSelectedElement.showElements ? (
        <Box>
          <Box textAlign="center" fontWeight={600} m={2}>
            Video Elements
          </Box>
          <Box mb={2} display="flex" justifyContent="space-around">
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
                <MdVideocam
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

export default SideBarVideoInputBtn;
