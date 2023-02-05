import { useState, useTransition, Suspense } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "../../../assets/styles/react-tabs.css"
import data from "../../../MCQdata/data"
import { LoadingSpinner } from "../../../components"

// Importing components for other tabs
import Department from "./Department"
import Designation from "./Designation"
import Location from "./Location"
import Holidays from "./Holidays"
import AllOrganizations from "./AllOrganizations"

const Organizations = () => {
	console.log(data);
	const front = [
		"HTML",
		"CSS",
		"Javascript",
		"JQUery",
		"React",
		"Vue",
	]
	const back = [
		"Django",
		"Node",
		"DWF",
	]
	const dataA = [
		"pandas",
		"power BI",
		"Numpy",
		"excel",
		"SQL"
	]
	const Blockchain = [
		"Hardhat",
		"NFT",
		"solidity",
		"Smart contracts",
	]
	const Learning = [
		"Questions",
	]

	const [currentTab, setCurrentTab] = useState(0)
	const [isPending, startTransition] = useTransition()

	const tabChangeHandler = (idx) => {
		startTransition(() => {
			setCurrentTab(idx)
		})
	}
	return (
		<div>
			<Tabs
				selectedIndex={currentTab}
				selectedTabClassName="tabs-styles"
				onSelect={tabChangeHandler}
			>
				<TabList className="tab_list-styles ">
					{
						data.map((i) => {
							return <Tab className="tab-styles">{i.topic}</Tab>
						})
					}

					{/* <Tab className="tab-styles">Department</Tab>
					<Tab className="tab-styles">Designation</Tab>
					<Tab className="tab-styles">Location</Tab>
					<Tab className="tab-styles">Holidays</Tab> */}
				</TabList>
				<Suspense fallback={<LoadingSpinner />}>
					<TabPanel>{!isPending && <AllOrganizations temp={front} id="1" />}</TabPanel>
					<TabPanel>{!isPending && <AllOrganizations temp={back} id="2"/>}</TabPanel>
					<TabPanel>{!isPending && <AllOrganizations temp={dataA}  id="3"/>}</TabPanel>
					<TabPanel>{!isPending && <AllOrganizations temp={Blockchain} id="4"/>}</TabPanel>
					<TabPanel>{!isPending && <AllOrganizations temp={front} id="1"/>}</TabPanel>
					<TabPanel>{!isPending && <AllOrganizations temp={Learning} id="6"/>}</TabPanel>
				</Suspense>
			</Tabs>
		</div>
	)
}

export default Organizations
