import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlightService } from "../services/FlightService";

const FlightScreen = ({navigation}:any) => {

    //State variables
    const [flightList, setFlightList] = useState([]);
    const [flightErrorMsg, setFlightErrorMsg] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const flightService = new FlightService();

    useEffect(() => {
        const focusListener = navigation.addListener("focus", () => {
            const flightPromise = flightService.getAllFlights();
            flightPromise.then((res) => {
                const flightData = res.data;
                if (flightData.length == 0){
                    setFlightErrorMsg("There exists no flights in our database");
                    setShowErrorMsg(true);
                } else{
                    setFlightList(flightData);
                }
            }).catch((error) => {
                console.log("There was an error " + error);
                setFlightErrorMsg("Unable to retreive list of flights from database");
                setShowErrorMsg(true);
            })
        })
    }, [navigation]);

    const flightView = (data:any) => {
        const startDate = new Date(data.approximateDateTimeStart).toLocaleDateString();
        const endDate = new Date(data.approximateDateTimeEnd).toLocaleDateString();
        return (
        <View style={styles.tablerow}>
            <Text style={styles.idText}>{ data.id }</Text>
            <Text style={styles.tableText}>{ data.origin.iataId }[{startDate}]</Text>
            <Text style={styles.tableText}>{data.destination.iataId}[{endDate}]</Text>
        </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <LinearGradient colors={['#1508AF', '#8E2AE3']} style={styles.topContainer}>
                <TouchableOpacity style={styles.itemBox} onPress={() => navigation.navigate("Create Flight")}>
                    <Text style={styles.boxText}>Add Flight</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemBox}>
                    <Text style={styles.boxText}>Delete Flight</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.titleBox}>
                    <Text style={styles.titleText}>Current Flights</Text>
            </View>
            <View style={styles.bottomContainer}>
            {showErrorMsg? <Text style={styles.errorMsg}>{ flightErrorMsg }</Text> : 
             <FlatList style={styles.flatList} data={flightList} renderItem={({item}:any) => flightView(item)}/>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:"white",
    },
    topContainer: {
        width: "100%",
        height: 200,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-around",
    },
    flatList: {
        width: "100%",
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
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "white",
        flex: 2,
        justifyContent:"flex-start",
        alignItems: "flex-start",
    },
    titleBox :{
        justifyContent:"center",
        alignItems: "center",
    },
    errorMsg: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 30,
    },
    titleText: {
        marginTop: 20,
        textDecorationStyle: "solid",
        textDecorationColor: "black",
        textDecorationLine: "underline",
        fontFamily: "Lato-Bold",
        fontWeight: "bold",
        fontSize: 24,
        color: "black",
        marginBottom: 20
    },
    tablerow :{
        width: "100%",
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    idText:{
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 15,
        color: "grey",
    },
    tableText: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 15,
        color:"black"
    }
})

export default FlightScreen;
