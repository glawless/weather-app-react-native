import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import moment from "moment-timezone";

const FutureForecast = ({ data }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {data && data.length > 0 ? (
        data.map(
          (data, idx) =>
            idx !== 0 && <FutureForcastItem key={idx} forecastItem={data} />
        )
      ) : (
        <View />
      )}
    </View>
  );
};

const FutureForcastItem = ({ forecastItem }) => {
  const img = {
    uri:
      "http://openweathermap.org/img/wn/" +
      forecastItem.weather[0].icon +
      "@2x.png",
  };
  return (
    <View style={styles.futureForecastItemContainer}>
      <Text style={styles.day}>
        {moment(forecastItem.dt * 1000).format("ddd")}
      </Text>
      <Image source={img} style={styles.image} />
      <Text style={styles.temp}>
        Night - {forecastItem.temp.night.toFixed()}&#176;F
      </Text>
      <Text style={styles.temp}>
        Day - {forecastItem.temp.day.toFixed()}&#176;F
      </Text>
      <Text style={styles.temp}>
        {forecastItem.weather ? forecastItem.weather[0].main : null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  futureForecastItemContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000033",
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 0.5,
    padding: 20,
    marginLeft: 10,
  },
  day: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#3c3c44",
    padding: 10,
    textAlign: "center",
    borderRadius: 50,
    fontWeight: "200",
    marginBottom: 15,
  },
  temp: {
    fontSize: 14,
    color: "white",
    fontWeight: "100",
    textAlign: "center",
  },
  otherContainer: {
    paddingRight: 40,
  },
});

export default FutureForecast;
