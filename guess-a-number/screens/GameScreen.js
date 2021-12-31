import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Button, Alert, ScrollView, FlatList } from "react-native";
import{ Ionicons } from '@expo/vector-icons';

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import defaultStyles from "../constants/default-styles";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
};

// const renderListItem = (value, numOfRound) => (
//     <View key={value} style={styles.listItem}>
//         <Text style={defaultStyles.bodyText}>#{numOfRound}</Text>
//         <Text style={defaultStyles.bodyText}>{value}</Text>
//     </View>
// );

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text style={defaultStyles.bodyText}>#{listLength - itemData.index}</Text>
        <Text style={defaultStyles.bodyText}>{itemData.item}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoise);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    // const [rounds, setRounds] = useState(0);
    // const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    
    const { userChoise, onGameOver } = props;

    
    {/* Se ejecuta despues de cada ciclo de rendering o cuando un valor de la lista de dependencias cambie de valor */}
    useEffect(() => {
        if(currentGuess === userChoise) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoise, onGameOver]);

    const nextGameHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoise) || 
            (direction === 'greater' && currentGuess > props.userChoise)) {
                Alert.alert('Don\'t lie', 'You know that this is wrong...',
                    [{text: 'Sorry!', style: 'cancel'}
                ]);
                return;
        }
        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        }else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        // setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonsContainer}>
                <MainButton onPress={nextGameHandler.bind(this, 'lower')} >
                    <Ionicons  name="md-remove" size={24} />
                </MainButton>
                <MainButton onPress={nextGameHandler.bind(this, 'greater')} >
                    <Ionicons  name="md-add" size={24} />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list} >
                    {pastGuesses.map((guess, index) => 
                        renderListItem(guess, pastGuesses.length - index)
                    )}
                </ScrollView> */}
                <FlatList
                    contentContainerStyle={styles.list} 
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    listContainer:{
        flex: 1,
        width: '70%'
    },
    list:{
        flexGrow: 1,
        // this is for the scrollView
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;