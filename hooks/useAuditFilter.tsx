import React, { useEffect, useState } from "react";
import { auditLogs as getAuditLogs } from "../api/auditLogs";
import { AuditLogs, FilterProps } from "../ts/common";
import {
  compare,
  filterUniqueEntries,
  rangeFilter,
  getTimeStamp,
} from "../utils/utility";

const useFilter = ({ ...props }: FilterProps) => {
  const {
    setApplyFilter,
    applyFilter,
    currentPage,
    filterValues,
    tableHeaders,
    setTableHeaders,
  } = props;
  const [auditLogs, setAuditLogs] = useState<AuditLogs>();
  const [logs, setLogs] = useState<AuditLogs>();

  const [actionTypes, setActionTypes] = useState<string[]>([]);
  const [applicationTypes, setApplicationTypes] = useState<string[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const getLogs = async () => {
    const auditLogResp = await getAuditLogs();
    if (auditLogResp.result) {
      const logs = auditLogResp.result.auditLog;
      const totalRecords = auditLogResp.result.recordsFiltered;
      setTotalRecords(totalRecords);

      const appTypes = filterUniqueEntries(logs, "applicationType");
      setApplicationTypes(appTypes);

      const actionTypes = filterUniqueEntries(logs, "actionType");
      setActionTypes(actionTypes);
      setAuditLogs(logs);
      setLogs(rangeFilter(logs, currentPage));
    }
  };

  // Get API data on first render, and filter application typea nad action types
  useEffect(() => {
    getLogs();
  }, []);

  //  Filters
  useEffect(() => {
    if (auditLogs) {
      // Get paginated data
      setTableHeaders((preData) =>
        preData.map((head) => ({ ...head, sort: null }))
      );
      const data = rangeFilter(auditLogs, currentPage);
      const { fromDate, toDate, applicationId, applicationType, actionType } =
        filterValues;

      const afterFilter =
        data?.filter((el) =>
          applicationId != null
            ? el.applicationId == applicationId
            : true && applicationType != ""
            ? el.applicationType == applicationType
            : true && actionType != ""
            ? el.actionType == actionType
            : true && fromDate != ""
            ? getTimeStamp(el.creationTimestamp) >= getTimeStamp(fromDate)
            : true && toDate != ""
            ? getTimeStamp(el.creationTimestamp) <= getTimeStamp(toDate)
            : true
        ) || [];

      setLogs(afterFilter);
      setApplyFilter(false);
    }
  }, [applyFilter, currentPage]);

  // Sorting
  useEffect(() => {
    if (logs?.length) {
      let filteredLogs = [...logs];
      tableHeaders.forEach((header) => {
        if (header.sort != null) {
          filteredLogs = filteredLogs.sort(
            compare(header.key, header.sort == "decending" ? true : false)
          );
        }
      });
      setLogs(filteredLogs);
    }
  }, [tableHeaders]);
  return { logs: logs, totalRecords, actionTypes, applicationTypes };
};

export default useFilter;
