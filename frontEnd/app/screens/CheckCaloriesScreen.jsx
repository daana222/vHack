import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, Animated, Easing } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CheckCaloriesScreen() {
  const [cameraType, setCameraType] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [bounceAnim] = useState(new Animated.Value(0));

  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <CameraView style={{ flex: 1 }} facing={cameraType}>
        <ScrollView style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 40 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Check the Calories</Text>
          </View>

          <View style={styles.scanArea}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Place Your Food in the Scan Area</Text>
          </View>

          <Animated.Text style={[styles.scanText, {
            transform: [{
              translateY: bounceAnim.interpolate({
                inputRange: [0, 10],
                outputRange: [0, 10]
              })
            }]
          }]}></Animated.Text>
        </ScrollView>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(207, 171, 243, 0.7)',
    paddingTop: 40,
    paddingBottom: 27,
    paddingLeft: 30,
    marginBottom: 62,
  },
  headerText: {
    color: '#1D1517',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanText: {
    color: '#CFABF3',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    
  },
  scanArea: {
    width: '80%',
    height: '150%',
    position: 'absolute',
    top: '25%',
    left: '10%',
    borderWidth: 2,
    borderColor: 'rgba(207, 171, 243, 0.7)',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,  // Adjust as needed
    paddingTop: 150, // Adjust as needed

  },
});