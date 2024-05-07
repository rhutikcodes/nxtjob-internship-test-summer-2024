interface SectionProps{
	svgImgPath: string;
	name: string;
}

export function Section({svgImgPath, name}: SectionProps){
	return(
		<article
			className="
				flex
				flex-row
				items-center
				gap-2
				p-2
				mt-3
				mx-3
				cursor-pointer
			"
			>
			<img src={svgImgPath} />
			<span> {name} </span>
		</article>
	);
}
