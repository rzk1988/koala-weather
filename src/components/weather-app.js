import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Container, Grid, Typography, CssBaseline, Box} from "@material-ui/core";
import LoopIcon from '@material-ui/icons/Loop';
import CityForm from "./city-form";
import ScrollCards from "./scroll-cards";

class WeatherApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      darkMode: localStorage.getItem('darkMode') === 'true',
      city: {},
      weather: null,
      isLoading: false,
    };

    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  toggleDarkMode(flag) {
    this.setState({darkMode: flag});
    localStorage.setItem('darkMode', flag)
  }

  render() {
    const { darkMode, city, weather, isLoading } = this.state;

    const lightModePalette = {
      background: {
        default: '#eaeaea'
      }
    };
    const darkModePalette = {};

    const theme = createMuiTheme({
      palette: {
        type: darkMode ? 'dark' : 'light',
        ... (darkMode ? darkModePalette : lightModePalette)
      }
    });
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container className="weather-app">
          <CityForm
            toggleDarkMode={ this.toggleDarkMode }
            darkMode={darkMode}
            city={city}
            setCity={c => { this.setState({ city: c }) }}
            setWeather={w => { this.setState({ weather: w }) }}
            setLoading={l => { this.setState({ isLoading: l }) }}
          />
          <Grid className="city-name" container justify="center">
            <Typography variant="h4" gutterBottom>
              {isLoading ? 'Loading...' : city.city}
            </Typography>
          </Grid>
          {isLoading ? (
            <Box className="loading-box">
              <LoopIcon className="loading-icon"/>
            </Box>
          ) : (weather ?
            <ScrollCards
              weather={weather}
            />
            : null)
          }
        </Container>
      </ThemeProvider>
    );
  }
}

export default WeatherApp;