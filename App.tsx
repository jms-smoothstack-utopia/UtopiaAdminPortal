import * as React from 'react';
import useCachedResources from "./hooks/useCachedResources";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import PlaneScreen from "./components/PlaneScreen";
import FlightScreen from "./components/FlightScreen";
import CreateAirplaneScreen from "./components/CreateAirplaneScreen";
import CreateFlightScreen from "./components/CreateFlightScreen";
import CreateFlightThroughCSV from "./components/CreateFlightThroughCSV";
import CertainFlightScreen from "./components/CertainFlightScreen";

//Interceptors
import HttpInterceptors from "./services/HttpInterceptors"

//FontAwesomeIcon
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faPlane, faMapPin, faCity, faShuttleVan, faCog, faFilter, faWindowClose } from "@fortawesome/free-solid-svg-icons";


const App = () => {
  const isLoadingComplete = useCachedResources();
  const Stack = createStackNavigator();

  //Add fontAwesomeIcons to library

  library.add(faPlane, faMapPin, faCity, faShuttleVan, faCog, faFilter, faWindowClose);

  //loadingComplete
  if (!isLoadingComplete){
    return null;
  }

  HttpInterceptors.intercept();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Airplanes" component={PlaneScreen} />
        <Stack.Screen name="Create Airplane" component={CreateAirplaneScreen}/>
        <Stack.Screen name="Flights" component={FlightScreen} />
        <Stack.Screen name="Create Flight" component={CreateFlightScreen}/>
        <Stack.Screen name="Create Flight With CSV" component={CreateFlightThroughCSV} options={{title: "Flight Creator with CSV"}}/>
        <Stack.Screen name="Certain Flight" component={CertainFlightScreen} options={{title: "Flight Updater"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;