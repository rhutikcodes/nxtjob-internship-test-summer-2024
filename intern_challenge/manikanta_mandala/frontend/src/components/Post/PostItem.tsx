import { Icon, IconType } from "../Icons/Icon";
import { UserIcon } from "../UserIcon/UserIcon";

interface PostItemProps{
	username: string;
	timestamp: number;
	discription: string;
	like: string;
	reply: string;
};

export function PostItem({username, timestamp, discription, like, reply}: PostItemProps){

	// we can use moment.js for this
	function formatTimestamp(time: number) {
	  const date = new Date(time);
	  const year = date.getFullYear();
	  const month = ('0' + (date.getMonth() + 1)).slice(-2); 
	  const day = ('0' + date.getDate()).slice(-2);
	  const hours = ('0' + date.getHours()).slice(-2);
	  const minutes = ('0' + date.getMinutes()).slice(-2);
	  const seconds = ('0' + date.getSeconds()).slice(-2);
	  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}

	return(
		<div 
			className="
				flex
				flex-row
				my-3
				border-2
				rounded-xl
				border-grey-200
				gap-3
				p-3
				text-description
			"
			>
				<UserIcon 
					username={username}
				/>
			<div
				className="
					flex
					flex-col
					gap-3
					ml-2
					w-full
					"
				>
				<div 
					className="
						flex
						flex-row
						gap-4
					"
					>
					<span className="
							text-purple-200
							font-semibold
						">
						{username}
					</span>
					<span>
						{formatTimestamp(timestamp)}
					</span>
				</div>
				<div
					className="
							text-grey-400
						"
					>
					{discription}
				</div>
				<div className="
						flex
						flex-row
						justify-between
					">
					<div
						className="
							flex 
							flex-row
							gap-8
						"
					>
						<Icon
							type={IconType.Like}
							selected={false}
							statement={like}
							ImgPath="heart.svg"
							selectedImgPath="heart-full.svg"
							handleClick={async ()=>{
								// make this user post liked
							}}
						/>
						<Icon
							type = {IconType.Reply}
							selected={false}
							statement={reply}
							ImgPath="message.svg"
							selectedImgPath="message-full.svg"
							handleClick={async()=>{
								// get reply array
								// and display it
							}}
						/>
					</div>
					<Icon
						type = {IconType.Save}
						selected={false}
						statement="save"
						selectedStatement="saved"
						ImgPath="bookmark-post.svg"
						selectedImgPath="bookmark-post-full.svg"
						handleClick={async ()=>{
							// make this user post bookmarked | saved
						}}
					/>
				</div>
			</div>
		</div>
	);
}
