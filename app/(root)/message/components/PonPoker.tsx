'use client'

import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react'
import { Navigation, Pagination, EffectCards, Mousewheel } from 'swiper/modules'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { getAssetUrl } from '@/lib/asset-url'

import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/mousewheel'

const swiperParameters: SwiperProps = {
  modules: [EffectCards, Mousewheel, Navigation],
  effect: 'cards',
  grabCursor: true,
  initialSlide: 0,
  speed: 500,
  loop: false,
  mousewheel: {
    invert: false,
  },
  allowTouchMove: true,
  // 增加 passive 配置以解決事件監聽器警告
  touchEventsTarget: 'wrapper',
  passiveListeners: true,
  cardsEffect: {
    perSlideOffset: 50,
    perSlideRotate: 10,
    rotate: true,
    slideShadows: false, // 關閉卡片陰影效果
  },
  slidesPerView: 2,
  breakpoints: {
    640: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 5,
    },
  },
}

const PokerSwiper = () => {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const items: string[] = await fetch(getAssetUrl('message/poker'))
        .then(res => res.json())
        .catch(() => [])

      setItems(items)
    }
    fetchData()
  }, [])

  return (
    <Swiper {...swiperParameters} spaceBetween={20} className="h-96 mb-12 w-full">
      {items.map((img, index) => (
        <SwiperSlide key={img}>
          <div className="w-full h-full aspect-[784/1024] rounded-3xl">
            <Image
              src={getAssetUrl(`message/poker/${img}`)}
              alt="youtube"
              width={784}
              height={1024}
              className="rounded-lg object-contain object-center border border-gray-500"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default PokerSwiper
