import { useCallback, useState } from "react";

const useDialog = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [values, setValues] = useState<any>([]);
  const [defaultValues, setDefaultValues] = useState([]);

  const initialize = (vals: any) => {
    setDefaultValues(vals);
  };

  const refresh = useCallback(() => {
    setValues([...defaultValues]);
  }, [defaultValues]);

  const openDialog = () => {
    refresh();
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return {
    isOpen: isDialogOpen,
    values,
    setValues,
    initialize,
    open: openDialog,
    close: closeDialog,
  };
};

export default useDialog;
