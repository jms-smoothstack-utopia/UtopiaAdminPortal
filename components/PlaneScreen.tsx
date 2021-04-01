import React from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PlaneScreen = ({navigation}:any) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <LinearGradient colors={['#1508AF', '#8E2AE3']} style={styles.topContainer}>
                <TouchableOpacity style={styles.itemBox} onPress={() => navigation.navigate("Create Airplane")}>
                    <Text style={styles.boxText}>Add new airplane</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemBox}>
                    <Text style={styles.boxText}>Delete an airplane</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.bottomContainer}>
            <Text style={styles.titleText}>Current airplanes</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    topContainer: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-around",
    },
    itemBox:{
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        height: 100,
        padding: 20,
        backgroundColor: "white",
    },
    boxText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "black",
    },
    bottomContainer: {
        backgroundColor: "white",
        flex: 2,
        justifyContent:"flex-start",
        alignItems: "center"
    },
    titleText: {
        marginTop: 20,
        textDecorationStyle: "solid",
        textDecorationColor: "black",
        textDecorationLine: "underline",
        fontFamily: "Lato-Bold",
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
        marginBottom: 20
    },
})

export default PlaneScreen
