import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = props => {
    {/* Con {...props} podemos pasar las propiedades nativas del TextInput que forma nuestroi custom component
        a traves de la instancia del mismo. Ej <Input placeHolder="Enter a Number"/>
    */}
    return (
        <TextInput {...props} style={{ ...styles.input, ...props.style }}/>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;