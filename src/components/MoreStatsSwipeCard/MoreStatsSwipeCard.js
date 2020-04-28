import React from 'react';
import { View, Animated, Text, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { styles } from './styles';

import { useSelector } from 'react-redux';


function GetTotalSumOfEachElementInArray(array) {
  return array.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
}
function GetThePercentualValueFromTotal(value, total) {
  return (value / total) * 100;
}
function MoreStatsSwipeCard() {
  const COVIDStats = useSelector((state) => state.COVIDStatsReducer.COVIDStats);
  const DisplayedStats = useSelector(
    (state) => state.COVIDStatsReducer.DisplayedStats
  );
  const totalStatsNumberFromMoreStats = GetTotalSumOfEachElementInArray([
    DisplayedStats.cases,
    DisplayedStats.tests,
    DisplayedStats.deaths,
  ]);
  const widthConfirmedCasesContainer = GetThePercentualValueFromTotal(
    DisplayedStats.cases,
    totalStatsNumberFromMoreStats
  );
  const widthTestedCasesContainer = GetThePercentualValueFromTotal(
    DisplayedStats.tests,
    totalStatsNumberFromMoreStats
  );
  const widthDeathsCasesContainer = GetThePercentualValueFromTotal(
    DisplayedStats.deaths,
    totalStatsNumberFromMoreStats
  );
  const translateY = new Animated.Value(0);
  let offset = 0;
  const cardHeight = 370;
  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );
 

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if ((translationY <= 100 && translationY >= 0) || translationY <= -100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? -cardHeight : 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? -cardHeight : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }
  
  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={animatedEvent}
        onHandlerStateChange={onHandlerStateChanged}>
        <Animated.View
          style={[
            styles.moreStatsContainer,
            {
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-cardHeight, 0, 200],
                    outputRange: [-cardHeight, 0, 10],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
            {
              opacity: translateY.interpolate({
                inputRange: [-cardHeight, 0],
                outputRange: [1, 0.9],
              }),
            },
          ]}>
            
          <View style={styles.countryNameAndStatsContainer}>
            <View style={{ justifyContent:'center', alignItems:'center',width: '40%', height: 350, marginLeft:15, marginBottom:15 }}>
            {DisplayedStats.countryInfo.flag&&<Image
        style={[styles.countryFlagImage,{
          transform: [
            { rotate: '-90deg' },
            
          ]}]}
        source={{
          uri: DisplayedStats.countryInfo.flag,
        }}
                />}
              <Text
                style={[styles.countryNameText,{
                  transform: [
                    { rotate: '-90deg' },
                    
                  ],
                  width: 350,
                  height: '40%',
                }]}>
                  {console.log(DisplayedStats)}
                {DisplayedStats.country}
              </Text>
            </View>
            <View style={styles.allStatsContainer}>
              <Animated.Text
                style={[
                  styles.moreStatsTitle,
                  {
                    opacity: translateY.interpolate({
                      inputRange: [-10, 0],
                      outputRange: [0, 1],
                    }),
                  },
                ]}>
                + DADOS
              </Animated.Text>
              <Animated.View
                style={[
                  styles.confirmedCasesContainer,
                  {
                    opacity: translateY.interpolate({
                      inputRange: [-cardHeight, 0],
                      outputRange: [1, 0],
                    }),
                  },
                  widthConfirmedCasesContainer < 15 ? { flex: 0 } : { flex: 1 },
                ]}>
                <Text style={styles.confirmedCasesTitle}>CONFIRMADOS</Text>
                <Text style={styles.confirmedCasesNumber}>
                  {DisplayedStats.cases}
                </Text>
              </Animated.View>
              <View
                style={[
                  styles.testedCasesContainer,
                  widthTestedCasesContainer < 15 ? { flex: 0 } : { flex: 1 },
                ]}>
                <Text style={styles.testedCasesTitle}>TESTES</Text>
                <Text style={styles.testedCasesNumber}>
                  {DisplayedStats.tests}
                </Text>
              </View>
              <View
                style={[
                  styles.deathsCasesContainer,
                  widthDeathsCasesContainer < 15 ? { flex: 0 } : { flex: 1 },
                ]}>
                <Text style={styles.deathsCasesTitle}>MORTES</Text>
                <Text style={styles.deathsCasesNumber}>
                  {DisplayedStats.deaths}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default MoreStatsSwipeCard;
