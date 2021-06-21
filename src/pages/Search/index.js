import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const BASEURL_WEATHER_API =
  'https://api.opencagedata.com/geocode/v1/json?key={KEY}&q=';

import { searchActions } from '../../store';

import PreviousSearches from '../../components/PreviousSearches';
import Loading from '../../components/Loading';

import styles from './styles';

const Home = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');

  const handleGetWeather = async () => {
    const url = `${BASEURL_WEATHER_API}${city}`;

    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length === 0) {
        alert('Não encontramos informações para essa cidade');
        return;
      }

      const { country, state_code, town } = data.results[0].components;

      dispatch(
        searchActions.addSearch({
          country,
          state_code,
          town,
        })
      );

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Error');
    }
  };

  const handleGetLocation = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Voce deve permitir a localização para usar esse recurso.');

      getPermission();
      return;
    }

    const location = await Location.getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;

    const url = `${BASEURL_WEATHER_API}${latitude}+${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length === 0) {
        alert('Não encontramos informações para essa localização');

        return;
      }

      const { country, state_code, town } = data.results[0].components;

      dispatch(
        searchActions.addSearch({
          country,
          state_code,
          town,
        })
      );

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Error');
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    await Location.requestForegroundPermissionsAsync();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.subtitle}>Type your location here</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: São Paulo"
            value={city}
            onChangeText={(value) => setCity(value)}
          />
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn} onPress={handleGetWeather}>
              <Ionicons name="search-sharp" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleGetLocation}>
              <Ionicons name="locate-sharp" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Previous searches</Text>
          <PreviousSearches />
        </View>
      )}
    </>
  );
};

export default Home;
