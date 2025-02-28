import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { CiTextAlignJustify } from "react-icons/ci";
import { MdPowerInput } from "react-icons/md";
import SideBarElementsSelectSize from "./SideBarElementsSelectSize";

const SideBarTextInputBtn = () => {
  const [showSelectedElement, setShowSelectedElement] = useState({
    showElements: false,
    Element: "",
  });

  return (
    <>
      {!showSelectedElement.showElements ? (
        <Box>
          <Box fontWeight={600} m={2}>
            Input Elements
          </Box>
          <Box
            mb={2}
            ml={2}
            display="flex"
            gap={3}
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box mb={1}>Text</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "textInput",
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
                    backgroundColor: "#C6E2B5", // change background color on hover
                    boxShadow: "0 0 12px gray", // change box shadow on hover
                    cursor: "pointer", // add cursor pointer on hover
                  },
                }}
              >
                <MdPowerInput
                  style={{
                    border: "1px solid limegreen",
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
              <Box mb={1}> Area</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "textAreaInput",
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
                    backgroundColor: "#C6E2B5", // change background color on hover
                    boxShadow: "0 0 12px gray", // change box shadow on hover
                    cursor: "pointer", // add cursor pointer on hover
                  },
                }}
              >
                <CiTextAlignJustify
                  style={{
                    border: "1px solid limegreen",
                    width: "30px",
                    boxShadow: `16px 10px 45px #5e625c,
                    -16px -10px 45px #ffffff`,
                  }}
                  size={20}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      ) : showSelectedElement.showElements &&
        showSelectedElement.Element === "textInput" ? (
        <SideBarElementsSelectSize
          input={"textInput"}
          setShowSelectedElement={setShowSelectedElement}
        />
      ) : (
        <SideBarElementsSelectSize
          input={"textAreaInput"}
          setShowSelectedElement={setShowSelectedElement}
        />
      )}
    </>
  );
};

export default SideBarTextInputBtn;
