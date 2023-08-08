import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera';

import { FontAwesome } from '@expo/vector-icons'

export default function App() {
  console.log(App)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted");
    })();
  }, [])

  if (hasPermission === null) {
    return <View></View>
  }
  if (hasPermission === false) {
    return (
      <Text>Acesso Negado</Text>
    )
  }
  console.log()
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ratio='16:9'
      >
        <View style={styles.contentButtons}>
          <TouchableOpacity style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }}
          >
            <FontAwesome name="exchange" size={23} color="red" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "red"
  },
  camera: {
    width: "100%",
    height: "100%"
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "Red",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50
  }
});
