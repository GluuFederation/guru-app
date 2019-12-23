import React, { useState } from "react";

const useMenuElement = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const open = (event: React.MouseEvent<HTMLElement>) => {
    setElement(event.currentTarget);
  };
  const close = () => {
    setElement(null);
  };
  return {
    element,
    setElement,
    open,
    close
  };
};

export default useMenuElement;
