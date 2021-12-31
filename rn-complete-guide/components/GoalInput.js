import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText)  => {
        setEnteredGoal(enteredText);
    };

    const addGoalHandler = () => {
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');
    };

    const cancelGoal = () => {
        props.onCancel();
        setEnteredGoal('');
    }

    return (
        <Modal visible={props.visible} animationType="slide">
             <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='Type your course goal' 
                    style={styles.input}  
                    onChangeText={goalInputHandler}
                    value={enteredGoal}
                />
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="CANCEL" color={"red"} onPress={cancelGoal}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={addGoalHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    input: {
        borderColor: 'black', 
        borderWidth: 1, 
        padding: 10, 
        width: '80%',
        marginBottom: 10
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '60%'
    },
    button: {
        width: "40%"
    }
});

export default GoalInput;