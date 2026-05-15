import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { getAssetUrl } from '@/lib/asset-url'
// import { ProjectMembers } from './components/ProjectMembers'
import VideoSection from './components/VideoSection'

type Item = {
  name: string
  title: string
  img: string
  link: string
}
type MembersData = {
  staffList: Item[]
  memberList: Item[]
}

export default async function MembersPage() {
  const items: MembersData = await fetch(getAssetUrl('members'))
    .then(res => res.json())
    .catch(() => { return { staffList: [], memberList: [] } })

  return (
    <section className="container mx-auto">
      {/* <ProjectMembers /> */}

      <VideoSection />

      <h1 className="text-4xl font-bold text-center container mx-auto px-4 py-12">工作人員</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {items.staffList.map((item: Item) => (
          <StaffCard key={item.name} item={item} />
        ))}
      </div>

      <h2 className="text-4xl font-bold text-center container mx-auto px-4 py-12">特別感謝</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
        {items.memberList.map((item: Item) => (
          <StaffCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}

const StaffCard = ({ item }: { item: Item }) => {
  return (
    <Card className="flex flex-col items-center text-center bg-gray-200">
      <Link href={item.link} target="_blank" rel="noopener noreferrer" className="block mt-6">
        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
          <AvatarImage src={getAssetUrl(item.img)} alt={item.name} />
          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          <Link href={item.link} target="_blank" rel="noopener noreferrer">
            {item.name}
          </Link>
        </CardTitle>
        <CardDescription>{item.title}</CardDescription>
      </CardHeader>
    </Card>
  )
}
