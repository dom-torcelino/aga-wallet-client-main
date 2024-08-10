/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity, Text } from 'react-native';
import { BORDERRADIUS, COLORS } from '../constants/theme';
import { GameData } from '../data/mockData';

interface AllGamesProps {
  data: GameData[];
}

const AllGames: React.FC<AllGamesProps> = ({ data = [] }) => {
  const renderItem = ({ item }: { item: GameData }) => (
    <TouchableOpacity style={styles.itemContainer} key={item.id.toString()}>
      <Image source={{ uri: item.image }} style={styles.ImageStyles} />
      <Text style={styles.TextStyles}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 90,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginBottom: 10,
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
    width: 200,
    height: 120,
  },
});

export default AllGames;
