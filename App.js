import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

//Mude para uma KEY valida
const WEATHER_KEY = '';
const BASEURL_WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?';

import WeatherInfo from './src/components/WeatherInfo';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');

  useEffect(() => {
    const load = async () => {
      try {
        const { status } = await Location.requestBackgroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMessage('Acess to location is needed.');
          return;
        }

        const location = await Location.getCurrentPositionAsync();

        const { latitude, longitude } = location.coords;

        const url = `${BASEURL_WEATHER_API}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_KEY}`;

        const response = await fetch(url);
        const result = await response.json();

        if (response.ok) {
          setCurrentWeather(result);
        } else {
          setErrorMessage(result.message);
        }
      } catch (err) {
        setErrorMessage(err.message);
      }
    };

    load();
  }, []);

  if (currentWeather) {
    const {
      main: { temp },
    } = currentWeather;

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
});
