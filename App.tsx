/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Flashlight from 'react-native-flashlight';
import SystemSetting from 'react-native-system-setting';
import Slider from '@react-native-community/slider';

const App = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [brightness, setBrightness] = useState(0.5);

  const handleTorch = async () => {
    try {
      if (isTorchOn) {
        await Flashlight.openFlashLight();
      } else {
        await Flashlight.closeFlashLight();
      }
      setIsTorchOn(!isTorchOn);
    } catch (error) {
      console.error(error);
      Alert.alert('错误', '无法控制闪光灯');
    }
  };

  const handleBrightnessChange = async (value: number) => {
    try {
      await SystemSetting.setBrightnessForce(value);
      setBrightness(value);
    } catch (error) {
      console.error(error);
      Alert.alert('错误', '无法调节屏幕亮度');
    }
  };

  useEffect(() => {
    SystemSetting.getBrightness().then(brightness => {
      setBrightness(brightness);
    });
  }, []);

  // 组件卸载时确保关闭手电筒
  useEffect(() => {
    return () => {
      Flashlight.turnOff();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.button, isTorchOn && styles.buttonOn]}
          onPress={handleTorch}>
          <Text style={styles.buttonText}>
            {isTorchOn ? '关闭手电筒' : '打开手电筒'}
          </Text>
        </TouchableOpacity>

        <View style={styles.brightnessControl}>
          <Text style={styles.brightnessText}>屏幕亮度</Text>
          <Slider
            style={styles.slider}
            value={brightness}
            onValueChange={handleBrightnessChange}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonOn: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brightnessControl: {
    width: '80%',
    marginTop: 30,
  },
  brightnessText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default App;
