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
    alignItems: 'center',
    height: 200,
    width: '92%',
    borderRadius:25,
    borderColor:"#FFF",
    borderWidth:1,
  },
  moreStatsTitle: {
    width:'100%',
    marginTop:3,
    textAlign:'center',
    fontFamily: Constants.fontFamily,
    fontSize: 22,
    color: "#FFF",
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
