import React from 'react';
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
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';

const {width} = Dimensions.get('window');
const itemWidth = (width - 50) / 2;

interface GameListProps {
  data: GameData[];
}

const GameList: React.FC<GameListProps> = ({data = []}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderItem = ({item}: {item: GameData}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      key={item.id.toString()}
      onPress={() => navigation.navigate('GameView', {game: item})}>
      <Image source={{uri: item.image}} style={styles.ImageStyles} />
      <Text style={styles.TextStyles}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
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
  },
  ImageStyles: {
    width: itemWidth, // Make image width responsive
    height: itemWidth * 0.6, // Adjust height based on aspect ratio (0.6 here as an example)
  },
});

export default GameList;
