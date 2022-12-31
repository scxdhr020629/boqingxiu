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
    FlatList
} from "react-native";

const ContentService = ({ route, navigation }) => {
    const [searchContent, setSearchContent] = useState();
    const [choice, setChoice] = useState(0);
    const [data, setData] = useState();
    const [displayData, setDisplayData] = useState([]);

    const search = () => {
        /**搜索,修改data */

    }

    const apply = () => {
        /**报名,更新数据库 */
    }

    const chooseService = (item) => {
        let newItem, newData;
        if (item.color === "#FFF") {
            newItem = { ...item };
            newItem.color = "#B6C3DE";
            newData = [...data];
            newData = newData.map((value) => {
                if (value.id === item.id)
                    return newItem;
                else return value;
            });
            setData([...newData]);
        }
        else {
            newItem = { ...item };
            newItem.color = "#FFF";
            newData = [...data];
            newData = newData.map((value) => {
                if (value.id === item.id)
                    return newItem;
                else return value;
            });
            setData([...newData]);
        }
    }

    const displayService = (index, month, day) => {
        setChoice(index);

        if (index === 0) setDisplayData([...data]);
        else {
            let year = new Date().getFullYear();
            let chooseDate = year + "-" + month + "-" + day;
            let newDisplay = [];
            let displayIndex = 0;

            data.map((value) => {
                console.log()
                console.log((value.time.split(" "))[0])
                console.log((value.time.split(" "))[0] === chooseDate)
                if ((value.time.split(" "))[0] === chooseDate) {
                    newDisplay[displayIndex++] = { ...value }
                }
            });

            console.log(newDisplay);
            setDisplayData([...newDisplay]);
        }
    }

    const scrollItem = () => {
        let dates = new Array(8).fill("");
        let date = new Date();
        const ZHOU = ['周日', '周一', '周二',
            '周三', '周四', '周五', '周六'];

        return dates.map((value, index) => {
            let month_day = new Date(date.getTime() + index * 24 * 3600 * 1000);
            if (index === 0)
                return (
                    <TouchableOpacity
                        style={[
                            { marginRight: 15, marginLeft: 5, justifyContent: "center", alignItems: "center" },
                            (index === choice) ? styles.chose : {}
                        ]}
                        onPress={() => displayService(index)}
                    >
                        <Text>全部</Text>
                    </TouchableOpacity>
                );
            else
                return (
                    <TouchableOpacity
                        style={[
                            { marginRight: 15, marginLeft: 5, justifyContent: "center", alignItems: "center" },
                            (index === choice) ? styles.chose : {}
                        ]}
                        onPress={() => displayService(index, month_day.getMonth() + 1, month_day.getDate())}
                    >
                        <Text>{ZHOU[(date.getDay() + index - 1) % 7]}</Text>
                        <Text>{`${month_day.getMonth() + 1}-${month_day.getDate()}`}</Text>
                    </TouchableOpacity>
                );
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
                            {dataItem.item.time}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        <Text style={{ fontSize: 15 }}>地点：</Text>
                        <Text style={{ fontSize: 15, color: "#7080D0" }}>
                            {dataItem.item.place}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15 }}>志愿内容：</Text>
                        <Text style={{ fontSize: 15, color: "#7080D0" }}>
                            {dataItem.item.content}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        /**获取该用户没有报名的志愿活动数据 */

        setData([
            {
                id: 1,
                time: "2022-12-22 9:00-12:00",
                place: "二楼阅览室",
                content: "整理书架",
                color: "#FFF"
            },
            {
                id: 2,
                time: "2023-01-07 13:00-16:00",
                place: "二楼阅览室",
                content: "管理秩序，值班",
                color: "#FFF"
            }
        ]);

        setDisplayData([
            {
                id: 1,
                time: "2022-12-22 9:00-12:00",
                place: "二楼阅览室",
                content: "整理书架",
                color: "#FFF"
            },
            {
                id: 2,
                time: "2023-01-07 13:00-16:00",
                place: "二楼阅览室",
                content: "管理秩序，值班",
                color: "#FFF"
            }
        ]);
    }, []);

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
                        onPress={() => navigation.navigate("ContentIntro")}
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
            <View style={{ width: "100%", alignItems: "center" }}>
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
                <SafeAreaView style={{ width: "100%", marginTop: 10 }}>
                    <FlatList
                        data={displayData}
                        renderItem={renderItem}
                        ItemSeparatorComponent={<View style={{ height: 6 }} />}
                    />
                </SafeAreaView>
            </View>
            <TouchableOpacity
                style={styles.btnApply}
                onPress={() => apply()}
            >
                <Text style={{ color: "#FFF", fontSize: 19 }}>报名</Text>
            </TouchableOpacity>
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
        width: "100%",
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
    }
});

export default ContentService;