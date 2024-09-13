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
import { useTranslation } from 'react-i18next';
import EmptyState from './ui/EmptyState';
import NoGameFoundLight from '../../assets/images/emptyState/NoGameFoundLight.png'
import NoGameFoundDark from '../../assets/images/emptyState/NoGameFoundDark.png'


const {width} = Dimensions.get('window');
const itemWidth = ( width -50 ) ;

interface GameListProps {
  data: GameListData[];
}
export interface GameListData {
  game_id: number;
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
  const { t } = useTranslation(['games']);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, isDarkMode } = useTheme();
  const renderItem = ({item}: {item: GameListData}) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          backgroundColor: theme.secondaryBGColor,
          borderColor: theme.borderStroke,
        },
      ]}
      key={item.game_id.toString()}
      onPress={() => navigation.navigate('GameView', {game: item})}>
      <Image source={{uri: item.game_image}} style={styles.ImageStyles} />
      <Text style={[styles.TextStyles, {color: theme.textColor}]}>{item.game_name}</Text>
      <View style={styles.infoRow}>
        <Text style={[styles.TextStyles2, {color: theme.secondaryTextColor}]}>{t("games:totalPlayers")}: {item.game_players}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    // <View style={styles.emptyStateContainer}>
    //   <Image
    //     source={isDarkMode ? EmptyTransactionDark : EmptyTransactionLight}
    //     style={styles.emptyStateImage}
    //     resizeMode="contain"
    //   />
    //   <Text style={[styles.emptyStateHeaderText, {color: theme.textColor}]}>{t("wallet:emptyTransaction")}</Text>
    //   <Text style={[styles.bodyText, {color: theme.secondaryTextColor}]}>
    //    {t("wallet:emptyTransactionDescription")}
    //   </Text>
    // </View>
    <View style={styles.emptyContainer}>
      <EmptyState
      image={isDarkMode ? NoGameFoundDark : NoGameFoundLight}
      headerText={t('wallet:NoGameFound')}
      bodyText={t('wallet:NoGameFoundDescription')}
      theme={theme}
    />
    </View>
    
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.game_id.toString()}
        scrollEnabled={false}
        ListEmptyComponent={renderEmptyState 
        }
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,

  },
});

export default GameList;
