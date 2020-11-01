import React, {Component} from "react";
import {
  FormGroup, TextField, FormControlLabel,
  Switch, IconButton, Container, Grid
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import {geocodeCity, reverseGeocodeCity} from "../services/open-cage-service";
import {getWeatherByCoords} from "../services/open-weather-service";

class CityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      cityInput: "",
      cityInputErrorMsg: " ",
    };

    this.searchCity = this.searchCity.bind(this);
    this.locateUser = this.locateUser.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.clearError = this.clearError.bind(this);
    this.showError = this.showError.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  searchCity() {
    const { cityInput } = this.state;
    if(cityInput === '') {
      this.showError("Please type a city name.");
      return;
    }

    this.clearError();
    this.setLoading(true);
    this.props.setCity({});
    this.props.setWeather(null);

    geocodeCity(cityInput)
    .then(res => {
      if (!res){
        this.showError("City not found.");
        return;
      }
      this.props.setCity(res);
      this.getWeather();
    })
    .catch(() => {
      this.showError("Geocoding failed. ");
    })
    .finally(() => {
      this.setLoading(false);
    });
  }

  getWeather() {
    const { city, setWeather } = this.props;
    if (city === {} || !city) return;

    getWeatherByCoords(city.coordinates)
    .then((weather) => {
      setWeather(weather);
    })
    .catch(() => {
      this.showError("Failed to load weather data. ");
    });
  }

  locateUser() {
    this.setState({cityInput: ''});
    this.clearError();
    this.props.setCity({});
    this.props.setWeather(null);
    this.setLoading(true);

    navigator.geolocation.getCurrentPosition(
      position => {
        reverseGeocodeCity({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        .then(res => {
          this.props.setCity(res);
          this.getWeather();
        })
        .catch(() => {
          this.showError("Geocoding failed. ");
        })
        .finally(() => {
          this.setLoading(false);
        });
      },
      () => {
        this.showError("Location permission is required. ");
        this.setLoading(false);
      }
    );
  }

  setLoading(flag) {
    this.setState({isLoading: flag});
    this.props.setLoading(flag)
  }

  clearError() {
    this.setState({
      cityInputErrorMsg: ' ' // some content to keep the helper text's space so it does not pop up when shown
    });
  }

  showError(message) {
    this.setState({
      cityInputErrorMsg: message
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.searchCity();
  }

  render() {
    const {isLoading, cityInput, cityInputErrorMsg} = this.state;
    const {darkMode} = this.props;
    return (
      <Container fixed maxWidth="sm" className="city-form">
        <form onSubmit={this.handleFormSubmit}>
          <Grid container justify="space-around">
            <FormGroup aria-label="search" row className="search-group">
              <TextField
                error={cityInputErrorMsg.length > 1}
                helperText={cityInputErrorMsg}
                id="city-input"
                label="City"
                value={cityInput}
                onChange={(e) => {
                  this.setState({cityInput: e.target.value})
                }}
              />
              <IconButton aria-label="search" color="default" disabled={isLoading} onClick={this.handleFormSubmit}>
                <SearchIcon/>
              </IconButton>
              <IconButton aria-label="locate" color="default" disabled={isLoading} onClick={this.locateUser}>
                <LocationSearchingIcon/>
              </IconButton>
            </FormGroup>
            <FormGroup aria-label="dark-mode" row>
              <FormControlLabel
                value="darkMode"
                control={
                  <Switch
                    color="primary"
                    checked={darkMode}
                    onChange={(e) => {
                      this.props.toggleDarkMode(e.target.checked)
                    }}
                  />
                }
                label="Dark Mode: "
                labelPlacement="start"
              />
            </FormGroup>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default CityForm;
