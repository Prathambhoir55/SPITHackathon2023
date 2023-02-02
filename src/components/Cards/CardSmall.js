import { useSelector } from "react-redux"

const CardSmall = ({ idx, name, children }) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)
	return (
		<div className="shadow-sm border borderColor px-4 py-3 rounded-lg bg-[#f7f6f9] dark:bg-purple_5 relative">
			<h4
				className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${
					currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
				}`}
			>
				{idx}
			</h4>
			{name && (
				<p className="font-normal dark:text-slate-300 text-slate-700">{name}</p>
			)}
			{children}
		</div>
	)
}

export default CardSmall
