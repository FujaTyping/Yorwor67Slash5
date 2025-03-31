import React from 'react';
import { Github, Globe, Newspaper } from 'lucide-react';
import Link from 'next/link';

function Footer() {
  return (
    <>
      <footer className='bg-blue-600 text-white border-t-5 border-gray-200'>
        <div className="mt-auto w-full max-w-[85rem] py-6 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
            <div>
              <a className="flex-none text-xl font-semibold focus:outline-hidden" href="#" aria-label="Brand">โครงการ SMT</a>
            </div>
            <ul className="text-center">
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
                <a className="inline-flex gap-x-2 text-sm focus:outline-hidden" href="#">
                  ข้อตกลงและเงื่อนไขการใช้บริการ
                </a>
              </li>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
                <a className="inline-flex gap-x-2 text-sm focus:outline-hidden" href="#">
                  Open API
                </a>
              </li>
            </ul>
            <div className="md:text-end space-x-2">
              <Link className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none" href="https://github.com/FujaTyping/Yorwor67Slash5">
                <Github size={16} />
              </Link>
              <Link className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none" href="https://www.hatyaiwit.ac.th/frontpage">
                <Globe size={16} />
              </Link>
              <Link className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none" href="http://202.129.48.202">
                <Newspaper size={16} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer