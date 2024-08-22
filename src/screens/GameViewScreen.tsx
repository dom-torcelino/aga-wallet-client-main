import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS} from '../constants/theme';

import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import BackButton from '../components/ui/BackButton';
import {useTheme} from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';

type GameViewScreenRouteProp = RouteProp<RootStackParamList, 'GameView'>;

const GameViewScreen: React.FC = () => {
  const { t } = useTranslation(["gameview"]);
  const route = useRoute<GameViewScreenRouteProp>();
  const { game } = route.params;
  const { theme } = useTheme();

  return (
    
    <View style={[styles.container, {backgroundColor: theme.primaryBGColor}]}>

      <View style={styles.itemsCenter}>
        <Image source={{uri: game.game_image}} style={styles.gameImage} />
        <Text style={[styles.gameTitle, {color: theme.textColor}]}>{game.game_name}</Text>
        <View  style={styles.gameDetails}>
          <Text style={[styles.gameDescription, {color: theme.textColor}]}>{t("gameview:genre")}: {game.game_genre}</Text>
          <Text style={[styles.gameDescription, {color: theme.textColor}]}>{t("gameview:activePlayer")}: {game.game_players}</Text>
        </View>
        <Text style={[styles.gameDescription, {color: theme.textColor}]}>{game.game_description}</Text>
      </View>

      <TouchableOpacity style={styles.playButton}>
        <Text style={[styles.playButtonText, {color: theme.textColor}]}>
        {t("gameview:playNow")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
    padding: 10,
    justifyContent:'space-between',
  },

  itemsCenter: {
    // alignItems: 'center',
  },

  gameImage: {
    width: '100%',
    height: 250,
    borderRadius: BORDERRADIUS.radius_15,
    marginBottom: 20,
  },
  gameDetails: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    padding:20,
    borderWidth:1,
    borderColor:'#3d3d3d',
    marginBottom:20,
    borderRadius:10
  },
  gameTitle: {
    alignSelf:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gameDescription: {
    fontSize: 16,
    fontWeight: '300',
    // marginBottom: 20,
  },
  playButton: {
    backgroundColor: COLORS.primaryColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: BORDERRADIUS.radius_15,
  },
  playButtonText: {
    color: COLORS.primaryWhite,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameViewScreen;
