import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { PRIMARY_COLOR } from '../../common/Constants';
import { Color } from '../../common/models/Color';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataContext';
import { AppDataStorage } from '../../common/services/AppDataStorage';

interface SwipeToDeleteInfoProps {
  appDataStorage?: AppDataStorage;
}

export default function SwipeToDeleteInfo({ appDataStorage = AppDataStorage.getInstance() }: SwipeToDeleteInfoProps) {
  const { appData, setAppData } = useAppData();
  const styles = getStyles(appData.theme);

  const hide = () => {
    const newAppData = { ...appData, swipeToDeleteMemoryInfoAlreadyShown: true };
    setAppData(newAppData);
    appDataStorage.save(newAppData);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={hide} style={styles.touchable}>
        <View style={styles.hintContainer}>
          <Entypo name='info-with-circle' style={styles.infoIcon} />
          <Text style={styles.infoText}>Swipe to the left your memory if you want to delete it</Text>
        </View>
        <MaterialCommunityIcons name='gesture-swipe-right' size={180} color={new Color('#ddb892', '#b08968').get(appData.theme)} />
        <Button mode='contained' style={styles.doneIcon}>
          Hide
        </Button>
      </TouchableWithoutFeedback>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 150,
      width: Dimensions.get('window').width,
    },
    touchable: {
      alignItems: 'center',
    },
    hintContainer: {
      paddingLeft: 50,
      paddingRight: 50,
      paddingBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoIcon: {
      color: PRIMARY_COLOR.get(theme),
      fontWeight: 'bold',
      marginRight: 10,
      fontSize: 34,
    },
    infoText: {
      paddingLeft: 10,
      fontSize: 18,
      color: new Color('#444', '#EEE').get(theme),
    },
    doneIcon: {
      color: PRIMARY_COLOR.get(theme),
      marginRight: 35,
      marginTop: 25,
      fontSize: 34,
      alignSelf: 'flex-end',
    },
  });
}
