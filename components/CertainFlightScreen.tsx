import React from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { FlightService } from "../services/FlightService";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//Need to do MediaQuery
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

const CertainFlightScreen = ({route, navigation}:any,) => {

    const [showDeletePopup, setShowDeletePopup] = React.useState(false);
    const [showFinalDeleteButton, setShowFinalDeleteButton] = React.useState(false);
    const [deleteErrorMsg, setDeleteErrorMsg] = React.useState("");
    const [showDeleteErrorMsg, setShowDeleteErrorMsg] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState("");
    const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);

    const currentFlight = route.params.flight;
    const deleteMessage = "Delete flight";
    const flightService = new FlightService();

    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)"
    });
    
    if (currentFlight == undefined){
        navigation.navigate("Home");
    }

    const deleteConfirmationInput = (text: string) => {
        if (text == deleteMessage){
            setShowFinalDeleteButton(true);
        }else{
            setShowFinalDeleteButton(false);
        }
    }

    const deleteFlight = () => {
        const deleteFlightPromise = flightService.deleteFlight(currentFlight.id);
        deleteFlightPromise.then((res) => {
            setSuccessMsg("Successfully deleted. Navigating you back to previous page.");
            setShowSuccessMsg(true);
            setTimeout(() => {
                navigation.pop(1);
            }, 1000)

        }).catch((error) => {
            console.log("There was an error " + error);
            setDeleteErrorMsg("Could not delete flight. Please try again")
            setShowDeleteErrorMsg(true);
        })
    }

    const closePopup = () => {
        setShowDeletePopup(false);
        setShowFinalDeleteButton(false);
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            {showSuccessMsg ? <View style= {isTabletOrMobileDevice? styles.successBox : styles.desktopViewSuccess}><Text style={styles.successText}>{successMsg}</Text></View> : null}
            {showDeleteErrorMsg ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{deleteErrorMsg}</Text></View> : null}
            {showDeletePopup && 
            <View style={styles.deletePopup}>
                <View style={styles.xButtonRow}>
                    <TouchableOpacity onPress={() => closePopup()}>
                        <FontAwesomeIcon icon="window-close" size={ 24 }/>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerRow}>
                    <Text style={styles.deleteConfirmationText}>Are you sure you want to delete the flight? Type <Text style={styles.deleteTextToWrite}>{deleteMessage}</Text> below.</Text>
                </View>
                <View style={styles.innerRow}>
                <TextInput
                    autoCapitalize="none"
                    style={styles.inputText}
                    placeholder="Type in me"
                    placeholderTextColor="grey"
                    onChangeText={(text) => deleteConfirmationInput(text)}
                    />
                </View>
                {showFinalDeleteButton && 
                <View style={styles.finalRow}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteFlight()}>
                        <Text style={styles.deleteButtonText}>DELETE FLIGHT</Text>
                    </TouchableOpacity>
                </View>
            }
            </View>
            }
            {!showDeletePopup && 
                <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeletePopup(true)}>
                    <Text style={styles.deleteButtonText}>DELETE FLIGHT</Text>
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    innerRow: {
        paddingHorizontal: 5,
    },
    errorBox: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "80%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 3,
    },
    desktopViewError: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "30%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 3,
    },
    errorText:{
        fontFamily: "Lato-Bold",
        color:"red",
        fontWeight: "bold",
        fontSize: 18,
    },
    finalRow:{
        paddingHorizontal: 5,
        marginTop: 16,
        justifyContent:"center",
        alignItems: "center"
    },
    deleteButton: {
        width: "80%",
        backgroundColor: "red",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
    },
    deleteButtonText: {
        fontSize: 20,
        fontFamily: "Futura",
        fontWeight: "bold",
        color: "white"
    },
    deleteConfirmationText:{
        fontSize: 16,
        fontFamily: "Futura",
        fontWeight: "bold",
        color: "black"
    },
    deleteTextToWrite:{
        fontSize: 14,
        fontFamily: "Futura",
        fontWeight: "bold",
        color: "grey",
        fontStyle: "italic",
    },
    deletePopup: {
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 5,
        padding: 5,
        borderColor: "red",
        height: 240,
        width: "80%"
    },
    xButtonRow: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 15,
    },
    inputText:{
        fontFamily: "Lato-Bold",
        fontWeight: "bold",
        fontSize: 15,
        height:50,
        color:"black",
        borderStyle:"solid",
        borderColor: "black",
        borderBottomWidth: 1,
        paddingHorizontal: 5
    },
    successBox: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "80%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "green",
        borderStyle: "solid",
        borderWidth: 3,
    },
    desktopViewSuccess: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "30%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "green",
        borderStyle: "solid",
        borderWidth: 3,
    },
    successText: {
        fontFamily: "Lato-Bold",
        color:"green",
        fontWeight: "bold",
        fontSize: 18,
    },
})

export default CertainFlightScreen
