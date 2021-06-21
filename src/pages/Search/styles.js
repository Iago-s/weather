import { StyleSheet } from 'react-native';
import { colors } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    backgroundColor: '#FFF',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',

    marginTop: 20,
  },

  input: {
    width: '100%',
    color: '#000',

    marginTop: 20,
    padding: 10,

    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 5,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 20,
  },

  btn: {
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 10,

    borderRadius: 5,
    backgroundColor: colors.PRIMARY_COLOR,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default styles;
