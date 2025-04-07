import Announcement from "./components/page/announcement";

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
    </>
  );
}
