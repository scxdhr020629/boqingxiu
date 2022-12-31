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
    FlatList
} from "react-native";

const CompletedAct = ({ route, navigation }) => {
    const [choice, setChoice] = useState(0);
    const [data, setData] = useState();

    const order = () => {
        /**更新数据库 */
        setData({ ...data, numOfOrder: data.numOfOrder + 1 });
    }
    //模拟数据
    const DATA = [
        {
            id: '18',
            title: '杭州融设计图书馆',
            acttime: '2022-11-07',
            actwhat: '图书管理志愿者',
            actwhere: '浙江省杭州市余杭区黄湖镇青山村东坞礼堂',
        },
        {
            id: '19',
            title: '杭州智慧谷服务中心',
            acttime: '2022-11-10',
            actwhat: '科技讲解服务',
            actwhere: '浙江省杭州市拱墅区湖州街16号',
        },
        {
            id: '20',
            title: '上城村文化礼堂开放日',
            acttime: '2022-11-10',
            actwhat: '秩序维护志愿者',
            actwhere: '浙江省杭州市余西湖区上城村道故山生活美学西南侧约170米',
        },
    ];
    const Item = ({ title, acttime, actwhat, actwhere }) => {
        const [agree, setAgree] = useState(false);
        //const url=~~DATA.imageFound
        return (
            <View style={styles.item} >
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.actName}>{title}</Text>
                    </View>

                    <Text style={styles.smalltitle}>时间：{acttime}</Text>
                    <Text style={styles.smalltitle}>活动内容：{actwhat}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 18 }}>
                        <Image source={require('../data/img/home_3.png')} style={{ height: 16, width: 16 }} />
                        <Text style={{ fontSize: 15 }}>{actwhere}</Text>
                    </View>

                </View>
            </View>

        );
    }
    const renderItem = ({ item }) => (
        <Item title={item.title} acttime={item.acttime} actwhat={item.actwhat} actwhere={item.actwhere} />
    );

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Ionicons
                    name="chevron-back-outline"
                    size={25}
                    style={{ color: "rgba(255, 255, 255, 0.8)", position: "absolute", left: 7 }}
                    onPress={() => navigation.navigate("Mine")}
                />
                <Text style={styles.title}>已签到活动</Text>

            </View>
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
        alignItems: "center",
    },
    header: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9D98FF"
    },
    title: {
        fontSize: 25,
        color: '#ffffff'
    },
    actName: {
        fontSize: 20,
    },
    commonTxt: {
        fontSize: 18,
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    smalltitle: {
        fontSize: 15,
        marginLeft: 18
    }

});

export default CompletedAct;