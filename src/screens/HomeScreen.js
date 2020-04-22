import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import fetchCOVIDStats from '../store/ducks/actions/covidStats';
import { LinearGradient } from "expo-linear-gradient";

import LogoSvg from '../components/logoSvg'
class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    this.props.fetchCOVIDStats('brazil', 'deaths');
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
        colors={['#fff','#f5f5f5','#B7FDF0']}
        start={[0, 0]}
        end={[0, 0.5]}
        style={{ flex: 1 }}
      >
      <View style={styles.container}>
        {console.log(error)}
        {error && <Text className="product-list-error">Houve error</Text>}
        <View style={styles.recoveredContainer}>
        <Text style={styles.recoveredTitle}>RECUPERADOS</Text>
        <Text style={styles.recoveredNumber}>{COVIDStats.recovered}</Text>
        </View>
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  recoveredContainer:{
    alignItems:'center',
    justifyContent:'center',
  },
  recoveredTitle:{
    fontFamily:'big_noodle_titling',
    fontSize:60
  },
  recoveredNumber:{
    fontFamily:'big_noodle_titling',
    fontSize:120,
    color:'#dfdfdf',
    elevation:30

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
      fetchCOVIDStats: fetchCOVIDStats,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
