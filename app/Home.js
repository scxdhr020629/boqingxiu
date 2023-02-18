import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    SafeAreaView,
    FlatList
} from "react-native";
import UserInformation from "./UserInformation";
import Geo from "./Geo";

//左上角的定位没做，address获取定位
//下方组织仅为测试页面数据，要改的，连接数据库

const Home = (prop) => {
    const [address, setAddress] = useState("定位");
    const [data, setData] = useState();

    const renderItem = (dataItem) => {
        return (
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <TouchableOpacity style={{ width: "97%" }}
                    onPress={() => prop.navigation.navigate('ContentIntro', {
                        orgId: dataItem.item.orgId
                    })}
                >
                    <View style={styles.itemView}>
                        <Image source={{ uri: dataItem.item.orgImg }} style={styles.head} />
                        <Text numberOfLines={1} style={{ fontSize: 14, marginTop: 5, color: "#000" }}>
                            {dataItem.item.orgName}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{ marginTop: 5, fontSize: 11, alignSelf: "flex-start", marginLeft: 8 }}
                        >
                            {dataItem.item.time}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{ marginVertical: 3, fontSize: 11, alignSelf: "flex-start", marginLeft: 8 }}
                        >
                            {dataItem.item.address}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    let arrow = " >";

    useEffect(() => {
        fetch(UserInformation.ip + 'selectOrgAll.php')
            .then(res => res.json())
            .then(resJson => {
                // console.log(resJson);
                if (resJson.length !== 0) {
                    setData(resJson)
                }
            }).catch(e => console.log(e));

        Geo.getCityByLocation().then(data => {
            setAddress(data.regeocode.addressComponent.city);
        });
    }, []);

    if (data !== undefined)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableNativeFeedback>
                        <Text style={{ fontSize: 19, position: "absolute", left: 0 }}>{address}</Text>
                    </TouchableNativeFeedback>
                    <Text style={{ fontSize: 24, color: "#7728F5" }}>首页</Text>
                    <Ionicons
                        name="search-outline"
                        size={25}
                        style={{ position: "absolute", right: 0 }}
                        onPress={() => prop.navigation.navigate("Search")}
                    />
                </View>
                <TouchableOpacity style={{ width: "100%", marginBottom: 15 }}>
                    <View style={styles.noteView}>
                        <Text style={{ fontSize: 12, color: "#8268FF" }}>
                            <Text style={{ fontSize: 8, color: "#9F92FF" }}>● </Text>
                            关于“博青秀”平台服务活动界定和管理规则的通知
                            <Text style={{ fontSize: 9, color: "#8268FF" }}>{arrow} </Text>
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <SafeAreaView style={{ width: "50%", marginTop: 10 }}>
                        <FlatList
                            data={data.slice(0, data.length / 2 + 1)}
                            renderItem={renderItem}
                            ItemSeparatorComponent={<View style={{ height: 6 }} />}
                            showsVerticalScrollIndicator={false}
                        />
                    </SafeAreaView>
                    <SafeAreaView style={{ width: "50%", marginTop: 10 }}>
                        <FlatList
                            data={data.slice(data.length / 2 + 1, data.length)}
                            renderItem={renderItem}
                            ItemSeparatorComponent={<View style={{ height: 6 }} />}
                            showsVerticalScrollIndicator={false}
                        />
                    </SafeAreaView>
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 15
    },
    header: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#AEAEB0",
        borderBottomWidth: 1,
        marginBottom: 10
    },
    noteView: {
        marginTop: 10,
        backgroundColor: "#DBE7FF",
        padding: 10,
        width: "100%"
    },
    itemView: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#AEAEB0",
        padding: 2,
        borderRadius: 4,
        alignItems: "center"
    },
    head: {
        width: "100%",
        height: 100,
        borderRadius: 4,
    },
});

export default Home;