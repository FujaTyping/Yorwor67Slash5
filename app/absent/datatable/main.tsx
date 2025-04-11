/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from 'react'
import { DataTableDemo } from './cd'
import Component from './ch'
import axios from 'axios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Ss from './ss'

type StatusData = {
    All: number;
    Absent: number;
    Boy: number;
    Girl: number;
};

function Main() {
    const [chartData, setChartData] = useState<any[]>([])
    const [tableData, setTableData] = useState<any[]>([])
    const [statusData, setStatusData] = useState<StatusData | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("https://api.smt.siraphop.me/absent")
                const data = res.data
                if (data && data.Absent) {
                    setStatusData(data.Static);
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
            <div className='py-4'>
                <Tabs defaultValue="static" className="w-full">
                    <TabsList className='w-full'>
                        <TabsTrigger className='cursor-pointer' value="static">สถิติ</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value="graph">กราฟ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="static">{statusData && <Ss data={statusData} />}</TabsContent>
                    <TabsContent value="graph"><Component data={chartData} /></TabsContent>
                </Tabs>
            </div>
            <DataTableDemo data={tableData} />
        </>
    )
}

export default Main
