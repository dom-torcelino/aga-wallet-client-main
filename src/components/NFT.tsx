import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/theme';
import {NFTData} from '../data/mockData';
// import { Image } from 'react-native-svg';

interface NFTProps {
  title: string;
  data: NFTData[];
}

const NFT: React.FC<NFTProps> = ({title, data = []}) => {
  return (
    <View>
      <Text style={styles.NFTStyles}>{title}</Text>
      {data.map(item => (
        <View key={item.id}>
          <Text style={styles.NFTStyles}>{item.name}</Text>
          <Image source={{uri: item.image}} style={styles.NFTImage} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  NFTStyles: {
    color: COLORS.primaryWhite,
  },
  NFTImage: {
    width: 100,
    height: 100,
  },
});

export default NFT;
