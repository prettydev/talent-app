import * as React from "react";
import { WizardContext } from "./WizardContext";
import { useCounter } from "./hooks/useStepState";

export default (props: any) => {
  const { count, decrement, increment } = useCounter({ initialCount: 0 });
  const slidesLength = React.Children.count(props.children);
  return (
    <WizardContext.Provider
      value={{ count, decrement, increment, slidesLength }}
    >
      {props.children}
    </WizardContext.Provider>
  );
};
