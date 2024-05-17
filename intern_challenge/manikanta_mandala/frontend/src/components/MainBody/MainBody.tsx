import { PostItem } from "../Post/PostItem";
import { TagItems } from "../Tags/tagItems";
import { UserIcon } from "../UserIcon/UserIcon";
import FormDialog from "../popup/CreatePostPop";

export function MainBody(){
	return (
		<main
			className="
				flex
				flex-col
				m-auto
				bg-grey-50
				items-center
			"
		>
			<div
				className="
					min-w-[70%]
					max-w-[80%]
					py-5
					px-12
					bg-white
				"
			>
				<div
					className="
						my-3
					"
					>
					<div className="
							bg-neutral-300
							w-12
							h-12
							content-center
							rounded-full
							p-1
						">
						<img
							className="
								w-6
								h-6
								m-auto
							"
							src="/Vector.svg"
							alt="logo"
						/>
					</div>
					<h1 className="
							text-3xl
							font-bold
							p-1
						">
						Welcome to NxtJob
					</h1>
					<div className="
							text-description
							p-1
						">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
					</div>
					{/* TODO: create greet component for this */}
					<div className="
							flex
							flex-row
							items-center
							mt-4
						">
						<UserIcon 
							username="Person1"
						/>
						<FormDialog/>

					</div>
					<div 
						className="
							flex
							flex-row
							gap-2
							mt-4
							"
						>
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
				</div>
				<hr/>
				<PostItem
					username="Person1"
					timestamp= {new Date().getTime()}
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					like="10k"
					reply="5k"
					Replies={[{
						username: "Person2",
						timestamp: new Date().getTime(),
						description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
						like: "1k",
						reply: "500"

					}]}
				/>

			</div>
		</main>
	)
}
