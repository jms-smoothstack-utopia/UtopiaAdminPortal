import React from 'react'
import {Text, StyleSheet, SafeAreaView} from "react-native";

const CreateAirplaneScreen = () => {

    const [name, setName] = React.useState("");
    const [seatConfigurations, setSeatConfigurations] = React.useState([]);
    const [ economyModalVisible, setEconomyModalVisible ] = React.useState(false);
    const [ businessModalVisible, setBusinessModalVisible ] = React.useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <Text> Hello World </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center"
    }
})

export default CreateAirplaneScreen
