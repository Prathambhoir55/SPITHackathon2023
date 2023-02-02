import { useState, useTransition, Suspense } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "../../../assets/styles/react-tabs.css"
import { LoadingSpinner } from "../../../components"

// Components
import Category from "./components/Category"
import Subcategory from "./components/Subcategory"
import Unit from "./components/Unit"
import Manufacturers from "./components/Manufacturers"
import Places from "./components/Places"
import Locations from "./components/Locations"
import Attributes from "./components/Attributes"
import Products from "./components/Products"
import Suppliers from "./components/Suppliers"
import Indents from "./components/Indents"
import Purchases from "./components/Purchases"
import { AiFillRobot } from "react-icons/ai"
const Inventory = () => {
	const [currentTab, setCurrentTab] = useState(0)
	const [chat, chatlog] = useState([{
		user: "gpt",
		message: "How can I help your interview preparation ?"
	}])
	const [input, setInput] = useState("")


	const handlesubmit = async (e) => {

		e.preventDefault();
		console.log(input);
		chatlog([...chat, { user: "me", message: `${input}` }])
		setInput("");

		const res = await fetch("http://localhost:3080/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				message: chat.map((msg) => msg.message).join("")
			})
		})

		const data = await res.json();
		console.log(data);
	}
	return (
		<form onSubmit={handlesubmit}>

			<div class="flex h-screen antialiased text-gray-800">
				<div class="flex flex-row w-full overflow-x-hidden">
					<div class="flex flex-col flex-auto ">
						<div
							class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
						>
							<div class="flex flex-col h-full overflow-x-auto mb-4">
								<div
									class="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 flex-shrink-0"
								>
									<AiFillRobot className="text-lg"></AiFillRobot>
								</div>
								<div class="flex flex-col h-full">
									{
										chat.map((message, index) => {
											return <div>{message.message}</div>
										})
									}
								</div>
							</div>
							<div
								style={{ transform: "translateY(-43px)" }}
								class=" flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
							>
								<div class="flex-grow ml-4">
									<div class="relative w-full">
										<input
											type="text"
											onChange={(e) => setInput(e.target.value)}
											value={input}
											class="flex w-full border rounded-xl focus:outline-none focus:border-green-300 pl-4 h-10"
										/>
										<button
											class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
										>

										</button>
									</div>
								</div>
								<div class="ml-4">
									<button
										type="submit"
										class="flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
									>
										<span>Send</span>
										<span class="ml-2">

										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form >

	)
}


const Chatmsg = ({ message }) => {
	<div class="col-start-1 col-end-8 p-3 rounded-lg">
		<div class="flex flex-row items-center">
			<div
				class="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 flex-shrink-0"
			>
				<AiFillRobot className="text-lg"></AiFillRobot>
			</div>
			<div
				class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
			>
				<div>{message.message}</div>
			</div>
		</div>
	</div >
}

export default Inventory
