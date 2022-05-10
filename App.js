import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import DateTime from "./components/DateTime";
import WeatherScroll from "./components/WeatherScroll";

const API = "d8a7f1f6c92d6d7babca624939bc3945";
const img = require("./assets/spokane.jpg");

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        let { latitude, longitude } = success.coords;
        fetchDataFromApi(latitude, longitude);
      },
      (err) => {
        if (err) {
          fetchDataFromApi(" ");
        }
      }
    );
  }, []);

  const fetchDataFromApi = (latitude, longitude) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <DateTime
          current={data.current}
          timezone={data.timezone}
          lat={data.lat}
          lon={data.lon}
        />
        <WeatherScroll weatherData={data.daily} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
