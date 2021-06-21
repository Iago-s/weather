import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { colors } from '../utils';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={30} color={colors.PRIMARY_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});

export default Loading;
