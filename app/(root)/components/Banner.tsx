import HeroAnimation from '@/components/HeroAnimation'

const heroAnimationIframeUrl = process.env.NEXT_PUBLIC_HERO_ANIMATION_IFRAME_URL?.trim()

function hasValidHeroAnimationIframeUrl(url: string | undefined) {
  if (!url) {
    return false
  }

  try {
    const parsedUrl = new URL(url)

    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
  } catch {
    return false
  }
}

export default function Banner() {
  const Animation = () =>
    hasValidHeroAnimationIframeUrl(heroAnimationIframeUrl) ? (
      <iframe
        src={heroAnimationIframeUrl}
        title="Hero animation"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
    ) : (
      <HeroAnimation />
    )

  return (
    <section
      id="banner"
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#332323]">
      <Animation />
    </section>
  )
}
