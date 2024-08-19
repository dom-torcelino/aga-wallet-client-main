import {StatusBar, StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SPACING} from '../constants/theme';
import HeaderBar from '../components/HeaderBar';
import CarouselSlider from '../components/Carousel';
import Tabs from '../components/Tabs';
import GameList from '../components/GameList';
import {games} from '../data/mockData';
import {useTheme} from '../utils/ThemeContext';

const gameTabs = ['All', 'Slot', 'Casino', 'Poker'];

const shuffleArray = (array: any[]) => {
  return array
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
};

const GameScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'All' | 'Slot' | 'Casino' | 'Poker'
  >('All');

  const {isDarkMode, toggleTheme, theme} = useTheme();

  const filterData = () => {
    if (activeTab === 'All') {
      return shuffleArray(games); // Shuffle the games when "All" is selected
    }
    return games.filter(
      game => game.type.toLowerCase() === activeTab.toLowerCase(),
    );
  };

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
          setActiveTab={setActiveTab}
        />
        <GameList data={filterData()} />
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
