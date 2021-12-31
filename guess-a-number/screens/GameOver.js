import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import MainButton from "../components/MainButton";
import Colors from "../constants/Colors";
import defaultStyles from "../constants/default-styles";


const GameOver = props => {

    const {onRestart} = props;

    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.titleText} >The Game is Over!</Text>
            <View style={styles.imageContainer}>    
                <Image 
                    style={styles.image}
                    source={require('../assets/success.png')}
                    // source={{uri:""}}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultConatiner}>
                <Text style={defaultStyles.bodyText}>
                    Your phone needed <Text style={styles.highlight} >{props.roundsNumber}</Text> rounds to guess
                    the number <Text style={styles.highlight} >{props.userNumber}</Text>.
                </Text>
            </View>
            <MainButton onPress={onRestart} >NEW GAME</MainButton>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
       width: '100%',
       height: '100%'
    },
    resultConatiner: {
        marginHorizontal: 20,
        marginVertical: 15
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
        fontSize: 20
    }
})

export default GameOver