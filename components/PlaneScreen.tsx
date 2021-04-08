import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PlaneService } from "../services/PlaneService";

const PlaneScreen = ({navigation}:any) => {

    //State variables
    const [planeList, setPlaneList] = useState([]);
    const [planeErrorMsg, setPlaneErrorMsg] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const planeService = new PlaneService();

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            const airplanePromise = planeService.getAllAirplanes();
            airplanePromise.then((res) => {
                const airplaneData = res.data;
                if (airplaneData.length == 0){
                    setPlaneErrorMsg("There exists no airplanes from our database!");
                    setShowErrorMsg(true);
                } else {
                    setPlaneList(airplaneData);
                }
            }).catch((error) => {
                console.log("There was an error " + error);
                setPlaneErrorMsg("Unable to retreive list of airplanes from database");
                setShowErrorMsg(true);
            })
        })
    }, [navigation]);

    const airplaneView = (data:any) => {
        return (
        <View style={styles.tablerow}>
            <Text style={styles.idText}>{ data.id }</Text>
            <Text style={styles.tableText}>{ data.name }</Text>
            <Text style={styles.tableText}>Max Capacity:{ data.maxCapacity }</Text>
        </View>
        );
    }
    
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
            <View style={styles.titleBox}>
                    <Text style={styles.titleText}>Current airplanes</Text>
            </View>
            <View style={styles.bottomContainer}>
            {showErrorMsg? <Text style={styles.errorMsg}>{ planeErrorMsg }</Text> : <FlatList style={styles.flatList} data={planeList} renderItem={({item}:any) => airplaneView(item)}/>}
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

export default PlaneScreen
