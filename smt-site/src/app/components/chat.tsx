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
        <div className="container">
          <div className="flex items-start gap-2.5 flex-wrap">
            <img
              className="w-8 h-8 rounded-full"
              src={img}
              alt="Cynthia profile image"
            />
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {name}
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white break-words">
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
