import GetPosts from "@/Hooks/GetPosts"
import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar"
import TopView from "@/components/TopView"


export default function CareerPage() {
  return (
    <div>
      <GetPosts channelId="career" />
      <NavBar headingVal="Career" />
      <div className="flex">
        <SideBar />
        <TopView headingVal="Career" />
      </div>
    </div>
  )
}
