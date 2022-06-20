export interface AuditLog {
  logId: number;
  applicationId: number | null;
  applicationType: string | null;
  companyId: number | null;
  actionType: string;
  ip: string;
  userAgent: string;
  userId: number | null;
  source: string | null;
  ownerId: string | null;
  logInfo: string | null;
  creationTimestamp: string;
}
export type AuditLogs = AuditLog[];

export interface Result {
  totalPages: number;
  number: number;
  recordsTotal: number;
  recordsFiltered: number;
  auditLog: AuditLogs;
}

export interface AuditLogsResponce {
  result?: Result;
  success: boolean;
  elapsed: number;
  message?: string;
}

export type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

export interface Filter {
  actionType: string;
  applicationType: string;
  fromDate: string;
  toDate: string;
  applicationId: number | null;
}

export interface Header {
  key: string;
  label: string;
  type: string;
  sort: null | string;
}
export type Headers = Header[];

export interface Tableinterface {
  heads: Headers;
  rows: AuditLogs | undefined;
  total: number;
  setCurrentPage: (num: number) => void;
  currentPage: number;
  setTableHeaders: React.Dispatch<React.SetStateAction<Headers>>;
}

export interface FilterProps {
  setApplyFilter: React.Dispatch<React.SetStateAction<boolean>>;
  applyFilter: boolean;
  currentPage: number;
  filterValues: Filter;
  tableHeaders: Headers;
  setTableHeaders: React.Dispatch<React.SetStateAction<Headers>>;
}
