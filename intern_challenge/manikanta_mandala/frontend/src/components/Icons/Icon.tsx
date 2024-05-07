import { useState } from 'react';
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
	handleClick: () => Promise<any>
}

export function Icon({type,statement, selected, ImgPath, selectedImgPath, selectedStatement, handleClick}: IconProps){
	const [isSelected, setIsSelected] = useState(selected);
	const [replyItems, setReplyItems] = useState<any[]>([]);

	async function handleClickFunction(){
		console.log("clicked");
		if(isSelected){
			// const res = await handleClick();
			// console.log(res);
			// setReplyItems(res);
		}
		setIsSelected(!isSelected);
	}

	return (
		<div
			className="
				flex 
				flex-row
				items-center
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
			{/* render the reply objects */}
			{(IconType.Reply === type)?replyItems.map((reply: any) => (
				<ReplyItem
					key={reply.id}
					username={reply.username}
					timestamp={reply.timestamp}
					discription={reply.discription}
					like={reply.like}
					reply={reply.reply}
				/>
			)): null}
		</div>
	)
}
