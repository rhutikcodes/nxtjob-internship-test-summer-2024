import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';
import { CreatePostPart } from '../CreatePost/CreatePostPart';

const CreatePost= () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
		<div
			className="
				rounded-full
				w-full
				font-medium
				text-description
				border-2
				border-grey-200
				p-3
				mx-4
				bg-grey-50
			"
		>
			Start a post
		</div>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay " />
      <Dialog.Content className="DialogContent font-inter rounded-2xl">
		<div className="
				bg-grey-50
				p-4
			">
			<Dialog.Title className="DialogTitle font-bold text-2xl ">Introduce yourself</Dialog.Title>
			<Dialog.Description className="DialogDescription">
				It will help you increase the reach within community
			</Dialog.Description>
		</div>
		<CreatePostPart/>
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
					<button className="Button bg-pink-700">Post</button>
				  </Dialog.Close>
				<Dialog.Close asChild>
				  <button className="IconButton" aria-label="Close">
					<Cross2Icon />
				  </button>
				</Dialog.Close>
			</div>
		</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default CreatePost;
