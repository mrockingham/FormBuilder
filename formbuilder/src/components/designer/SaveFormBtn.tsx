import React from "react";
import useBuilderStore from "../../stores/designBuilderStore";
import { Button } from "@mui/material";
import useUserStore from "../../stores/userStore";
import useFormStore from "../../stores/formStore";

import { addForm, updateForm } from "../../services/controllers/formController";

interface SaveFormBtnProps {
  edit: boolean;
  id: number;
}

const SaveFormBtn: React.FC<SaveFormBtnProps> = ({ edit, id }) => {
  const { elements } = useBuilderStore();
  const { user } = useUserStore();
  const { currentForm } = useFormStore();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);

      if (edit) {
        const update = await updateForm(id, {
          title: currentForm?.name || "",
          form_data: JsonElements,
        });
        return update;
      } else {
        const saveForm = await addForm({
          title: currentForm?.name || "",
          form_data: JsonElements,
        });

        return saveForm;
      }
    } catch (error) {}
  };

  return <Button onClick={updateFormContent}>SaveFormBtn</Button>;
};

export default SaveFormBtn;
