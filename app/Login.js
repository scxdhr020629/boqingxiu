import React, { useEffect, useState } from "react";
import ModalDropdown from 'react-native-modal-dropdown';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    ImageBackground,
    TouchableNativeFeedback
} from "react-native";
import Geo from "./Geo";
import Tooltip from "./Tooltip";
import UserInformation from "./UserInformation";
import scxUtil from "./scxUtil";

const { width, height } = Dimensions.get("screen");
const Login = (prop) => {
    const [account, setAccount] = useState("");   //账号
    const [password, setpassword] = useState("");   //密码
    const [identity, setIdentity] = useState("");   //身份

    const [forgetIdentity, setForgetIdentity] = useState("");   //忘记密码界面身份
    const [forgetPhone, setForgetPhone] = useState("");   //忘记密码界面手机号
    const [forgetCaptcha, setForgetCaptcha] = useState("");   //忘记密码界面验证码
    const [forgetPwd, setForgetPwd] = useState("");   //忘记密码界面新密码
    const [forgetConfirm, setForgetConfirm] = useState("");   //忘记密码界面确认密码
    const [random, setRandom] = useState("验证码");   //随机生成4位数字验证码

    const [click, isClick] = useState(false);
    const [hintIcon, setHintIcon] = useState("");
    const [hintText, setHintText] = useState("");

    // 更改
    function changeText(type, text) {
        if (type === "account")
            setAccount(text);
        else if (type === "password")
            setpassword(text);
        else if (type === "forgetIdentity")
            setForgetIdentity(text);
        else if (type === "forgetPhone")
            setForgetPhone(text);
        else if (type === "forgetCaptcha")
            setForgetCaptcha(text);
        else if (type === "forgetPwd")
            setForgetPwd(text);
        else if (type === "forgetConfirm")
            setForgetConfirm(text);
    }

    function checkInfo() {
        var errorText;
        if (identity === "")
            errorText = "请选择身份";
        else if (account === "")
            errorText = "登录账号不能为空";
        else if (password === "")
            errorText = "登录密码不能为空";
        else return true;

        setHintIcon("alert-outline");
        setHintText(errorText);
        setTimeout(() => {
            setHintIcon("");
            setHintText("");
        }, 2000);
        return false;
    }

    function checkForget() {
        var errorText;
        if (forgetIdentity === "")
            errorText = "请选择身份";
        else if (forgetPhone === "")
            errorText = "手机号码不能为空";
        else if (forgetCaptcha === "")
            errorText = "验证码不能为空";
        else if (forgetPwd === "")
            errorText = "登录密码不能为空";
        else if (forgetConfirm === "")
            errorText = "确认密码不能为空";
        else if (forgetCaptcha != random)
            errorText = "验证码错误";
        else if (forgetPwd !== forgetConfirm)
            errorText = "两次密码不一致";
        else return true;

        setHintIcon("alert-outline");
        setHintText(errorText);
        setTimeout(() => {
            setHintIcon("");
            setHintText("");
        }, 2000);
        return false;
    }

    /** 登录 */
    async function login() {
        var ip = UserInformation.ip;
        var check = checkInfo();

        if (check === true) {
            UserInformation.account = account;

            if (identity === "普通用户") {
                UserInformation.identity = "普通用户";
                await fetch(ip + 'selectUserByPhone.php?phone=' + account)
                    .then(res => res.json())
                    .then(resJson => {
                        // console.log(resJson);

                        if (resJson.length === 0) {
                            setHintIcon("alert-outline");
                            setHintText("手机号码未注册");
                            setTimeout(() => {
                                setHintIcon("");
                                setHintText("");
                            }, 2000);
                        }
                        else {
                            if (password !== resJson[0].nUserPwd) {
                                setHintIcon("alert-outline");
                                setHintText("密码错误");
                                setTimeout(() => {
                                    setHintIcon("");
                                    setHintText("");
                                }, 2000);
                            }
                            else {
                                UserInformation.id = resJson[0].userId;
                                setHintIcon("checkmark-outline");
                                setHintText("登录成功");
                                setTimeout(() => {
                                    setHintIcon("");
                                    setHintText("");
                                    prop.navigation.navigate('Main');
                                }, 500);
                            }
                        }
                    }).catch(e => console.log(e));
            }
            else {
                UserInformation.identity = "文化组织";
                await fetch(ip + 'selectOrgByPhone.php?phone=' + account)
                    .then(res => res.json())
                    .then(resJson => {
                        console.log(resJson);
                        if (resJson.length === 0) {
                            setHintIcon("alert-outline");
                            setHintText("手机号码未注册");
                            setTimeout(() => {
                                setHintIcon("");
                                setHintText("");
                            }, 2000);
                        }
                        else {
                            if (password !== resJson[0].orgPwd) {
                                setHintIcon("alert-outline");
                                setHintText("密码错误");
                                setTimeout(() => {
                                    setHintIcon("");
                                    setHintText("");
                                }, 2000);
                            }
                            else {
                                UserInformation.id = resJson[0].userId;
                                setHintIcon("checkmark-outline");
                                setHintText("登录成功");
                                setTimeout(() => {
                                    setHintIcon("");
                                    setHintText("");
                                    prop.navigation.navigate('Main');
                                }, 500);
                            }
                        }
                    }).catch(e => console.log(e));
            }
        }
    }

    /** 获取验证码  */
    function gainCaptcha() {
        const min = 1000;
        const max = 9999;
        setRandom(Math.floor(Math.random() * (max - min)) + min);
    }

    /** 修改密码 */
    const modify = async () => {
        var ip = UserInformation.ip;
        var check = checkForget();

        if (check === true) {
            if (forgetIdentity === "普通用户") {
                await fetch(ip + 'selectUserByPhone.php?phone=' + forgetPhone)
                    .then(res => res.json())
                    .then(resJson => {
                        console.log(resJson)
                        if (resJson.length === 0) {
                            setHintIcon("alert-outline");
                            setHintText("手机号码未注册");
                            setTimeout(() => {
                                setHintIcon("");
                                setHintText("");
                            }, 2000);
                        }
                        else {
                            fetch(ip + 'updateNormalUserPwdByPhone.php?password=' + forgetPwd + '&phone=' + forgetPhone)
                                .then(() => {
                                    setHintIcon("checkmark-outline");
                                    setHintText("修改成功");
                                    setTimeout(() => {
                                        setForgetIdentity("");
                                        setForgetPhone("");
                                        setForgetCaptcha("");
                                        setForgetPwd("");
                                        setForgetConfirm("");
                                        setRandom("验证码");
                                        setHintIcon("");
                                        setHintText("");
                                    }, 1000);

                                    isClick(false);
                                })
                        }
                    }).catch(e => console.log(e));
            }
            else {
                await fetch(ip + 'selectOrgByPhone.php?phone=' + forgetPhone)
                    .then(res => res.json())
                    .then(resJson => {
                        // console.log(resJson)
                        if (resJson.length === 0) {
                            setHintIcon("alert-outline");
                            setHintText("手机号码未注册");
                            setTimeout(() => {
                                setHintIcon("");
                                setHintText("");
                            }, 2000);
                        }
                        else {
                            fetch(ip + 'updateOrgPwdByPhone.php?password=' + forgetPwd + '&phone=' + forgetPhone)
                                .then(() => {
                                    setHintIcon("checkmark-outline");
                                    setHintText("修改成功");
                                    setTimeout(() => {
                                        setForgetIdentity("");
                                        setForgetPhone("");
                                        setForgetCaptcha("");
                                        setForgetPwd("");
                                        setForgetConfirm("");
                                        setRandom("验证码");
                                        setHintIcon("");
                                        setHintText("");
                                    }, 1000);

                                    isClick(false);
                                })
                        }
                    }).catch(e => console.log(e));
            }
        }
    }
    /**
     * 获取地址
     */
    getGeo = async () => {
        let data = await Geo.getCityByLocation();
        console.log("data" + JSON.stringify(data));   //数据都在这

    }


    const forget = () => {
        if (click === true) {
            // getGeo();

            return (
                <View style={{
                    position: "absolute",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    alignSelf: "center",
                    width: "100%",
                    borderRadius: 10,
                    top: 180,
                    paddingVertical: 15,
                    paddingHorizontal: 10
                }}>
                    <ModalDropdown
                        options={["普通用户", "文化组织"]}
                        defaultValue="       请选择身份     ﹀"
                        value={forgetIdentity}
                        onSelect={(index, value) => setForgetIdentity(value)}
                        animated={false}
                        style={styles.forgetDropdown}
                        textStyle={styles.forgetDropdownText}
                        dropdownStyle={[{ width: "50%", marginLeft: 20 }, { height: 38 * 2 }]}
                        dropdownTextStyle={{ fontSize: 16, alignSelf: "center" }}
                    />
                    <View style={styles.forget}>
                        <TextInput
                            value={forgetPhone}
                            placeholder="请输入手机号码"
                            placeholderTextColor={"#FFF"}
                            keyboardType="number-pad"
                            onChangeText={text => changeText("forgetPhone", text)}
                            style={styles.forgetInput}
                        />
                    </View>
                    <View style={styles.forget}>
                        <TextInput
                            value={forgetCaptcha}
                            placeholder="请输入验证码"
                            placeholderTextColor={"#FFF"}
                            onChangeText={text => changeText("forgetCaptcha", text)}
                            style={{
                                width: "60%",
                                marginLeft: 10,
                                fontSize: 16,
                                color: "#FFF"
                            }}
                        />
                        <TouchableNativeFeedback onPress={() => gainCaptcha()}>
                            <Text style={{
                                borderRadius: 50,
                                width: 60,
                                height: 30,
                                alignSelf: "center",
                                backgroundColor: "#7B9DF6",
                                textAlign: "center",
                                textAlignVertical: 'center',
                                color: "#FFF",
                                fontSize: 14,
                                position: "absolute",
                                right: 4
                            }}>{random}</Text>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.forget}>
                        <TextInput
                            value={forgetPwd}
                            placeholder="请输入新密码"
                            placeholderTextColor={"#FFF"}
                            secureTextEntry={true}
                            onChangeText={text => changeText("forgetPwd", text)}
                            style={styles.forgetInput}
                        />
                    </View>
                    <View style={styles.forget}>
                        <TextInput
                            value={forgetConfirm}
                            placeholder="请输入确认密码"
                            placeholderTextColor={"#FFF"}
                            secureTextEntry={true}
                            onChangeText={text => changeText("forgetConfirm", text)}
                            style={styles.forgetInput}
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity onPress={() => isClick(false)}
                            style={{
                                marginVertical: 10,
                                borderRadius: 50,
                                width: 100,
                                height: 40,
                                backgroundColor: "#7B9DF6",
                                justifyContent: "center",
                                marginRight: 5
                            }}>
                            <Text style={{
                                textAlign: "center",
                                textAlignVertical: 'center',
                                color: "#FFF",
                                fontSize: 18
                            }}>返回</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => modify()}
                            style={{
                                marginVertical: 10,
                                borderRadius: 50,
                                width: 100,
                                height: 40,
                                backgroundColor: "#7B9DF6",
                                justifyContent: "center",
                            }}>
                            <Text style={{
                                textAlign: "center",
                                textAlignVertical: 'center',
                                color: "#FFF",
                                fontSize: 18
                            }}>修改</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

    }

    // useEffect(() => {

    // }, []);

    return (
        <View>
            <StatusBar hidden={false} />
            <ImageBackground source={require("../data/img/login.png")} style={{ width, height }}>
                <View style={styles.container}>
                    <ModalDropdown
                        options={["普通用户", "文化组织"]}
                        defaultValue="        请选择身份       ﹀"
                        value={identity}
                        onSelect={(index, value) => setIdentity(value)}
                        animated={false}
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        dropdownStyle={[{ width: 200, marginLeft: 25 }, { height: 38 * 2 }]}
                        dropdownTextStyle={{ fontSize: 16, alignSelf: "center" }}
                    />
                    <View style={styles.inputView}>
                        <Image source={require("../data/img/login_1.png")} style={styles.img} />
                        <View style={styles.line}></View>
                        <TextInput
                            value={account}
                            placeholder="请输入手机号码"
                            onChangeText={text => changeText("account", text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Image source={require("../data/img/login_2.png")} style={styles.img} />
                        <View style={styles.line}></View>
                        <TextInput
                            value={password}
                            placeholder="请输入登录密码"
                            secureTextEntry={false}
                            onChangeText={text => changeText("password", text)}
                            style={styles.input}
                        />
                    </View>
                    <Text style={styles.forgetPwd} onPress={() => isClick(true)}>忘记密码</Text>
                    <TouchableOpacity onPress={() => login()}
                        style={{
                            marginTop: 30,
                            borderRadius: 50,
                            width: 200,
                            height: 40,
                            backgroundColor: "#7B9DF6",
                            justifyContent: "center"
                        }}>
                        <Text style={styles.btnLogin}>登录</Text>
                    </TouchableOpacity>
                    <Text style={styles.register} onPress={() => prop.navigation.navigate('Register')}>立即注册</Text>
                    <Text style={styles.info}>登录表示你同意该软件
                        <Text style={styles.infoItem}>用户服务协议</Text>和
                        <Text style={styles.infoItem}>隐私政策</Text>
                    </Text>
                    {forget()}
                </View>
            </ImageBackground>
            {Tooltip(hintIcon, hintText, height)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 49,
        marginRight: 49
    },
    inputView: {
        borderColor: "#BBB",
        borderWidth: 1,
        borderRadius: 40,
        width: 260,
        height: 45,
        margin: 15,
        flexDirection: "row",
    },
    input: {
        width: 180,
        marginLeft: 10,
        fontSize: 16,
    },
    img: {
        width: 20,
        height: 20,
        marginTop: 11,
        marginLeft: 18,
        marginRight: 13
    },
    line: {
        borderLeftWidth: 1,
        borderLeftColor: "#BBB",
        height: 20,
        marginTop: 11
    },
    forgetPwd: {
        fontSize: 14,
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 0
    },
    btnLogin: {
        textAlign: "center",
        textAlignVertical: 'center',
        color: "#FFF",
        fontSize: 18
    },
    register: {
        marginTop: 20,
        fontSize: 14,
    },
    info: {
        position: "absolute",
        bottom: 100,
        fontSize: 12
    },
    infoItem: {
        color: "#7B9DF6"
    },
    forget: {
        borderColor: "#FFF",
        borderWidth: 1,
        borderRadius: 40,
        width: "90%",
        height: 40,
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: "row",
    },
    forgetInput: {
        width: "90%",
        marginLeft: 10,
        fontSize: 16,
        color: "#FFF"
    },
    forgetDropdown: {
        borderColor: "#FFF",
        borderWidth: 1,
        borderRadius: 40,
        width: "90%",
        height: 40,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        display: "flex",
        alignItems: "center"
    },
    forgetDropdownText: {
        fontSize: 16,
        width: "100%",
        height: 40,
        textAlign: "center",
        textAlignVertical: 'center',
        color: "#FFF"
    },
    dropdown: {
        borderColor: "#BBB",
        borderWidth: 1,
        borderRadius: 40,
        width: 260,
        height: 45,
        marginHorizontal: 15,
        marginTop: 40,
        marginBottom: 15
    },
    dropdownText: {
        fontSize: 16,
        width: 260,
        height: 45,
        textAlign: "center",
        textAlignVertical: 'center',
        color: "#9E9E9E",
    }
});

export default Login;