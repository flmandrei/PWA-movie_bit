import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonLoading,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonActionSheet,
} from "@ionic/react";
import React, { FC, useCallback, useState } from "react";
import "./Search.css";
import { arrowDownOutline, close } from "ionicons/icons";

import { debounce } from "lodash";
import { MoviePage } from "../Movie/Movie";
import { NotFound } from "../NotFound/NotFound";
import { useMovieRequester } from "../useMovieRequester";
import { useLang } from "../LanguageContext/LanguageContext";

interface Rating {
  Source: string;
  Value: string;
}

export interface Movie {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export const Search: FC = () => {
  const [searchText, setSearchText] = useState("");

  const { loading, movie } = useMovieRequester(searchText);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { setLang, getMessage, lang } = useLang();

  console.log(searchText);

  const debounceText = useCallback(
    debounce((value: string) => setSearchText(value), 500),
    [setSearchText]
  );

  return (
    <IonPage className="search-page">
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>{getMessage("title-search")}</IonTitle>
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
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" sizeMd="4" pushMd="4">
              <IonSearchbar
                mode="ios"
                defaultValue={searchText}
                placeholder={getMessage("search-placeholder")}
                onIonChange={(e) => debounceText(e.detail.value!)}
              ></IonSearchbar>
            </IonCol>
          </IonRow>
        </IonGrid>
        {movie && <MoviePage movie={movie} />}
        {!movie && searchText && !loading && <NotFound />}
        <IonLoading isOpen={loading} />
        {/* {error && (
          <h1>
            <IonText color="error">Error retrieving data</IonText>
          </h1>
        )} */}
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
