import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Tooltip from "./Tooltip";
import UserInformation from "./UserInformation";

const { width, height } = Dimensions.get("screen");
const ContentIntro = ({ route, navigation }) => {
    const [choice, setChoice] = useState(0);
    const [data, setData] = useState();
    const [appointment, setAppointment] = useState();
    const [hintIcon, setHintIcon] = useState("");
    const [hintText, setHintText] = useState("");
    const { orgId } = route.params;
    const ZHOU = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const identity = UserInformation.identity;

    /** 处理预约按钮 */
    const order = async () => {
        const ip = UserInformation.ip;
        const account = UserInformation.account;

        if (appointment[choice].order === "预约") {
            var newOccupy = parseInt(appointment[choice].occupyPlaces) + 1;
            var occupy = parseInt(appointment[choice].occupyPlaces);
            var total = appointment[choice].totalPlaces;

            if (total === "不限额" || occupy < parseInt(total)) {
                await fetch(ip + 'selectOrdering.php?appointId=' + appointment[choice].appointId + '&nUserId=' + account)
                    .then(res => res.json())
                    .then(resJson => {
                        console.log(resJson)
                        if (resJson.length === 0) {
                            fetch(ip + 'addOrdering.php?appointId=' + appointment[choice].appointId + '&nUserId=' + account);

                            var newAppoint = appointment.map((value, index) => {
                                if (index === choice)
                                    return ({
                                        ...value,
                                        occupyPlaces: newOccupy,
                                        order: "取消预约"
                                    });
                                else return { ...value };
                            });
                            setAppointment([...newAppoint]);
                            fetch(ip + 'updateAppointOccupy.php?occupyPlaces=' + newOccupy + '&appointId=' + appointment[choice].appointId);

                            setHintIcon("checkmark-outline");
                            setHintText("预约成功");
                            setTimeout(() => {
                                setHintIcon("");
                                setHintText("");
                            }, 1000);
                        }
                        else {
                            setHintIcon("alert-outline");
                            setHintText("不能重复预约");
                            setTimeout(() => {
                                setHintIcon("");
                                setHintText("");
                            }, 2000);
                        }
                    })
            }
            else if (total == 0) {
                setHintIcon("alert-outline");
                setHintText("不能预约");
                setTimeout(() => {
                    setHintIcon("");
                    setHintText("");
                }, 2000);
            }
            else if (occupy >= parseInt(total)) {
                setHintIcon("alert-outline");
                setHintText("预约人数已满");
                setTimeout(() => {
                    setHintIcon("");
                    setHintText("");
                }, 2000);
            }
        }
        else {
            var newOccupy = parseInt(appointment[choice].occupyPlaces) - 1;

            fetch(ip + 'deleteOrdering.php?appointId=' + appointment[choice].appointId + '&nUserId=' + account);

            var newAppoint = appointment.map((value, index) => {
                if (index === choice)
                    return ({
                        ...value,
                        occupyPlaces: newOccupy,
                        order: "预约"
                    });
                else return { ...value };
            });
            setAppointment([...newAppoint]);
            fetch(ip + 'updateAppointOccupy.php?occupyPlaces=' + newOccupy + '&appointId=' + appointment[choice].appointId);

            setHintIcon("checkmark-outline");
            setHintText("取消预约成功");
            setTimeout(() => {
                setHintIcon("");
                setHintText("");
            }, 1000);
        }
    }

    /** 日期 */
    const scrollItem = () => {
        let dates = new Array(7).fill("");
        let date = new Date();

        return dates.map((value, index) => {
            let month_day = new Date(date.getTime() + index * 24 * 3600 * 1000);
            return (
                <TouchableOpacity
                    style={[
                        { marginRight: 15, marginLeft: 5, justifyContent: "center", alignItems: "center" },
                        (index === choice) ? styles.chose : {}
                    ]}
                    onPress={() => setChoice(index)}
                >
                    <Text>{ZHOU[(date.getDay() + index) % 7]}</Text>
                    <Text>{`${month_day.getMonth() + 1}-${month_day.getDate()}`}</Text>
                </TouchableOpacity>
            );
        })
    }

    useEffect(() => {
        var ip = UserInformation.ip;

        fetch(ip + 'selectOrgById.php?orgId=' + orgId)
            .then(res => res.json())
            .then(resJson => {
                // console.log(resJson);
                if (resJson.length !== 0) {
                    setData(resJson[0])
                }
            }).catch(e => console.log(e));

        fetch(ip + 'selectOrderingByNUserId.php?nUserId=' + UserInformation.account)
            .then(res => res.json())
            .then(resJson => {
                /** 登录用户已预约信息 */
                var appointIds = [];
                resJson.map((value) => {
                    appointIds.push(value.appointId);
                });

                fetch(ip + 'selectAppointById.php?orgId=' + orgId)
                    .then(res => res.json())
                    .then(resJson => {
                        // console.log(resJson);
                        if (resJson.length !== 0) {
                            let date = new Date();
                            let zhou = ZHOU[(date.getDay()) % 7];
                            let day = `${date.getMonth() + 1}-${date.getDate()}`;
                            var dateOrder = [];
                            var orderIndex = 0;
                            var indexBegin = -1;

                            resJson.map((value, index) => {
                                if (resJson[index].timeName === (zhou + day)) {
                                    indexBegin = index;
                                    dateOrder[orderIndex++] = {
                                        ...value,
                                        order: appointIds.includes(value.appointId) ? "取消预约" : "预约"
                                    };
                                }
                                else if (indexBegin !== -1 && orderIndex < 7) {
                                    dateOrder[orderIndex++] = {
                                        ...value,
                                        order: appointIds.includes(value.appointId) ? "取消预约" : "预约"
                                    };
                                }
                            });

                            while (orderIndex < 7) {
                                dateOrder[orderIndex++] = {
                                    totalPlaces: 0,
                                    occupyPlaces: 0,
                                    order: "预约"
                                };
                            }

                            setAppointment(dateOrder);
                        }
                    }).catch(e => console.log(e));
            }).catch(e => console.log(e));
    }, []);

    // console.log(appointment)
    if (data !== undefined && appointment != undefined)
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../data/img/content_1.png")} style={{ width: "100%", height: 80 }}>
                    <View style={styles.header}>
                        <Ionicons
                            name="chevron-back-outline"
                            size={25}
                            style={{ color: "rgba(255, 255, 255, 0.8)", position: "absolute", left: 7 }}
                            onPress={() => navigation.navigate("Home")}
                        />
                        <Text style={{
                            fontSize: 19,
                            color: "#FFF",
                            marginRight: 10,
                            textDecorationLine: "underline"
                        }}>
                            介绍
                        </Text>
                        <Text
                            style={{
                                fontSize: 17,
                                color: "rgba(240, 240, 253, 0.66)",
                            }}
                            onPress={() => navigation.navigate("ContentService", {
                                orgId: orgId
                            })}
                        >
                            志愿服务
                        </Text>
                        <Ionicons
                            name="chatbubbles-outline"
                            size={25}
                            style={{ color: "rgba(255, 255, 255, 0.8)", position: "absolute", right: 10 }}
                            onPress={() => navigation.navigate("Chat", {
                                name: data.name
                            })}
                        />
                    </View>
                </ImageBackground>
                <View style={{ marginHorizontal: "5%", width: "90%" }}>
                    <Text style={{ fontSize: 20, color: "#000", marginVertical: 10, alignSelf: "center" }}>{data.orgName}</Text>
                    <SafeAreaView style={{ width: "100%", height: 508 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Image source={{ uri: data.orgImg }} style={{ width: "100%", height: 180, borderRadius: 10 }} />
                            <View style={{
                                marginTop: 15,
                                borderWidth: 1,
                                backgroundColor: "#F0F0FD",
                                borderColor: "#BBB",
                                borderRadius: 10,
                                padding: 8
                            }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.text}>营业时间：</Text>
                                    <Text style={styles.text}>{data.time}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginVertical: 5 }}>
                                    <Text style={styles.text}>地址：</Text>
                                    <Text style={styles.text}>{data.address}</Text>
                                    <Ionicons
                                        name="location-outline"
                                        size={17}
                                        color="#000"
                                        style={{ marginLeft: 5, marginTop: -2 }}
                                    />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.text}>电话：</Text>
                                    <Text style={styles.text}>{data.orgPhone}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 20, marginLeft: 5 }}>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginRight: 5 }]}>简介</Text>
                                    <View
                                        style={{ borderBottomWidth: 1, borderBottomColor: "#BBB", width: "85%", marginBottom: 7 }}>
                                    </View>
                                </View>
                                <Text style={styles.contents}>{data.introduction}</Text>
                            </View>
                            <View style={{ marginTop: 10, marginLeft: 5 }}>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <View
                                        style={{ borderBottomWidth: 1, borderBottomColor: "#BBB", width: "85%", marginBottom: 7 }}>
                                    </View>
                                    <Text style={[styles.text, { marginLeft: 5 }]}>特色</Text>
                                </View>
                                <Text style={styles.contents}>{data.feature}</Text>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>

                <SafeAreaView style={{
                    position: "absolute",
                    bottom: 50,
                    height: 50,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#BBB",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    backgroundColor: "#FFF"
                }}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {scrollItem()}
                    </ScrollView>
                </SafeAreaView>
                <View style={{
                    position: "absolute",
                    bottom: 0,
                    height: 50,
                    width: "100%",
                    backgroundColor: "#7B9DF6",
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{ color: "#FFF", marginLeft: 10, fontSize: 16 }}>
                        预约人数：
                        <Text style={{ color: "#E2D664" }}>{appointment[choice].occupyPlaces}</Text>
                        {`/${appointment[choice].totalPlaces}`}
                    </Text>
                    {
                        identity === "普通用户" ?
                            <TouchableOpacity
                                style={{
                                    backgroundColor: appointment[choice].order === "预约" ? "#FFF" : "#D9D9D9",
                                    borderRadius: 10,
                                    height: "70%",
                                    paddingHorizontal: 15,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    elevation: 2,
                                    position: "absolute",
                                    right: 20
                                }}
                                onPress={() => order()}
                            >
                                <Text style={{ color: "#000", fontSize: 15 }}>{appointment[choice].order}</Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
                {Tooltip(hintIcon, hintText, height)}
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 16,
        color: "#000"
    },
    contents: {
        color: "#000",
        lineHeight: 20
    },
    chose: {
        backgroundColor: "#7B9DF6",
        borderRadius: 5,
        padding: 10
    }
});

export default ContentIntro;