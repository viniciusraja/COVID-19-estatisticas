import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LogoSvg from '../components/LogoSvg/logoSvg';
import MoreStatsSwipeCard from '../components/MoreStatsSwipeCard';
import fetchCOVIDStats from '../store/ducks/actions/covidStats';
import Constants from '../config/constants/Constants';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
    };
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    this.props.fetchCOVIDStats('all');
  }

  getCountryStatsFromApi=()=> {
    this.props.fetchCOVIDStats(`countries/${this.state.country}`);
  }


  shouldComponentRender() {
    const { pending } = this.props;
    if (this.pending === false) return false;
    // more tests
    return true;
  }

  render() {
    const { COVIDStats, error, pending } = this.props;

    if (!this.shouldComponentRender()) return <ActivityIndicator />;

    return (
      <LinearGradient
        colors={['#fff', '#f5f5f5', '#B7FDF0']}
        start={[0, 0]}
        end={[0, 0.5]}
        style={{ flex: 1 }}>
        <View style={styles.container}>
          {error && <Text className="product-list-error">Houve error</Text>}
          <View style={styles.logoAndInputAndRecoveredContainer}>
            <LogoSvg style={styles.logo} />
            <TextInput
              style={styles.inputSearchCountry}
              placeholder="BUSCAR PAÍS"
              placeholderTextColor="grey"
              onChangeText={(country) => this.setState({ country })}
              maxLength={15}
              onEndEditing={() =>
                this.getCountryStatsFromApi(this.state.country)
              }
            />
            <View style={styles.recoveredContainer}>
              <Text style={styles.recoveredTitle}>CURADOS</Text>
              <Text style={styles.recoveredNumber}>{COVIDStats.recovered}</Text>
            </View>
          </View>
          <View style={styles.moreStatsContainer}>
            <MoreStatsSwipeCard />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {},
  logoAndInputAndRecoveredContainer: {
    marginTop: 25,
    width: '100%',
    height: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputSearchCountry: {
    fontFamily: 'big_noodle_titling_oblique',
    fontSize: 20,
    height: 30,
    width: '90%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    elevation: 7,
  },
  recoveredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoveredTitle: {
    fontFamily: 'big_noodle_titling',
    fontSize: 50,
    color: Constants.Colors.green,
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
  },
  moreStatsContainer: {
    height: 30,
    width: '100%',
  },
});

const mapStateToProps = (state) => ({
  error: state.COVIDStatsReducer.error,
  COVIDStats: state.COVIDStatsReducer.COVIDStats,
  pending: state.COVIDStatsReducer.pending,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCOVIDStats,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
