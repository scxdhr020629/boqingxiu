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
    FlatList,
    TextInput
} from "react-native";
import GlobalInfo from "./GlobalInfo";
import UserInformation from "./UserInformation";
import moment from "moment";
const Chat = ({ route, navigation }) => {
    const [data, setData] = useState();
    const [nowMsg, setNowMsg] = useState("");
    // const { name } = route.params;
    const { orgId } = route.params;
    const renderItem = (dataItem) => {
        if (dataItem.item.meId === UserInformation.id)
            return (
                <View style={[styles.item, { justifyContent: "flex-end" }]}>
                    <View>
                        <View style={[styles.textView, { alignSelf: "flex-end" }]}>
                            <Text style={styles.text}>{dataItem.item.message}</Text>
                        </View>
                        <Text style={styles.time}>{dataItem.item.time}</Text>
                    </View>
                    <Image source={{ uri: dataItem.item.head }} style={styles.head} />
                </View>
            );
        else
            return (
                <View style={styles.item}>
                    <Image source={{ uri: dataItem.item.head }} style={styles.head} />
                    <View>
                        <View style={[styles.textView, { alignSelf: "flex-start" }]}>
                            <Text style={styles.text}>{dataItem.item.message}</Text>
                        </View>
                        <Text style={styles.time}>{dataItem.item.time}</Text>
                    </View>
                </View>
            );
    }

    const renderSeparator = () => {
        return (<View style={{ height: 20 }} />);
    }

    /** 将消息存入数据库 */
    const send = async () => {
        var ip = UserInformation.ip;
        var userId = UserInformation.id;
        var otherUserId = orgId;
        var message = nowMsg;
        var time = moment().format('YYYY-MM-DD HH:mm:ss');

        await fetch(ip + 'addMsg.php?meId=' + userId + '&youId=' + otherUserId + '&msg=' + message + '&time=' + time)
            .then(res => res.json())
            .then(resJson => {
                // console.log("发生什么事了");
            }).catch(e => console.log(e));
    }


    const fetchData = async () => {
        console.log("进入fetchData");
        var msgJsonAll;
        var ip = UserInformation.ip;

        var newData = [];
        var userId = UserInformation.id;
        var otherUserId = orgId;
        console.log("更新数据之前");
        await fetch(ip + 'updateMsgIsRead.php?meId=' + userId + '&youId=' + otherUserId);

        console.log("更新数据之后");

        await fetch(ip + 'selectMsgByMeIdAndYouId.php?userId=' + userId + '&otherId=' + otherUserId)
            .then(res => res.json())
            .then(resJson => {
                msgJsonAll = resJson;
            }).catch(e => console.log(e));


        for (var i = 0; i < msgJsonAll.length; i++) {
            var tempObj = {};
            // var msgId = msgJsonAll[i].msgId;
            var meId = msgJsonAll[i].meId;
            var youId = msgJsonAll[i].youId;
            //根据这些来进行姓名的查询
            var meName;
            var youName;
            var imgSource;
            await fetch(ip + 'selectUserByUserId.php?id=' + meId)
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.length != 0) {
                        meName = resJson[0].name
                        // imgSource = resJson[0].imgSource;
                        imgSource = "http://101.34.44.163:8080/boqingxiu/img/organization1.png";
                    }
                }).catch(e => console.log(e));
            await fetch(ip + 'selectUserByUserId.php?id=' + youId)
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.length != 0) {
                        youName = resJson[0].name;
                    }
                }).catch(e => console.log(e));

            var message = msgJsonAll[i].msg;
            var time = msgJsonAll[i].msgTime;
            tempObj = { me: meName, you: youName, head: imgSource, message: message, time: time, meId: meId }
            // console.log(tempObj);
            newData.push(tempObj);
        }
        setData([...newData]);
    }
    useEffect(() => {
        // console.log("使用useEffect");
        // fetchData();
        // const interval = setInterval(fetchData, 5000); // 每隔5分钟執行 loadData 這個 function
        fetchData();
        const interval = setInterval(fetchData, 5000); // 每隔5分钟執行 loadData 這個 function
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../data/img/content_1.png")} style={{ width: "100%", height: 80 }}>
                <View style={styles.header}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={25}
                        style={{ color: "rgba(255, 255, 255, 0.8)", position: "absolute", left: 7 }}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={{
                        fontSize: 19,
                        color: "#FFF"
                    }}>
                        {orgId}
                    </Text>
                </View>
            </ImageBackground>
            <View style={{ marginTop: 20 }}>
                <SafeAreaView style={{ height: "80%" }}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                    />
                </SafeAreaView>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    value={nowMsg}
                    placeholder="请输入聊天内容..."
                    onChangeText={text => setNowMsg(text)}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.sendView} onPress={() => send()}>
                    <Text style={styles.send}>发送</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    item: {
        flexDirection: "row"
    },
    head: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: "#000",
        borderWidth: 1,
        marginHorizontal: 10
    },
    textView: {
        backgroundColor: "rgba(175, 191, 234, 0.63)",
        borderRadius: 7,
        padding: 10,
        marginVertical: 4,
        maxWidth: "90%"
    },
    text: {
        fontSize: 18
    },
    time: {
        color: "#BCBABA"
    },
    inputView: {
        backgroundColor: "rgba(175, 191, 234, 0.63)",
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    input: {
        backgroundColor: "#FFF",
        width: "70%",
        height: "70%",
        borderRadius: 10
    },
    sendView: {
        marginLeft: 10,
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 10,
        elevation: 2
    },
    send: {
        fontSize: 15
    }
});

export default Chat;