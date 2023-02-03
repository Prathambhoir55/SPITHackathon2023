import { useEffect } from "react"
import { BigText, RenderIf } from "../../../components"
import Attendance from "./components/Attendance"
import { useSelector, useDispatch } from "react-redux"
import {
	fetchGenderData,
	fetchBloodGroupData,
	fetchLeavesData,
} from "../../../store/slices/charts/chartsSlice"
import PieChart from "./components/Charts/PieChart"
import ChartCard from "./components/ChartCard"
import BarChart from "./components/Charts/BarChart"

const AdminDashboard = () => {
	const { isLoading, genderData, leavesData, bloodGroupData } = useSelector(
		(state) => state.charts
	)
	console.log(genderData);
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchGenderData())
		dispatch(fetchLeavesData())
		dispatch(fetchBloodGroupData())
	}, [dispatch])

	return (
		<div>
			<BigText>Home</BigText>
			<div className="grid sm:grid-cols-10 grid-cols-1 gap-6 sm:grid-rows-3">
				<div className="sm:col-start-1 sm:col-end-8 sm:row-start-1 sm:row-end-3">
					<ChartCard>
						<Attendance />
					</ChartCard>
				</div>

				<RenderIf isTrue={genderData && genderData?.length > 0}>
					<div className="sm:col-start-8 sm:col-end-11">
						<ChartCard  title="Progress">
							<PieChart
								labels={["Jan", "Feb", "march", "April"]}
								colors={["#EED180", "#FFDEB4", "#FF8FB1", "#B7D3DF"]}
								dataSet={genderData}
								loading={isLoading}
							/>
						</ChartCard>
					</div>
				</RenderIf>
				<RenderIf isTrue={leavesData && leavesData?.length > 0}>
					<div className="sm:col-start-8 sm:col-end-11">
						<ChartCard title="Mocks attended">
							<PieChart
								labels={leavesData?.map((item) => {
									return item?.status
								})}
								colors={["#66BFBF", "#FFF89C", "#e61010"]}
								dataSet={leavesData}
								loading={isLoading}
							/>
						</ChartCard>
					</div>
				</RenderIf>
				<RenderIf isTrue={bloodGroupData && bloodGroupData?.length > 0}>
					<div className="sm:col-start-1 sm:col-end-6">
						<ChartCard title="Strong Domain">
							<BarChart
								labels={bloodGroupData?.map((item) => {
									return item?.blood_group
								})}
								colors={[
									"#0096FF",
									"#5BB318",
									"#EED180",
									"#76BA99",
									"#CA955C",
									"#7F5283",
									"#CA4E79",
									"#66BFBF",
									"#FF8B8B",
								]}
								dataSet={bloodGroupData}
								loading={isLoading}
							/>
						</ChartCard>
					</div>
				</RenderIf>
			</div>
		</div>
	)
}

export default AdminDashboard
