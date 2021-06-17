import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';

const UnitsPeaker = ({ unitsSystem, setUnitsSystem }) => {
  return (
    <View style={styles.unitSystem}>
      <Picker
        selectedValue={unitsSystem}
        onValueChange={(item) => setUnitsSystem(item)}
        mode="dropdown"
        itemStyle={{
          fontSize: 12,
        }}
      >
        <Picker.Item label="C°" value="metric" />
        <Picker.Item label="F°" value="imperial" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  unitSystem: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: -20,
      },
      android: {
        top: 20,
      },
    }),
    left: 20,
    width: 100,
    height: 50,
  },
});

export default UnitsPeaker;
