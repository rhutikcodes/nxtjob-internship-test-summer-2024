export default function SearchBar(){
	return(
		<main className="
				bg-gray-50
				flex
				flex-row
				rounded-sm
				p-2
				items-center
			">
			<input type="text" 
			className="bg-transparent"
			placeholder="Search"/>
			<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M14.55 13.6597L10.9547 10.0644C11.6807 9.13375 12.0787 7.99708 12.0787 6.79775C12.0787 5.37308 11.5233 4.03375 10.516 3.02708C9.50932 2.01908 8.16999 1.46442 6.74532 1.46442C5.32065 1.46442 3.98132 2.01908 2.97465 3.02708C1.96732 4.03375 1.41199 5.37308 1.41199 6.79775C1.41199 8.22242 1.96732 9.56175 2.97465 10.5684C3.98132 11.5764 5.32065 12.1311 6.74532 12.1311C7.94465 12.1311 9.08132 11.7337 10.012 11.0071L13.6073 14.6017L14.55 13.6597ZM6.74532 10.7978C5.67665 10.7978 4.67265 10.3818 3.91732 9.62642C3.16132 8.87108 2.74532 7.86642 2.74532 6.79775C2.74532 5.72975 3.16132 4.72508 3.91732 3.96975C4.67265 3.21375 5.67665 2.79775 6.74532 2.79775C7.81399 2.79775 8.81799 3.21375 9.57332 3.96975C10.3293 4.72508 10.7453 5.72975 10.7453 6.79775C10.7453 7.86642 10.3293 8.87108 9.57332 9.62642C8.81799 10.3818 7.81399 10.7978 6.74532 10.7978Z" fill="#3F3F50"/>
			</svg>
		</main>
	);
}
