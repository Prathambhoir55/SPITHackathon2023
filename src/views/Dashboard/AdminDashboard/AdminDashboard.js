import { useEffect } from "react";
import { BigText, RenderIf } from "../../../components";
import Attendance from "./components/Attendance";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGenderData,
  fetchBloodGroupData,
  fetchLeavesData,
} from "../../../store/slices/charts/chartsSlice";
import PieChart from "./components/Charts/PieChart";
import ChartCard from "./components/ChartCard";
import BarChart from "./components/Charts/BarChart";

const AdminDashboard = () => {
  const { isLoading, genderData, leavesData, bloodGroupData } = useSelector(
    (state) => state.charts
  );
  console.log(genderData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGenderData());
    dispatch(fetchLeavesData());
    dispatch(fetchBloodGroupData());
  }, [dispatch]);

  return (
    <div>
      <BigText>Home</BigText>
      <div className="">
        <div className="flex">
          <Attendance />
        </div>
        <div className="grid grid-cols-2 gap-10 p-5">
          {/* <ChartCard /> */}

          <RenderIf isTrue={genderData && genderData?.length > 0}>
            <div className="">
              <ChartCard title="Progress">
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
            <div className="">
              <ChartCard title="Mocks attended">
                <PieChart
                  labels={leavesData?.map((item) => {
                    return item?.status;
                  })}
                  colors={["#66BFBF", "#FFF89C", "#e61010"]}
                  dataSet={leavesData}
                  loading={isLoading}
                />
              </ChartCard>
            </div>
          </RenderIf>
        </div>
        <RenderIf isTrue={bloodGroupData && bloodGroupData?.length > 0}>
          <div className="sm:col-start-1 sm:col-end-6">
            <ChartCard title="Strong Domain">
              <BarChart
                labels={bloodGroupData?.map((item) => {
                  return item?.blood_group;
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
  );
};

export default AdminDashboard;
