import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowDownOutline, close } from "ionicons/icons";
import React, { FunctionComponent, useState } from "react";
import { useLang } from "../LanguageContext/LanguageContext";
import { MoviePage } from "../Movie/Movie";
import { useMovieRequester } from "../useMovieRequester";

export const Home: FunctionComponent = () => {
  const alphabet = "abcdefghijklmnopqrstuvwyz";
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];

  const [randomChar] = useState(randomCharacter);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { setLang, getMessage, lang } = useLang();

  console.log("random", randomCharacter);

  const { loading, error, movie } = useMovieRequester(randomChar);
  console.log("movie", loading, error, movie);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              shape="round"
              size="small"
              onClick={() => setShowActionSheet(true)}
            >
              {lang}
              <IonIcon slot="end" size="small" icon={arrowDownOutline} />
            </IonButton>
          </IonButtons>

          <IonTitle>{getMessage("movie-of-the-day")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {movie && <MoviePage movie={movie} />}
        <IonLoading isOpen={loading} />

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass="my-custom-class"
          buttons={[
            {
              text: "Romana",
              role: "info",
              handler: () => setLang("ro"),
            },
            {
              text: "English",
              role: "info",
              handler: () => setLang("en"),
            },
            {
              text: "Cancel",
              icon: close,
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              },
            },
          ]}
        ></IonActionSheet>
      </IonContent>
    </IonPage>
  );
};
