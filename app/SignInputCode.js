import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    ImageBackground
} from "react-native";
import GlobalInfo from "./GlobalInfo";
import UserInformation from "./UserInformation";

const SignInputCode = (prop) => {
    const [code, setCode] = useState();
    const [correct, isCorrect] = useState("");
    const [time, setTime] = useState(4);

    const judgeInput = async (text) => {
        setCode(text);
        if (text.length === 6) {
            /** 判断活动编码, */
            var nowCode = text;
            var ansJson;
            var ip = UserInformation.ip;
            await fetch(ip + 'selectRecruitBoardByCode.php?code=' + nowCode)
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.length != 0) {
                        ansJson = resJson;
                        isCorrect(true);
                    }
                    else {
                        isCorrect(false);
                    }
                }).catch(e => console.log(e));
            console.log(ansJson);
            if (correct === true) {
                var orgId = ansJson[0].orgId;
                var userId = UserInformation.id;
                var recruitId = ansJson[0].recruitId;
                var timeId = ansJson[0].timeId;// 时间,应该根据这个时间进行一个判断
                var serveAddress = ansJson[0].serveAddress;
                if (serveAddress === UserInformation.userAddressNow) {
                    isCorrect(true);
                    // 先使用 applying 表好了,也不能重复签到的，按照逻辑来讲
                    await fetch(ip + 'addApplying.php?userId=' + userId + 'recruitId=' + recruitId);
                    //在applying表中插入数据

                }
                else {
                    isCorrect(false);
                }

            }

        }
    }

    const errorInput = () => {
        if (correct === false) {
            setTimeout(() => {
                isCorrect("");
            }, 2000);
            return (
                <View style={{
                    position: "absolute",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    alignSelf: "center",
                    width: 140,
                    height: 140,
                    borderRadius: 10,
                    marginTop: 200,
                    padding: 10
                }}>
                    <Ionicons
                        name="alert-circle-outline"
                        color="#FFF"
                        size={50}
                        style={{ alignSelf: "center", marginVertical: 10 }}>
                    </Ionicons>
                    <Text style={{ color: "#FFF", fontSize: 16, textAlign: "center" }}>活动已过期</Text>
                    <Text style={{ color: "#FFF", fontSize: 16, textAlign: "center" }}>或暂未开始</Text>
                </View>
            );
        }
    }

    const inputOrPrompt = () => {
        if (correct === true) {
            /** 将开始时间存入数据库 */

            GlobalInfo.isTiming = true;
            GlobalInfo.beginTime = new Date().valueOf();

            prop.navigation.navigate("ActivityTiming", {
                beginTime: GlobalInfo.beginTime
            })
        }
        else {
            return (
                <View style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", zIndex: 1000, height: 1000 }}>
                    <Text style={styles.inputNote}>请输入活动编码</Text>
                    <View>
                        <TextInput
                            value={code}
                            maxLength={6}
                            keyboardType="number-pad"
                            onChangeText={text => judgeInput(text)}
                            style={styles.inputCode}
                        />
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <View style={styles.underline}></View>
                            <View style={styles.underline}></View>
                            <View style={styles.underline}></View>
                            <View style={styles.underline}></View>
                            <View style={styles.underline}></View>
                            <View style={styles.underline}></View>
                        </View>
                    </View>
                    <Text style={{ alignSelf: "center", marginTop: 50, fontSize: 16, color: "black" }}>温馨提示</Text>
                    <Text style={{ marginTop: 20, marginHorizontal: 30, lineHeight: 20 }}>1.活动编码由6位数字组成，由活动管理员或组织者告知。</Text>
                    <Text style={{ marginHorizontal: 30, lineHeight: 20 }}>2.活动编码请勿在公共场所、网络聊天室等渠道公开传播。</Text>
                    {errorInput()}
                </View>
            );
        }
    }

    return (
        <View>
            <View style={{ zIndex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>签到</Text>
                </View>
                <View style={{ flex: 1 }}>
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
                                name="checkmark-circle-outline"
                                size={20}
                                color="#5AC19F"
                            />
                            <Text style={{ marginTop: 3, marginLeft: 3 }}>我已阅读，并同意签到诚信协议</Text>
                        </View>
                        <Text style={[styles.btnSignin, { backgroundColor: "#8492FF" }]}>我要签到</Text>
                    </ImageBackground>
                </View>
            </View>
            {inputOrPrompt()}
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
    inputNote: {
        alignSelf: "center",
        fontSize: 20,
        marginTop: 50,
        color: "black"
    },
    inputCode: {
        marginTop: 30,
        marginLeft: 16,
        height: 50,
        fontSize: 28,
        letterSpacing: 39,
        color: "#9D98FF",
        width: "100%",
    },
    underline: {
        borderBottomWidth: 3,
        borderBottomColor: "#E3E3E3",
        width: 33,
        marginHorizontal: 10,
    }
});

export default SignInputCode;