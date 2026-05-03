'use client'

import { MessageCard, type MarqueeItem } from '@/components/MessageCard'
import { Masonry, ResponsiveMasonry } from '@/components/Masonry'
import { getAssetUrl } from '@/lib/asset-url'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Lightbox } from '@/components/Lightbox'
import { noop } from 'lodash-es'

function FadeInWhenVisible({
  children,
  onClick = noop,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onClick={onClick}
      className="w-full">
      {children}
    </motion.div>
  )
}

export default function MessageMasonry() {
  const [items, setItems] = useState<MarqueeItem[]>([])

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const items = await fetch(getAssetUrl('message'))
        .then(res => res.json())
        .catch(() => null)

      setItems(items)
    }
    fetchData()
  }, [])

  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          640: 2, // Tailwind's `sm`
          768: 3, // Tailwind's `md`
          1024: 4, // Tailwind's `lg`
        }}>
        <Masonry gutter="2rem">
          {items.map((item, index) => (
            <FadeInWhenVisible key={index}>
              <MessageCard item={item} onCardClick={() => setCurrentIndex(index)} />
            </FadeInWhenVisible>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Lightbox
        items={items.map(item => (
          <MessageCard
            imgClassName="w-full h-[calc(100vh-40px)] flex items-center justify-center"
            item={item}
          />
        ))}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </>
  )
}
