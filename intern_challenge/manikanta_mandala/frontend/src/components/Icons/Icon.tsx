import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { Cross2Icon } from '@radix-ui/react-icons';
import '../popup/styles.css';
import { CreatePostPart } from '../CreatePost/CreatePostPart';
import { TagItems } from '../Tags/tagItems';
import { ReplyItem } from '../Reply/ReplyComponent';

export enum IconType {
	Like = "LIKE",
	Reply = "REPLY",
	Save = "SAVE",
	Notification = "NOTIFICATION",
	Help = "HELP"
};

type IconProps = {
	type: IconType;
	statement: string;
	selected: boolean;
	selectedStatement?: string;
	ImgPath: string;
	selectedImgPath: string;
	handleClick?: () => Promise<any>
}

export function Icon({type ,statement, selected, ImgPath, selectedImgPath, selectedStatement, handleClick}: IconProps){
	const [isSelected, setIsSelected] = useState(selected);
	// const [replyItems, setReplyItems] = useState<any[]>([]);

	async function handleClickFunction(){
		console.log("clicked");
		if(isSelected && handleClick){
			// const res = await handleClick();
			// console.log(res);
			// setReplyItems(res);
		}
		setIsSelected(!isSelected);
	}

	async function handleSubmit(){
		console.log("submitted");
	}

	return (
		<div
			className="
				flex 
				flex-row
				items-center
				cursor-pointer
			"
			onClick={handleClickFunction}
		>
			{/* render the reply objects 
				*/}
			{(IconType.Reply === type)? 

		  <Dialog.Root>
			<Dialog.Trigger asChild>
				<div
					className="
						flex 
						flex-row
						items-center
						cursor-pointer
					"
					onClick={handleClickFunction}
				>
					{
						isSelected? 
						<img src={selectedImgPath} alt="selected-img"/>
						:
						<img src={ImgPath} alt="img"/>
					}
					<span>
						{isSelected && selectedStatement? selectedStatement: statement}
					</span>
				</div>
				</Dialog.Trigger>
				<Dialog.Portal>
				  <Dialog.Overlay className="DialogOverlay " />
				  <Dialog.Content className="DialogContent font-inter rounded-md">
					<div className="
							bg-grey-50
							p-4
						">
						<Dialog.Title className="DialogTitle font-bold text-2xl ">Introduce yourself</Dialog.Title>
						<Dialog.Description className="DialogDescription">
							It will help you increase the reach within community
						</Dialog.Description>
					</div>

					<form>
		<div className=" rounded-2xl bg-white"
				onSubmit={handleSubmit}
			>
			<div className=" px-4 ">
				<textarea className=" w-full h-[300px] resize-none py-4 " 
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
					<div className="
						flex
						gap-1
						mt-6
						justify-between
						p-4
						bg-grey-50
					">
						
						<div className=" flex flex-col ">
							<Switch.Root
								className="SwitchRoot"
								id="airplane-mode"
							>
								<Switch.Thumb className="SwitchThumb" />
							</Switch.Root>
							<label
								className=" font-semibold "
								htmlFor="anonymous-post"
							>
								Post anonymously
							</label>
						</div>
						<div>
							  <Dialog.Close asChild>
								<button
									className="Button 
										border-2
										border-grey-200
									"
								>Cancel</button>
							  </Dialog.Close>
							  <Dialog.Close asChild>
								<button className="Button bg-pink-700" type='submit' onClick={handleSubmit}>Post</button>
							  </Dialog.Close>
							<Dialog.Close asChild>
							  <button className="IconButton" aria-label="Close">
								<Cross2Icon />
							  </button>
							</Dialog.Close>
						</div>
					</div>
					</form>
				  </Dialog.Content>
				</Dialog.Portal>
			  </Dialog.Root>
				:
			<>
					{
						isSelected ? 
						<img src={selectedImgPath} alt="selected-img"/>
						:
						<img src={ImgPath} alt="img"/>
					}
					<span>
						{isSelected && selectedStatement? selectedStatement: statement}
					</span>
			</>
			}
		</div>
	)
}
