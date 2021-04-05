import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);


  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          Futura: require("../assets/fonts/Futura-Bold-03.ttf"),
          "American-Typewriter": require("../assets/fonts/American-Typewriter-Regular.ttf"),
          "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
          "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
          VT323: require("../assets/fonts/VT323-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
