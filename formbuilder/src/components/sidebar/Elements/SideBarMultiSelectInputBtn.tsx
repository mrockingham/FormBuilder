import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosCheckboxOutline } from "react-icons/io";
import SideBarElementsSelectSize from "./SideBarElementsSelectSize";

const SideBarMultiSelectInputBtn = () => {
  const [showSelectedElement, setShowSelectedElement] = useState(false);
  return (
    <>
      {!showSelectedElement ? (
        <Box>
          <Box textAlign={"center"} fontWeight={600} m={2}>
            Text Input Elements
          </Box>
          <Box mb={2} display="flex" justifyContent={"space-around"}>
            <div>
              <Box mb={1}>Check Box</Box>
              <Button
                onClick={() => setShowSelectedElement(true)}
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
                    backgroundColor: "#C6E2B5", // change background color on hover
                    boxShadow: "0 0 12px gray", // change box shadow on hover
                    cursor: "pointer", // add cursor pointer on hover
                  },
                }}
              >
                <IoIosCheckboxOutline
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
              <Box mb={1}>Radio Button</Box>

              <Button
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
                    backgroundColor: "#C6E2B5", // change background color on hover
                    boxShadow: "0 0 12px gray", // change box shadow on hover
                    cursor: "pointer", // add cursor pointer on hover
                  },
                }}
              >
                <IoIosRadioButtonOn
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
        <SideBarElementsSelectSize
          input={"checkboxInput"}
          setShowSelectedElement={setShowSelectedElement}
        />
      )}
    </>
  );
};

export default SideBarMultiSelectInputBtn;
