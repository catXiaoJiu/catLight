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
import Torch from 'react-native-torch';

const App = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);

  const handleTorch = async () => {
    try {
      // 切换手电筒状态
      await Torch.switchState(!isTorchOn);
      setIsTorchOn(!isTorchOn);
    } catch (error) {
      Alert.alert('错误', '无法控制闪光灯');
    }
  };

  // 组件卸载时确保关闭手电筒
  useEffect(() => {
    return () => {
      Torch.switchState(false);
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
});

export default App;
