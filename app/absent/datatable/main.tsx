/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from 'react'
import { DataTableDemo } from './cd'
import Component from './ch'
import axios from 'axios'

function Main() {
    const [chartData, setChartData] = useState<any[]>([])
    const [tableData, setTableData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("https://api.smt.siraphop.me/absent")
                const data = res.data
                if (data && data.Absent) {
                    const formattedChartData = data.Absent.map((item: any) => ({
                        date: item.Date,
                        count: parseInt(item.Count.replace(/[^\d]/g, "")),
                    }))
                    setChartData(formattedChartData)

                    const formattedTableData = data.Absent.map((item: any) => ({
                        date: item.Date,
                        number: item.Number,
                        count: item.Count,
                    }))
                    setTableData(formattedTableData)
                }
            } catch (error) {
                console.error("Failed to fetch data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return <div className="my-10 flex items-center justify-center w-full"><div className="loader rounded-full"></div></div>
    }

    return (
        <>
            <Component data={chartData} />
            <DataTableDemo data={tableData} />
        </>
    )
}

export default Main
