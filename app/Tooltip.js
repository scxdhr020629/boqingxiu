import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet } from "react-native";

const Tooltip = (icon, text, height) => {
    if (icon === "" && text !== "") {
        return (
            <View style={[styles.container, { height: 50, marginTop: height / 2 - 25 }]}>
                <Text style={{ color: "#FFF", fontSize: 16, textAlign: "center" }}>{text}</Text>
            </View>
        );
    }
    else if (icon !== "" && text !== "") {
        return (
            <View style={[styles.container, { height: 100, marginTop: height / 2 - 50 }]}>
                <Ionicons
                    name={icon}
                    size={27}
                    style={{ color: "#FFF", alignSelf: "center", marginBottom: 10 }}
                />
                <Text style={{ color: "#FFF", fontSize: 18, textAlign: "center" }}>{text}</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        alignSelf: "center",
        width: 140,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    }
});

export default Tooltip;