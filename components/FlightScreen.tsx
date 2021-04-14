import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlightService } from "../services/FlightService";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const FlightScreen = ({navigation}:any) => {

    //State variables
    const [holdList, setHoldList] = useState([]);
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [flightList, setFlightList] = useState([]);
    const [flightErrorMsg, setFlightErrorMsg] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const flightService = new FlightService();

    //CityList
    const [cityList, setCityList] = useState([] as any);
    const [filterList, setFilterList] = useState([] as any);

    useEffect(() => {
        const focusListener = navigation.addListener("focus", () => {
            const flightPromise = flightService.getAllFlights();
            flightPromise.then((res) => {
                const flightData = res.data;
                if (flightData.length == 0){
                    setFlightErrorMsg("There exists no flights in our database");
                    setShowErrorMsg(true);
                } else{
                    setUniqueCityValues(flightData);
                    setFlightList(flightData);
                    setHoldList(flightData);
                }
            }).catch((error) => {
                console.log("There was an error " + error);
                setFlightErrorMsg("Unable to retreive list of flights from database");
                setShowErrorMsg(true);
            })
        })
    }, [navigation]);

    const setUniqueCityValues = (data: any[]) => {
        let tempList: string[] = [];
        data.forEach((x: any) => {
            let tempValOrigin = x.origin.servicingArea.areaName;
            let tempValDest = x.destination.servicingArea.areaName;
            if (!tempList.includes(tempValOrigin)){
                tempList.push(tempValOrigin)
            }
            if (!tempList.includes(tempValDest)){
                tempList.push(tempValDest);
            }
        })
        setCityList(tempList);
    }

    const checkCertainFlight = (data:any) => {
        navigation.navigate("Certain Flight", {flight: data});
    }

    const flightView = (data:any) => {
        const startDate = new Date(data.approximateDateTimeStart).toLocaleDateString();
        const endDate = new Date(data.approximateDateTimeEnd).toLocaleDateString();
        return (
        <TouchableOpacity onPress={() => checkCertainFlight(data)}>
            <View style={styles.tablerow}>
                <Text style={styles.idText}>{data.id.toString() }</Text>
                <Text style={styles.tableText}>{data.origin.iataId }[{startDate}]</Text>
                <Text style={styles.tableText}>{data.destination.iataId}[{endDate}]</Text>
            </View>
        </TouchableOpacity>
        );
    }

    const cityView = (data:any) => {
        return (
            <View style={styles.cityRow}>
                <TouchableOpacity onPress={()=> addToFilterList(data)}>
                    <Text style={styles.tableText}>{data}</Text>
                </TouchableOpacity>
            </View>
        );
    }



    const addToFilterList = (data:string) => {
        if (!filterList.includes(data)){
            filterList.push(data);
        } else{
            let index = filterList.indexOf(data);
            if (index > -1){
                filterList.splice(index, 1);
            }
        }
        if (filterList.length == 0){
            setFlightList(holdList);
        }else{
            let holderListClone = [...holdList];
            let filteredList = holderListClone.filter((x:any) => {
                let flightOrigin = x.origin.servicingArea.areaName;
                let flightDestination = x.destination.servicingArea.areaName;
                if (filterList.includes(flightOrigin)){
                    return true;
                }
                if (filterList.includes(flightDestination)){
                    return true;
                }
                return false;
            })
            setFlightList(filteredList);
        }
    }

    const headers = () => {
        return ( 
        <View style={styles.bottomContainer}>
            <View style={styles.filterRow}>
                <TouchableOpacity onPress={() => setShowFilterPopup(!showFilterPopup)}>
                    <FontAwesomeIcon icon="filter" size={ 18 }/>
                </TouchableOpacity>
            </View>
            {showFilterPopup && 
            <View style={styles.filterBox}>
                <Text style={styles.filterText}>Filter by Cities:</Text>
                <FlatList keyExtractor={(item, index) => index.toString()} style={styles.flatList} data={cityList} renderItem={({item}:any) => cityView(item)}/>
            </View>
            }
            {filterList.length > 0 && 
                <View style={styles.filterBox}>
                    <Text style={styles.filterText}>Filtering by these cities</Text>
                    <FlatList keyExtractor={(item, index) => index.toString()} style={styles.flatList} data={filterList} renderItem={({item}:any) => cityView(item)}/>
                </View>
            }
            <View style={styles.tablerow}>
                <Text style={styles.idText}>ID</Text>
                <Text style={styles.tableText}>From</Text>
                <Text style={styles.tableText}>To</Text>
            </View>
            <FlatList keyExtractor={(item, index) => index.toString()} style={styles.flatList} data={flightList} renderItem={({item}:any) => flightView(item)}/>
        </View> 
        );
    }
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <LinearGradient colors={['#1508AF', '#8E2AE3']} style={styles.topContainer}>
                <TouchableOpacity style={styles.itemBox} onPress={() => navigation.navigate("Create Flight")}>
                    <Text style={styles.boxText}>Add Flight (Manually)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemBox} onPress={() => navigation.navigate("Create Flight With CSV")}>
                    <Text style={styles.boxText}>Add Flight (CSV)</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.titleBox}>
                    <Text style={styles.titleText}>Current Flights</Text>
            </View>
            <View style={styles.bottomContainer}>
            {showErrorMsg? <Text style={styles.errorMsg}>{ flightErrorMsg }</Text> : 
             headers()}
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
        width: "100%",
    },
    titleBox :{
        flexDirection: "row",
        justifyContent: "space-around",
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
    filterRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    filterBox:{
        width: "100%",
        marginTop: 10,
        backgroundColor: "#e3e3e3",
        padding: 10,
        borderRadius: 10,
    },
    filterText: {
        fontFamily: "Lato-Bold",
        fontWeight: "bold",
        fontSize: 16,
        color: "black",
    },
    cityRow: {
        width: "100%",
        marginBottom: 2,
        justifyContent: "center",
        alignItems: "center"
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
