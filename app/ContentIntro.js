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
    TouchableOpacity
} from "react-native";
import UserInformation from "./UserInformation";

const ContentIntro = ({ route, navigation }) => {
    const [choice, setChoice] = useState(0);
    const [data, setData] = useState();
    const [appointment, setAppointment] = useState();
    const { orgId } = route.params;
    const ZHOU = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    const order = () => {
        /**更新数据库 */
        setData({ ...data, numOfOrder: data.numOfOrder + 1 });
    }

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
        console.log(UserInformation.ip + 'selectOrgById.php?orgId=' + orgId)
        fetch(UserInformation.ip + 'selectOrgById.php?orgId=' + orgId)
            .then(res => res.json())
            .then(resJson => {
                // console.log(resJson);
                if (resJson.length !== 0) {
                    setData(resJson[0])
                }
            }).catch(e => console.log(e));

        fetch(UserInformation.ip + 'selectAppointById.php?orgId=' + orgId)
            .then(res => res.json())
            .then(resJson => {
                // console.log(resJson);
                if (resJson.length !== 0) {
                    let date = new Date();
                    let zhou = ZHOU[(date.getDay()) % 7];
                    let day = `${date.getMonth() + 1}-${date.getDate()}`;

                    // console.log(zhou + day)
                    resJson.map((value, index) => {
                        // console.log(resJson[index].timeName)
                        // console.log((resJson[index].timeName) === (zhou + day))
                        if (resJson[index].timeName === (zhou + day)) {
                            console.log(resJson.slice(index, index + 7))
                            setAppointment(resJson.slice(index, index + 8));
                        }
                    });
                }
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
                            onPress={() => navigation.navigate("ContentService")}
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
                        <Text style={{ color: "#E2D664" }}>{appointment[choice].totalPlaces}</Text>
                        {`/${appointment[choice].occupyPlaces}`}
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#CBD2F6",
                            borderRadius: 20,
                            height: "70%",
                            width: 65,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 2,
                            position: "absolute",
                            right: 20
                        }}
                        onPress={() => order()}
                    >
                        <Text style={{ color: "#000", fontSize: 15 }}>预约</Text>
                    </TouchableOpacity>
                </View>
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