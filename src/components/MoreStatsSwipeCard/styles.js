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
  countryNameAndStatsContainer:{
    flexDirection:'row',
    height:'100%',
    width:'100%',
    justifyContent:'space-around',
    alignItems:'flex-end',
  },
  countryFlagImage:{
    position:'absolute',
    bottom:3,
    left:-2,
    height:30,
    width:40,
    borderRadius:7,
  },
  countryNameText:{
    marginBottom:40,
    fontFamily:Constants.fontFamily,
    fontSize:50,
    color:Constants.Colors.green,
    textAlign:'center'
       
  },
  allStatsContainer:{
    justifyContent:"flex-end",
    alignItems:'flex-end',
    height:'100%',
    width:'60%'
  },
  moreStatsTitle: {
    width:'180%',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    fontFamily: Constants.fontFamily,
    fontSize: 20,
    color: Constants.Colors.green,
    position:'absolute',
    top:0
    
  },
  confirmedCasesContainer: {
      width:'100%',
      justifyContent:'center',
    alignItems:'flex-end',
    marginRight:35,
    borderColor:Constants.Colors.confirmed,
    borderRightWidth:4
  },
  testedCasesContainer: {
      width:'100%',
      justifyContent:'center',
    alignItems:'flex-end',
    marginRight:35,
    borderColor:Constants.Colors.tested,
    borderRightWidth:4
  },
  deathsCasesContainer: {
      width:'100%',
      justifyContent:'center',
    alignItems:'flex-end',
    marginRight:35,
    borderColor:Constants.Colors.deaths,
    borderRightWidth:4
  },
  confirmedCasesTitle: {
    fontFamily: Constants.fontFamily,
    fontSize: 20,
    color:Constants.Colors.confirmed,
  },
  testedCasesTitle: {
    fontFamily: Constants.fontFamily,
    fontSize: 20,
    color:Constants.Colors.tested,
  },
  deathsCasesTitle: {
    fontFamily: Constants.fontFamily,
    fontSize: 20,
    color:Constants.Colors.deaths
  },
  confirmedCasesNumber: {
    fontFamily: Constants.fontFamily,
    fontSize: 40,
    color:Constants.Colors.confirmed,
  },
  testedCasesNumber: {
    fontFamily: Constants.fontFamily,
    fontSize: 40,
    color:Constants.Colors.tested,
  },
  deathsCasesNumber: {
    fontFamily: Constants.fontFamily,
    fontSize: 40,
    color:Constants.Colors.deaths
  },
});
