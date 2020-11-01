import React, { Component } from 'react';
import {Paper, Grid, Typography} from "@material-ui/core";

class WeatherCard extends Component {
  render() {
    const {weatherDay, weatherIndex} = this.props;
    let dayHint = false;
    if (weatherIndex === 0) dayHint = 'Today';
    if (weatherIndex === 1) dayHint = 'Tomorrow';
    return (
      <Paper className="weather-card" elevation={5}>
        <Grid container direction="column" justify="center" alignItems="flex-start">
          {dayHint ? (
            <Typography variant="h5" color="textSecondary" className="day-hint">{dayHint}</Typography>
          ) : null}
          <Typography variant="h4">{weatherDay.day}</Typography>
          <Typography variant="subtitle1">{weatherDay.date}</Typography>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <img src={weatherDay.icon} alt={weatherDay.weather}/>
            </Grid>
            <Grid item xs={8} className="weather-desc">
              <Typography variant="h5">{weatherDay.weather_desc}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h3">{`${weatherDay.temp_max}/${weatherDay.temp_min}°C`}</Typography>
        </Grid>
      </Paper>
    );
  }
}

export default WeatherCard;