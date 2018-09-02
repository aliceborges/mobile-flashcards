import React, { Component} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { teal } from '../utils/colors'
import { createStackNavigator } from 'react-navigation'

class DeckDetails extends React.Component {
    
    render(){
        const { navigation } = this.props;
        id =  navigation.getParam('id', null);
        title =  navigation.getParam('title', null);
        qtdCards =  navigation.getParam('qtdCards', null);

        return ( 
            <View style={styles.container}> 
                <Text style = {styles.title}> { title } </Text>
                <Text style = {styles.subtitle}> { qtdCards + ' cards'} </Text>

                <Button
                    color = { teal }
                    title = 'Adicionar Cards'
                    //onPress = { this.handleSubmit }
                />
                <Text></Text>
                <Button
                    color = { teal }
                    title = 'Começar Quiz'
                    //onPress = { this.handleSubmit }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
      fontSize: 30,
      marginTop: 10,
      marginBottom: 30,
    },
    title: {
        fontSize: 40,
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 30,
    }
});

export default DeckDetails