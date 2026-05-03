import StrokeText from '@/components/StrokeText'
import { VideoSection, type Common } from '@/components/VideoSection'
import { getAssetUrl } from '@/lib/asset-url'

export default async function VideoSectionList() {
  const items: Common = await fetch(getAssetUrl('common'))
    .then(res => res.json())
    .catch(() => {
      return { videoList: [] }
    })

  return items.videoList.map((item, index) => <VideoSection key={index} videoItem={item} />)
}
