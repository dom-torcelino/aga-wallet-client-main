/* eslint-disable prettier/prettier */
import { Text, View, TouchableOpacity, FlatList, GestureResponderEvent } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../constants/theme';

interface TabButtonProps {
  name: string;
  activeTab: string;
  onHandleSearchType: (event: GestureResponderEvent) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ name, activeTab, onHandleSearchType }) => (
  <TouchableOpacity
    style={tabButtonStyle(name, activeTab)}
    onPress={onHandleSearchType}
  >
    <Text style={tabTextStyle(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
);

interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: 'All' | 'Slot' | 'Casino' | 'Poker') => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View>
      <FlatList
        data={tabs}
        renderItem={({ item, index }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item as 'All' | 'Slot' | 'Casino' | 'Poker')}
            key={index.toString()} // Ensure unique key
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`} // Ensure unique key
      />
    </View>
  );
};

const tabTextStyle = (name: string, activeTab: string) => ({
  fontFamily: FONTFAMILY.poppins_medium,
  fontSize: FONTSIZE.size_14,
  color: name === activeTab ? COLORS.primaryBlackHex : COLORS.primaryWhiteHex,
  textAlign: 'center' as 'center',
});

const tabButtonStyle = (name: string, activeTab: string) => ({
  width: 120,
  marginVertical: SPACING.space_10,
  marginHorizontal: SPACING.space_4,
  backgroundColor: name === activeTab ? COLORS.primaryColor : COLORS.secondaryBGColor,
  borderRadius: SPACING.space_32,
  padding: SPACING.space_10,
});

export default Tabs;
