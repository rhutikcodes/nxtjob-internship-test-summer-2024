import { Icon, IconType } from "../Icons/Icon";
import { UserIcon } from "../UserIcon/UserIcon";

export interface ReplyItemProps{
	username: string;
	timestamp: number;
	description: string;
	like: string;
	reply: string;
};

export function ReplyItem({username, timestamp, description, like, reply}: ReplyItemProps){

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

	return (
		<div 
			className="
				flex
				flex-row
				my-3
				mx-4
				rounded-xl
				gap-3
				p-3
				text-description
				bg-grey-50
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
					{description}
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
							type = {IconType.Like}
							selected={false}
							statement={like + " | Reply " + reply}
							ImgPath="heart.svg"
							selectedImgPath="heart-full.svg"
							handleClick={async () => {}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
