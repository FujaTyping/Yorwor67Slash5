import React from 'react'
import Backprev from './components/backprev'

function notfound() {
    return (
        <>
            <div className="px-6 py-4 w-full flex gap-3 flex-col items-center justify-center">
                <div className='text-center'>
                    <h1 className="font-bold text-xl mb-1">หลงทางเก่งเหมือนกันนะ</h1>
                    <p className='text-xs'>หน้านี้ไม่มีแล้วจ้าา เหมือนวิญญาณหลังสอบเสร็จที่ปลิวหายไป ไม่เหลือแม้แต่เศษศักดิ์ศรี กดกลับไปซะ ก่อนสมองจะหลงตามมาด้วย</p>
                </div>
                <Backprev />
            </div>
        </>
    )
}

export default notfound