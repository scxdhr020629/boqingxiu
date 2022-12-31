import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import GlobalInfo from "./GlobalInfo";
import Tooltip from "./Tooltip";
import UserInformation from "./UserInformation";

const { width, height } = Dimensions.get("screen");
const ActivityTiming = ({ route, navigation }) => {
    const [time, setTime] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00"
    });
    const [deadline, setDeadline] = useState();
    const [hintIcon, setHintIcon] = useState("");
    const [hintText, setHintText] = useState("");

    /** 签退 */
    const signOut = async () => {
        /** 更新数据库，存入总时长 */
        var mtTime = time;
        console.log(mtTime);
        //在normalUser表中加入数据
        var hours = parseFloat(time.hours);
        var minutes = parseFloat(time.minutes);
        hours += minutes / 60;
        hours = hours.toFixed(2);
        console.log(hours);
        var userId = UserInformation.id;
        var a = 0;
        var ip = UserInformation.ip;
        await fetch(ip + 'updateTotalTimeByUserId.php?totalTime=' + hours + '&userId=' + userId);
        a = 1;
        console.log("a");
        console.log(a);
        /** 错误提示框 */
        if (a === 0) {   //a === 0改为出错条件
            setHintIcon("alert-outline");
            setHintText("签退失败");
            setTimeout(() => {
                setHintIcon("");
                setHintText("");
            }, 3000);
        }
        else if (a === 1) {   //a === 1改为出错条件
            setHintIcon("checkmark-outline");
            setHintText("签退成功");
            setTimeout(() => {
                GlobalInfo.isTiming = false;
                GlobalInfo.beginTime = "";
                setHintIcon("");
                setHintText("");
                navigation.goBack();
            }, 1000);
        }
    }

    useEffect(() => {
        const { beginTime } = route.params;

        setInterval(() => {
            let nowTime = new Date().valueOf();
            let lastTime = nowTime - beginTime;
            let leave1 = lastTime % (24 * 3600 * 1000);
            let lastHours = Math.floor(leave1 / (3600 * 1000));
            let leave2 = leave1 % (3600 * 1000);
            let lastMinutes = Math.floor(leave2 / (60 * 1000));
            let leave3 = leave2 % (60 * 1000);
            let lastSeconds = Math.round(leave3 / 1000);

            setTime({
                hours: lastHours.toString().length !== 2 ? "0" + lastHours.toString() : lastHours.toString(),
                minutes: lastMinutes.toString().length !== 2 ? "0" + lastMinutes.toString() : lastMinutes.toString(),
                seconds: lastSeconds.toString().length !== 2 ? "0" + lastSeconds.toString() : lastSeconds.toString()
            });
        }, 1000);

        /** 获取截止时间 */
        setDeadline("2023/1/1 24:00:00");

    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>签到</Text>
            </View>
            <Image source={require("../data/img/circle.png")} style={[styles.circle]} />
            <Text style={styles.time}>{time.hours}:{time.minutes}:{time.seconds}</Text>
            <View>
                <Text style={{ fontSize: 18, alignSelf: "center", marginTop: 50 }}>活动截止时间</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}>{deadline}</Text>
            </View>
            <TouchableOpacity style={styles.btnSignout} onPress={() => signOut()}>
                <Text style={{ color: "#FFF", fontSize: 20 }}>签退</Text>
            </TouchableOpacity>
            {Tooltip(hintIcon, hintText, height)}
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
        backgroundColor: "#9D98FF",
        width: "100%",
        height: 70,
    },
    title: {
        fontSize: 25,
        height: 70,
        color: "#FFF",
        alignSelf: "center",
        textAlignVertical: "center"
    },
    circle: {
        height: 200,
        width: 200,
        marginTop: 70
    },
    time: {
        fontSize: 28,
        fontWeight: "bold",
        position: "absolute",
        top: 228,
    },
    btnSignout: {
        backgroundColor: "#9D98FF",
        width: 150,
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 100
    }
});

export default ActivityTiming;