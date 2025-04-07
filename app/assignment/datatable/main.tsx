"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventCalendar from './carlendar'
import { DataTableDemo } from './cd'

function Main() {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('https://api.smt.siraphop.me/assignment')
            .then((response) => {
                setData(response.data.Homework)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    if (!data) {
        return <div className="my-10 flex items-center justify-center w-full"><div className="loader rounded-full"></div></div>
    }

    return (
        <>
            <EventCalendar data={data} />
            <DataTableDemo data={data} />
        </>
    )
}

export default Main
