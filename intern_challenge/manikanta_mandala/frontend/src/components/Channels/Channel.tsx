interface ChannelProps{
	svgImagePath: string;
	name: string;
};

export function Channel({svgImagePath, name}: ChannelProps){
	return (
		<article
			className="
				flex
				flex-row
				items-center
				gap-2
				p-2
				mx-6
			"
			>
			<img src={svgImagePath} />
			<span> {name} </span>
		</article>
	);
}
