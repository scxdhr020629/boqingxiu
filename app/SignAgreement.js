import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    TouchableNativeFeedback,
    Image,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import GlobalInfo from "./GlobalInfo";
import Tooltip from "./Tooltip";

const { width, height } = Dimensions.get("screen");
const SignAgreement = (prop) => {
    const [choose, setChoose] = useState("ellipse-outline");
    const [color, setColor] = useState("#D7D7D9");
    const [hintIcon, setHintIcon] = useState("");
    const [hintText, setHintText] = useState("");

    const handleClick = () => {
        choose === "ellipse-outline" ?
            setChoose("checkmark-circle-outline") : setChoose("ellipse-outline");
        color === "#D7D7D9" ? setColor("#8492FF") : setColor("#D7D7D9");
    }

    const activityTiming = () => {
        /** 从数据库获取开始时间 */

        console.log(GlobalInfo.isTiming)
        if (GlobalInfo.isTiming === true) {
            return (
                <TouchableOpacity style={styles.timingView} onPress={() => prop.navigation.navigate("ActivityTiming", {
                    beginTime: GlobalInfo.beginTime
                })}>
                    <Ionicons name="time-outline" size={20} style={styles.timingIcon} />
                    <Text style={styles.timingText}>正在计时活动...</Text>
                </TouchableOpacity>
            );
        }
    }

    const signIn = () => {
        if (color === "#8492FF") {
            if (GlobalInfo.isTiming === true) {
                setHintIcon("alert-outline");
                setHintText("您有正在服务的志愿活动，不能重复服务");
                setTimeout(() => {
                    setHintIcon("");
                    setHintText("");
                }, 3000);
            }
            else
                prop.navigation.navigate('SignInputCode');
        }
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>签到</Text>
            </View>
            <View style={{ flex: 1 }}>
                {activityTiming()}
                <ImageBackground
                    source={require("../data/img/signin_1.png")}
                    style={styles.background}
                    imageStyle={{ borderRadius: 10 }}
                >
                    <Text style={{ marginTop: 170, marginHorizontal: 10, lineHeight: 18 }}>
                        <Text style={{ fontWeight: "bold" }}>   我承诺</Text>
                        ，诚信参与志愿服务活动，签到签退所记录的志愿服务时长，为本人真实参与志愿服务活动所积累的时长。
                    </Text>
                    <Text style={{ marginHorizontal: 10, lineHeight: 18 }}>
                        <Text style={{ fontWeight: "bold" }}>   我同意</Text>
                        ，公开我的志愿服务时长和记录等信息，以配合广大志愿者和博青秀对诚信志愿的监督与核查。
                    </Text>
                    <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 15 }}>
                        <Ionicons
                            name={choose}
                            size={20}
                            color={choose === "ellipse-outline" ? "black" : "#5AC19F"}
                            onPress={() => handleClick()}
                        />
                        <Text style={{ marginTop: 3, marginLeft: 3 }}>我已阅读，并同意签到诚信协议</Text>
                    </View>
                    <TouchableNativeFeedback>
                        <Text
                            style={[styles.btnSignin, { backgroundColor: color }]}
                            onPress={() => signIn()}>
                            我要签到
                        </Text>
                    </TouchableNativeFeedback>
                </ImageBackground>
            </View>
            {Tooltip(hintIcon, hintText, height)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        backgroundColor: "#9D98FF",
        width: "100%",
        height: 70,
    },
    title: {
        fontSize: 25,
        height: 70,
        color: "#FFF",
        alignSelf: "center",
        textAlignVertical: "center"
    },
    btnSignin: {
        marginTop: 30,
        borderRadius: 50,
        width: 190,
        height: 38,
        textAlign: "center",
        textAlignVertical: 'center',
        alignSelf: "center",
        color: "#FFF",
        fontSize: 16,
    },
    background: {
        position: "absolute",
        top: 150,
        width: 280,
        height: 410,
        alignSelf: "center",
    },
    timingView: {
        flexDirection: "row",
        backgroundColor: "#A7B5FF",
        borderRadius: 10,
        marginTop: 50,
        padding: 10,
        width: 200,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4
    },
    timingIcon: {
        color: "#FFF",
        marginRight: 5
    },
    timingText: {
        color: "#FFF",
        fontSize: 18
    }
});

export default SignAgreement;