import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS} from '../constants/theme';

import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import BackButton from './ui/BackButton';

type GameViewRouteProp = RouteProp<RootStackParamList, 'GameView'>;

const GameView: React.FC = () => {
  const route = useRoute<GameViewRouteProp>();
  const {game} = route.params;

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.itemsCenter}>
        <Text style={styles.gameTitle}>{game.name}</Text>
        <Image source={{uri: game.image}} style={styles.gameImage} />
      </View>

      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playButtonText}>Play Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
    padding: 20,
  },

  itemsCenter: {
    alignItems: 'center',
  },

  gameImage: {
    width: '100%',
    height: 250,
    borderRadius: BORDERRADIUS.radius_15,
    marginBottom: 20,
  },
  gameTitle: {
    color: COLORS.primaryWhite,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: COLORS.primaryColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: BORDERRADIUS.radius_25,
  },
  playButtonText: {
    color: COLORS.primaryWhite,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameView;
