import { HiUserCircle } from "react-icons/hi"

const UserNavCard = ({ name, email, logout }) => {
	return (
		<div className="px-2 py-1 rounded-md border borderColor bg-white dark:bg-purple_5 flex md:items-center md:flex-row flex-col">
			<div className="flex items-center mr-3">
				<HiUserCircle className="h-8 w-8 block mr-2 dark:text-slate-500" />
				<div>
					<h4 className="text-sm text-slate-700 dark:text-slate-200 font-semibold">
						{!name.includes("undefined") ? name : "Name"}
					</h4>
					<span className="text-sm text-slate-400 font-normal -mt-1 block">
						{email || "example@email.com"}
					</span>
				</div>
			</div>
			<button
				onClick={logout}
				className="px-2 py-1 rounded-md border-none bg-red-600 text-slate-100 text-base font-bold md:mt-0 mt-2"
			>
				Logout
			</button>
		</div>
	)
}

export default UserNavCard
