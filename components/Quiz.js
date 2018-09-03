import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, Button } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import * as QuizApi from '../utils/api'
import { teal } from '../utils/colors'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotifications } from '../utils/notifications'

class Quiz extends React.Component {

    state = {
        questions: [
            [
                ['Carregando..'], ['Carregando..']
            ]
        ], 
        index: 0,
        answer: false,
        score: 0,
    }

    componentDidMount(){
        QuizApi.getDeck(this.props.navigation.getParam('id', null)).then((deck) => {
            this.setState({ ...this.state, questions: deck.questions });
        });
    }

    showAlert = (questions) => {
        const { score } = this.state
        const { navigation } = this.props
    
        Alert.alert(
          'Seu score: ' + Math.round( (score / questions.length) * 100 ) + '%',
          `Você acertou ${score} ${score === 0 ? '' : ( score === 1 ? 'resposta' : 'respostas')} de ${questions.length} ${questions.length === 1 ? 'pergunta' : 'perguntas'}. Tentar novamente?`,
          [
              { text: 'Sim', onPress: () => this.setState({ 
                index: 0, 
                score: 0, 
                answer: false 
              })},
              { text: 'Não', onPress: () => navigation.goBack()},
          ],
          { cancelable: false }
        )
    }

    processQuiz = () => {
        const { questions, index } = this.state
    
        if (index < questions.length - 1 ) {
          this.setState({ index: index + 1, answer: false })
        } else {
          clearLocalNotifications().then(setLocalNotification)
          this.showAlert(questions)
        }
    
    }

    quizActions = (questions) => {
        return (
          <View>
            <Text></Text>
            <Button title='Acertou' color = { teal } onPress={() => {
              this.setState({ score: this.state.score + 1 }, this.processQuiz)
            }} />
            <Text></Text>
            <Button title='Errou' color = { teal } onPress={() => this.processQuiz()} />
          </View>
        )
    }

    cards = (index, questions) => {
        return (
          <View>
            <Text style = { styles.subtitle }>{index + 1}/{questions.length}</Text>
          </View>
        )
    } 

    render(){
        const { questions, index, answer } = this.state
    
        const card = answer ? (
          <Text style = { styles.title } key={questions[index][1]}>{questions[index][1]}</Text>
        ) : (
          <Text style = { styles.title } key={questions[index][0]}>{questions[index][0]}</Text>
        )
        
        return (
          <View style={ styles.container }>
            
            {this.cards(index, questions)}
            <View>
              {questions && questions[index] && (
                <View>{ card }</View>
              )}
              <Button
                color = { teal }
                title = { answer ? 'Ver novamente a Pergunta' : 'Mostrar Resposta'}
                onPress={() => this.setState({ answer: !answer })}
              />
              { answer ? this.quizActions(questions) : <Text></Text>}
            </View>
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

export default Quiz