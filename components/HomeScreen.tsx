import React from 'react'
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
 
const HomeScreen = ({navigation}: any) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>UTOPIA ADMIN HOME</Text>
            <TouchableOpacity style={styles.itemCard} onPress={() => navigation.navigate("Flights")}>
                <Text style={styles.buttonText}>Flights</Text>
                <FontAwesomeIcon icon="map-pin" size={ 32 }/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemCard} onPress={() => navigation.navigate("Airplanes")}>
                <Text style={styles.buttonText}>Airplanes</Text>
                <FontAwesomeIcon icon="plane" size={ 32 }/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemCard}>
                <Text style={styles.buttonText}>Airports</Text>
                <FontAwesomeIcon icon="shuttle-van" size={ 32 }/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemCard}>
                <Text style={styles.buttonText}>Servicing Areas</Text>
                <FontAwesomeIcon icon="city" size={ 32 }/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemCard} onPress={() => navigation.navigate("Other Screen")}>
                <Text style={styles.buttonText}>Other</Text>
                <FontAwesomeIcon icon="cog" size={ 32 }/>
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

export default HomeScreen
