import Announcement from "./components/page/announcement";
import Logo from "@/app/assets/Yorwor.svg"
import Banner from "@/app/assets/media/Banner.webp"
import { Info } from 'lucide-react';
import Infomation from "./components/page/infomation";

export default function Home() {
  return (
    <>
      <div className='px-6 w-full'>
        <Announcement />
      </div>
      <div className="px-6 py-4 w-full">
        <div className="my-4 flex flex-col items-center justify-center">
          <img src={Logo.src} alt="Logo" className="w-14 md:w-18" />
          <h1 className="font-bold text-2xl md:text-4xl my-2">ม.5/5 - โครงการ SMT</h1>
          <p>แพลตฟอร์มจัดการห้องเรียนสำหรับ ม.5/5 SMT โรงเรียนหาดใหญ่วิทยาลัย ช่วยให้นักเรียนสามารถเช็กข้อมูลสำคัญต่างๆ ของห้องได้อย่างสะดวก รวดเร็ว และทันสมัย</p>
          <img className="mt-4 w-full max-w-[1100px] object-cover rounded-md" src={Banner.src} alt="Banner" height={630} width={1200} />
        </div>
      </div>
      <div className='px-6 w-full'>
        <div>
          <div className='flex items-center gap-2'>
            <Info />
            <h1 className='font-bold text-lg'>Information</h1>
          </div>
          <p className='text-sm'>ส่วนนี้แสดงข่าวสารและอัปเดตต่างๆ เพื่อให้ติดตามข้อมูลใหม่ๆ ได้อย่างรวดเร็ว</p>
        </div>
      </div>
      <div className='px-6 w-full py-4'>
        <Infomation />
      </div>
    </>
  );
}
