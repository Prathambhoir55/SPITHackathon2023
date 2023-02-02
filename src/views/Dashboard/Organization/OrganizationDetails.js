import { useState, useEffect } from "react"
import data from "../../../MCQdata/data"
import { useSelector, useDispatch } from "react-redux"
import { Navigate, useParams } from "react-router"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import {
	HiUserGroup,
	HiGlobeAlt,
	HiPlusCircle,
	HiHashtag,
	HiPlus,
} from "react-icons/hi"
import {
	organizationDetails,
	updateOrganization,
	organizationLocations,
	createOrganizationLocation,
	updateOrganizationLocation,
	toastReset,
} from "../../../store/slices/organization/organizationSlice"
import { allCities } from "../../../store/slices/location/locationSlice"
import {
	BigText,
	SectionHeader,
	Button,
	WrapperModal,
	Modal,
	InputTag,
	SubHeading,
	LoadingSpinner,
	RenderIf,
	AddressCard,
	FadedText,
	SelectTag,
} from "../../../components"
import DataTag from "../../../components/InputTags/dataTag"
import MCQTag from "../../../components/InputTags/MCQTag"
import Swal from "sweetalert2"

const OrganizationDetails = () => {
	localStorage.setItem("total", 0)
	localStorage.setItem("attempt", 0)
	const navi = useNavigate()
	const { orgID } = useParams();
	const [counter, setCounter] = useState(60);

	useEffect(() => {
		const timer =
			counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		if (counter == 0) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Time Over!',
				footer: ''
			}).then((result) => {
				if (result.isConfirmed) {
					navi("/admin/organizations/")
					// Swal.fire(
					// 	{`Score`}
					// 	'success'
					// )
				}
			})
		}
		return () => clearInterval(timer);
	}, [counter]);



	// useEffect(() => {
	// 	if (showToast) {
	// 		toast[success ? "success" : "error"](message)
	// 	}
	// 	return () => dispatch(toastReset())
	// }, [showToast, message, dispatch, success])

	// if (isLoading || locationLoading) {
	// 	return <LoadingSpinner />
	// }


	return (
		<div>
			<SectionHeader >
				{
					counter >= 10 ? <span className="text-green-800 text-lg">Time Remaining: {counter}</span>
						:
						<span className="text-red-800 text-lg">Time Remaining: {counter}</span>
				}
			</SectionHeader>

			{
				data.map((i) => {
					return i.id == orgID ? (i.Questions.map((q) => {
						return <div key={i.id}>
							<DataTag label={q.que}></DataTag>
							{
								q.op1.map((ans) => {
									return <MCQTag ques={i.Questions.length} value={ans} correct={q.correct}></MCQTag>
								})
							}
							<br />
						</div>
					})
					)
						:
						<></>
				})
			}
			<Button onClick={() => {
				Swal.fire({
					icon: 'success',
					title: 'Test Over...',
					footer: ''
				}).then((result) => {
					if (result.isConfirmed) {
						navi("/admin/organizations/")
						// Swal.fire(
						// 	{`Score`}
						// 	'success'
						// )
					}
				})
			}}>submit</Button>
		</div>
	)
}

export default OrganizationDetails
