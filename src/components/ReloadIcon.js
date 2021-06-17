import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../utils';

const ReloadIcon = ({ load }) => {
  return (
    <View style={styles.reloadIcon}>
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
        size={24}
        color={colors.PRIMARY_COLOR}
        onPress={load}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reloadIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default ReloadIcon;
