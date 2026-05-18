'use client'

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { noop } from 'lodash-es'
import StrokeText from '@/components/StrokeText'
import { getAssetUrl } from '@/lib/asset-url'
import { useEffect, useState } from 'react'
import { Masonry, ResponsiveMasonry } from '@/components/Masonry'
import { Lightbox } from '@/components/Lightbox'

type Item = {
  date: string
  name: string
  dc: string
  avatar: string
  image: string
  info: string
}

export default function StandingSign() {
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const items: Item[] = await fetch(getAssetUrl('travel'))
        .then(res => res.json())
        .catch(() => [])
      setItems(items)
    }
    fetchData()
  }, [])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  return (
    <section id="standing_sign" className="block container w-4/5 mx-auto my-4">
      <div className="travel_notes relative">
        <h2 className="font-bold my-5 text-3xl text-center">
          <StrokeText text="婚叫 團結 強大 - 熙遊記" />
        </h2>

        <Image
          src="/images/熙遊記V3.webp"
          alt=""
          width={2010}
          height={1114}
          className="block w-full rounded-lg"
        />
      </div>
      <div className="w-full mt-8">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            640: 2, // Tailwind's `sm`
            768: 3, // Tailwind's `md`
            1024: 4, // Tailwind's `lg`
            1280: 5, // Tailwind's `xl`
          }}>
          <Masonry gutter="2rem">
            {items.map((item, index) => (
              <div key={index} className="overflow-hidden">
                <MasonryItem
                  item={item}
                  index={index}
                  onClick={() => setCurrentIndex(index)}
                  imgClassName="w-full hover:scale-125 transition-transform duration-300 ease-out"
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <Lightbox
        items={items.map((item, index) => (
          <MasonryItem key={index} item={item} index={index} className="w-full h-full" imgClassName='w-full h-full object-contain object-center' />
        ))}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </section>
  )
}

const MasonryItem = ({
  item,
  index,
  onClick = noop,
  className = '',
  imgClassName = '',
}: {
  item: Item
  index: number
  onClick?: () => void
  className?: string
  imgClassName?: string
}) => {
  return (
    <div key={index} className={clsx('relative cursor-pointer', className)} onClick={onClick}>
      <Image
        className={clsx(imgClassName)}
        src={getAssetUrl(item.image)}
        width={300}
        height={300}
        alt=""
        loading="lazy"
      />
      <div className="absolute bottom-0 right-0 px-1 font-semibold text-xs text-right">
        <StrokeText textColor="black" strokeColor="white" strokeWidth="2" text={item.name} />
        <StrokeText textColor="black" strokeColor="white" strokeWidth="2" text={` @${item.info}`} />
      </div>
    </div>
  )
}
