import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    FlatList,
    SafeAreaView
} from "react-native";
import UserInformation from "./UserInformation";
import scxUtil from "./scxUtil"
import moment from 'moment';
// 查一个刷新
// 每过5s刷新一下页面，或者下拉刷新
const Message = (prop) => {
    const [totalMsg, setTotalMsg] = useState("");
    const [data, setData] = useState([]);
    const [refreshing, isRefresh] = useState(true);

    const renderItem = (dataItem) => {
        return (
            <TouchableOpacity onPress={() => prop.navigation.navigate("Chat", {
                orgId: dataItem.item.orgId
            })}>
                <View style={styles.msgView}>
                    <View style={{ margin: 10 }}>
                        {/* <Image source={dataItem.item.head} style={styles.head} /> */}
                        <Image source={{ uri: dataItem.item.head }} style={styles.head} />
                        {unread(dataItem.item.unreadNum)}
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.msgName}>{dataItem.item.name}</Text>
                            <Text style={styles.msgTime}>{dataItem.item.lastTime}</Text>
                        </View>
                        <Text style={styles.lastestMsg}>{dataItem.item.lastMsg}</Text>
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



    /** 从数据库获取数据，包括头像，名称，时间，最新消息，未读消息等等，大概要两张表，一张用在消息界面，一张用在聊天界面 */
    const gainMessages = async (userId) => {
        /** 获取数据，按时间先后排序，并获取最新消息 */
        var userId = UserInformation.id;
        var AllYouId;
        var ip = UserInformation.ip
        var newData = [];
        // 有一个小bug，必须要有主动给别人发的消息
        await fetch(ip + 'selectYouIdByUserId.php?id=' + userId)
            .then(res => res.json())
            .then(resJson => {
                AllYouId = resJson;
            }).catch(e => console.log(e));
        console.log(AllYouId.length);  // 获取到其他人的userId
        for (var i = 0; i < AllYouId.length; i++) {
            var otherUserId = AllYouId[i].youId;
            // console.log('其他人的id' + otherUserId);
            var tempObj = {};
            var lastTime;
            var lastMsg;
            // 获取最后的时间
            await fetch(ip + 'selectLastTimeByUserIdOrYouId.php?userId=' + userId + '&otherId=' + otherUserId)
                .then(res => res.json())
                .then(resJson => {
                    // console.log(resJson);
                    if (resJson.length != 0) {
                        // lastTimeString = resJson[0].t.replace(/T/g, ' ').replace(/.[\d]{3}Z/, '');

                        // var newTest2 = moment(lastTimeString).add(8, 'hours');

                        // var newTest4 = newTest2.format('YYYY-MM-DD HH:mm:ss')
                        // // console.log(newTest4);
                        // lastTime = newTest4;
                        //使用php之后，不需要转换时间了
                        lastTime = resJson[0].t;
                    }
                }).catch(e => console.log(e));
            // 获取这最后一条消息
            await fetch(ip + 'selectMsgByUserIdOrYouIdAndTime.php?userId=' + userId + '&otherId=' + otherUserId + '&time=' + lastTime)
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.length != 0) {
                        lastMsg = resJson[0].msg
                    }
                }).catch(e => console.log(e));
            var imgSource;
            var orgName;
            await fetch(ip + 'selectOrgByUserId.php?userId=' + otherUserId)
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.length != 0) {
                        imgSource = resJson[0].orgImg;
                        orgName = resJson[0].orgName;
                    }
                }).catch(e => console.log(e));

            var unReadNum;
            await fetch(ip + 'selectTheCountOfUnReadMessage.php?userId=' + userId + '&otherId=' + otherUserId)
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.length != 0) {
                        unReadNum = resJson[0].c;
                    }
                }).catch(e => console.log(e));
            tempObj = { lastTime: lastTime, lastMsg: lastMsg, head: imgSource, name: orgName, unreadNum: unReadNum, orgId: otherUserId };
            // console.log(tempObj);// 目前还是留着，看消息是否正常传入进去
            newData.push(tempObj)
        }
        // let newData = [
        //     {
        // head: require("../data/img/home_7.png"),
        //         name: "融设计图书馆",
        //         lastTime: "昨天",
        //         lastMsg: "您好，我想问一下融设计图书馆有什么特色？",
        //         unreadNum: 2
        //     },
        //     {
        //         head: require("../data/img/home_8.png"),
        //         name: "浙江余杭蜜梨“科技校园”",
        //         lastTime: "2022/12/18",
        //         lastMsg: "您好，我想问一下浙江余杭蜜梨“科技校园”有什么特色？",
        //         unreadNum: 3
        //     },
        //     {
        //         head: require("../data/img/home_9.png"),
        //         name: "智慧网谷城市展示中心",
        //         lastTime: "2022/12/18",
        //         lastMsg: "您好，我想问一下智慧网谷城市展示中心有什么特色？",
        //         unreadNum: 5
        //     }
        // ];
        // newData.push()
        let total = 0;
        newData.map((value) => {
            total += value.unreadNum;
        });
        if (total !== 0) setTotalMsg("(" + total + ")");

        setData([...newData]);
        isRefresh(false);
    }

    const unread = (num) => {
        if (num != 0)
            return (
                <View style={styles.circle}>
                    <Text style={styles.cicleNum}>{num}</Text>
                </View>
            );
    }

    const clearUnread = () => {
        let newData = [...data];
        newData = newData.map((value) => {
            let newItem = { ...value };
            newItem.unreadNum = 0;
            return { ...newItem };
        });

        setTotalMsg("");
        setData([...newData]);
    }

    useEffect(() => {

        // const interval = setInterval(gainMessages, 5000); // 每隔5分钟執行 loadData 這個 function
        gainMessages();
        const interval = setInterval(gainMessages, 5000); // 每隔5分钟執行 loadData 這個 function
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.TextMsg}>{`消息${totalMsg}`}</Text>
                <TouchableOpacity style={{ flexDirection: "row", position: "absolute", right: 10 }} onPress={() => clearUnread()}>
                    <Image source={require("../data/img/message_1.png")} style={[styles.icon, { width: 25, height: 25 }]} />
                </TouchableOpacity>
            </View>
            <View style={styles.msg}>
                <SafeAreaView>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                    />
                </SafeAreaView>
            </View>
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
        position: "absolute",
        top: 0,
        backgroundColor: "#9D98FF",
        width: "100%",
        height: 130,
        flexDirection: "row"
    },
    icon: {
        marginTop: 13,
        marginLeft: 10
    },
    TextMsg: {
        margin: 15,
        color: "#FFF",
        fontSize: 20
    },
    msg: {
        backgroundColor: "#EEE",
        width: "100%",
        position: "absolute",
        top: 130
    },
    server: {
        backgroundColor: "#FFF",
        width: "100%",
        height: 70,
        flexDirection: "row",
        marginBottom: 10
    },
    msgView: {
        backgroundColor: "#FFF",
        width: "100%",
        height: 70,
        flexDirection: "row",
    },
    head: {
        width: 50,
        height: 50,
        borderRadius: 4
    },
    msgName: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        flex: 3
    },
    msgTime: {
        fontSize: 12,
        color: "#CDC9C9",
        marginTop: 10,
        position: "absolute",
        right: 10
    },
    lastestMsg: {
        fontSize: 12,
        color: "#999"
    },
    circle: {
        position: "absolute",
        right: -6,
        top: -6,
        backgroundColor: "red",
        borderRadius: 50,
        width: 14,
        height: 14,
        alignItems: "center",
        justifyContent: "center"
    },
    cicleNum: {
        color: "#FFF",
        fontSize: 10
    }
});

export default Message;