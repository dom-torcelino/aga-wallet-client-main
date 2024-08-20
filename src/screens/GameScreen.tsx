import {StatusBar, StyleSheet, View, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {COLORS, SPACING} from '../constants/theme';
import HeaderBar from '../components/HeaderBar';
import CarouselSlider from '../components/Carousel';
import Tabs from '../components/Tabs';
import {games} from '../data/mockData';
import {useTheme} from '../utils/ThemeContext';
import GameList, { GameListData } from '../components/GameList';
import { useAuth } from './auth/AuthContext';
// @ts-ignore
import {API_URL} from '@env';

const gameTabs = ['All', 'Slot', 'Casino', 'RPG'];

const shuffleArray = (array: any[]) => {
  return array
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
};

const GameScreen: React.FC = () => {
  const { theme } = useTheme()
  const {userId, token, loggedIn, balance} = useAuth();
  const [activeTab, setActiveTab] = useState<
    'All' | 'Slot' | 'Casino' | 'RPG'
  >('All');

  const [genre, setGenre] = useState("");
  const [games, setGames] = useState([])

  useMemo(() => {
    const fetchGames = async () => {
      const response = await fetch(`${API_URL}/v1/games?limit=2&order_by=desc&sort_by=game_players&${genre !== '' ? `genre=${genre}`: ''}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });
      const data = await response.json();
      setGames(data?.games ?? []);
    }
    fetchGames()
    console.log("MEMOIZED")
  }, [genre, token])

  return (
    <View
      style={[styles.ScreenContainer, {backgroundColor: theme.primaryBGColor}]}>
      {/* <StatusBar backgroundColor={COLORS.primaryBGColor} /> */}
      <HeaderBar title={'Game'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.carouselContainer}>
          <CarouselSlider />
        </View>
        <Tabs
          tabs={gameTabs}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab)
            setGenre(tab)
          }}
        />
           {/* <GameList data={filterData()} /> */}
        <GameList data={games} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
    paddingHorizontal: SPACING.space_16,
  },
  carouselContainer: {
    marginVertical: SPACING.space_10,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default GameScreen;
