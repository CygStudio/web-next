'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import StrokeText from '@/components/StrokeText'
import clsx from 'clsx'
import { useReadListStore } from '@/lib/store'
import { getAssetUrl } from '@/lib/asset-url'
import { noop } from 'lodash-es'

export interface MarqueeItem {
  date: string
  name: string
  avatar: string
  type: string
  message: string
  image: string
}
type Props = {
  item: MarqueeItem
  onCardClick?: () => void
  imgClassName?: string
}

export function MessageCard({ item, onCardClick = noop, imgClassName }: Props) {
  const { toggleReadItem, isRead } = useReadListStore()
  const readId = `${item.name}-${item.date}`

  const readClass = isRead(readId) ? 'opacity-50' : 'opacity-100'
  const egg = isRead(readId) ? '/images/RGBegg.webp' : '/images/egg.webp'

  return (
    <div className={clsx('mx-4 mb-12')}>
      <div
        className={clsx('relative flex flex-col cursor-pointer', readClass)}
        onClick={onCardClick}>
        {/* 訊息 */}
        {item.message && (
          <div className='max-w-md'>
            {/* 上方鳥圖片 */}
            <div className="relative -mb-1">
              <img src="/images/bird.webp" alt="Bird" className="w-56 h-auto mx-auto" />
            </div>

            {/* 對話框 */}
            <div className="relative p-1 bg-white rounded-2xl">
              <div className="bg-white rounded-2xl border-4 border-rose-500 p-3 flex items-center justify-center">
                <p className="text-sm font-semibold whitespace-pre-wrap">{item.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* 圖片 */}
        {item.image && (
          <div className={clsx('relative mt-2 cursor-pointer', readClass, imgClassName)}>
            <img src={getAssetUrl(item.image)} alt="Message Image" className="object-contain object-center max-w-full max-h-full" />
          </div>
        )}
      </div>

      {/* 底部用戶資訊 */}
      <div
        className="flex relative items-center justify-center mt-2 cursor-pointer"
        onClick={() => toggleReadItem(readId)}>
        {/* 蛋蛋 */}
        <div className="absolute top-[-30px] right-[-10px]">
          <img src={egg} alt="Golden Eggs" className="w-16 h-auto" />
        </div>

        {/* 頭像 */}
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 overflow-hidden shrink-0">
          <Image src={getAssetUrl(item.avatar)} alt={item.name} width={48} height={48} />
        </div>

        {/* 用戶名 */}
        <div className="text-xs sm:text-sm font-bold text-black">
          <StrokeText text={item.name} strokeColor="white" textColor="black" />
        </div>
      </div>
    </div>
  )
}
