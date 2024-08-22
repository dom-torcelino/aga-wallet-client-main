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
  const gameTabs = [`${t("games:all")}`, 'Slot', 'Casino', 'RPG'];
  const { theme } = useTheme()
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(`${t("games:all")}`);

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
      <HeaderBar title={t("games:games")} />
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
            setGenre(tab == `${t("games:all")}` ? "" : tab)
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
