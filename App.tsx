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

//FontAwesomeIcon
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faPlane, faMapPin, faCity, faShuttleVan, faCog } from "@fortawesome/free-solid-svg-icons";


const App = () => {
  const isLoadingComplete = useCachedResources();
  const Stack = createStackNavigator();

  //Add fontAwesomeIcons to library

  library.add(faPlane, faMapPin, faCity, faShuttleVan, faCog);

  //loadingComplete
  if (!isLoadingComplete){
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Airplanes" component={PlaneScreen} />
        <Stack.Screen name="Create Airplane" component={CreateAirplaneScreen}/>
        <Stack.Screen name="Flights" component={FlightScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;