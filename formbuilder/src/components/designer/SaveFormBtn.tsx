import React from "react";
import useBuilderStore from "../../stores/designBuilderStore";
import { Button } from "@mui/material";

const SaveFormBtn = () => {
  const { elements } = useBuilderStore();

  const updateFormContent = async () => {
    try {
      console.log(elements);
      const JsonElements = JSON.stringify(elements);
    } catch (error) {}
  };

  console.log("elements", elements);
  return <Button onClick={updateFormContent}>SaveFormBtn</Button>;
};

export default SaveFormBtn;
