import {StatusBar, StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SPACING} from '../constants/theme';
import HeaderBar from '../components/HeaderBar';
import CarouselSlider from '../components/Carousel';
import Tabs from '../components/Tabs';
<<<<<<< HEAD
import GameList, { GameListData } from '../components/GameList';
import { useAuth } from './auth/AuthContext';
// @ts-ignore
import {API_URL} from '@env';
=======
import GameList from '../components/GameList';
import {games} from '../data/mockData';
import {useTheme} from '../utils/ThemeContext';
>>>>>>> origin/dom

const gameTabs = ['All', 'Slot', 'Casino', 'RPG'];

const shuffleArray = (array: any[]) => {
  return array
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
};

const GameScreen: React.FC = () => {
  const {userId, token, loggedIn, balance} = useAuth();
  const [activeTab, setActiveTab] = useState<
    'All' | 'Slot' | 'Casino' | 'RPG'
  >('All');
  const [gameData, setGameData] = useState<GameListData[]>([])
  const [resultGames, setResultGames] = useState<GameListData[]>([]);

<<<<<<< HEAD
  const filterData = ({ filter = "All"}) => {
      console.log(filter)
      if(filter !== "All"){
        const newGameData = resultGames.filter(rGame => rGame.game_genre === filter )
        setGameData(newGameData)
      } else {
        setGameData(resultGames)
      }
=======
  const {isDarkMode, toggleTheme, theme} = useTheme();

  const filterData = () => {
    if (activeTab === 'All') {
      return shuffleArray(games); // Shuffle the games when "All" is selected
    }
    return games.filter(
      game => game.type.toLowerCase() === activeTab.toLowerCase(),
    );
>>>>>>> origin/dom
  };

  useEffect(() => {
    const fetchTokenData = async () => {
      if (loggedIn) {
        try {
          const response = await fetch(`${API_URL}/v1/games`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token?.accessToken}`,
            },
          });
        
          const result = await response.json();

            if (result && result.games) {
              const transformedData = result.games
                .map((games: any) => ({
                  id: games.game_id,
                  game_name: games.game_name,
                  game_image: games.game_image,
                  game_url: games.game_url,
                  game_genre: games.game_genre,
                  game_status: games.game_status,
                  game_players: games.game_players,
                  game_created_at: games.game_created_at,
                  game_updated_at: games.game_updated_at,
                }))
                .filter((item: any) => item.id !== undefined); // Filter out items without an id

                setResultGames(transformedData);
                filterData({filter: "All"})
            } else {
              console.error(
                'Error: assets property is missing in the response',
                result,
              );
            }
        } catch (error) {
            console.error('Error fetching token data:', error);
        }
      }
    };
    
    fetchTokenData();
  },[]);

  return (
    <View
      style={[styles.ScreenContainer, {backgroundColor: theme.primaryBGColor}]}>
      <StatusBar backgroundColor={COLORS.primaryBGColor} />
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
            filterData({ filter: tab })
          }}
        />
        <GameList data={gameData} />
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
