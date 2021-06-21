import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../utils';

const Home = () => {
  const { searches } = useSelector((state) => state.search);

  return (
    <ScrollView>
      {searches.length === 0 ? (
        <Text>Nenhuma busca feita!</Text>
      ) : (
        searches.map((item) => (
          <View style={styles.itemContainer}>
            <View style={styles.column}>
              <Text style={styles.cityName}>{item.town}</Text>
              <Text style={styles.stateAndCountryName}>
                {item.state_code}, {item.country}
              </Text>
            </View>
            <TouchableOpacity style={styles.btnForward}>
              <Ionicons
                name="arrow-forward-sharp"
                size={30}
                color={colors.PRIMARY_COLOR}
              />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,

    marginTop: 10,

    borderRadius: 5,
    backgroundColor: '#DCDCDC',
  },

  column: {
    width: '80%',
    padding: 10,

    borderLeftWidth: 4,
    borderLeftColor: colors.PRIMARY_COLOR,
  },

  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  stateAndCountryName: {
    fontSize: 18,
  },
});

export default Home;
