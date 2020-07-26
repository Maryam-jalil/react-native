import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../../shared/header';
import Login from '../../pages/login'


const screens = {
 Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Pet Store' navigation={navigation} />
      }
    },
  },
}

const LoginStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  }
});

export default LoginStack;