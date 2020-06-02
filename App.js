
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';
import { Picker } from '@react-native-community/picker';

const App: () => React$Node = props => {
  const {
    incomingText
  } = props;

  const [text, setText] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([
    { key: "dummy", label: "Select" },
    { key: "open_source", label: "Open Source" },
    { key: "programming", label: "Programming" }, 
    { key: "management", label: "Management" },
    { key: "web", label: "Web Development" },
    { key: "dotnet", label: ".NET" },
  ]);

  useEffect(() => {
    if (incomingText !== '')
      setText(incomingText);
  });

  const addTag = tag => {
    if (!selectedTags.includes(tag))
      setSelectedTags([...selectedTags, tag]);
  };

  const pickerItems = () => {
    return tags.map((tag, index) => {
      return (
        <Picker.Item key={index} label={tag.label} value={tag.key} />
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
            let tag = tags.find(t => t.key === itemValue);
            setCurrentTag(tag.label);
            addTag(tag);
          }}>
          {pickerItems()}
        </Picker>
        <FlatList
          data={selectedTags}
          keyExtractor={item => item.key}
          renderItem={({item}) => <Text style={styles.item}>{item.label}</Text>}
        />
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
  },
});

export default App;
