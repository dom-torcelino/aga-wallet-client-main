import { useState } from "react";
import { FlatList, Modal, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, ViewStyle } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE } from "../constants/theme";
import ChevronDown from "../../assets/SVG/ChevroDown";

type PickerOption = {
    label: string;
    value: string;
};
  
type PickerProps = {
    options: PickerOption[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>;
    backdropStyle?: StyleProp<ViewStyle>;
    selectedItemStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
};

// Cu1stomPicker Component
export const Picker: React.FC<PickerProps> = ({ options, selectedValue, onValueChange, style, backdropStyle, selectedItemStyle, buttonStyle, itemStyle, disabled = false }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
    };

    return (
    <View style={[
        styles.style,
        style
    ]}>
        <TouchableOpacity
            style={[
                styles.buttonStyle,
                buttonStyle
            ]}
            onPress={() => disabled ? () => {} : setModalVisible(true)}
        >
            <Text style={[
                    styles.selectedItemStyle,
                    selectedItemStyle
                ]}>
                    {options.find(option => option.value === selectedValue)?.label || 'Select'}
            </Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} statusBarTranslucent animationType="none" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={[
                styles.backdropStyle,
                backdropStyle
            ]}>
            <TouchableWithoutFeedback>
                <View style={[styles.modalBaseStyle]}>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelect(item.value)}>
                        <Text style={[
                            styles.itemStyle,
                            itemStyle
                        ]}>{item.label}</Text>
                    </TouchableOpacity>
                    )}
                />
                </View>
            </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
        </Modal>
    </View>
    );
};

const styles = StyleSheet.create({
    style: { 
        flex: 1
    },
    backdropStyle: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        paddingHorizontal: 20 
    },
    modalBaseStyle: { 
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 10, 
        height: 'auto', 
        width: '100%'
    },
    selectedItemStyle: { 
        textAlign: 'right',
        fontSize: FONTSIZE.size_18,
        color: COLORS.secondaryTextColor,
        fontFamily: FONTFAMILY.poppins_regular
    },
    itemStyle: { 
        padding: 10,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryBlackHex,
        fontFamily: FONTFAMILY.poppins_regular
    },
    buttonStyle: { 
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})