import React from 'react'
import Backprev from './components/backprev'

function notfound() {
    return (
        <>
            <div className="px-6 w-full flex gap-3 flex-col items-center justify-center">
                <h1 className="font-bold text-xl">ดูเหมือนคุณกำลังหลงทางสินะ</h1>
                <Backprev />
            </div>
        </>
    )
}

export default notfound