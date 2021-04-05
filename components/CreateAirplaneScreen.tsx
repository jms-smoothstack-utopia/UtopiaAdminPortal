import React from 'react'
import {Text, StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity} from "react-native";
import { PlaneDTO, SeatConfigurations, AirplaneClasses, PlaneService } from "../services/PlaneService";

//Need to do MediaQuery
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

const CreateAirplaneScreen = ({navigation}: any) => {

    //Airplane name
    const [name, setName] = React.useState("");

    //Num of rows
    const [economyRows, setEconomyRows] = React.useState("");
    const [businessRows, setBusinessRows] = React.useState("");

    //Num of seats per row
    const [economySeatsRows, setEconomySeatRows] = React.useState("");
    const [businessSeatsRows, setBusinessSeatRows] = React.useState("");

    //ErrorMsg
    const [nameErrorMsg, setNameErrorMsg] = React.useState("");
    const [showNameError, setShowNameError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [showErrorMsg, setShowErrorMsg] = React.useState(false);

    //ShowSuccessScreen
    const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);

    const planeService = new PlaneService();
    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)"
    });

    const validateInfo = () => {
        if (name == ""){
            setNameErrorMsg("Cannot leave name as blank");
            setShowNameError(true);
            return false;
        }
        if (economyRows == "" || businessRows == "" || economySeatsRows == "" || businessSeatsRows == ""){
            setErrorMsg("All of the fields are required");
            setShowErrorMsg(true);
            return false;
        }
        if (!isDigit(economyRows) || !isDigit(businessRows) || !isDigit(economySeatsRows) || !isDigit(businessSeatsRows)){
            setErrorMsg("You must only include numbers for rows and seats");
            setShowErrorMsg(true);
            return false;
        }
        if (!invalidNumber(economyRows) || !invalidNumber(businessRows) || !invalidNumber(economySeatsRows) || !invalidNumber(businessSeatsRows)){
            setErrorMsg("Cannot include negative or numbers greater than 20");
            setShowErrorMsg(true);
            return false;
        }
        return true;
    }

    const invalidNumber = (value:string) => {
        const numVal = parseInt(value);
        if (numVal <= 0 || numVal > 20){
            return false;
        }
        return true;
    }

    const isDigit = (value:string) => {
        const val = Number(value) ? true : false;
        return val;
    }

    const resetErrorMsg = () => {
        setNameErrorMsg("");
        setShowNameError(false);
        setErrorMsg("");
        setShowErrorMsg(false);
    }

    const submitAirplane = () => {
        resetErrorMsg();
        const valid = validateInfo();
        if (valid){
            const economySeatConfig:SeatConfigurations = {
                numRows: parseInt(economyRows),
                numSeatsPerRow: parseInt(economySeatsRows),
                seatClass: AirplaneClasses.ECONOMY
            };
            const businessSeatConfig:SeatConfigurations = {
                numRows: parseInt(businessRows),
                numSeatsPerRow: parseInt(businessSeatsRows),
                seatClass: AirplaneClasses.BUSINESS
            };
            const SeatConfigurations = [economySeatConfig, businessSeatConfig];
            const planeDTO: PlaneDTO = {
                name: name,
                seatConfigurations: SeatConfigurations,
            };
            planeService.AddAirplane(planeDTO).then(() => {
                console.debug("Successfully added airport");
                setShowSuccessMsg(true);
                // setTimeout(() => {
                //     navigation.popToTop();
                // }, 3000);
            }).catch((error) => {
                setNameErrorMsg("There was a problem. Please try again.");
                setShowNameError(true);
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {showSuccessMsg ? <View style= {isTabletOrMobileDevice? styles.successBox : styles.desktopViewSuccess}><Text style={styles.successText}>Successfully added!</Text></View> : null}
            <Text style={styles.titleText}>ADD AIRPLANE</Text>
            {showNameError ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{nameErrorMsg}</Text></View> : null}
            <View style= {isTabletOrMobileDevice? styles.inputView : styles.desktopView}>
                    <TextInput
                    style={styles.inputText}
                    placeholder="Airplane name"
                    placeholderTextColor="grey"
                    onChangeText={setName}
                    />
            </View>
            {showErrorMsg ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{errorMsg}</Text></View> : null}
            <View style={styles.greybox}>
                <Text style={styles.greyTitle}>Economy</Text>
                <View style={styles.inputViewNumber}>
                    <TextInput
                        style={styles.inputNumber}
                        keyboardType={"numeric"}
                        placeholder="Num of rows for economy"
                        placeholderTextColor="grey"
                        onChangeText={setEconomyRows}
                    />
                </View>
                <View style={styles.inputViewNumber}>
                    <TextInput
                        style={styles.inputNumber}
                        keyboardType={"numeric"}
                        placeholder="Num of seats per row"
                        placeholderTextColor="grey"
                        onChangeText={setEconomySeatRows}
                    />
                </View>
            </View>
            <View style={styles.greybox}>
                <Text style={styles.greyTitle}>Business</Text>
                <View style={styles.inputViewNumber}>
                    <TextInput
                        style={styles.inputNumber}
                        keyboardType={"numeric"}
                        placeholder="Num of rows for business"
                        placeholderTextColor="grey"
                        onChangeText={setBusinessRows}
                    />
                </View>
                <View style={styles.inputViewNumber}>
                    <TextInput
                        style={styles.inputNumber}
                        keyboardType={"numeric"}
                        placeholder="Num of seats per row"
                        placeholderTextColor="grey"
                        onChangeText={setBusinessSeatRows}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={submitAirplane}>
                <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    errorBox: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "80%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 3,
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
    greybox: {
        width: "80%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e3e3e3",
        marginBottom: 20,
        borderRadius: 10,
    },
    titleText: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 25,
        color: "black",
        marginBottom: 10
    },
    greyTitle: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
        marginBottom:10,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderColor:"grey",
        borderStyle: "solid",
        marginBottom: 20,
        justifyContent: "center",
        paddingHorizontal: 5,
    },
    inputText:{
        fontFamily: "Lato-Bold",
        fontWeight: "bold",
        fontSize: 15,
        height:40,
        color:"black"
    },
    inputViewNumber: {
        width: "80%",
        backgroundColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderColor:"black",
        borderStyle: "solid",
        justifyContent: "center",
        marginBottom: 10,
    },
    inputNumber:{
        fontFamily: "Lato-Bold",
        fontWeight: "bold",
        fontSize: 15,
        height: 40,
        color: "black",        
    },
    desktopView: {
        width: "30%",
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderColor:"grey",
        borderStyle: "solid",
        marginBottom: 20,
        justifyContent: "center",
        paddingHorizontal: 5,
        paddingLeft:20,
        paddingRight: 20
    }, 
    desktopViewError: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "30%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
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
    submitButton: {
        width: "80%",
        backgroundColor: "#13d634",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    buttonText:{
        fontSize: 20,
        fontFamily: "Futura",
        fontWeight: "bold",
        color: "white"
    }
})

export default CreateAirplaneScreen
