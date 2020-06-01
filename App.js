
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = props => {
  const {
    incomingText
  } = props;

  const [text, setText] = useState("");

  useEffect(() => {
    console.log(incomingText);
    if (incomingText !== '')
      setText(incomingText);
  })

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.view}>
        <Text>{text ? text : "nothing shared yet"}</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  } 
});

export default App;
