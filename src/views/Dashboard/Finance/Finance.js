import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiPlusCircle, HiQuestionMarkCircle } from "react-icons/hi";
import { FiType } from "react-icons/fi";
import { AiOutlineBook } from "react-icons/ai";
import { FlashcardComponent } from 'react-flashcard'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../../assets/styles/react-tabs.css";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom"
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
} from "../../../store/slices/finance/financeSlice";
// Components
import {
  Button,
  Modal,
  SectionHeader,
  InputTag,
  LoadingSpinner,
  TransitionBtoT,
  RenderIf,
} from "../../../components";
import {
  SubHeading,
  TextareaTag,
  FadedText,
  AllowanceTable,
  WarningModal,
} from "../../../components";
// Importing componts for tabs
import Bank from "../Organization/Bank";
import Expenses from "./Expenses";
import Cards from "./Cards";
import Temp from "./tempCards";
var axios = require('axios');
var FormData = require('form-data');
// var fs = require('fs');

const Finance = () => {
  const [domain, setDomain] = useState();
  const CardSmall = ({ idx, name, children, value }) => {
    const { currentTheme, colors } = useSelector((state) => state.theme);

    return (
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setDomain([
            ...domain,
            {
              domain: value,
            },
          ]);
        }}
        className="shadow-sm border borderColor px-4 py-3 rounded-lg bg-[#f7f6f9] dark:bg-purple_5 relative">
        <h4
          className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
            }`}>
          {idx}
        </h4>
        {name && (
          <p className="font-normal dark:text-slate-300 text-slate-700">
            {name}
          </p>
        )}
        {children}
      </div>
    );
  };
  const navigate = useNavigate();
  const [newAllowance, setNewAllowance] = useState({
    name: "",
    description: "",
  });
  const [newDeduction, setNewDeduction] = useState({
    name: "",
    description: "",
  });
  const [allowanceId, setAllowanceId] = useState("");
  const [showAllowanceWarning, setShowAllowanceWarning] = useState(false);
  const [showDeductionWarning, setShowDeductionWarning] = useState(false);
  const [file, setFile] = useState();
  const [name, setName] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const { isLoading, allowances, deductions, success, message, showToast } =
    useSelector((state) => state.finance);
  const dispatch = useDispatch();

  const createAllowanceHandler = (e) => {
    e.preventDefault();
    dispatch(createAllowance(newAllowance));
    setNewDeduction({
      name: "",
      description: "",
    });
  };
  const createDeductionHandler = (e) => {
    e.preventDefault();
    toast("Creating summary and flash cards")
    var data = new FormData();
    data.append('file', file);
    data.append('name', name);

    var config = {
      method: 'post',
      url: 'https://95d5-2402-3a80-6ff-3e4d-c83b-8d43-d444-56e7.in.ngrok.io/openaiapp/summary/',
      headers: {
        // ...data.getHeaders()
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteAllowanceHandler = () => {
    dispatch(deleteAllowance(allowanceId));
    setShowAllowanceWarning(false);
    setAllowanceId("");
  };
  const deleteDeductionHandler = (id) => {
    dispatch(deleteDeduction(id));
    setShowDeductionWarning(false);
    setAllowanceId("");
  };

  // Deduction delete warning modal
  const showDeductionDeleteModalHandler = (id) => {
    setShowDeductionWarning(true);
    setAllowanceId(id);
  };
  const closeDeductionDeleteModalHandler = (id) => {
    setShowDeductionWarning(false);
    setAllowanceId("");
  };
  // Allowance delete warning modal
  const showAllowanceDeleteModalHandler = (id) => {
    setShowAllowanceWarning(true);
    setAllowanceId(id);
  };
  const closeAllowanceDeleteModalHandler = (id) => {
    setShowAllowanceWarning(false);
    setAllowanceId("");
  };

  useEffect(() => {
    dispatch(allAllowances());
    dispatch(allDeductions());
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

  var DOMAINCHOICES = [
    { value: "FD", data: "Frontend Development" },
    { value: "BD", data: "Backend Development" },
    { value: "DS", data: "Data Science" },
    { value: "SD", data: "Software Development" },
    { value: "ML", data: "Machine Learning" },
  ];
  var PROFESSION_CHOICES = [
    { value: "ST", data: "Student" },
    { value: "DEV", data: "Developer" },
    { value: "MGM", data: "Management" },
    { value: "OTH", data: "Others" },
  ];

  var IMPROVEMENT_CHOICES = [
    {
      value: "1",
      data: "I often feel others don't understand what I am saying",
    },
    { value: "2", data: "I tend to speak too fast" },
    { value: "3", data: "I can sometimes be too dominant in meetings" },
    { value: "4", data: "I would like to feel less anxious in interviews" },
    { value: "5", data: "I use a lot of filler (like 'um')" },
    { value: "6", data: "I feel I ramble sometimes" },
  ];
  const cardData = [
    {
      front: {
        text: "living outside, often in a tent",
        image: "https://o.quizlet.com/RWRdgDus.uuqNDUrJ0ernA.jpg",
      },
      back: {
        text: "Camping",
      }
    }
  ]
  console.log(file);
  const { currentTheme, colors } = useSelector((state) => state.theme)

  return (
    <div>
      <Tabs selectedTabClassName="tabs-styles">
        <TabList className="tab_list-styles ">
          <Tab className="tab-styles">Notes</Tab>
          <Tab className="tab-styles">Flash cards</Tab>
          <Tab className="tab-styles">Summary</Tab>
        </TabList>
        <TabPanel>
          <SectionHeader>
            {/* Deduction create modal */}
            <Modal
              title="Add new deduction"
              activator={({ setShow }) => (
                <Button Icon={HiPlusCircle} onClick={() => setShow(true)}>
                  Add
                </Button>
              )}>
              <form onSubmit={createDeductionHandler}>
                <InputTag
                  Icon={FiType}
                  label="Notes"
                  type="file"
                  // placeholder="Enter deduction name"
                  // value={newDeduction.name}
                  onChange={(e) =>
                    setFile(() => e.target.files[0])
                  }
                />
                <InputTag
                  Icon={FiType}
                  label="name"
                  type="text"
                  placeholder="Enter topic name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
                <Button type="submit"
                  Icon={HiPlusCircle}>
                  Create
                </Button>
              </form>
            </Modal>
          </SectionHeader>
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
                <div onClick={() => navigate(`idx`)} className="shadow-sm border borderColor px-4 py-3 rounded-lg bg-[#f7f6f9] dark:bg-purple_5 relative">
                  <h4
                    className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
                      }`}
                  >
                    {idx}
                  </h4>
                  {item.data && (
                    <p className="font-normal dark:text-slate-300 text-slate-700">{item.data}</p>
                  )}
                  {/* {item.data} */}
                </div>
                { }
              </TransitionBtoT>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-3">
            {IMPROVEMENT_CHOICES.map((item, idx) => (
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Accordion 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="relative w-full mb-3">
            <label
              className="flex items-center text-slate-500 text-xs font-semibold mb-2"
              htmlFor="grid-password">
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
  );
};

export default Finance;
