import GetPosts from "@/Hooks/GetPosts";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import TopView from "@/components/TopView";
import { useParams } from "next/navigation";

export default async function Introduction() {
  return (
    <div>
      <GetPosts channelId="introduction" />
      <NavBar headingVal="Introduction" />
      <div className="flex">
        <SideBar />
        <TopView headingVal="Introduction"/>
      </div>
    </div>
  );
}