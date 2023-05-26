import { useCallback, useState } from "react";

const useDialog = () => {
  // true -> Dialog is visible
  const [isDialogOpen, setDialogOpen] = useState(false);
  // 해당 다이얼로그에서 가지고 있는 값들
  const [values, setValues] = useState([]);
  const [defaultValues, setDefaultValues] = useState([]); // 값 초기화를 위한 기본값

  /**
   * 다이얼로그의 기본값을 초기화하는 함수
   * @param vals 새로운 기본값들
   */
  const initialize = (vals: any) => {
    setDefaultValues(vals);
  };

  /**
   * 현재 다이얼로그 값들을 기본값으로 갱신하는 함수
   */
  const refresh = useCallback(() => {
    setValues([...defaultValues]);
  }, [defaultValues]);

  /**
   * 다이얼로그를 보이게 만드는 함수. 보이기 전에 값들을 기본값으로 초기화한다.
   */
  const openDialog = () => {
    refresh();
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  // return [isDialogOpen, openDialog, closeDialog];
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
