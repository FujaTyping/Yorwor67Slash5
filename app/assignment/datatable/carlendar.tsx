/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import thLocale from '@fullcalendar/core/locales/th';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import './fullcalendar-custom.css';
import { ChevronLeft, ChevronRight, GalleryHorizontal } from 'lucide-react';
import interactionPlugin from "@fullcalendar/interaction";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

interface Event {
    title: string;
    date: string;
    subject: string;
    time: string;
    due: string;
}

interface EventCalendarProps {
    data: {
        Time: string; Subject: string; Decs: string; Due: string
    }[];
}

export default function EventCalendar({ data }: EventCalendarProps) {
    const calendarRef = useRef<FullCalendar | null>(null);
    const [charData, setCharData] = useState<any | null>(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [events, setEvents] = useState<Event[]>([]);
    const [openDrawer, SetOpenDrawer] = useState(false);

    const formatThaiDate = (thaiDate: string): string => {
        const monthsInThai = {
            มกราคม: '01', กุมภาพันธ์: '02', มีนาคม: '03', เมษายน: '04', พฤษภาคม: '05', มิถุนายน: '06',
            กรกฎาคม: '07', สิงหาคม: '08', กันยายน: '09', ตุลาคม: '10', พฤศจิกายน: '11', ธันวาคม: '12'
        };

        const dateParts = thaiDate.split(' ');
        const day = dateParts[0].padStart(2, '0');
        const month = monthsInThai[dateParts[1] as keyof typeof monthsInThai];
        const year = (parseInt(dateParts[2], 10) - 543).toString();

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (data) {
            const fetchedEvents = data.map((event) => ({
                title: event.Decs,
                subject: event.Subject,
                time: event.Time,
                due: event.Due,
                date: formatThaiDate(event.Due),
            }));

            setEvents(fetchedEvents);
        }
    }, [data]);

    const handlePrev = () => {
        const api = calendarRef.current?.getApi();
        api?.prev();
    };

    const handleNext = () => {
        const api = calendarRef.current?.getApi();
        api?.next();
    };

    const handleToday = () => {
        const api = calendarRef.current?.getApi();
        api?.today();
    };

    const handleDatesSet = (arg: any) => {
        setCurrentTitle(arg.view.title);
    };

    const carclick = (args: any) => {
        const eventDETA = args.event._def;
        const formattedData = {
            decs: eventDETA.title,
            subject: eventDETA.extendedProps.subject,
            time: eventDETA.extendedProps.time,
            due: eventDETA.extendedProps.due
        }
        setCharData(formattedData);
        SetOpenDrawer(true);
    }

    return (
        <>
            <div className="py-4">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row md:items-center space-y-0 border-b sm:flex-row">
                        <div className="grid flex-1 gap-1 sm:text-left">
                            <CardTitle>ปฏิทิน</CardTitle>
                            <CardDescription>
                                {currentTitle}
                            </CardDescription>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <Button onClick={handlePrev} className='cursor-pointer' variant="outline"><ChevronLeft /></Button>
                            <Button onClick={handleToday} className='cursor-pointer' variant="outline">วันนี้</Button>
                            <Button onClick={handleNext} className='cursor-pointer' variant="outline"><ChevronRight /></Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full">
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, interactionPlugin]}
                                eventClick={carclick}
                                initialView="dayGridMonth"
                                events={events}
                                height="auto"
                                headerToolbar={false}
                                dayMaxEventRows={2}
                                fixedWeekCount={false}
                                aspectRatio={1.5}
                                datesSet={handleDatesSet}
                                locales={[thLocale]}
                                locale="th"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className='z-99'>
                <Drawer open={openDrawer} onOpenChange={SetOpenDrawer}>
                    <DrawerContent>
                        <div className='max-w-xl mx-auto'>
                            <DrawerHeader>
                                <DrawerTitle className='flex items-center gap-2'><GalleryHorizontal size={18} />ข้อมูลภาระงาน</DrawerTitle>
                                <div className='flex flex-col gap-1'>
                                    <p><span className='font-bold'>วิชา</span> : {charData?.subject}</p>
                                    <p className='whitespace-pre-line'><span className='font-bold'>รายละเอียด</span> : {charData?.decs}</p>
                                    <div className='flex flex-col gap-1 md:flex-row md:items-center md:gap-5'>
                                        <p><span className='font-bold'>วันที่สั่ง</span> : {charData?.time}</p>
                                        <p><span className='font-bold'>วันที่ครบกำหนด</span> : {charData?.due}</p>
                                    </div>
                                </div>
                            </DrawerHeader>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}
