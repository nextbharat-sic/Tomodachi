// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store";

import { initReactI18next } from "react-i18next";
import i18n from "i18next";
// Import translations
import enTranslation from "./locales/entranslation.json";
import teTranslation from "./locales/tetranslation.json";

// Initialize i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      te: {
        translation: teTranslation,
      },
    },
    lng: "en", // default language
    fallbackLng: "en", // fallback language
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
