import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useMemo, useState} from 'react';
import {COLORS, SPACING} from '../constants/theme';
import HeaderBar from '../components/HeaderBar';
import CarouselSlider from '../components/Carousel';
import Tabs from '../components/Tabs';
import {useTheme} from '../utils/ThemeContext';
import GameList from '../components/GameList';
import { useAuth } from './auth/AuthContext';
// @ts-ignore
import {API_URL} from '@env';
import { useTranslation } from 'react-i18next';


const GameScreen: React.FC = () => {
  const { t } = useTranslation(['games'])
  // const gameTabs = [`${t("games:all")}`, 'Slot', 'Casino', 'RPG'];
  const gameTabs = [
    {
      key: 'all', label: t("games:all")
    },
    {
      key: 'slot', label: 'Slot' 
    },
    {
      key: 'casino', label: 'Casino'
    },
    {
      key: 'rpg', label: 'RPG'
    }
  ];

  const [activeTab, setActiveTab] = useState<string>(`${t("games:all")}`);
  const { theme } = useTheme()
  const { token } = useAuth();

  const [genre, setGenre] = useState("");
  const [games, setGames] = useState([])

  useMemo(() => {
    const fetchGames = async () => {
      const response = await fetch(`${API_URL}/v1/games?&order_by=desc&${genre !== '' ? `genre=${genre}`: ''}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });
      const data = await response.json();
      setGames(data?.games ?? []);
    }
    fetchGames()
  }, [genre, token])

  return (
    <View
      style={[styles.ScreenContainer, {backgroundColor: theme.primaryBGColor}]}>
      {/* <StatusBar backgroundColor={COLORS.primaryBGColor} /> */}
      <HeaderBar title={t("games:games")} balanceComponent={true}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.carouselContainer}>
          <CarouselSlider />
        </View>
        <Tabs
          tabs={gameTabs.map(tab => tab.label)}
          activeTab={gameTabs.find(tab => tab.key === activeTab)?.label || t("games:all")}
          setActiveTab={(tabLabel) => {
            // Find the tab key based on the selected label
            const selectedTab = gameTabs.find(tab => tab.label === tabLabel);
            if (selectedTab) {
              setActiveTab(selectedTab.key);
              setGenre(selectedTab.key === 'all' ? "" : selectedTab.key);
            }
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
