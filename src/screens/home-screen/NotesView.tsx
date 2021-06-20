import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View, TouchableOpacity, ScrollView } from 'react-native';
import NoteView from './NoteView';
import {
  ADD_NOTE_SCREEN_NAME,
  BODY_BACKGROUND_COLOR,
  DELETE_BUTTON_BACKGROUND_COLOR,
  DELETE_BUTTON_COLOR,
  EDIT_NOTE_SCREEN_NAME,
  PRIMARY_COLOR,
} from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import AddNoteFAB from './AddNoteFAB';
import { useNavigation } from '@react-navigation/native';
import SwipeToRightInfo from './SwipeToRightInfo';
import { useAppData } from '../../common/services/AppDataReactContext';
import { AppDataService } from '../../common/services/AppDataService';
import SearchInput from './SearchInput';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Color } from '../../common/models/Color';
import { Note } from '../../common/models/Note';

interface NotesProps {
  appDataService?: AppDataService;
}

const EDIT_BUTTON_COLOR = new Color('#EEE', '#EEE');

export default function NotesView({ appDataService = AppDataService.getInstance() }: NotesProps) {
  const { appData, setAppData } = useAppData();
  const styles = getStyles(appData.theme);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredMemories, setFilteredMemories] = useState([...appData.memories]);
  let notes: Array<any> = [];
  let previouslyOpenedNote: any;

  useEffect(() => setFilteredMemories([...appData.memories]), [appData]);

  const onSearchChange = (text: string) => {
    setSearch(text);
    setFilteredMemories(text ? appData.memories.filter((memory) => memory.label.toLowerCase().includes(text.toLowerCase())) : [...appData.memories]);
  };

  const closePreviouslyOpenedNote = (index: number) => {
    if (previouslyOpenedNote && previouslyOpenedNote !== notes[index]) previouslyOpenedNote.close();
    previouslyOpenedNote = notes[index];
  };

  const renderNoteActions = (note: Note) => {
    return (
      <View style={styles.leftActionButtonsContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => appDataService.deleteNote({ id: note.id, appData, setAppData })}>
          <View style={styles.deleteButtonContainer}>
            <MaterialCommunityIcons style={styles.deleteButton} name='delete-outline' />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate(EDIT_NOTE_SCREEN_NAME, { note })}>
          <View style={styles.editButtonContainer}>
            <Feather style={styles.editButton} name='edit' />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {appData.memories.length == 0 ? null : (
        <SafeAreaView style={styles.container}>
          <SearchInput text={search} onChangeText={onSearchChange} style={{ marginBottom: 15 }}></SearchInput>
          <View style={{ flex: 1 }}>
            <FlatList
              data={filteredMemories}
              renderItem={({ item, index }) => {
                return (
                  <Swipeable
                    ref={(ref) => (notes[index] = ref)}
                    renderLeftActions={() => renderNoteActions(item)}
                    onSwipeableLeftWillOpen={() => closePreviouslyOpenedNote(index)}
                  >
                    <NoteView style={{ marginBottom: 10 }} note={item}></NoteView>
                  </Swipeable>
                );
              }}
            />
          </View>
          {appData.swipeToDeleteMemoryInfoAlreadyShown || appData.memories.length != 1 ? null : <SwipeToRightInfo></SwipeToRightInfo>}

          <AddNoteFAB onPress={() => navigation.navigate(ADD_NOTE_SCREEN_NAME)}></AddNoteFAB>
        </SafeAreaView>
      )}
    </View>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: BODY_BACKGROUND_COLOR.get(theme),
      minHeight: '100%',
      padding: 15,
    },
    leftActionButtonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 15,
    },
    deleteButtonContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: DELETE_BUTTON_BACKGROUND_COLOR.get(theme),
      width: 58,
      borderRadius: 3,
      marginRight: 5,
    },
    deleteButton: {
      color: DELETE_BUTTON_COLOR.get(theme),
      alignSelf: 'center',
      fontSize: 34,
    },
    editButtonContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: PRIMARY_COLOR.get(theme),
      width: 58,
      borderRadius: 3,
      marginRight: 5,
    },
    editButton: {
      color: EDIT_BUTTON_COLOR.get(theme),
      fontSize: 26,
    },
  });
};
