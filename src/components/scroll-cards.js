import React, { Component } from 'react';
import WeatherCard from "./weather-card";
import {Container, GridList, GridListTile} from "@material-ui/core";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll";

class ScrollCards extends Component {
  render() {
    const { weather } = this.props;
    return (
      <Container className="scroll-cards">
        <ReactIScroll
          iScroll={iScroll}
          options={{
            mouseWheel: true,
            scrollX: true,
            scrollY: false,
            disablePointer: true,
            disableTouch: false,
            disableMouse: false,
            preventDefault: false,
          }}
        >
          <GridList cellHeight="auto" cols={weather.length} spacing={80}>
            {weather.map((item, index) => {
              return (
                <GridListTile key={index}>
                  <WeatherCard
                    weatherDay={item}
                    weatherIndex={index}
                  />
                </GridListTile>
              )
            })}
          </GridList>
        </ReactIScroll>
      </Container>
    );
  }
}

export default ScrollCards;