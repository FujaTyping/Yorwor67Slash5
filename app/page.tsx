import Announcement from "./components/page/announcement";
import Logo from "@/app/assets/Yorwor.svg"

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
          <img className="mt-4 max-w-[1200px] w-full object-cover rounded-md" src={"https://picsum.photos/1920/1080?grayscale"} alt="Banner" />
        </div>
      </div>
    </>
  );
}
