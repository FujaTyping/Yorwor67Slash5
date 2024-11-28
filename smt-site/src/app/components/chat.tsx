interface ChatAtrib {
  isRtl: boolean;
  name: string;
  img: string;
  text: string;
}

export default function ChatBubble({ isRtl, name, img, text }: ChatAtrib) {
  return (
    <>
      <div dir={isRtl ? "rtl" : "ltr"}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
