import GetPosts from "@/Hooks/GetPosts";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import TopView from "@/components/TopView";


export default function Success() {
  return (
    <div>
      <GetPosts channelId="success" />
      <NavBar headingVal="Success Stories" />
      <div className="flex">
        <SideBar />
        <TopView headingVal="Success Stories" />
      </div>
    </div>
  );
}