import React, { useState } from "react";
import ModalDropdown from 'react-native-modal-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions
} from "react-native";
import Tooltip from "./Tooltip";
import scxUtil from "./scxUtil";
import UserInformation from "./UserInformation";
const { width, height } = Dimensions.get("screen");
const Register = (prop) => {
    const [password, setpassword] = useState("");   //密码
    const [confirm, setConfirm] = useState("");   //确认密码
    const [phone, setPhone] = useState("");   //手机号
    const [captcha, setCaptcha] = useState("");   //验证码
    const [random, setRandom] = useState("获取验证码");   //随机生成4位数字验证码
    const [identity, setIdentity] = useState("");   //身份
    const [hintIcon, setHintIcon] = useState("");
    const [hintText, setHintText] = useState("");

    function changeText(type, text) {
        if (type === "password")
            setpassword(text);
        else if (type === "confirm")
            setConfirm(text);
        else if (type === "phone")
            setPhone(text);
        else if (type === "captcha")
            setCaptcha(text);
    }

    /** 获取验证码  */
    function gainCaptcha() {
        const min = 1000;
        const max = 9999;
        setRandom(Math.floor(Math.random() * (max - min)) + min);
    }

    function checkInfo() {
        var errorText;
        if (identity === "")
            errorText = "请选择身份";
        else if (password === "")
            errorText = "登录密码不能为空";
        else if (confirm === "")
            errorText = "确认密码不能为空";
        else if (phone === "")
            errorText = "手机号码不能为空";
        else if (captcha === "")
            errorText = "验证码不能为空";
        else if (password !== confirm)
            errorText = "两次密码不一致";
        else if (scxUtil.checkMobile(phone) === false)
            errorText = "手机号码输入格式不正确";
        else if (captcha != random)
            errorText = "验证码错误";
        else return true;

        setHintIcon("alert-outline");
        setHintText(errorText);
        setTimeout(() => {
            setHintIcon("");
            setHintText("");
        }, 2000);
        return false;
    }

    /** 注册审核及插入数据库 */
    async function register() {
        var ip = UserInformation.ip;
        var check = checkInfo();
        var imgUrl, maxUserId;

        if (check === true) {
            await fetch('https://api.thecatapi.com/v1/images/search?limit=1&page=1')
                .then(res => res.json())
                .then(resJson => {
                    console.log(resJson)
                    imgUrl = resJson[0].url;

                    if (identity === "普通用户") {
                        fetch(ip + 'selectUserByPhone.php?phone=' + phone)
                            .then(res => res.json())
                            .then(resJson => {
                                console.log(resJson)
                                if (resJson.length !== 0) {
                                    setHintIcon("alert-outline");
                                    setHintText("手机账号已存在");
                                    setTimeout(() => {
                                        setHintIcon("");
                                        setHintText("");
                                    }, 2000);
                                }
                                else {
                                    fetch(ip + 'selectMaxUserId.php')
                                        .then(res => res.json())
                                        .then(resJson => {
                                            maxUserId = resJson.maxUserId;

                                            fetch(ip + 'addUser.php?userId=' + maxUserId + '&name=用户' + maxUserId + '&type=' + 1 + '&imgSource=' + imgUrl)
                                                .then(() => {
                                                    fetch(ip + 'addNormalUser.php?userId=' + maxUserId + '&nUserName=用户' + maxUserId
                                                        + '&phone=' + phone + '&password=' + password + '&nUserImg=' + imgUrl)
                                                        .then(() => {
                                                            setHintIcon("checkmark-outline");
                                                            setHintText("注册成功");
                                                            setTimeout(() => {
                                                                setHintIcon("");
                                                                setHintText("");
                                                                prop.navigation.navigate('Login');
                                                            }, 500);
                                                        })
                                                })
                                        }).catch(e => console.log(e));
                                }
                            }).catch(e => console.log(e));
                    }
                    else { // 文化组织
                        fetch(ip + 'selectOrgByPhone.php?phone=' + phone)
                            .then(res => res.json())
                            .then(resJson => {
                                console.log(resJson)
                                if (resJson.length !== 0) {
                                    setHintIcon("alert-outline");
                                    setHintText("手机账号已存在");
                                    setTimeout(() => {
                                        setHintIcon("");
                                        setHintText("");
                                    }, 2000);
                                }
                                else {
                                    fetch(ip + 'selectMaxUserId.php')
                                        .then(res => res.json())
                                        .then(resJson => {
                                            maxUserId = resJson.maxUserId;

                                            fetch(ip + 'addUser.php?userId=' + maxUserId + '&name=组织' + maxUserId + '&type=' + 1 + '&imgSource=' + imgUrl)
                                                .then(() => {
                                                    fetch(ip + 'addOrg.php?userId=' + maxUserId + '&orgName=组织' + maxUserId
                                                        + '&phone=' + phone + '&password=' + password + '&orgImg=' + imgUrl)
                                                        .then(() => {
                                                            setHintIcon("checkmark-outline");
                                                            setHintText("注册成功");
                                                            setTimeout(() => {
                                                                setHintIcon("");
                                                                setHintText("");
                                                                prop.navigation.navigate('Login');
                                                            }, 500);
                                                        })
                                                })
                                        }).catch(e => console.log(e));
                                }
                            }).catch(e => console.log(e));
                    }
                });
        }
    }

    // console.log(identity)
    return (
        <View style={styles.container}>
            <Image source={require("../data/img/register.png")} style={{ width: "100%", height: 210 }} />
            <KeyboardAwareScrollView onKeyboardWillShow={(frames) => {
                console.log('Keyboard event', frames)
            }}>
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
                    <Image source={require("../data/img/login_2.png")} style={styles.img} />
                    <View style={styles.line}></View>
                    <TextInput
                        value={password}
                        placeholder="请输入登录密码"
                        secureTextEntry={true}
                        onChangeText={text => changeText("password", text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputView}>
                    <Image source={require("../data/img/login_2.png")} style={styles.img} />
                    <View style={styles.line}></View>
                    <TextInput
                        value={confirm}
                        placeholder="请输入确认密码"
                        secureTextEntry={true}
                        onChangeText={text => changeText("confirm", text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputView}>
                    <Image source={require("../data/img/register_1.png")} style={styles.img} />
                    <View style={styles.line}></View>
                    <TextInput
                        value={phone}
                        placeholder="请输入手机号码"
                        keyboardType="number-pad"
                        onChangeText={text => changeText("phone", text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputView}>
                    <Image source={require("../data/img/register_2.png")} style={styles.img} />
                    <View style={styles.line}></View>
                    <TextInput
                        value={captcha}
                        placeholder="请输入验证码"
                        onChangeText={text => changeText("captcha", text)}
                        style={styles.inputCaptcha}
                    />
                    <TouchableOpacity style={styles.btnCaptcha} onPress={() => gainCaptcha()}>
                        <Text style={[styles.captchaText, { fontSize: random === "获取验证码" ? 13 : 18 }]}>{random}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => register()}>
                    <Text style={styles.btnRegister}>注册</Text>
                </TouchableOpacity>
                <Text style={styles.info}>注册表示你同意该软件
                    <Text style={styles.infoItem}>用户服务协议</Text>和
                    <Text style={styles.infoItem}>隐私政策</Text>
                </Text>
            </KeyboardAwareScrollView>
            {Tooltip(hintIcon, hintText, height)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    inputView: {
        borderColor: "#BBB",
        borderWidth: 1,
        borderRadius: 40,
        width: 260,
        height: 45,
        marginHorizontal: 15,
        marginVertical: 10,
        flexDirection: "row",
    },
    input: {
        width: 180,
        marginLeft: 10,
        fontSize: 16,
    },
    inputCaptcha: {
        width: 110,
        marginLeft: 10,
        fontSize: 16
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
    btnRegister: {
        borderRadius: 50,
        width: 200,
        height: 40,
        backgroundColor: "#7B9DF6",
        textAlign: "center",
        textAlignVertical: 'center',
        color: "#FFF",
        fontSize: 18,
        alignSelf: "center",
        marginTop: 40
    },
    btnCaptcha: {
        borderRadius: 50,
        width: 82,
        height: 35,
        alignSelf: "center",
        backgroundColor: "#7B9DF6",
        justifyContent: "center",
        alignItems: "center"
    },
    captchaText: {
        textAlign: "center",
        textAlignVertical: 'center',
        color: "#FFF"
    },
    info: {
        fontSize: 12,
        alignSelf: "center",
        marginTop: 30
    },
    infoItem: {
        color: "#7B9DF6"
    },
    dropdown: {
        borderColor: "#BBB",
        borderWidth: 1,
        borderRadius: 40,
        width: 260,
        height: 45,
        marginHorizontal: 15,
        marginTop: 40,
        marginBottom: 10
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

export default Register;