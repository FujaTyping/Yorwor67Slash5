import axios from 'axios';
import Marquee from "react-fast-marquee";

export default async function Home() {
  const response = await axios.get('https://api.smt.siraphop.me/announcement');
  const announcment = response.data.Text;
  return (
    <div className="container">
      <h1>Hatyaiwit M.4/5</h1>
      <h2>Powered by NEXT.JS with Flowbite</h2>
      <h2 className='gap-3' style={{ display: 'inline-flex' }}>ประกาศ:<Marquee style={{maxWidth: '300px'}} pauseOnHover={true}>{announcment}</Marquee></h2>
    </div>
  );
}