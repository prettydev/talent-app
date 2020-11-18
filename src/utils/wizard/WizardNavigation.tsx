import React, { useContext } from "react";
import { WizardContext } from "./WizardContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { RoundedButton } from "../../components/button/RoundedButton";

export const WizardNext = (props: any) => {
  const { increment, slidesLength, count } = useContext(WizardContext);
  return (
    <>
      {count !== slidesLength && (
        <RoundedButton
          text="Nächster Schritt"
          handleOnPress={() => increment()}
        />
      )}
    </>
  );
};

export const WizardPrev = (props: any) => {
  const { count, decrement } = useContext(WizardContext);
  return (
    <>
      {count !== 0 && (
        <Icon
          name="chevron-left"
          size={40}
          color="#ffffff"
          onPress={() => decrement()}
          light={true}
        />
      )}
    </>
  );
};
