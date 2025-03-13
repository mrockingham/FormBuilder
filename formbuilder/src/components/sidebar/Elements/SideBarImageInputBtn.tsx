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
          <Box fontWeight={600} m={2}>
            Multmed Elements
          </Box>

          <Box
            mb={2}
            ml={2}
            gap={3}
            display="flex"
            justifyContent="flex-start"
            flexWrap={"wrap"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box mb={1}>Image</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "imageUploader",
                  })
                }
                sx={{
                  height: "50px",
                  width: "50px",
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
                    border: "1px solid dodgerblue",
                    width: "30px",
                    boxShadow: `16px 10px 40px #5e625c,
                                -16px -10px 32px #ffffff`,
                  }}
                  size={20}
                />
              </Button>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box mb={1}>Video</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "videoUploader",
                  })
                }
                sx={{
                  height: "50px",
                  width: "50px",
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
                    border: "1px solid dodgerblue",
                    width: "30px",
                    boxShadow: `16px 10px 40px #5e625c,
                                -16px -10px 32px #ffffff`,
                  }}
                  size={20}
                />
              </Button>
            </Box>
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
