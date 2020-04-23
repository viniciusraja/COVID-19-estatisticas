import { StyleSheet } from 'react-native';
import Constants from '../../config/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  moreStatsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: 400,
    width: '80%',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 7,
  },
  moreStatsTitle: {
    fontFamily: 'big_noodle_titling',
    fontSize: 20,
    color: Constants.Colors.green,
    alignSelf:'center',
    position:'absolute'
  },
  confirmedCasesContainer: {
      width:'50%',
      justifyContent:'center',
    alignItems:'flex-end',
    marginRight:35,
    borderColor:'red',
    borderRightWidth:1
  },
  testedCasesContainer: {
      width:'50%',
      justifyContent:'center',
    alignItems:'flex-end',
    marginRight:35,
    borderColor:'blue',
    borderRightWidth:1
  },
  deathsCasesContainer: {
      width:'50%',
      justifyContent:'center',
    alignItems:'flex-end',
    marginRight:35,
    borderColor:'green',
    borderRightWidth:1
  },
  confirmedCasesTitle: {
    fontFamily: 'big_noodle_titling',
    fontSize: 20,
  },
  testedCasesTitle: {
    fontFamily: 'big_noodle_titling',
    fontSize: 20,
  },
  deathsCasesTitle: {
    fontFamily: 'big_noodle_titling',
    fontSize: 20,
  },
  confirmedCasesNumber: {
    fontFamily: 'big_noodle_titling',
    fontSize: 40,
  },
  testedCasesNumber: {
    fontFamily: 'big_noodle_titling',
    fontSize: 40,
  },
  deathsCasesNumber: {
    fontFamily: 'big_noodle_titling',
    fontSize: 40,
  },
});
