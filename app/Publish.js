// 未处理 似乎未被使用
import React, { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, View, TextInput, TouchableNativeFeedback, Image, ActivityIndicator, Dimensions, StatusBar, ImageBackground, SafeAreaView } from "react-native";

const Publish = (prop) => {
    const DATA = [
        {
            id: '18',
            title: '杭州融设计图书馆',
            acttime: '2022-11-07',
            actwhere: '浙江省杭州市余杭区',
            details: '整理书架'
        },
        {
            id: '19',
            title: '杭州智慧谷服务中心',
            acttime: '2022-11-10',
            actwhere: '浙江省湖州市拱墅区',
            details: '领导参观演讲'
        },
        {
            id: '20',
            title: '上城村文化礼堂开放日',
            acttime: '2022-11-10',
            actwhere: '浙江省湖州市拱墅区',
            details: '维持秩序'
        },
    ];

    const Item = ({ title, acttime, actwhere, details }) => {
        //const url=~~DATA.imageFound
        return (
            <View style={styles.item} >
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.smalltitle}>时间：{acttime}</Text>
                    <Text style={styles.smalltitle}>地点：{actwhere}</Text>
                    <Text style={styles.smalltitle}>志愿内容：{actwhere}</Text>
                </View>
            </View>

        );
    }

    const [choice, setChoice] = useState(0);
    const [data, setData] = useState();

    const order = () => {
        /**更新数据库 */
        setData({ ...data, numOfOrder: data.numOfOrder + 1 });
    }
    const scrollItem = () => {
        let dates = new Array(7).fill("");
        let date = new Date();
        const ZHOU = ['周日', '周一', '周二',
            '周三', '周四', '周五', '周六'];

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
                    <Text>{`${month_day.getMonth() + 1}.${month_day.getDate()}`}</Text>
                </TouchableOpacity>
            );
        })
    }
    const renderItem = ({ item }) => (
        <Item title={item.title} acttime={item.acttime} actwhere={item.actwhere} details={item.details} />
    );

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.topView}>
                <Ionicons
                    name="chevron-back-outline"
                    size={25}
                    style={{ color: "rgba(255, 255, 255, 0.8)", position: "absolute", left: 7 }}
                    onPress={() => prop.navigation.navigate("Home")}
                />
                <Text style={styles.visit} onPress={() => prop.navigation.navigate('Activity')}>信息编辑</Text>
                <Text style={styles.joinin} >招募发布</Text>
            </View>

            <SafeAreaView style={{
                //position: "absolute",
                //bottom: 50,
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
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        //marginLeft: 49,
        //marginRight: 49,
        // borderWidth: 1,
        // borderColor: "black"
    },
    herder: {
        height: 45,
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    topView: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9D98FF',
        flexDirection: 'row',
    },
    visit: {
        color: '#ffffff',
        fontSize: 21,
        //textDecorationLine: "underline",
        margin: 5
    },
    joinin: {
        color: '#ffffff',
        fontSize: 26,
        textDecorationLine: "underline",
        margin: 5,

    },
    title: {
        fontSize: 19,
        marginBottom: 10,
    },
    smalltitle: {
        fontSize: 17,
        marginBottom: 5,
        marginLeft: 10,
    },
    imagestyle: {
        width: 120,
        height: 70,
        borderRadius: 3,
        resizeMode: 'cover',
        marginRight: 10,
    },
    input: {
        width: 180,
        marginLeft: 10,
        fontSize: 16,
    },
    inputView: {
        borderColor: "#BBB",
        borderWidth: 1,
        borderRadius: 5,
        width: 260,
        height: 45,
        margin: 15,
        flexDirection: "row",
    },

});

export default Publish;