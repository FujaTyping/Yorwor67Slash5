"use client";

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import B1 from "@/app/assets/media/banner/About1.jpg"
import B2 from "@/app/assets/media/banner/About2.jpg"

function Slide() {
    return (
        <>
            <div className='mx-auto'>
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    effect={'fade'}
                    modules={[EffectFade, Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide>
                        <img
                            src={B1.src}
                            alt="Students in M.5/5 classroom"
                            className="object-cover max-h-[300px] w-full"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={B2.src}
                            alt="Students in M.5/5 classroom"
                            className="object-cover max-h-[300px] w-full"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default Slide