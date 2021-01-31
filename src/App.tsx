import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, searchOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Home } from "./pages/Home/Home";
import { Search } from "./pages/Search/Search";
import { useLang } from "./pages/LanguageContext/LanguageContext";

const App: React.FC = () => {
  const { getMessage } = useLang();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route path="/home" component={Home} exact />
              <Route path="/search" component={Search} exact />
              <Route path="/" render={() => <Redirect to="/home" />} />
            </Switch>
          </IonRouterOutlet>
          <IonTabBar mode="md" slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>{getMessage("home-tab")}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="search" href="/search">
              <IonIcon icon={searchOutline} />
              <IonLabel>{getMessage("search-movies-tab")}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
