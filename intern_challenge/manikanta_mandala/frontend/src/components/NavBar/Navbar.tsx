import { Icon, IconType } from "../Icons/Icon"
import SearchBar from "../SearchBar/Searchbar"

export function Navbar(){
	return(
		<nav className="
				flex
				justify-between
				p-2
				border-b-2
				border-neutral-50
			">
			<header className="
					flex
					flex-row
					gap-2
					items-center
				">
				<img src="/Vector.svg" alt="logo" />
				<h1
					className="font-semibold"
					>Career Discussions</h1>
			</header>
			<section className="
					flex
					flex-row
					items-center
					gap-2
				">
				<SearchBar/>
				<Icon
					type = {IconType.Save}
					selected={false}
					statement=""
					selectedStatement=""
					ImgPath="bookmark.svg"
					selectedImgPath="bookmark-post-full.svg"
					handleClick={async ()=>{
						// make this user post bookmarked | saved
					}}
				/>
				<Icon
					type = {IconType.Notification}
					selected={false}
					statement=""
					selectedStatement=""
					ImgPath="bell.svg"
					selectedImgPath="bell.svg"
					handleClick={async ()=>{
						// make this user post bookmarked | saved
					}}
				/>
				<Icon
					type = {IconType.Help}
					selected={false}
					statement=""
					selectedStatement=""
					ImgPath="Help.svg"
					selectedImgPath="Help.svg"
					handleClick={async ()=>{
						// make this user post bookmarked | saved
					}}
				/>
			</section>
		</nav>
	)
}
