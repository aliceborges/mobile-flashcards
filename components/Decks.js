import React, { Component} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Card, CardButton, CardAction, CardTitle } from 'react-native-cards';
import { fuchsia } from '../utils/colors'

class Decks extends Component{
  render(){
    return(
      <View>
        <ScrollView>
          <Card>
            <CardAction
              separator={true}
              inColumn={true}>
              <CardTitle
                title = 'Deck Exemplo'
                subtitle = '3 cards'
                color = { fuchsia }
              />
              <CardButton
                title = 'Jogar'
              />
            </CardAction>
          </Card>
        </ScrollView>
      </View>
    );
  };
}

export default Decks;
