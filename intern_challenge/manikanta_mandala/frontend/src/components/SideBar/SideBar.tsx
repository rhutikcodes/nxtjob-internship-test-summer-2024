import { useState } from "react"
import { Channel } from "../Channels/Channel"
import { Section } from "../Sections/Section"

export function SideBar(){
	const [showChannels, setShowChannels] = useState(false);

	function handleChannelClick(){
		setShowChannels(!showChannels);
	}

	return (
		<aside className="
				col-start-1
				col-end-2
				border-r-2
				border-neutral-50
				h-full
			">
			<header 
				className="
					flex
					flex-row
					items-center
					bg-blue-1000
					p-2
					text-white
					gap-2
				"
			>
				<img src="./logo-nxt_job.svg" />
				<span>community</span>
			</header>
			<section>
				<main className="
						flex
						flex-row
						gap-2
						items-center
						m-3
						p-2
						border-b-2
					">
					<img src="/search_icon.svg" alt="search_icon"/>
					<input type="text" placeholder="Browser Channels"/>
						
				</main>
				<section>
					<Section
						svgImgPath="/box.svg"
						name="Rules"
					/>
					<div onClick={handleChannelClick}>
						<Section
							svgImgPath= { 
								showChannels ? 
								"/chevron-down.svg" 
									: 
								"chevron-down.svg" 
							}
							name="Channels"
						/>
					</div>
					{showChannels ?
						<div>
							<Channel
							svgImagePath="/users.svg"
							name="Introduction"
							/>
							<Channel
							svgImagePath="/announcement.svg"
							name="Announcements"
							/>
							<Channel
							svgImagePath="/trending-up.svg"
							name="Success Stories"
							/>
							<Channel
							svgImagePath="/Vector.svg"
							name="Career Discussions"
							/>
						</div>

						: null}
				</section>
			</section>
		</aside>
	)
}
