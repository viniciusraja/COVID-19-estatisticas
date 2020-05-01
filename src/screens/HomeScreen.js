import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Linking
} from 'react-native';
import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { connect } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';

import countriesDataPt from '../store/data/countriesDataPt.json'
import LogoSvg from '../components/LogoSvg/logoSvg';
import MoreStatsSwipeCard from '../components/MoreStatsSwipeCard';
import fetchCOVIDStats from '../store/ducks/actions/covidStats';
import getDisplayedStats from '../store/ducks/actions/displayedStats';
import Constants from '../config/constants/Constants';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats:'',
      allCountriesStats: [this.props.COVIDStatsTranslated ],
      query: '',
      countriesDataPt:[...countriesDataPt]
    };
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }
  componentDidMount= async ()=>{
    await this.props.fetchCOVIDStats('all')
    await this.props.fetchCOVIDStats('countries/')
  }
  
  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === false) {
      return false;
    }
    return true;
  }

  shareToEmail = () => {
    Linking.openURL(`mailto:covid-19estatistica@outlook.com?subject=&body=`);
  }

     findFilm(query) {
    if (query === '') {
      return [];
    }
    query=query.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const {allCountriesStats} = this.state;
    const regex = new RegExp(`^${query.trim()}`, 'i');
    
    return allCountriesStats.filter(
      (country) => {
        return country.country.normalize("NFD").replace(/[\u0300-\u036f]/g, "").search(regex) >= 0}
      );
    }
    
    render() {
      const { COVIDStats, error, pending } = this.props;
      const { query } = this.state;
    const countries = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    if (this.shouldComponentRender()) 
    return( 
    <LinearGradient
        colors={['#fff', '#f5f5f5', '#B7FDF0']}
        start={[0, 0]}
        end={[0, 0.5]}
        style={{ flex: 1 , justifyContent:"center", alignItems:"center"}}>
        
        <LogoSvg style={[styles.logo,{position:'absolute', top:100}]} />
          <ActivityIndicator size={60} color={Constants.Colors.darkGreen} />
          </LinearGradient>)

    return (
      <LinearGradient
        colors={['#fff', '#f5f5f5', '#B7FDF0']}
        start={[0, 0]}
        end={[0, 0.5]}
        style={{ flex: 1 }}>
        <View style={styles.container}>
          {error && (
            <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {`SENTIMOS MUITO HOUVE UM ERRO.\n REINICIE O APP`}
            </Text>
            </View>
          )}
          <View style={styles.logoAndInputAndRecoveredContainer}>
            <View style={styles.sendEmailContainer}>
              <TouchableOpacity style={styles.sendEmailButton}
              onPress={() => this.shareToEmail()}>
              <MaterialCommunityIcons
                  style={styles.sendEmailIcon}
                  name="email-outline"
                  size={32}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <LogoSvg style={styles.logo} />
            <View style={styles.autoCompleteContainerToFixPosition}>
            <Autocomplete
              onPress={()=>this.myTextInput.current.clear()}
              onTouchEnd={()=>this.setState({ allCountriesStats:this.props.COVIDStatsTranslated })}
              style={styles.inputSearchCountryContainer}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              listContainerStyle={styles.listContainerStyle}
              listStyle={styles.listStyle}
              data={
                countries.length === 1 && comp(query, countries[0].country)
                  ? []
                  : countries
              }
              defaultValue={query}
              onChangeText={(text) => this.setState({ query: text })}
              keyExtractor={(item) => `${item.countryInfo._id}`}
              placeholder="PESQUISE O PAÌS"
              renderItem={({ item, index }) => {
                if(index<2){
                  return <TouchableOpacity
                  onPress={() =>{
                    this.setState({ query: item.country}),
                    this.props.getDisplayedStats(item),
                    Keyboard.dismiss()
                  }
                  }>
                    <View style={styles.inputSearchCountryItemContainer}>
                    <Image
        style={styles.inputSearchCountryFlagImage}
        source={{
          uri: item.countryInfo.flag,
        }}
      />
                  <Text style={styles.inputSearchCountryText}>
                    {item.country}
                  </Text>
                    </View>
                </TouchableOpacity>}
                return null
              }}
            /></View>
            <View
              style={styles.recoveredContainer}
              >
              <Text style={styles.recoveredTitle}>CURADOS</Text>
              <Text style={styles.recoveredNumber}>
                {this.props.DisplayedStats.recovered}
              </Text>
            </View>
          </View>
         <View style={styles.worldMapContainer}>
            <Image
        style={styles.worldMapImage}
        source={require('../assets/images/mundo.png')}
        />
        </View>
          <View style={styles.moreStatsSuperiorContainer}>
            <MoreStatsSwipeCard stats={this.props.DisplayedStats.cases} statsName={"CASOS"} color={Constants.Colors.darkGreen}/>
            <MoreStatsSwipeCard stats={this.props.DisplayedStats.tests} statsName={"TESTES"} color={Constants.Colors.darkGreen}/>
            <MoreStatsSwipeCard stats={this.props.DisplayedStats.deaths} statsName={"MORTES"} color={Constants.Colors.darkGreen}/>
          </View>
          <View style={styles.moreStatsInferiorContainer}>
            <MoreStatsSwipeCard stats={this.props.DisplayedStats.todayCases} statsName={"CASOS HOJE"} color={Constants.Colors.lightGreen}/>
            <MoreStatsSwipeCard stats={this.props.DisplayedStats.critical} statsName={"CRÍTICOS"} color={Constants.Colors.lightGreen}/>
            <MoreStatsSwipeCard stats={this.props.DisplayedStats.todayDeaths} statsName={"MORTES HOJE"} color={Constants.Colors.lightGreen}/>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorContainer:{
    position:'absolute',
    top:'50%',
    justifyContent:'center',
    width:320,
    height:60,
    backgroundColor:'#F5F5F5',
    borderRadius:20,
    zIndex:60,
    elevation:30

    
  },
  errorText:{
    textAlign:'center',
    fontFamily: Constants.fontFamily,
    fontSize:20,
    color:'red'
  },
  autoCompleteContainerToFixPosition: {
    position:'absolute',
    top:115,
    zIndex:30,
  },
  sendEmailContainer:{
    position:'absolute',
    right:0,
    height:40,
    width:45,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Constants.Colors.darkGreen,
    borderWidth:.7,
    borderColor:Constants.Colors.lightGreen,
    borderTopLeftRadius:7,
    borderBottomLeftRadius:7,
    elevation:10,
    

  },
  sendEmailIcon:{
    textShadowColor: 'rgba(50, 50, 50, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,

  },
  logoAndInputAndRecoveredContainer: {
    width: '100%',
    marginTop:50,
    height:370,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputSearchCountryContainer: {
    height: 30,
    width:'100%',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    elevation: 7,
    fontFamily: Constants.fontFamily,
    fontSize:17,
    textAlign:'center',
  },
  inputContainerStyle:{
    marginTop:10,
    height: 29,
    width:280,
    borderWidth:0,
    borderRadius: 20,
    
  },
  containerStyle:{
  },
  listContainerStyle:{
    justifyContent:'center',
    alignItems:'center',
    
  },
  listStyle:{
    height:200,
    backgroundColor: 'transparent',
    borderWidth:0,
    marginTop:2,
    width:'100%',
  },
  inputSearchCountryItemContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    height:60,
    backgroundColor: '#F5F5F5',
    borderRadius:20,
    marginVertical:2,
  },
  inputSearchCountryFlagImage:{
    height:25,
    width:35,
    borderRadius:7,
    marginRight:20,
    marginLeft:10
  },
  inputSearchCountryText: {
    fontFamily: 'big_noodle_titling_oblique',
    fontSize: 20,
    textAlign: 'center',
  },
  recoveredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoveredTitle: {
    fontFamily: 'big_noodle_titling',
    fontSize: 50,
    color: Constants.Colors.green,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  recoveredNumber: {
    position: 'relative',
    bottom: 25,
    fontFamily: 'big_noodle_titling',
    fontSize: 120,
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    zIndex:10,
  },
  worldMapContainer:{
    justifyContent:'center',
    alignItems:'center',
    height:200,
    width:200,
    borderWidth:7,
    borderColor:'#FFF',
    borderRadius:200,
    alignSelf:'flex-start',
    left:-100,
    bottom:150,
    zIndex:2
  },
  worldMapImage:{
    resizeMode:'contain',
    width:'100%',
    height:'100%',
    zIndex:0,
  },
  moreStatsSuperiorContainer: {
    position:'absolute',
    flexDirection:'row',
    bottom:30,
    height: 30,
    width: '100%',
    elevation:10,
    zIndex:40,

  },
  moreStatsInferiorContainer:{
    position:'absolute',
    flexDirection:'row',
    bottom:0,
    height: 30,
    width: '100%',
    elevation:10,
    zIndex:40,

  },
});

const mapStateToProps = (state) => ({
  error: state.COVIDStatsReducer.error,
  DisplayedStats: state.COVIDStatsReducer.DisplayedStats,
  COVIDStats: state.COVIDStatsReducer.COVIDStats,
  COVIDStatsTranslated: state.COVIDStatsReducer.COVIDStatsTranslated,
  pending: state.COVIDStatsReducer.pending,
});

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchCOVIDStats: req => dispatch(fetchCOVIDStats(req)),
    getDisplayedStats: stats => dispatch(getDisplayedStats(stats))
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
