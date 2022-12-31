import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image
} from "react-native";

const { width, height } = Dimensions.get("screen");
const Search = (prop) => {
    const [searchContent, setSearchContent] = useState();
    const [searchClick, isSearchClick] = useState(false);
    const [data, setData] = useState();
    const [searchData, setSearchData] = useState();

    const search = () => {
        /**搜索 */

        isSearchClick(true);
        setSearchData([
            {
                id: 1,
                head: require("../data/img/home_7.png"),
                name: "青山村融设计图书馆",
                time: "每日9:00-18:00",
                address: "杭州市余杭区黄湖镇青山村里东坞"
            },
            {
                id: 2,
                head: require("../data/img/home_8.png"),
                name: "浙江余杭蜜梨“科技校园”",
                time: "每日9:00-17:30",
                address: "杭州市余姚区鸠鸟镇"
            },
            {
                id: 3,
                head: require("../data/img/home_9.png"),
                name: "智慧网谷城市展示中心",
                time: "周二-周日9:00-16:30",
                address: "杭州市拱墅区湖州街16号"
            },
            {
                id: 4,
                head: require("../data/img/home_10.png"),
                name: "上城埭村文化礼堂开放日",
                time: "周一9:00-16:30",
                address: "杭州市西湖区上城埭村道故山生活..."
            }
        ]);
    }

    const apply = () => {
        /**更新数据库 */
    }

    const scrollItem = () => {
        return (
            <View style={{ alignItems: "center", width: "100%" }}>
                {
                    data.map((value) => {
                        return (
                            <TouchableOpacity style={{
                                marginVertical: 5,
                                borderWidth: 1,
                                borderRadius: 10,
                                width: 300,
                                height: 30,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{ fontSize: 15 }}>{value}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    }

    const renderItem = (dataItem) => {
        return (
            <TouchableOpacity onPress={() => prop.navigation.navigate("ContentIntro", {
                name: dataItem.item.name
            })}>
                <View style={styles.viewSearch}>
                    <View style={{ margin: 10 }}>
                        <Image source={dataItem.item.head} style={styles.head} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.searchName}>{dataItem.item.name}</Text>
                        </View>
                        <Text style={styles.searchText}>{dataItem.item.time}</Text>
                        <Text style={styles.searchText}>{dataItem.item.address}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const renderSeparator = () => {
        return (<View style={{
            height: 1,
            backgroundColor: "#EEE",
        }} />);
    }

    const history = () => {
        if (searchClick === false)
            return (
                <View style={{ alignSelf: "center" }}>
                    <Text style={{ fontSize: 15, marginTop: 20, fontWeight: "bold", alignSelf: "center" }}>历史记录</Text>
                    <SafeAreaView style={[styles.scroll, { height: height - 200 }]}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {scrollItem()}
                        </ScrollView>
                    </SafeAreaView>
                </View>
            );
    }

    const searchInfo = () => {
        if (searchClick === true)
            return (
                <View style={styles.search}>
                    <SafeAreaView>
                        <FlatList
                            data={searchData}
                            renderItem={renderItem}
                            ItemSeparatorComponent={renderSeparator}
                        />
                    </SafeAreaView>
                </View>
            );
    }

    useEffect(() => {
        /**获取数据 */

        setData([
            "记录1",
            "记录2",
            "记录3"
        ]);
    }, []);

    console.log(data)
    if (data !== undefined)
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../data/img/content_1.png")} style={{ width: "100%", height: 80 }}>
                    <View style={styles.header}>
                        <Ionicons
                            name="chevron-back-outline"
                            size={25}
                            style={{ color: "rgba(255, 255, 255, 0.8)", position: "absolute", left: 7 }}
                            onPress={() => prop.navigation.goBack()}
                        />
                        <View style={styles.searchView}>
                            <Ionicons
                                name="search-outline"
                                size={18}
                                color="#BBB"
                                style={{ position: "absolute", left: 10 }}
                            />
                            <View style={{
                                borderLeftWidth: 1,
                                borderLeftColor: "#BBB",
                                height: 15,
                                position: "absolute",
                                left: 35,
                                top: 9
                            }} />
                            <TextInput
                                value={searchContent}
                                placeholder="请输入搜索信息"
                                onChangeText={text => setSearchContent(text)}
                                style={{ width: 160, marginLeft: 30, fontSize: 14 }}
                            />
                        </View>
                        <TouchableOpacity style={styles.btnSearch} onPress={() => search()}>
                            <Text style={{ color: "#FFF", fontSize: 17 }}>搜索</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={{ marginHorizontal: 10, width: "100%" }}>
                    {history()}
                    {searchInfo()}
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFF"
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
        borderRadius: 15,
        height: 36,
        width: "60%",
        marginTop: 5,
        justifyContent: "center",
        backgroundColor: "#FFF",
        alignItems: "center"
    },
    btnSearch: {
        height: "90%",
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 2,
    },
    scroll: {
        width: "100%",
        marginTop: 10
    },
    search: {
        width: "100%",
        marginTop: 10
    },
    viewSearch: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        marginHorizontal: 10
    },
    head: {
        width: 50,
        height: 50,
        borderRadius: 4
    },
    searchName: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        flex: 3
    },
    searchTime: {
        fontSize: 12,
        color: "#CDC9C9",
        marginTop: 10,
        position: "absolute",
        right: 10
    },
    searchText: {
        fontSize: 12,
        color: "#999"
    },
});

export default Search;