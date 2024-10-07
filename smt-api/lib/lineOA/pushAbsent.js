const axios = require("axios");
require("dotenv").config();

const LineAuth = process.env.LINEauth;
const LineID = process.env.LINEuserid;

function pushNewAbsent(Date, ZAbsent, Number, ZBoy, ZGirl) {
    const Linedata = {
        "to": `${LineID}`,
        "messages": [
            {
                "type": "flex",
                "altText": "แจ้งเตือนสถิตินักเรียน",
                "contents": {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": "https://smt.siraphop.me/assets/lineOA/NewAbsent.png",
                        "size": "full",
                        "aspectRatio": "20:10",
                        "aspectMode": "cover",
                        "action": {
                            "type": "uri",
                            "uri": "https://smt.siraphop.me/absent"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "รายงานสถิตินักเรียน !",
                                "weight": "bold",
                                "size": "xl",
                                "color": "#000000"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "margin": "lg",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "วันที่",
                                                "color": "#000000",
                                                "size": "sm",
                                                "flex": 2,
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": `${Date}`,
                                                "wrap": true,
                                                "color": "#000000",
                                                "size": "sm",
                                                "flex": 5
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "มาทั้งหมด",
                                                "color": "#000000",
                                                "size": "sm",
                                                "flex": 2,
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": `${parseInt(ZBoy) + parseInt(ZGirl)} คน`,
                                                "wrap": true,
                                                "color": "#000000",
                                                "size": "sm",
                                                "flex": 5
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "xs",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ลา / ขาด",
                                                "color": "#ff0000",
                                                "size": "sm",
                                                "flex": 2,
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": `${ZAbsent} คน`,
                                                "wrap": true,
                                                "color": "#ff0000",
                                                "size": "sm",
                                                "flex": 5,
                                                "weight": "bold"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "spacing": "xs",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "เลขที่ ลา / ขาด",
                                                "color": "#ff0000",
                                                "size": "sm",
                                                "flex": 2,
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": `${Number}`,
                                                "wrap": true,
                                                "color": "#ff0000",
                                                "size": "sm",
                                                "flex": 5,
                                                "weight": "bold"
                                            }
                                        ],
                                        "offsetTop": "5px"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ]
    };
    axios.post("https://api.line.me/v2/bot/message/push", Linedata, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LineAuth}`
        }
    })
        .catch(error => {
            console.error(`ไม่สามารถส่งข้อความได้ ${error}`);
        });
}

module.exports = pushNewAbsent;