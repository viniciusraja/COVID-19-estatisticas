import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const Router = createAppContainer(AppNavigator);

export default Router;
