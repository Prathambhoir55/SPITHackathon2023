import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { HiCalendar, HiSearchCircle } from "react-icons/hi";
import {
  InputTag,
  Button,
  SubHeading,
  LoadingSpinner,
  RenderIf,
  AttendanceTableAdmin,
  NoteText,
  FadedText,
  TransitionBtoT,
} from "../../../../components";
import MyCalendar from "./Calendar";
import CalendarDemo from "./CalendarDemo";
import {
  fetchAllAttendanceDateFilter,
  allEmployeeAttendance,
  toastReset,
} from "../../../../store/slices/Attendance/attendanceSlice";

const Attendance = () => {
  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [attendanceView, setAttendanceView] = useState("0");
  const { isLoading, showToast, message, success, allAttendance } = useSelector(
    (state) => state.attendance
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const attendanceWithDateFiltersHandlers = (e) => {
    e.preventDefault();
    dispatch(fetchAllAttendanceDateFilter(dateFilter));
  };

  const handlePageClick = useCallback(
    (e) => {
      if (e) {
        dispatch(allEmployeeAttendance(e.selected + 1));
        setCurrentPage(e.selected);
      }
    },
    [dispatch]
  );

  const navigateTo = (date) => navigate(`attendance-by-date/${date}`);

  useEffect(() => {
    dispatch(allEmployeeAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (showToast) {
      toast[success ? "success" : "error"](message);
    }
    return () => dispatch(toastReset());
  }, [showToast, message, dispatch, success]);
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <SubHeading>All Attendance</SubHeading>
      <RenderIf isTrue={allAttendance && allAttendance?.data?.length > 0}>
        <div className="flex align-middle">
          <NoteText>Attendance View</NoteText>
          <div className="flex">
            <select
              value={attendanceView}
              onChange={(e) => setAttendanceView(e.target.value)}
              className="py-1 rounded-2xl border borderColor block dark:bg-purple_5 shadow-sm dark:shadow-lg">
              <option value="">Select</option>
              <option value="0">Calendar</option>
              <option value="1">Table</option>
            </select>
          </div>
          <div className="mx-auto w-96 ">
            Legend:
            <div class="flex items-center">
              <div className="w-4 h-4 rounded-sm bg-red-400 flex inline-block"></div>
              <div className="pl-2">
                <span>Reschedule restricted (HigH Priority)</span>
              </div>
            </div>
            <div class="flex items-center">
              <div className="w-4 h-4 rounded-sm bg-blue-500 flex inline-block"></div>
              <div className="pl-2">
                <span>Reschedule permitted (Low Priority)</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-6">
          {attendanceView === "1" && (
            <TransitionBtoT>
              <NoteText>Filters</NoteText>
              <form
                onSubmit={attendanceWithDateFiltersHandlers}
                className="sm:grid sm:grid-cols-3 sm:gap-2 sm:max-w-md items-center sm:items-end mb-2">
                <InputTag
                  Icon={HiCalendar}
                  value={dateFilter.from}
                  onChange={(e) =>
                    setDateFilter((prev) => ({
                      ...prev,
                      from: e.target.value,
                    }))
                  }
                  label="From"
                  type="date"
                  placeholder="Select start date"
                />
                <InputTag
                  Icon={HiCalendar}
                  value={dateFilter.to}
                  onChange={(e) =>
                    setDateFilter((prev) => ({ ...prev, to: e.target.value }))
                  }
                  label="To"
                  type="date"
                  placeholder="Select end date"
                />
                <div className="sm:mb-1 sm:ml-3">
                  <Button type="submit" Icon={HiSearchCircle}>
                    Search
                  </Button>
                </div>
              </form>
              <AttendanceTableAdmin
                content={allAttendance?.data}
                rowsPerPage={10}
                onClick={navigateTo}
                pageCount={allAttendance?.count}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
              />
            </TransitionBtoT>
          )}
          {attendanceView === "0" && (
            <TransitionBtoT>
              {/* <MyCalendar content={allAttendance?.data} onClick={navigateTo} /> */}
              <CalendarDemo />
            </TransitionBtoT>
          )}
        </div>
      </RenderIf>
      <RenderIf isTrue={!allAttendance || allAttendance?.data?.length < 1}>
        <TransitionBtoT>
          <FadedText>Found nothing</FadedText>
        </TransitionBtoT>
      </RenderIf>
    </div>
  );
};

export default Attendance;
