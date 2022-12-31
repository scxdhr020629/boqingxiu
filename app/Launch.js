import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, StatusBar } from "react-native";

const Launch = (prop) => {
  const [time, setTime] = useState(1);

  useEffect(() => {
    let timeChange;
    const clock = () => {
      if (time > 0)
        setTime(time - 1);
      else {
        clearInterval(timeChange);
        prop.navigation.navigate('Login');
      }
    };
    timeChange = setInterval(clock, 1000);
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.text}>博青秀</Text>
      <Image
        source={require('../data/img/logo.png')}
        style={styles.picture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#7B9DF6',
    fontSize: 50,
  },
  picture: {
    marginTop: 20,
    marginBottom: 20,
    width: 100,
    height: 90,
  }
});

export default Launch;