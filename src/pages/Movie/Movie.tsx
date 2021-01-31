import { Movie } from "../Search/Search";
import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import "./Movie.css";
import ReactStars from "react-rating-stars-component";
import { useLang } from "../LanguageContext/LanguageContext";

export const MoviePage = ({ movie }: { movie: Movie }): JSX.Element => {
  const { getMessage } = useLang();
  return (
    <IonGrid className="movie-page">
      <IonRow>
        <IonCol sizeXs="12" sizeMd="3">
          <img src={movie.Poster} alt="poster" className="movie-poster" />
        </IonCol>
        <IonCol sizeXs="12" sizeMd="9">
          <strong>
            <IonText color="medium">{movie.Genre}</IonText>
          </strong>
          <h1>
            {movie.Title} <IonText color="medium">({movie.Released})</IonText>
          </h1>
          <ReactStars
            count={5}
            size={24}
            value={Number(movie.imdbRating) / 2}
            edit={false}
            activeColor="#ffd700"
            isHalf
          />

          <IonText color="medium">{movie.Plot}</IonText>

          <h2>{getMessage("ratings")}</h2>
          <IonList className="ratings-list" mode="md">
            {movie.Ratings.map((rating, index) => (
              <IonItem key={index}>
                <IonLabel>{rating.Source}</IonLabel>
                <IonLabel>{rating.Value}</IonLabel>
              </IonItem>
            ))}
          </IonList>
          <a href={`https://www.imdb.com/title/${movie.imdbID}`}>
            <IonButton className="imdb-button" expand="block">
              {getMessage("show-movie-data")}
            </IonButton>
          </a>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
