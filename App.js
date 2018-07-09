/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import WeatherView from './src/components/WeatherView'

export default class App extends Component {
  render() {
    return (
      <WeatherView/>
    );
  }
}
