import React from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { teal, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import addDecks from './components/addDecks'
import DeckDetails from './components/DeckDetails'
import addCards from './components/addCards'
import Quiz from './components/Quiz'
import { Constants } from 'expo'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/notifications'

const store = createStore(reducer);

function StatusBarApp ({backgroundColor, ...props}) {
  return(
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  Decks:{
    screen: Decks,
    navigationOptions:{
      tabBarLabel:'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
    }
  },
  addDecks:{
    screen: addDecks,
    navigationOptions:{
      tabBarLabel: 'Adicionar Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions:{
    header:null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? teal : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : teal,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigation = createStackNavigator({
  Home: {
   screen: Tabs,
   navigationOptions:{
    header:null
    },
   },
  DeckDetails: {
    screen: DeckDetails,
  },
  Decks: {
    screen: Decks,
  },
  addCards: {
    screen: addCards,
  },
  Quiz: {
    screen: Quiz,
  }
 })

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store= { store }>
        <View style={styles.container}>
          <StatusBarApp backgroundColor={teal} barStyle="light-content" />
          <MainNavigation/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
});
