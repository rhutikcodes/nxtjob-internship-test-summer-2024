import {useState} from "react";

type TagItemsProps = {
	name: string;
	selected: boolean;
};

export enum TagItemsEnum {
	Product= "Product",
	Webinar= "Webinar",
	Training= "Training",
	Label= "Label"
};

export function TagItems({name, selected}: TagItemsProps){
	const [isSelected, setIsSelected] = useState(selected);

	function handleClick(){
		console.log("clicked");
		setIsSelected(!isSelected);
	}

	return (
		<div 
			className={
				` 
					flex
					flex-row 
					gap-1 
					border-2 
					text-purple-200 
					w-fit 
					px-2 
					py-1 
					rounded-lg 
					bg-purple-50 
					cursor-pointer
				`+ (isSelected ? "border-purple-200" : "border-transparent")
			}
			onClick={handleClick}
			>
			<img src="/tag.svg" alt="tag_icon"/>
			<span>{name}</span>
		</div>
	);
}
