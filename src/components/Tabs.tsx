import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { FONTFAMILY, FONTSIZE, SPACING } from '../constants/theme';
import { useTheme } from '../utils/ThemeContext';

interface TabButtonProps {
  name: string;
  activeTab: string;
  onPress: (name: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  name,
  activeTab,
  onPress,
}) => {
  const { theme } = useTheme();
  
  // Memoized styles for performance optimization
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
    [name, activeTab, theme]
  );

  const tabTextStyle = useMemo(
    () => ({
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_14,
      color: name === activeTab ? theme.primaryBGColor : theme.textColor,
      textAlign: 'center' as 'center',
    }),
    [name, activeTab, theme]
  );

  return (
    <TouchableOpacity style={tabButtonStyle} onPress={() => onPress(name)}>
      <Text style={tabTextStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onPress={setActiveTab} // Pass the setActiveTab directly
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item} // Use item (which is the tab name) as the key
      />
    </View>
  );
};

export default Tabs;
