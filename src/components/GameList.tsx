import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {BORDERRADIUS, COLORS} from '../constants/theme';
import {GameData} from '../data/mockData';
import {useAuth} from '../screens/auth/AuthContext';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {useTheme} from '../utils/ThemeContext';

const {width} = Dimensions.get('window');
const itemWidth = ( width -50 ) ;

interface GameListProps {
  data: GameListData[];
}
export interface GameListData {
  id: number;
  game_name: string;
  game_image: string;
  game_url:string;
  game_genre: string;
  game_status: string;
  game_players: string;
  game_created_at: string;
  game_updated_at: string;
}

export const GameList: React.FC<GameListProps> = ({data = []}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const renderItem = ({item}: {item: GameListData}) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          backgroundColor: theme.secondaryBGColor,
          borderColor: theme.borderStroke,
        },
      ]}
      key={item.id.toString()}
      onPress={() => navigation.navigate('GameView', {game: item})}>
      <Image source={{uri: item.game_image}} style={styles.ImageStyles} />
      <Text style={styles.TextStyles}>{item.game_name}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.TextStyles2}>Total Players: {item.game_players}</Text>
        <Text style={styles.TextStyles2}>Genre: {item.game_genre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
      />
       
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  itemContainer: {
    width: itemWidth, // Set item width dynamically
    alignItems: 'flex-start',
    // marginBottom: 10,
    margin: 6,
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.secondaryBGColor,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
    overflow: 'hidden',
  },
  TextStyles: {
    color: COLORS.primaryWhite,
    textAlign: 'center',
    margin: 10,
    fontSize:20,
  },
  TextStyles2: {
    color: COLORS.secondaryWhite,
    textAlign: 'center',
    margin: 10,
    fontSize:13,
  },
  ImageStyles: {
    width: itemWidth, // Make image width responsive
    height: itemWidth * 0.4, // Adjust height based on aspect ratio (0.6 here as an example)
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '100%', 

    marginBottom: 10,
  },
});

export default GameList;
