import { NextPage } from "next";
import React, { useState } from "react";
import { useAuditFilter } from "../hooks";
import { Filter, Headers } from "../ts/common";
import {
  Table,
  Input,
  SingleSelect,
  Button,
  Form,
  Breadcrumbs,
} from "../components";

const initalFiltersValues = {
  actionType: "",
  applicationType: "",
  fromDate: "",
  toDate: "",
  applicationId: null,
};

const tableHeadersInitial = [
  {
    key: "logId",
    label: "Log ID",
    type: "number",
    sort: null,
  },
  {
    key: "applicationType",
    label: "Application Type",
    type: "string",
    sort: null,
  },
  {
    key: "applicationId",
    label: "Application Id",
    type: "string",
    sort: null,
  },
  {
    key: "actionType",
    label: "Action Type",
    type: "string",
    sort: null,
  },
  {
    key: "actionDetails",
    label: "Action Details",
    type: "string",
    sort: null,
  },
  {
    key: "creationTimestamp",
    label: "Date: Time",
    type: "date",
    sort: null,
  },
];

const Home: NextPage = () => {
  const [filterValues, setFilterValues] = useState<Filter>(initalFiltersValues);
  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableHeaders, setTableHeaders] =
    useState<Headers>(tableHeadersInitial);

  const { logs, totalRecords, actionTypes, applicationTypes } = useAuditFilter({
    setApplyFilter,
    applyFilter,
    currentPage,
    filterValues,
    tableHeaders,
    setTableHeaders,
  });

  const submitHandle = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    setApplyFilter(true);
  };

  const valueChangeHandle = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFilterValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const setCurrentPageHandle = (page: number) => {
    setFilterValues(initalFiltersValues);
    setCurrentPage(page);
  };

  return (
    <div>
      <Breadcrumbs data={["Home", "Administration", "Logger search"]} />
      <Form onSubmit={submitHandle}>
        <SingleSelect
          label="Action Type"
          name="actionType"
          options={actionTypes}
          onChange={valueChangeHandle}
        />
        <SingleSelect
          label="Application Type"
          name="applicationType"
          options={applicationTypes}
          onChange={valueChangeHandle}
        />
        <Input
          type="date"
          name="fromDate"
          label="From Date"
          placeholder=""
          onChange={valueChangeHandle}
        />
        <Input
          type="date"
          name="toDate"
          label="To Date"
          placeholder=""
          onChange={valueChangeHandle}
        />
        <Input
          type="text"
          name="applicationId"
          label="Application Id"
          placeholder="e.g. 657199561191750"
          onChange={valueChangeHandle}
        />
        <Button type="submit" label="Search Logger" />
      </Form>
      <Table
        heads={tableHeaders}
        setTableHeaders={setTableHeaders}
        rows={logs}
        total={totalRecords}
        currentPage={currentPage}
        setCurrentPage={setCurrentPageHandle}
      />
    </div>
  );
};

export default Home;
