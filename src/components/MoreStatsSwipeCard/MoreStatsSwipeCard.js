import React from 'react';
import { View, Animated, Text } from 'react-native';
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
  const totalStatsNumberFromMoreStats = GetTotalSumOfEachElementInArray([
    COVIDStats.cases,
    COVIDStats.tests,
    COVIDStats.deaths,
  ]);
  const widthConfirmedCasesContainer = GetThePercentualValueFromTotal(
    COVIDStats.cases,
    totalStatsNumberFromMoreStats
  );
  const widthTestedCasesContainer = GetThePercentualValueFromTotal(
    COVIDStats.tests,
    totalStatsNumberFromMoreStats
  );
  const widthDeathsCasesContainer = GetThePercentualValueFromTotal(
    COVIDStats.deaths,
    totalStatsNumberFromMoreStats
  );
  const translateY = new Animated.Value(0);
  let offset = 0;
  const cardHeight=370;
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

      if (translationY <= 50) {
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
                outputRange: [1, 0.7],
              }),
            },
          ]}>
          <Animated.Text
            style={[
              styles.moreStatsTitle,
              {
                opacity: translateY.interpolate({
                  inputRange: [-cardHeight, 0],
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
              },(widthConfirmedCasesContainer < 15)
                ? { flex: 0 }
                : { flex: 1 },
            ]}>
            <Text style={styles.confirmedCasesTitle}>CONFIRMADOS</Text>
            <Text style={styles.confirmedCasesNumber}>{COVIDStats.cases}</Text>
          </Animated.View>
          <View
            style={[
              styles.testedCasesContainer,
              widthTestedCasesContainer < 15 ? { flex: 0 } : { flex: 1 },
            ]}>
            <Text style={styles.testedCasesTitle}>TESTES</Text>
            <Text style={styles.testedCasesNumber}>{COVIDStats.tests}</Text>
          </View>
          <View
            style={[
              styles.deathsCasesContainer,
              widthDeathsCasesContainer < 15 ? { flex: 0 } : { flex: 1 },
            ]}>
            <Text style={styles.deathsCasesTitle}>MORTES</Text>
            <Text style={styles.deathsCasesNumber}>{COVIDStats.deaths}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default MoreStatsSwipeCard;
