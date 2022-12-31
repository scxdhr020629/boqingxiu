// 这一段代码是部署到服务器上的后端代码


const express = require('express');
const bodyParser = require('body-parser');
const db = require("./db")

const app = express();
app.use(bodyParser.json());



app.get('/test', function (req, res) {

    const sql = `SELECT * FROM normalUser`;

    db.query(sql, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;


        res.send(results);


    });
});

/**
 * 查看normalUser
 */
app.get('/selectUserByNameAndPwd', function (req, res) {
    // Connecting to the database.
    // console.log(req.query.name);
    // console.log("routes.js 上面的log");

    // const sql = "select * from classroom where cname ='" + cname + "'";
    // var id = req.query.id;
    var name = req.query.name;
    var password = req.query.password;

    // var cname = req.query.cname;

    // const sql = `select * from normalUser where nUserId = ${id} and nUserPwd = '${password}'`
    const sql = `select * from normalUser where nUserName = '${name}' and nUserPwd = '${password}'`
    // Executing the MySQL query (select all data from the 'users' table).
    db.query(sql, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
        // console.log("routes.js 里的log输出" + results);

    });
});

/**
 * 根据电话号码
 */
app.get('/selectUserByPhone', function (req, res) {

    var phone = req.query.phone;

    const sql = `select * from normalUser where userPhone = '${phone}' `
    // Executing the MySQL query (select all data from the 'users' table).
    db.query(sql, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);


    });
});

/**
 * 根据名字
 */
app.get('/selectUserByName', function (req, res) {


    var name = req.query.name;

    const sql = `select * from normalUser where nUserName = '${name}' `
    // Executing the MySQL query (select all data from the 'users' table).
    db.query(sql, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);
        // console.log("routes.js 里的log输出" + results);

    });
});

/**
 * 更改密码
 */
app.get('/updateNormalUserPwdByName', function (req, res) {
    var sql = `update normaluser set nUserPwd ='${req.query.password}' where nUserName = '${req.query.name}'`; // 这边的"?"是SQL的模板语法

    db.query(sql, function (err, result) {
        try {
            res.send('更新成功');
        } catch (err) {
            console.log('更新失败');
        }
    });
})

/**
 * 管理员
 */
app.get('/addAdmin', function (req, res) {


    var sql = `insert into admin set  adminName='${req.query.name}' , adminPwd='${req.query.password}'`; // 这边的"?"是SQL的模板语法

    var params = [req.query.name, req.query.password]  // 这边的数组参数与上边的"?"一一映射

    // console.log(req.query.name, req.query.password);
    db.query(sql, params, function (err, result) {
        try {
            res.send('增加管理员成功');
        } catch (err) {
            console.log('新增数据失败');
        }
    });

    // console.log("执行sql语句结束");
})

/**
 * 根据用户名
 */
app.get('/selectAdmByName', function (req, res) {


    var name = req.query.name;

    const sql = `select * from admin where adminName = '${name}' `
    // Executing the MySQL query (select all data from the 'users' table).
    db.query(sql, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results);


    });
});

/**
 * 添加普通用户
 */
app.get('/addUser', function (req, res) {

    console.log("开始插入");
    var sql = `insert into  normalUser set  nUserName='${req.query.name}', nUserPwd='${req.query.password}',userPhone='${req.query.name}', totalTime =0.0`; // 这边的"?"是SQL的模板语法
    var params = [req.query.name, req.query.password, req.query.name, 0.0]  // 这边的数组参数与上边的"?"一一映射
    console.log(req.query.name, req.query.password);
    db.query(sql, params, function (err, result) {
        try {
            res.send('增加普通用户成功');
        } catch (err) {
            console.log('新增数据失败');
        }
    });
})

/**
 * 文化组织
 */
