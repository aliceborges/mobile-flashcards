import React, { Component} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { teal } from '../utils/colors'
import { createStackNavigator } from 'react-navigation'

class DeckDetails extends React.Component {
    
    render(){
        const { navigation } = this.props;
        id =  navigation.getParam('id', null);
        title =  navigation.getParam('title', null);
        qtdCards =  navigation.getParam('qtdCards', 0);

        return ( 
            <View style={styles.container}> 
                <Text style = {styles.title}> { title } </Text>
                <Text style = {styles.subtitle}> { qtdCards + ' card(s)'} </Text>

                <Button
                    color = { teal }
                    title = 'Adicionar Cards'
                    onPress={() => { this.props.navigation.navigate('addCards',{ 
                        id: id,
                        title: title,
                        qtdCards: qtdCards
                        })
                    }}
                />
                <Text></Text>
                <Button
                    color = { teal }
                    title = 'Iniciar Quiz'
                    onPress={() => { this.props.navigation.navigate('Quiz',{ 
                        id: id,
                        })
                    }}
                    disabled = { qtdCards == 0 ? true : false }
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