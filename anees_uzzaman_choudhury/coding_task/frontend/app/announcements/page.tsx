import GetPosts from "@/Hooks/GetPosts";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import TopView from "@/components/TopView";


export default function Announcements() {
  return (
    <div>
      <GetPosts channelId="announcements" />
      <NavBar headingVal="Announcements" />
      <div className="flex">
        <SideBar />
        <TopView headingVal="Announcements" />
      </div>
    </div>
  );
}