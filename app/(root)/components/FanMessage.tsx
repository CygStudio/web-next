import InfiniteMarquee from '@/components/InfiniteMarquee'
import StrokeText from '@/components/StrokeText'
import { getAssetUrl } from '@/lib/asset-url'

export default async function Home() {
  const items = await fetch(getAssetUrl('message'))
    .then(res => res.json())
    .catch(() => null)

  if (!items) return null

  return (
    <main className="flex flex-col lg:flex-row h-[200vh] lg:h-screen bg-[linear-gradient(to_bottom,#8d2a34_0%,#d16266_25%,#e7997c_50%,#d16266_75%,#8d2a34_100%)]">
      <div
        className="flex-[2] relative bg-cover bg-center bg-no-repeat min-h-[100vh]"
        style={{ backgroundImage: 'url(/images/18a0793e589907a3.webp)' }}>
        <h2 className="text-4xl font-bold text-white mt-8 ml-8">
          <StrokeText text="婚叫們的祝福" />
        </h2>
      </div>

      {/* 跑馬燈區域 */}
      <InfiniteMarquee className="flex-1 lg:min-w-[680px]" items={items} />
    </main>
  )
}
