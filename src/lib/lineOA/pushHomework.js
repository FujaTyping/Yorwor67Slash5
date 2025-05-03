const axios = require("axios");
require("dotenv").config();

const LineAuth = process.env.LINEauth;

function pushNewHomework(Time, Subject, Decs, Due) {
    const Linedata = {
        "messages": [
            {
                "type": "flex",
                "altText": "แจ้งเตือนภาระงานใหม่",
                "contents": {
                    "type": "bubble",
                    "header": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [
                                    {
                                        "type": "image",
                                        "url": "https://smt.siraphop.me/media/AssignmentNotify.png",
                                        "size": "100%",
                                        "aspectMode": "cover",
                                        "gravity": "center",
                                        "flex": 1,
                                        "aspectRatio": "16:9"
                                    }
                                ]
                            }
                        ],
                        "paddingAll": "0px"
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "contents": [],
                                                "size": "xl",
                                                "wrap": true,
                                                "text": `วิชา ${Subject}`,
                                                "color": "#000000",
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "text",
                                                "text": `วันที่สั่ง : ${Time}`,
                                                "color": "#000000",
                                                "size": "sm"
                                            },
                                            {
                                                "type": "text",
                                                "text": `วันที่ส่ง : ${Due}`,
                                                "size": "sm",
                                                "color": "#000000"
                                            }
                                        ],
                                        "spacing": "sm"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [
                                            {
                                                "type": "box",
                                                "layout": "vertical",
                                                "contents": [
                                                    {
                                                        "type": "text",
                                                        "contents": [],
                                                        "size": "sm",
                                                        "wrap": true,
                                                        "margin": "lg",
                                                        "color": "#000000",
                                                        "text": `${Decs}`
                                                    }
                                                ]
                                            }
                                        ],
                                        "paddingAll": "13px",
                                        "backgroundColor": "#ededed",
                                        "cornerRadius": "8px",
                                        "margin": "xl"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [
                                            {
                                                "type": "box",
                                                "layout": "vertical",
                                                "contents": [
                                                    {
                                                        "type": "button",
                                                        "action": {
                                                            "type": "uri",
                                                            "label": "ดูภาระงานทั้งหมด",
                                                            "uri": "https://smt.siraphop.me/assignment"
                                                        },
                                                        "color": "#ffffff"
                                                    }
                                                ],
                                                "backgroundColor": "#26353f",
                                                "cornerRadius": "8px"
                                            }
                                        ],
                                        "margin": "xl"
                                    }
                                ]
                            }
                        ],
                        "paddingAll": "20px",
                        "backgroundColor": "#ffffff"
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