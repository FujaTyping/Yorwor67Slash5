const axios = require("axios");
require("dotenv").config();

const LineAuth = process.env.LINEauth;

function pushNewHomework(Time, Subject, Decs, Due) {
    const Linedata = {
        "messages": [
            {
                "type": "flex",
                "altText": "แจ้งเตือนการบ้าน",
                "contents": {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": "https://smt.siraphop.me/media/AssignmentNotify.png",
                        "size": "full",
                        "aspectRatio": "20:10",
                        "aspectMode": "cover",
                        "action": {
                            "type": "uri",
                            "uri": "https://smt.siraphop.me/assignment"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "มีการบ้านใหม่มาแล้วนะ !",
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
                                                "flex": 1,
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": `${Time}`,
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
                                                "text": "วิชา",
                                                "color": "#000000",
                                                "size": "sm",
                                                "flex": 1,
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": `${Subject}`,
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
                                                "text": "วันส่ง",
                                                "color": "#ff0000",
                                                "size": "sm",
                                                "flex": 1,
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": `${Due}`,
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
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "รายละเอียดงาน",
                                                "color": "#000000",
                                                "size": "sm",
                                                "flex": 1,
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": `${Decs}`,
                                                "wrap": true,
                                                "color": "#000000",
                                                "size": "sm",
                                                "flex": 5
                                            }
                                        ],
                                        "offsetTop": "5px"
                                    }
                                ]
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "contents": [
                            {
                                "type": "text",
                                "text": "อย่าลืมส่งงานให้ตรงเวลาด้วย !",
                                "align": "center",
                                "color": "#ff0000",
                                "weight": "bold",
                                "offsetTop": "5px"
                            }
                        ],
                        "flex": 1
                    }
                }
            }
        ]
    };
    axios.post("https://api.line.me/v2/bot/message/broadcast", Linedata, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LineAuth}`
        }
    })
        .then(response => {
            console.log(`Successfully broadcast to Line`);
        })
        .catch(error => {
            console.error(`ไม่สามารถส่งข้อความได้ ${error}`);
        });
}

module.exports = pushNewHomework;