app.get('/selectOrgByPhone', function (req, res) {
    var sql = 'select * from organization where orgPhone = ?'; // 这边的"?"是SQL的模板语法
    var params = [req.query.phone]  // 这边的数组参数与上边的"?"一一映射
    db.query(sql, params, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

/**
 * 添加文化组织
 */
app.get('/addOrg', function (req, res) {
    var sql = 'insert into organization set orgName=? , orgPwd=?,orgPhone=?'; // 这边的"?"是SQL的模板语法
    var params = [req.query.name, req.query.password, req.query.name]  // 这边的数组参数与上边的"?"一一映射
    db.query(sql, params, function (err, result) {
        try {
            res.send('增加组织成功');
        } catch (err) {
            console.log('新增数据失败');
        }
    });
})

/**
 * 查询招募模块 根据 appointId
 */
app.get('/selectAppointment', function (req, res) {
    var sql = `select * from appointment where appointId = '${req.query.id}'`;

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

/**
 * 查询公告模块，查询出来所有的模块，应该根据系统时间来进行变化
 */
app.get('/selectRecruitboard', function (req, res) {
    var sql = 'select * from recruitboard'; // 这边的"?"是SQL的模板语法
    // var params = [req.query.id]  // 这边的数组参数与上边的"?"一一映射
    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

/**
 * 查询出来初始时间段  根据id
 */
// app.get('/selectTime', function (req, res) {
//     var sql = 'select * from time where timeId = ?'; // 这边的"?"是SQL的模板语法
//     var params = [req.query.id]  // 这边的数组参数与上边的"?"一一映射
//     db.query(sql, params, function (err, result) {
//         try {
//             res.send(result);
//         } catch (err) {
//             console.log('查询发生错误');
//         }
//     });
// })

/**
 * 查询出来组织 根据 id
 */
app.get('/selectOrgById', function (req, res) {
    var orgId = req.query.orgId;

    var sql = `SELECT * FROM organization where orgId = ${orgId}`;

    db.query(sql, function (err, result) {
        try {
            res.send(result[0]);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

/**
 * 查询所有组织
 */
app.get('/selectOrgAll', function (req, res) {
    var sql = 'SELECT * FROM organization'; // 这边的"?"是SQL的模板语法
    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

// 只查找了图片
app.get('/selectOrgImgByUserId', function (req, res) {
    var sql = `select orgImg from organization where userId = '${req.query.userId}'`; // 这边的"?"是SQL的模板语法
    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

//
app.get('/selectOrgByUserId', function (req, res) {
    var sql = `select * from organization where userId = '${req.query.userId}'`; // 这边的"?"是SQL的模板语法
    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})


/**
 * 查询所有预约信息 根据orgId
 */
app.get('/selectAppointById', function (req, res) {
    var orgId = req.query.orgId;

    var sql = `SELECT * FROM appointment WHERE orgId = ${orgId}`;

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})



/**
 * 短信部分
 */
app.get('/selectMessageByUserId', function (req, res) {

    var sql = `SELECT * FROM message WHERE meId = ${req.query.id}`;

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

// 查询其他人的id
app.get('/selectYouIdByUserId', function (req, res) {

    var sql = `select DISTINCT youId from message where meId = '${req.query.id}'`;

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

//查询最后一条信息的时间
app.get('/selectLastTimeByUserIdAndYouId', function (req, res) {

    var sql = `select max(msgTime) as t from message where meId ='${req.query.userId}' and youId = '${req.query.otherId}'`;

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

app.get('/selectLastTimeByUserIdOrYouId', function (req, res) {

    var sql = `select max(msgTime) as t from message where (meId ='${req.query.userId}' and youId = '${req.query.otherId}' ) or youId = '${req.query.userId}' and meId = '${req.query.otherId}'`;

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

//查询消息通过时间
app.get('/selectMsgByUserIdAndYouIdAndTime', function (req, res) {

    var sql = `select msg from message where meId = '${req.query.userId}' and youId = '${req.query.otherId}' and msgTime = '${req.query.time}'`;

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

app.get('/selectMsgByUserIdOrYouIdAndTime', function (req, res) {

    var sql = `select msgId,msg from message where (meId ='${req.query.userId}' and youId = '${req.query.otherId}' and msgTime = '${req.query.time}') or (youId = '${req.query.userId}' and meId = '${req.query.otherId}' and msgTime = '${req.query.time}')`;

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

// 查询未读数量的信息
app.get('/selectTheCountOfUnReadMessage', function (req, res) {

    var sql = `select count(*) as c from message where (meId = '${req.query.userId}' and youId = '${req.query.otherId}' and isRead = 0) or (meId = '${req.query.otherId}' and youId = '${req.query.userId}' and isRead = 0)`;

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})

// chat 部分代码
app.get('/selectMsgByMeIdAndYouId', function (req, res) {

    var sql = `select * from message where (meId = '${req.query.userId}' and youId ='${req.query.otherId}' ) or (meId = '${req.query.otherId}' and youId = '${req.query.userId}')`

    db.query(sql, function (err, result) {
        try {
            res.send(result);
        } catch (err) {
            console.log('查询发生错误');
        }
    });
})








/**
 * 根据user表，查名字
 */
app.get('/selectUserByUserId', function (req, res) {

    var sql =

        db.query(sql, function (err, result) {
            try {
                res.send(result);
            } catch (err) {
                console.log('查询发生错误');
            }
        });
})



app.listen(3001, () => {
    console.log('Go to http://localhost:3001 so you can see the data.');
});