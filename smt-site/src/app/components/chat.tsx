import { Badge } from "flowbite-react";
import { SiGooglegemini } from "react-icons/si";
import { motion } from "motion/react"

interface ChatAtrib {
  isRtl: boolean;
  name: string;
  img: string;
  text: string;
  isBot?: boolean;
}

export default function ChatBubble({ isRtl, name, img, text, isBot }: ChatAtrib) {
  return (
    <motion.div
      key={text}
      initial={{ y: -10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div style={{ paddingLeft: '0', paddingRight: '0' }} className="container">
        <div className="flex items-start gap-2.5 flex-wrap">
          <img
            className="w-10 h-10 rounded-full"
            src={img}
            alt="Profile"
          />
          <div className="flex flex-col w-full max-w-[400px] leading-1.5 p-4 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span dir="ltr" className="text-lg font-semibold">
                {name}
              </span>
            </div>
            <p dir="ltr" className="text-base font-normal py-2.5 break-words">
              {text}
            </p>
            {isBot && (
              <Badge
                className="mt-2"
                style={{
                  maxWidth: '130px',
                  color: 'white',
                  background: 'linear-gradient(to right, #4884f1, #d36678)'
                }}
                icon={SiGooglegemini}
              >
                gemini-1.5-flash
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
