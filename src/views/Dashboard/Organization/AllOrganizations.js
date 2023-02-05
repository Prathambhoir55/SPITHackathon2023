import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { HiPlus, HiUserGroup, HiDocumentSearch } from "react-icons/hi";
import {
  allOrganization,
  createOrganization,
  toastReset,
} from "../../../store/slices/organization/organizationSlice";
import {
  RenderIf,
  SectionHeader,
  InputTag,
  WrapperModal,
  Button,
  SubHeading,
  CardSmall,
  FadedText,
  TransitionBtoT,
  LoadingSpinner,
} from "../../../components";

const AllOrganizations = ({ temp, id }) => {
  const [showModal, setShowModal] = useState(false);
  const [orgName, setOrgName] = useState("");
  const { showToast, message, success, isLoading, organizations } = useSelector(
    (state) => state.organization
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orgCreateHandler = (e) => {
    e.preventDefault();
    dispatch(createOrganization({ name: orgName }));
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(allOrganization());
  }, [dispatch]);

  useEffect(() => {
    if (showToast) {
      toast[success ? "success" : "error"](message);
    }
    return () => dispatch(toastReset());
  }, [showToast, message, dispatch, success]);

  // if (isLoading) {
  // 	return <LoadingSpinner />
  // }

  return (
    <>
      <SectionHeader text="Aptitute tests"></SectionHeader>

      {/* All the organizations */}
      <SubHeading>Stacks</SubHeading>
      <div className="grid md:grid-cols-4 gap-3">
        {temp?.map((item, idx) => (
          <TransitionBtoT key={idx}>
            <CardSmall idx={idx + 1} name={item}>
              <HiDocumentSearch
                onClick={() => navigate(`organization-details/${id}`)}
                className="text-slate-500 absolute top-2 right-2 text-lg cursor-pointer"
              />
            </CardSmall>
          </TransitionBtoT>
        ))}
      </div>
      <RenderIf isTrue={organizations && organizations?.length < 1}>
        <FadedText>No organization found</FadedText>
      </RenderIf>

      {/* Loading spinner */}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default AllOrganizations;
