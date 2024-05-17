import * as Avatar from '@radix-ui/react-avatar';

type UserIconProps = {
	username: string;
};

// TODO: Implement random color for background
export function UserIcon({username}: UserIconProps){
	const firstLetter = username[0].toUpperCase();
	return(
		<Avatar.Root className="
			inline-flex
			items-center
			justify-center
			align-middle
			overflow-hidden
			select-none
			w-11
			h-11
			rounded-full
			bg-green-500
			text-white
		">{firstLetter}</Avatar.Root>
	);
}
