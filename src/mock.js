import Mock from 'mockjs'

const data = Mock.mock({
    "success": true,
    "token": "ertyujknbv"
});

const hand = Mock.mock({
    "msg": "successfully"
});

// Mock.mock('/login',
//     // ops => { //输出数据
//     //     console.log("recieve login")
//     //     console.log(ops)
//     //     return 
//     //     // return { state: 'ok', data: 'datas' };
//     // }
//     'post', data
// );
// Mock.mock('/handler', 'post', hand);