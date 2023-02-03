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
    TextInput,
    FlatList,
    Dimensions
} from "react-native";
import moment from "moment/moment";
import UserInformation from "./UserInformation";
import Tooltip from "./Tooltip";

const { width, height } = Dimensions.get("screen");
const ContentService = ({ route, navigation }) => {
    const [searchContent, setSearchContent] = useState("");
    const [chooseDate, serChooseDate] = useState(0);
    const [choices, setChoices] = useState([]);
    const [totalDots, setTotalDots] = useState(0);
    const [dots, setDots] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [data, setData] = useState();
    const [displayData, setDisplayData] = useState([]);
    const [hintIcon, setHintIcon] = useState("");
    const [hintText, setHintText] = useState("");
    const { orgId } = route.params;
    const account = UserInformation.account;
    const ip = UserInformation.ip;

    const search = async () => {
        await fetch(ip + 'searchVolunteer.php?orgId=' + orgId + '&info=' + searchContent + '&nUserId=' + account)
            .then(res => res.json())
            .then(resJson => {
                resJson = resJson.map((value) => {
                    return ({
                        ...value,
                        color: "#FFF"
                    });
                });

                serChooseDate(0);
                setData(resJson);
                setDisplayData(resJson);
            })

    }

    const apply = async () => {
        var values = "";
        choices.map((value, index) => {
            if (index === 0)
                values += "(" + account + ", " + value + ")";
            else
                values += ", (" + account + ", " + value + ")";
        });

        await fetch(ip + 'addApplyingCycle.php?values=' + values);

        var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
        await fetch(ip + 'selectBoardByOrg.php?orgId=' + orgId + '&curTime=' + curTime + '&nUserId=' + account)
            .then(res => res.json())
            .then(resJson => {
                resJson = resJson.map((value) => {
                    return ({
                        ...value,
                        color: "#FFF"
                    });
                });

                setData(resJson);
                setDisplayData(resJson);
                serChooseDate(0);
                setChoices([]);
                setTotalDots(0);
                setDots([0, 0, 0, 0, 0, 0, 0]);

                setHintIcon("checkmark-outline");
                setHintText("报名成功");
                setTimeout(() => {
                    setHintIcon("");
                    setHintText("");
                }, 1000);
            })
    }

    const chooseService = (item) => {
        var newDisplayData, newData;
        var itemTime = item.serveTime;

        if (item.color === "#FFF") {
            let newChoices = [...choices];
            newChoices.push(item.recruitId);
            setChoices([...newChoices]);

            let newDots = [...dots];
            if ((itemTime.split(" "))[0] === moment().format('YYYY-M-D')) newDots[0] += 1;
            else if ((itemTime.split(" "))[0] === moment().add(1, "days").format('YYYY-M-D')) newDots[1] += 1;
            else if ((itemTime.split(" "))[0] === moment().add(2, "days").format('YYYY-M-D')) newDots[2] += 1;
            else if ((itemTime.split(" "))[0] === moment().add(3, "days").format('YYYY-M-D')) newDots[3] += 1;
            else if ((itemTime.split(" "))[0] === moment().add(4, "days").format('YYYY-M-D')) newDots[4] += 1;
            else if ((itemTime.split(" "))[0] === moment().add(5, "days").format('YYYY-M-D')) newDots[5] += 1;
            else if ((itemTime.split(" "))[0] === moment().add(6, "days").format('YYYY-M-D')) newDots[6] += 1;
            setDots([...newDots]);
            setTotalDots(totalDots + 1);
        }
        else {
            let newChoices = [...choices];
            newChoices = newChoices.filter(element => element != item.recruitId);
            setChoices([...newChoices]);

            let newDots = [...dots];
            if ((itemTime.split(" "))[0] === moment().format('YYYY-M-D')) newDots[0] -= 1;
            else if ((itemTime.split(" "))[0] === moment().add(1, "days").format('YYYY-M-D')) newDots[1] -= 1;
            else if ((itemTime.split(" "))[0] === moment().add(2, "days").format('YYYY-M-D')) newDots[2] -= 1;
            else if ((itemTime.split(" "))[0] === moment().add(3, "days").format('YYYY-M-D')) newDots[3] -= 1;
            else if ((itemTime.split(" "))[0] === moment().add(4, "days").format('YYYY-M-D')) newDots[4] -= 1;
            else if ((itemTime.split(" "))[0] === moment().add(5, "days").format('YYYY-M-D')) newDots[5] -= 1;
            else if ((itemTime.split(" "))[0] === moment().add(6, "days").format('YYYY-M-D')) newDots[6] -= 1;
            setDots([...newDots]);
            setTotalDots(totalDots - 1);
        }

        /** 修改displayData的color */
        newDisplayData = displayData.map((value) => {
            if (value.recruitId === item.recruitId)
                return {
                    ...value,
                    color: value.color === "#FFF" ? "#B6C3DE" : "#FFF"
                };
            else return value;
        });
        setDisplayData([...newDisplayData]);

        /** 修改data的color */
        newData = data.map((value) => {
            if (value.recruitId === item.recruitId)
                return {
                    ...value,
                    color: value.color === "#FFF" ? "#B6C3DE" : "#FFF"
                };
            else return value;
        });
        setData([...newData]);
    }

    const displayService = (index, year, month, day) => {
        serChooseDate(index);

        if (index === 0) setDisplayData([...data]);
        else {
            let chooseDate = year + "-" + month + "-" + day;
            let newDisplay = [];
            let displayIndex = 0;

            data.map((value) => {
                if ((value.serveTime.split(" "))[0] === chooseDate) {
                    newDisplay[displayIndex++] = { ...value }
                }
            });

            setDisplayData([...newDisplay]);
        }
    }

    const scrollItem = () => {
        let dates = new Array(8).fill("");
        let date = new Date();
        const ZHOU = ['周日', '周一', '周二',
            '周三', '周四', '周五', '周六'];

        return dates.map((value, index) => {
            if (index === 0)
                return (
                    <TouchableOpacity
                        style={[
                            { marginRight: 15, marginLeft: 5, justifyContent: "center", alignItems: "center" },
                            (index === chooseDate) ? styles.chose : {}
                        ]}
                        onPress={() => displayService(index)}
                    >
                        {
                            totalDots === 0 ? null :
                                <View style={styles.dotView}>
                                    <Text style={styles.dotText}>{totalDots}</Text>
                                </View>
                        }
                        <Text>全部</Text>
                    </TouchableOpacity>
                );
            else {
                let month_day = new Date(date.getTime() + (index - 1) * 24 * 3600 * 1000);

                return (
                    <TouchableOpacity
                        style={[
                            { marginRight: 15, marginLeft: 5, justifyContent: "center", alignItems: "center" },
                            (index === chooseDate) ? styles.chose : {}
                        ]}
                        onPress={() => displayService(index, month_day.getFullYear(), month_day.getMonth() + 1, month_day.getDate())}
                    >
                        {
                            dots[index - 1] === 0 ? null :
                                <View style={styles.dotView}>
                                    <Text style={styles.dotText}>{dots[index - 1]}</Text>
                                </View>
                        }
                        <Text style={{ marginTop: dots[index - 1] === 0 ? 0 : 10 }}>{ZHOU[(date.getDay() + index - 1) % 7]}</Text>
                        <Text>{`${month_day.getMonth() + 1}-${month_day.getDate()}`}</Text>
                    </TouchableOpacity>
                );
            }
        })
    }

    const renderItem = (dataItem) => {
        return (
            <TouchableOpacity style={[styles.itemsView, { backgroundColor: dataItem.item.color }]}
                onPress={() => chooseService(dataItem.item)}
            >
                <View style={styles.itemView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15 }}>时间：</Text>
                        <Text style={{ fontSize: 15, color: "#7080D0" }}>
                            {dataItem.item.serveTime}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        <Text style={{ fontSize: 15 }}>地点：</Text>
                        <Text style={{ fontSize: 15, color: "#7080D0", flex: 1, lineHeight: 20 }}>
                            {dataItem.item.serveAddress}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15 }}>志愿内容：</Text>
                        <Text style={{ fontSize: 15, color: "#7080D0" }}>
                            {dataItem.item.serveContent}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        var curTime = moment().format('YYYY-MM-DD HH:mm:ss');

        fetch(ip + 'selectBoardByOrg.php?orgId=' + orgId + '&curTime=' + curTime + '&nUserId=' + account)
            .then(res => res.json())
            .then(resJson => {
                resJson = resJson.map((value) => {
                    return ({
                        ...value,
                        color: "#FFF"
                    });
                });

                setData(resJson);
                setDisplayData(resJson);
                serChooseDate(0);
                setChoices([]);
                setTotalDots(0);
                setDots([0, 0, 0, 0, 0, 0, 0]);
            })
    }, []);

    console.log(choices)
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
                    <Text
                        style={{
                            fontSize: 17,
                            color: "rgba(240, 240, 253, 0.66)",
                            marginRight: 10,
                        }}
                        onPress={() => navigation.navigate("ContentIntro", {
                            orgId: orgId
                        })}
                    >
                        介绍
                    </Text>
                    <Text style={{
                        fontSize: 19,
                        color: "#FFF",
                        textDecorationLine: "underline"
                    }}>
                        志愿服务
                    </Text>
                </View>
            </ImageBackground>
            <View style={{ width: "100%", alignItems: "center", flex: 1 }}>
                <View style={styles.searchView}>
                    <TextInput
                        value={searchContent}
                        placeholder="请输入志愿服务信息"
                        onChangeText={text => setSearchContent(text)}
                        style={{ width: 180, marginLeft: 10, fontSize: 15 }}
                    />
                    <TouchableOpacity style={styles.btnSearch} onPress={() => search()}>
                        <Text style={{ color: "#FFF", fontSize: 15 }}>搜索</Text>
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={styles.scroll}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {scrollItem()}
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={{ width: "100%", marginTop: 10, flex: 1, marginBottom: 50 }}>
                    <FlatList
                        data={displayData}
                        renderItem={renderItem}
                        ItemSeparatorComponent={<View style={{ height: 6 }} />}
                        keyExtractor={dataItem => dataItem.recruitId}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            </View>
            <TouchableOpacity
                style={styles.btnApply}
                onPress={() => apply()}
            >
                <Text style={{ color: "#FFF", fontSize: 19 }}>报名</Text>
            </TouchableOpacity>
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
    searchView: {
        borderWidth: 1,
        borderColor: "#7B9DF6",
        borderRadius: 30,
        height: 37,
        width: "75%",
        marginTop: 20,
        justifyContent: "center",
        backgroundColor: "#FFF",
        elevation: 2,
    },
    btnSearch: {
        backgroundColor: "#7B9DF6",
        borderRadius: 20,
        height: "90%",
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 2
    },
    scroll: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        borderColor: "#BBB",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: "#FFF",
        marginTop: 10
    },
    itemsView: {
        flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10
    },
    itemView: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#AEAEB0",
        padding: 2,
        borderRadius: 10,
        padding: 10,
    },
    btnApply: {
        backgroundColor: "#7B9DF6",
        borderRadius: 30,
        height: 40,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        position: "absolute",
        bottom: 10
    },
    chose: {
        backgroundColor: "#7B9DF6",
        borderRadius: 5,
        padding: 10
    },
    dotView: {
        position: "absolute",
        top: 0,
        backgroundColor: "#F00",
        borderRadius: 50,
        width: 13,
        height: 13,
        alignItems: 'center',
        justifyContent: "center"
    },
    dotText: {
        color: "#FFF",
        fontSize: 10,
        textAlign: "center",
        textAlignVertical: "center"
    }
});

export default ContentService;