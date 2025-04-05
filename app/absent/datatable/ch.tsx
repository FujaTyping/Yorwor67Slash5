/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
} satisfies ChartConfig

interface ComponentProps {
    data: any[]
}

export default function Component({ data }: ComponentProps) {
    const [timeRange, setTimeRange] = React.useState("90d")
    const [chartData, setChartData] = React.useState<any[]>(data)

    React.useEffect(() => {
        setChartData(data)
    }, [data])

    const getLatestData = (count: number) => {
        return chartData.slice(0, count)
    }

    const filteredData = React.useMemo(() => {
        let numberOfDays = 90
        if (timeRange === "30d") {
            numberOfDays = 30
        } else if (timeRange === "7d") {
            numberOfDays = 7
        }

        const data = getLatestData(numberOfDays)

        return data.reverse()
    }, [timeRange, chartData])

    return (
        <div className="py-4">
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center space-y-0 border-b sm:flex-row">
                    <div className="grid flex-1 gap-1 sm:text-left">
                        <CardTitle>กราฟ</CardTitle>
                        <CardDescription>
                            แสดงสถิตินักเรียนที่ไม่มาในแต่ละวัน
                        </CardDescription>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="w-[160px] rounded-lg sm:ml-auto"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                ล่าสุด 90 วัน
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                ล่าสุด 30 วัน
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                ล่าสุด 7 วัน
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={filteredData}>
                            <defs>
                                <linearGradient id="fillStudent" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-desktop)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-desktop)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    return value
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            return value
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="count"
                                type="natural"
                                fill="url(#fillStudent)"
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
