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
 const MoreStatsSwipeCard=(props)=> {
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
  const cardHeight = 80;
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

      if ((translationY <= 20 && translationY >= 0) || translationY <= -10) {
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
            
           
              <Text
                style={[
                  styles.moreStatsTitle,
                  
                ]}>
                  
                {props.statsName}
              </Text>
             
              <Text
                style={[
                  styles.casesNumber,
                  
                ]}>
                  
                {props.stats}
              </Text>
             
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default MoreStatsSwipeCard;
