import { TagItems } from '../Tags/tagItems';
import './style.css';

export function CreatePostPart(){
	return (
		<div className=" rounded-2xl bg-white">
			<div className=" px-4 ">
				<textarea name="text" className=" w-full h-[300px] resize-none py-4 " 
					placeholder="What do you want to talk about"/>
			</div>
			<div className=" px-4 ">
				<div className=" flex flex-row gap-2 ">
					{/* TODO:make a list of tags details and render it with map function*/}
					<TagItems
						name="Product"
						selected={true}
					/>
					<TagItems
						name="Webinar"
						selected={false}
					/>
					<TagItems
						name="Training"
						selected={false}
					/>
					<TagItems
						name="Label"
						selected={false}
					/>
				</div>

				<div className=" flex flex-row my-4 ">
					<div className=" bg-grey-50 w-9 h-9 content-center 
						cursor-pointer rounded-full p-2 mr-2 ">
						<img
							className=" w-6 h-6 m-auto "
							src="/Text.svg"
							alt="logo"
						/>
					</div>
					<div className=" bg-grey-50 w-9 h-9 content-center 
						cursor-pointer rounded-full p-2 mx-2 ">
						<img
							className=" w-6 h-6 m-auto "
							src="/paper-pin.svg"
							alt="logo"
						/>
					</div>
					<div className=" bg-grey-50 w-9 h-9 content-center 
						cursor-pointer rounded-full p-2 mx-2 ">
						<img
							className=" w-6 h-6 object-cover m-auto "
							src="/emoji-happy.svg"
							alt="logo"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
