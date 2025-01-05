'use client'

export default function GlobalError() {
    return (
        <html lang="en">

            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Hatyaiwit - Error</title>
                <link rel="icon" href="https://talent.siraphop.me/cdn/Yorwor.png" type="image/png" />
                <script src="https://cdn.tailwindcss.com" defer/>
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=report" />
            </head>

            <body>
                <div className="bg-white flex justify-center items-center w-screen h-screen p-5">
                    <div className="border shadow-red-500 shadow-md max-w-2xl p-6 rounded-lg flex flex-col items-center">
                        <h1 style={{ fontSize: '40px' }} className="material-symbols-outlined">report</h1>
                        <h1 className="text-4xl font-mono font-extrabold py-3">Application error</h1>
                        <ul className="list-disc text-lg px-6 mt-2">
                            <li>A client-side exception has occurred (see the browser console for more information).</li>
                        </ul>
                    </div>
                </div>
            </body>

        </html>
    )
}
