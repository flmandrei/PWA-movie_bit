import { IonGrid, IonText } from "@ionic/react";
import React from "react";
import { useLang } from "../LanguageContext/LanguageContext";
import "./NotFound.css";

export const NotFound = () => {
  const { getMessage } = useLang();

  return (
    <IonGrid className="not-found">
      <h1>
        <IonText color="warning">{getMessage("not-found")}</IonText>
      </h1>
    </IonGrid>
  );
};
