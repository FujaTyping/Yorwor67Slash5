import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCheck, UserMinus, Users } from 'lucide-react'
import React from 'react'

interface DataProps {
    All: number
    Absent: number
    Boy: number
    Girl: number
}

interface ComponentProps {
    data: DataProps
}

function Ss({ data }: ComponentProps) {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">นักเรียนทั้งหมด</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.All} คน</div>
                        <p className="text-xs text-muted-foreground">คิดเป็น {(data.All / 36 * 100).toFixed(2)}% ของนักเรียนทั้งหมด</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">นักเรียนที่ไม่มา</CardTitle>
                        <UserMinus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.Absent} คน</div>
                        <p className="text-xs text-muted-foreground">คิดเป็น {(data.Absent / 36 * 100).toFixed(2)}% ของนักเรียนทั้งหมด</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">นักเรียนผู้ชายที่มา</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.Boy} คน</div>
                        <p className="text-xs text-muted-foreground">คิดเป็น {(data.Boy / 21 * 100).toFixed(2)}% ของนักเรียนชายทั้งหมด</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">นักเรียนผู้หญิงที่มา</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.Girl} คน</div>
                        <p className="text-xs text-muted-foreground">คิดเป็น {(data.Girl / 15 * 100).toFixed(2)}% ของนักเรียนหญิงทั้งหมด</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Ss