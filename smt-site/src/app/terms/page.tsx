'use client';

import { useState } from "react"
import { HiInformationCircle } from "react-icons/hi";
import { Alert, List } from "flowbite-react";

export default function Terms() {
    const [title] = useState("Hatyaiwit - ข้อตกลงและเงื่อนไขการใช้บริการ");
    return (
        <>
            <title>{title}</title>
            <Alert style={{ width: '80%', margin: 'auto', marginTop: '20px' }} color="failure" icon={HiInformationCircle}>
                <span className="font-medium">แจ้งเตือน !</span> โปรดอ่านข้อกำหนดการให้บริการด้านล่างนี้อย่างละเอียดก่อนใช้เว็บไซต์
            </Alert>
            <div className="container">
                <h1 style={{ marginBottom: "15px" }} className="border-b">
                    📰 Terms of Service - ข้อตกลงและเงื่อนไขการใช้บริการ
                </h1>
                <h2 style={{ fontSize: '18px' }}>By using Yorwor67Slash5, an open-source project developed by the M.4/5 class at Hatyaiwittayalai School, you agree to the following terms. The website is designed to help students track their attendance and manage homework assignments, but please note that the accuracy of the information relies on input from both school staff and students. We cannot be held responsible for any errors or discrepancies in the data provided. Your privacy is important to us, and any personal information collected through the website will only be used for its intended functions, such as tracking attendance and homework. We assure you that your personal data will not be shared with any third parties</h2>
                <List style={{ marginTop: '20px',fontSize: '18px' }}>
                    <List.Item style={{ color: 'black' }}>Student Information: The accuracy of attendance and homework data depends on input from students and staff, and we are not responsible for errors</List.Item>
                    <List.Item style={{ color: 'black' }}>Privacy: Your personal data will only be used for the intended functions and will not be shared with third parties</List.Item>
                    <List.Item style={{ color: 'black' }}>Contact Information: If you have any questions or concerns, please contact us at yorwor@siraphop.me</List.Item>
                </List>
            </div>
        </>
    )
}