import React, {useMemo} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
import {useTheme} from '../utils/ThemeContext';

interface TabButtonProps {
  name: 'All' | 'Slot' | 'Casino' | 'Poker';
  activeTab: string;
  onHandleSearchType: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  name,
  activeTab,
  onHandleSearchType,
}) => {
  const {isDarkMode, toggleTheme, theme} = useTheme();
  const tabButtonStyle = useMemo(
    () => ({
      width: 120,
      marginVertical: SPACING.space_10,
      marginHorizontal: SPACING.space_4,
      backgroundColor:
        name === activeTab ? theme.primaryColor : theme.secondaryBGColor,
      borderRadius: SPACING.space_32,
      padding: SPACING.space_10,
      borderWidth: 1,
      borderColor: 
      name === activeTab ? theme.primaryColor : theme.borderStroke,
    }),
    [name, activeTab, theme],
  );

  const tabTextStyle = useMemo(
    () => ({
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_14,
      color: name === activeTab ? theme.primaryBGColor : theme.textColor,
      textAlign: 'center' as 'center',
    }),
    [name, activeTab, theme],
  );

  return (
    <TouchableOpacity style={tabButtonStyle} onPress={onHandleSearchType}>
      <Text style={tabTextStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

interface TabsProps {
  tabs: ('All' | 'Slot' | 'Casino' | 'Poker')[];
  activeTab: string;
  setActiveTab: (tab: 'All' | 'Slot' | 'Casino' | 'RPG') => void;
}

const Tabs: React.FC<TabsProps> = ({tabs, activeTab, setActiveTab}) => {
  const {theme} = useTheme();

  return (
    <View>
      <FlatList
        data={tabs}
        renderItem={({item, index }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() =>
              setActiveTab(item as 'All' | 'Slot' | 'Casino' | 'RPG')
            }
            key={index}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
      />
    </View>
  );
};

export default Tabs;
