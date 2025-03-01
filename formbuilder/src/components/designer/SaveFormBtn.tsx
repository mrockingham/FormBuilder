import React from "react";
import useBuilderStore from "../../stores/designBuilderStore";
import { Button } from "@mui/material";
import useUserStore from "../../stores/userStore";
import useFormStore from "../../stores/formStore";

import { addForm } from "../../services/controllers/formController";

const SaveFormBtn = () => {
  const { elements } = useBuilderStore();
  const { user } = useUserStore();
  const { currentForm } = useFormStore();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);

      const saveForm = await addForm({
        title: currentForm?.name || "",
        form_data: JsonElements,
      });

      return saveForm;
    } catch (error) {}
  };

  return <Button onClick={updateFormContent}>SaveFormBtn</Button>;
};

export default SaveFormBtn;
