
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Button
} from 'react-native';
import { Picker } from '@react-native-community/picker';

const androidEmulatorServerUrl = 'http://10.0.2.2';
const iosEmulatorServerUrl = 'http://localhost';
const port = 5000;
const serverUrl = Platform.OS === 'android' ? `${androidEmulatorServerUrl}:${port}` : `${iosEmulatorServerUrl}:${port}`

const App: () => React$Node = props => {
  const {
    incomingText
  } = props;

  const [text, setText] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (incomingText !== '')
      setText(incomingText);
  });

  useEffect(() => {
    const fetchData = async () => {
      let response = await getTags();
      let result = await response.json();
      setTags(["", ...result]);
    };

    fetchData();
  }, []);

  const getTags = async () => {
    const url = `${serverUrl}/api/links/tags`;
    let response = await fetch(url, {
      method: 'GET',
    });

    return response;
  }

  const addTag = tag => {
    if (!selectedTags.includes(tag))
      setSelectedTags([...selectedTags, tag]);
  };

  const submitLink = async () => {
    const url = `${serverUrl}/api/links`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: text,
        tags: selectedTags
      })
    });
  }

  const pickerItems = () => {
    return tags.map((tag, index) => {
      return (
        <Picker.Item key={index} label={tag} value={tag} />
      );
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.view}>
        <Text>{text ? text : "nothing shared yet"}</Text>
        <Picker
          selectedValue={currentTag}
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue && itemValue.trim()) {
              setCurrentTag(itemValue);
              addTag(itemValue);
            }
          }}>
          {pickerItems()}
        </Picker>
        <FlatList
          style={{ backgroundColor: 'yellow' }}
          data={selectedTags}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        />
        <Button title="Submit" style={styles.submit} onPress={submitLink}/>
        {/* <Button onPress={async () => await submitLink()}>Submit</Button> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'green'
  },
  submit: {
  }
});

export default App;
