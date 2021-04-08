import React from 'react'
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';
import { PlaneService } from '../services/PlaneService';
import { AirportService } from "../services/AirportService";
import { useMediaQuery } from 'react-responsive';
import {Picker} from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FlightService, CreateFlightDto } from "../services/FlightService";

const CreateFlightScreen = ({navigation}: any) => {
    

    //Airplane ID
    const [airplaneId, setAirplaneId] = React.useState(0);

    //OriginId && DestinationId
    const [originId, setOriginId] = React.useState("");
    const [destinationId, setDestinationId] = React.useState("");

    //DateStart, TimeStart, DateEnd, TimeEnd
    const [dateStart, setDateStart] = React.useState("");
    const [dateEnd, setDateEnd] = React.useState("");

    //LoyaltyPoints && BigDecimal
    const [loyaltyPoints, setLoyaltyPoints] = React.useState("");
    const [baseSeatPrice, setBaseSeatPrice] = React.useState("");

    //ErrorMsgs
    const [mainError, setMainError] = React.useState("");
    const [showMainError, setShowMainError] = React.useState(false);
    const [airportError, setAirportError] = React.useState("");
    const [showAirportError, setShowAirportError] = React.useState(false);
    const [dateError, setDateError] = React.useState("");
    const [showDateError, setShowDateError ] = React.useState(false);
    const [optionalError, setOptionalError] = React.useState("");
    const [showOptionalError, setShowOptionalError] = React.useState(false);
    const [getError, setGetError] = React.useState("");
    const [showGetError, setShowGetError] = React.useState(false);

    //ShowSuccessScreen
    const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);

    //Services which are required
    const planeService = new PlaneService();
    const airportService = new AirportService();
    const flightService = new FlightService();

    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)"
    });

    //GET lists
    const [airportList, setAirportList] = React.useState([] as any);
    const [airplaneList, setAirplaneList] = React.useState([] as any);

    const resetErrorMsg = () => {
        setMainError("");
        setShowMainError(false);
        setAirportError("");
        setShowAirportError(false);
        setDateError("");
        setShowDateError(false);
        setOptionalError("");
        setShowOptionalError(false);
        setShowSuccessMsg(false);
    }

    const validateInfo = () => {
        if (originId == destinationId){
            setAirportError("Cannot fly to the same airplane");
            setShowAirportError(true);
            return false;
        }
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        let startDateValid = startDate instanceof Date && !isNaN(startDate.valueOf());
        let endDateValid = endDate instanceof Date && !isNaN(endDate.valueOf());
        if (!startDateValid || !endDateValid){
            setDateError("Add date in appropriate format");
            setShowDateError(true);
            return false;
        }
        if(endDate < startDate){
            setDateError("Arrival date cannot be before departure date");
            setShowDateError(true);
            return false;
        }

        let validLoyaltyPoints = isDigit(loyaltyPoints);
        if (loyaltyPoints != "" && !validLoyaltyPoints){
            setOptionalError("Invalid input");
            setShowOptionalError(true);
            return false;
        }

        if(!invalidNumber(loyaltyPoints)){
            setOptionalError("Cannot have negative numbers");
            setShowOptionalError(true);
            return false;
        }

        let validBigDecimal = isDigit(baseSeatPrice);
        if (baseSeatPrice != "" && !validBigDecimal){
            setOptionalError("Invalid input");
            setShowOptionalError(true);
            return false;
        }

        if (!invalidNumber(baseSeatPrice)){
            setOptionalError("Cannot have negative numbers");
            setShowOptionalError(true);
            return false;
        }

        return true;
    }

    const invalidNumber = (value:string) => {
        const numVal = parseInt(value);
        if (numVal < 0){
            return false;
        }
        return true;
    }

    const isDigit = (value:string) => {
        const val = Number(value) ? true : false;
        return val;
    }
    const submitFlight = () => {
        resetErrorMsg();
        const valid = validateInfo();
        if (valid){

            let loyaltyPointsForDto: number;
            let baseSeatPriceForDto: number;

            //Filter loyalty points
            if (loyaltyPoints == ""){
                loyaltyPointsForDto = 0;
            }else{
                loyaltyPointsForDto = parseInt(loyaltyPoints);
            }

            //Filter base seat price
            if (baseSeatPrice == ""){
                baseSeatPriceForDto = 0.00;
            }
            else{
                baseSeatPriceForDto = parseInt(baseSeatPrice);
            }

            const flightDto: CreateFlightDto = {
                originId: originId,
                destinationId: destinationId,
                airplaneId: airplaneId,
                approximateDateTimeStart: new Date(dateStart),
                approximateDateTimeEnd: new Date(dateEnd),
                baseSeatPrice: baseSeatPriceForDto,
                loyaltyPoints: loyaltyPointsForDto
            }
            flightService.addNewFlight(flightDto).then(() => {
                console.debug("Successfully added flight");
                setShowSuccessMsg(true);
            }).catch((error) => {
                setMainError("There was a problem, try again");
                setShowMainError(true);
            })
        }
    }

    const populateAirplaneList = () => {
        if (airplaneList.length != 0){
            let items = [];
            for(let i = 0; i < airplaneList.length;i++){
                items.push(<Picker.Item label={airplaneList[i].label} value={airplaneList[i].key}/>)
            }
            return items;
        }
    }

    const populateAirportList = () => {
        if(airportList.length != 0){
            let items = [];
            for (let i = 0; i < airportList.length; i++){
                items.push(<Picker.Item label={airportList[i].label} value={airportList[i].label}/>)
            }
            return items;
        }
    }

    const manageAirplaneResponse = (data:any) => {
        let tempList = [];
        for(let airplane of data){
            let tempObject = {
                key: airplane.id,
                label: airplane.name
            };
            tempList.push(tempObject);
        }
        return tempList;
    }

    const manageAirportResponse = (data:any) => {
        let tempList = [];
        let index = 0;
        for (let airport of data){
            let tempObject = {
                key: index++,
                label: airport.iataId
            };
            tempList.push(tempObject);
        }
        return tempList;
    }

    React.useEffect(() => {
        setAirplaneList([]);
        setAirplaneList([]);
        const planePromise = planeService.getAllAirplanes();
        const airportPromise = airportService.getAllAirports();
        Promise.all([planePromise, airportPromise]).then((values) => {
            const planeResponse = values[0];
            const airportResponse = values[1];
            const formatAirplaneResponse = manageAirplaneResponse(planeResponse.data);
            const formatAirportResponse = manageAirportResponse(airportResponse.data);
            if (formatAirportResponse.length == 0 || formatAirportResponse.length == 1 || formatAirplaneResponse.length == 0){
                setGetError("There is no data contained in our backend")
                setShowGetError(true);
                return;
            }
            //Need to set the default variables
            setAirplaneId(formatAirplaneResponse[0].key);
            setOriginId(formatAirportResponse[0].label);
            setDestinationId(formatAirportResponse[1].label);
            setAirplaneList(formatAirplaneResponse);
            setAirportList(formatAirportResponse);
        }).catch((error) => {
            console.log("There was an error " + error);
            setGetError("Could not the appropriate data from database")
            setShowGetError(true);
        })
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.mainContainer}>
                    {showSuccessMsg ? <View style= {isTabletOrMobileDevice? styles.successBox : styles.desktopViewSuccess}><Text style={styles.successText}>Successfully added!</Text></View> : null}
                    {showGetError ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{getError}</Text></View> : null}
                    {showMainError ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{mainError}</Text></View> : null}
                    <Text style={styles.titleText}>ADD FLIGHT</Text>
                    <View style={styles.greybox}>
                    <Text style={styles.greyTitle}>Pick an airplane</Text>
                    </View>
                    <Picker
                    selectedValue={airplaneId}
                    onValueChange={(itemValue, itemIndex) => setAirplaneId(itemValue)}
                    style={styles.dropDown}
                    >
                   {populateAirplaneList()}
                    </Picker>
                    {showAirportError ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{airportError}</Text></View> : null}
                    <View style={styles.greybox}>
                    <Text style={styles.greyTitle}>Pick an airport to fly from</Text>
                    </View>
                    <Picker
                    selectedValue={originId}
                    onValueChange={(itemValue, itemIndex) => setOriginId(itemValue)}
                    style={styles.dropDown}
                    >
                    {populateAirportList()}
                    </Picker>
                    <View style={styles.greybox}>
                    <Text style={styles.greyTitle}>Pick an airport to fly to</Text>
                    </View>
                    <Picker
                    selectedValue={destinationId}
                    onValueChange={(itemValue, itemIndex) => setDestinationId(itemValue)}
                    style={styles.dropDown}
                    >
                    {populateAirportList()}
                    </Picker>
                    {showDateError ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{dateError}</Text></View> : null}
                    <View style={styles.greyboxInput}>
                        <Text style={styles.greyTitle}>Departure Date</Text>
                        <View style={styles.inputViewNumberSpecial}>
                        <TextInput
                            style={styles.inputNumber}
                            keyboardType={"numeric"}
                            placeholder="DateTime"
                            placeholderTextColor="grey"
                            onChangeText={(text) => setDateStart(text)}
                        />
                        </View>
                    </View>
                    <View style={styles.greyboxInput}>
                        <Text style={styles.greyTitle}>Arrival Date</Text>
                        <View style={styles.inputViewNumberSpecial}>
                        <TextInput
                            style={styles.inputNumber}
                            keyboardType={"numeric"}
                            placeholder="DateTime"
                            placeholderTextColor="grey"
                            onChangeText={(text) => setDateEnd(text)}
                        />
                        </View>
                    </View>
                    {showOptionalError ? <View style= {isTabletOrMobileDevice? styles.errorBox : styles.desktopViewError}><Text style={styles.errorText}>{optionalError}</Text></View> : null}
                    <View style={styles.greyboxInput}>
                        <Text style={styles.greyTitle}>Loyalty Points/Baseprice</Text>
                        <View style={styles.inputViewNumberSpecial}>
                        <TextInput
                            style={styles.inputNumber}
                            keyboardType={"numeric"}
                            placeholder="LoyaltyPoints (Optional)"
                            placeholderTextColor="grey"
                            onChangeText={setLoyaltyPoints}
                        />
                        </View>
                        <View style={styles.inputViewNumberSpecial}>
                        <TextInput
                            style={styles.inputNumber}
                            keyboardType={"numeric"}
                            placeholder="Baseprice (Optional)"
                            placeholderTextColor="grey"
                            onChangeText={setBaseSeatPrice}
                        />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={submitFlight} disabled={showGetError}>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    mainContainer:{
        flex: 1,
        justifyContent:"center",
        alignItems: "center"
    },
    scrollView:{
        marginHorizontal: 0,
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
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e3e3e3",
        marginBottom: 20,
        borderRadius: 10,
    },
    greyboxInput: {
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
        textDecorationStyle:"solid",
        textDecorationLine: "underline",
        marginBottom: 20,
        marginTop: 20
    },
    greyTitle: {
        fontFamily: "Futura",
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
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
        width: "100%",
        justifyContent: "center",
        marginBottom: 10,
    },
    inputViewNumberSpecial: {
        width: "80%",
        backgroundColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderColor:"black",
        borderStyle: "solid",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10
    },
    dropDown: {
        width: "100%",
        justifyContent: "center",
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

export default CreateFlightScreen
