import React from 'react';
import { Dimensions, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { Color } from '../../common/models/Color';
import { ADD_NOTE_SCREEN_NAME, BODY_BACKGROUND_COLOR, PRIMARY_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import { useNavigation } from '@react-navigation/native';
import { useAppData } from '../../common/services/AppDataReactContext';

export default function NoNotesView() {
  const { appData } = useAppData();
  const styles = getStyles(appData.theme);
  const navigation = useNavigation();
  return (
    <View>
      {appData.memories.length > 0 ? null : (
        <SafeAreaView style={styles.container}>
          <Text style={styles.label}>
            Click on the <Text style={styles.icon}>+</Text> icon below to add your first note
          </Text>
          <Svg
            onPress={() => navigation.navigate(ADD_NOTE_SCREEN_NAME)}
            style={styles.svg}
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            width={Dimensions.get('screen').width - 100}
            height={Dimensions.get('screen').width - 100}
            viewBox='0 0 782.044 701.88'
          >
            <Path
              d='M400.51 1.53l-25.446 6.562L61.56 88.94 36.113 95.5A48.18 48.18 0 001.53 154.119l110.341 427.877a48.18 48.18 0 0058.618 34.583l.066-.017 364.265-93.936.066-.017a48.18 48.18 0 0034.583-58.618L459.128 36.113A48.18 48.18 0 00400.51 1.53z'
              fill={new Color('#f2f2f2', '#262A2D').get(appData.theme)}
            />
            <Path
              d='M403.97 14.945l-30.14 7.773-304.118 78.426-30.14 7.772a34.31 34.31 0 00-24.627 41.743l110.341 427.878a34.31 34.31 0 0041.743 24.627l.066-.017L531.36 509.21l.067-.017a34.31 34.31 0 0024.627-41.743L445.713 39.573a34.31 34.31 0 00-41.743-24.628z'
              fill={new Color('#fff', '#1C1F23').get(appData.theme)}
            />
            <Path
              d='M381.212 153.503l-184.273 47.52a8.014 8.014 0 01-4.002-15.52l184.273-47.52a8.014 8.014 0 014.002 15.52zM419.977 171.44l-216.284 55.774a8.014 8.014 0 11-4.002-15.52l216.284-55.775a8.014 8.014 0 014.002 15.52zM411.48 270.877l-184.273 47.52a8.014 8.014 0 11-4.002-15.52l184.273-47.52a8.014 8.014 0 114.002 15.52zM450.245 288.813l-216.284 55.775a8.014 8.014 0 11-4.002-15.52l216.284-55.776a8.014 8.014 0 014.002 15.52zM441.749 388.25l-184.273 47.52a8.014 8.014 0 01-4.003-15.52l184.273-47.52a8.014 8.014 0 014.003 15.52zM480.514 406.186L264.23 461.961a8.014 8.014 0 11-4.003-15.52l216.284-55.775a8.014 8.014 0 014.003 15.52z'
              fill={new Color('#f2f2f2', '#262A2D').get(appData.theme)}
            />
            <Path
              d='M165.481 249.749l-65.212 16.817a3.847 3.847 0 01-4.681-2.762l-14.97-58.048a3.847 3.847 0 012.762-4.68l65.212-16.818a3.847 3.847 0 014.681 2.762l14.97 58.048a3.847 3.847 0 01-2.762 4.68zM195.75 367.122l-65.213 16.817a3.847 3.847 0 01-4.68-2.761l-14.97-58.048a3.847 3.847 0 012.761-4.681l65.213-16.817a3.847 3.847 0 014.68 2.761l14.97 58.049a3.847 3.847 0 01-2.762 4.68zM226.018 484.496l-65.213 16.817a3.847 3.847 0 01-4.68-2.762l-14.97-58.048a3.847 3.847 0 012.761-4.68l65.213-16.818a3.847 3.847 0 014.68 2.762l14.97 58.048a3.847 3.847 0 01-2.761 4.68zM654.659 109.992H278.34a48.18 48.18 0 00-48.125 48.125v441.876a48.18 48.18 0 0048.125 48.125H654.66a48.18 48.18 0 0048.125-48.125V158.117a48.18 48.18 0 00-48.125-48.125z'
              fill={new Color('#e6e6e6', '#555').get(appData.theme)}
            />
            <Path
              d='M654.66 123.846H278.34a34.31 34.31 0 00-34.27 34.27v441.877a34.31 34.31 0 0034.27 34.27h376.32a34.31 34.31 0 0034.27-34.27V158.117a34.31 34.31 0 00-34.27-34.271z'
              fill={new Color('#fff', '#1C1F23').get(appData.theme)}
            />
            <Circle cx={694.194} cy={614.03} r={87.85} fill={PRIMARY_COLOR.get(appData.theme)} />
            <Path
              d='M736.21 602.57h-30.557v-30.556a11.459 11.459 0 00-22.918 0v30.557H652.18a11.459 11.459 0 000 22.917h30.556v30.557a11.459 11.459 0 1022.918 0v-30.557h30.556a11.459 11.459 0 000-22.917z'
              fill={new Color('#fff', '#1C1F23').get(appData.theme)}
            />
            <Path
              d='M598.023 366.656H407.72a8.014 8.014 0 110-16.029h190.302a8.014 8.014 0 010 16.029zM631.081 393.703h-223.36a8.014 8.014 0 110-16.028h223.36a8.014 8.014 0 110 16.028zM598.023 487.869H407.72a8.014 8.014 0 110-16.028h190.302a8.014 8.014 0 010 16.028zM631.081 514.917h-223.36a8.014 8.014 0 110-16.029h223.36a8.014 8.014 0 110 16.029zM365.092 405.982h-67.345a3.847 3.847 0 01-3.843-3.843v-59.947a3.847 3.847 0 013.843-3.843h67.345a3.847 3.847 0 013.843 3.843v59.947a3.847 3.847 0 01-3.843 3.843zM365.092 527.195h-67.345a3.847 3.847 0 01-3.843-3.843v-59.947a3.847 3.847 0 013.843-3.843h67.345a3.847 3.847 0 013.843 3.843v59.947a3.847 3.847 0 01-3.843 3.843z'
              fill={new Color('#e6e6e6', '#666').get(appData.theme)}
            />
            <Path
              d='M598.234 231.721H457.932a8.014 8.014 0 010-16.028h140.302a8.014 8.014 0 010 16.028zM631.292 258.769h-173.36a8.014 8.014 0 110-16.029h173.36a8.014 8.014 0 010 16.029z'
              fill={new Color('#ccc', '#888').get(appData.theme)}
            />
            <Path
              d='M426.881 291.547H297.535a3.847 3.847 0 01-3.842-3.843V186.757a3.847 3.847 0 013.842-3.843h129.346a3.847 3.847 0 013.843 3.843v100.947a3.847 3.847 0 01-3.843 3.843z'
              fill={PRIMARY_COLOR.get(appData.theme)}
            />
          </Svg>
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
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      textAlign: 'center',
      padding: 30,
      paddingTop: 0,
      fontSize: 22,
      fontWeight: '100',
      color: new Color('#333', '#EEE').get(theme),
    },
    icon: {
      fontSize: 28,
      fontWeight: 'bold',
      color: PRIMARY_COLOR.get(theme),
    },
    svg: {},
  });
};
