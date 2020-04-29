import { StyleSheet } from 'react-native';
import Constants from '../../config/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  moreStatsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: '90%',
    backgroundColor: Constants.Colors.green,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 300,
  },
 
  moreStatsTitle: {
    width:'100%',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    fontFamily: Constants.fontFamily,
    fontSize: 22,
    color: "#FFF",
    position:'absolute',
    top:0,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    
  },
  casesNumber: {
    fontFamily: Constants.fontFamily,
    fontSize: 25,
    color:"#FFF",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});
