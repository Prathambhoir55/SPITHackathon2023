import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { HiPlusCircle, HiQuestionMarkCircle } from "react-icons/hi"
import { FiType } from "react-icons/fi"
import { AiOutlineBook } from "react-icons/ai"

import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "../../../assets/styles/react-tabs.css"
import {
	// Allowance
	allAllowances,
	createAllowance,
	deleteAllowance,
	// Dedution
	allDeductions,
	createDeductions,
	deleteDeduction,
	toastReset,
} from "../../../store/slices/finance/financeSlice"
// Components
import {
	Button,
	Modal,
	SectionHeader,
	InputTag,
	LoadingSpinner,
	TransitionBtoT,
	RenderIf,
} from "../../../components"
import {
	SubHeading,
	TextareaTag,
	FadedText,
	AllowanceTable,
	WarningModal,
} from "../../../components"
// Importing componts for tabs
import Bank from "../Organization/Bank"
import Expenses from "./Expenses"

const Finance = () => {
	const [domain, setDomain] = useState()
	const CardSmall = ({ idx, name, children, value }) => {
		const { currentTheme, colors } = useSelector((state) => state.theme)
		return (
			<div style={{ cursor: "pointer" }} onClick={() => {
				setDomain([...domain, {
					"domain": value
				}])
			}} className="shadow-sm border borderColor px-4 py-3 rounded-lg bg-[#f7f6f9] dark:bg-purple_5 relative">
				<h4
					className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
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

	const [newAllowance, setNewAllowance] = useState({
		name: "",
		description: "",
	})
	const [newDeduction, setNewDeduction] = useState({
		name: "",
		description: "",
	})
	const [allowanceId, setAllowanceId] = useState("")
	const [showAllowanceWarning, setShowAllowanceWarning] = useState(false)
	const [showDeductionWarning, setShowDeductionWarning] = useState(false)
	const [file, setFile] = useState()

    function handleChange(event) {
        setFile(event.target.files[0])
    }

	const { isLoading, allowances, deductions, success, message, showToast } =
		useSelector((state) => state.finance)
	const dispatch = useDispatch()

	const createAllowanceHandler = (e) => {
		e.preventDefault()
		dispatch(createAllowance(newAllowance))
		setNewDeduction({
			name: "",
			description: "",
		})
	}
	const createDeductionHandler = (e) => {
		e.preventDefault()
		dispatch(createDeductions(newDeduction))
		setNewAllowance({
			name: "",
			description: "",
		})
	}
	const deleteAllowanceHandler = () => {
		dispatch(deleteAllowance(allowanceId))
		setShowAllowanceWarning(false)
		setAllowanceId("")
	}
	const deleteDeductionHandler = (id) => {
		dispatch(deleteDeduction(id))
		setShowDeductionWarning(false)
		setAllowanceId("")
	}

	// Deduction delete warning modal
	const showDeductionDeleteModalHandler = (id) => {
		setShowDeductionWarning(true)
		setAllowanceId(id)
	}
	const closeDeductionDeleteModalHandler = (id) => {
		setShowDeductionWarning(false)
		setAllowanceId("")
	}
	// Allowance delete warning modal
	const showAllowanceDeleteModalHandler = (id) => {
		setShowAllowanceWarning(true)
		setAllowanceId(id)
	}
	const closeAllowanceDeleteModalHandler = (id) => {
		setShowAllowanceWarning(false)
		setAllowanceId("")
	}

	useEffect(() => {
		dispatch(allAllowances())
		dispatch(allDeductions())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])


	// if (isLoading) {
	// 	return <LoadingSpinner />
	// }

	var DOMAINCHOICES = [
		{ "value": "FD", "data": "Frontend Development" },
		{ "value": "BD", "data": "Backend Development" },
		{ "value": "DS", "data": "Data Science" },
		{ "value": "SD", "data": "Software Development" },
		{ "value": "ML", "data": "Machine Learning" },
	]
	var PROFESSION_CHOICES = [
		{ "value": "ST", "data": "Student" },
		{ "value": "DEV", "data": "Developer" },
		{ "value": "MGM", "data": "Management" },
		{ "value": "OTH", "data": "Others" },
	]

	var IMPROVEMENT_CHOICES =
		[
			{ "value": "1", "data": "I often feel others don't understand what I am saying" },
			{ "value": "2", "data": "I tend to speak too fast" },
			{ "value": "3", "data": "I can sometimes be too dominant in meetings" },
			{ "value": "4", "data": "I would like to feel less anxious in interviews" },
			{ "value": "5", "data": "I use a lot of filler (like 'um')" },
			{ "value": "6", "data": "I feel I ramble sometimes" },
		]
	return (
		<div>
			<Tabs selectedTabClassName="tabs-styles">
				<TabList className="tab_list-styles ">
					<Tab className="tab-styles">Domain Choices</Tab>
					<Tab className="tab-styles">Profession Choice</Tab>
					<Tab className="tab-styles">Improvement choice</Tab>
					<Tab className="tab-styles">Resume upload</Tab>
				</TabList>
				<TabPanel>
					<div className="grid md:grid-cols-4 gap-3">
						{DOMAINCHOICES.map((item, idx) => (
							<TransitionBtoT key={idx}>
								<CardSmall value={item.value} idx={idx + 1} name={item.data} />
							</TransitionBtoT>
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="grid md:grid-cols-4 gap-3">
						{PROFESSION_CHOICES.map((item, idx) => (
							<TransitionBtoT key={idx}>
								<CardSmall value={item.value} idx={idx + 1} name={item.data} />
							</TransitionBtoT>
						))}
					</div>
				</TabPanel>

				<TabPanel>
					<div className="grid md:grid-cols-4 gap-3">
						{IMPROVEMENT_CHOICES.map((item, idx) => (
							<TransitionBtoT key={idx}>
								<CardSmall value={item.value} idx={idx + 1} name={item.data} />
							</TransitionBtoT>
						))}
					</div>
				</TabPanel>
				<TabPanel>
				<div className="relative w-full mb-3">
                <label
                    className="flex items-center text-slate-500 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                >
                    <AiOutlineBook className="mr-1" />
                    Resume
                </label>
                <input
                    onChange={handleChange}
                    name="file"
                    type="file"
                    className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
                    required
                />
            </div>
				</TabPanel>
			</Tabs>

			{/* Warning modals */}
			{/* Allowance delete warning */}
			{showAllowanceWarning && (
				<WarningModal
					close={closeAllowanceDeleteModalHandler}
					submit={deleteAllowanceHandler}
				/>
			)}
			{/* Deduction delete warning */}
			{showDeductionWarning && (
				<WarningModal
					close={closeDeductionDeleteModalHandler}
					submit={deleteDeductionHandler}
				/>
			)}

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Finance