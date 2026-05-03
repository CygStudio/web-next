const defaultAssetBaseUrl = 'https://cygasset.sid.tw/'

function normalizeAssetBaseUrl(url: string) {
  const trimmedUrl = url.trim()

  if (!trimmedUrl) {
    return defaultAssetBaseUrl
  }

  return trimmedUrl.endsWith('/') ? trimmedUrl : `${trimmedUrl}/`
}

const assetBaseUrl = normalizeAssetBaseUrl(
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? defaultAssetBaseUrl
)

export function getAssetUrl(path = '') {
  const normalizedPath = path.replace(/^\//, '')

  return normalizedPath
    ? new URL(normalizedPath, assetBaseUrl).toString()
    : assetBaseUrl
}
