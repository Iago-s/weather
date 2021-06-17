import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { WEATHER_KEY } from 'react-native-dotenv';

const BASEURL_WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?';

import UnitsPeaker from './src/components/UnitsPeaker';
import ReloadIcon from './src/components/ReloadIcon';
import WeatherInfo from './src/components/WeatherInfo';
import WeatherDetails from './src/components/WeatherDetails';

import { colors } from './src/utils';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');

  useEffect(() => {
    load();
  }, [unitsSystem]);

  const load = async () => {
    setCurrentWeather(null);
    setErrorMessage(null);

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

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPeaker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={styles.textError}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  textError: {
    textAlign: 'center',
  },

  main: {
    justifyContent: 'center',
    flex: 1,
  },
});
