import React from 'react'
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const OtherScreen = ({navigation}: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>OTHER PAGE</Text>
            <TouchableOpacity style={styles.itemCard} onPress={() => navigation.navigate("Check-In")}>
                <Text style={styles.buttonText}>Check in</Text>
                <FontAwesomeIcon icon="receipt" size={ 32 }/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 25,
        color: "black",
        marginBottom: 20
    },
    buttonText: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
    },
    itemCard: {
        width: "80%",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#e3e3e3",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    }
})

export default OtherScreen
