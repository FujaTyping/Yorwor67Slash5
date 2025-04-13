import { CalendarDays } from "lucide-react";
import Announcement from "./components/page/announcement";
import Schedule from "@/app/assets/media/Timetable.webp"
import ExSchedule from "@/app/assets/media/ExamTimetable.webp"

export default function Home() {
  return (
    <>
      <div className='px-6 w-full'>
        <Announcement />
      </div>
      <div className="px-6 w-full flex flex-col items-center justify-center">
        <div className="py-4">
          <h1 className="font-bold text-xl">หน้าเว็ปไหม่จะมาเร็วๆนี้</h1>
        </div>
      </div>
      <div className='px-6 w-full'>
        <div>
          <div className='flex items-center gap-2'>
            <CalendarDays />
            <h1 className='font-bold text-lg'>Schedule</h1>
          </div>
          <p className='text-sm'>ส่วนนี้แสดงตารางเรียนประจำสัปดาห์ เพื่อให้ดูเวลาเรียนของแต่ละวิชาได้อย่างสะดวก</p>
        </div>
      </div>
      <div className='px-6 w-full py-4'>
        <img src={Schedule.src} alt="Schedule" className="w-full object-cover max-w-[1000px] mx-auto" height={643} width={998} />
      </div>
      <div className='px-6 w-full'>
        <div>
          <div className='flex items-center gap-2'>
            <CalendarDays />
            <h1 className='font-bold text-lg'>Exam Schedule</h1>
          </div>
          <p className='text-sm'>ส่วนนี้แสดงตารางสอบประจำภาคเรียน เพื่อให้ดูเวลาสอบของแต่ละวิชาได้อย่างสะดวก</p>
        </div>
      </div>
      <div className='px-6 w-full py-4'>
        <img src={ExSchedule.src} alt="Schedule" className="w-full object-cover max-w-[900px] mx-auto" height={1501} width={1077} />
      </div>
    </>
  );
}
