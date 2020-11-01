import 'fontsource-roboto';
import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import WeatherApp from "./components/weather-app";
import "./scss/style.scss";

const render = (Component) =>
  ReactDOM.render(<Component />, document.getElementById("root"));

render(hot(WeatherApp));
