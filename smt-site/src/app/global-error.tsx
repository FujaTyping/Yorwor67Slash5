'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/6/6f/%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3.png" type="image/x-icon" />
                <title>Hatyaiwit - Application error</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=report" />
            </head>
            <body>
                <div className="bg-white flex justify-center items-center w-screen h-screen p-5">
                    <div className="border shadow-red-500 shadow-md max-w-2xl p-6 rounded-lg flex flex-col items-center">
                        <h1 style={{ fontSize: "40px" }} className="material-symbols-outlined">report</h1>
                        <h1 className="text-4xl font-mono font-extrabold py-3">Application error</h1>
                        <ul className="list-disc text-lg px-6 mt-2">
                            <li>A client-side exception has occurred</li>
                            <li>See the browser console for more information</li>
                        </ul>
                    </div>
                </div>
            </body>
        </html>
    )
}
