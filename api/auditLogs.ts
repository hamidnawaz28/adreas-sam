import { get } from "../utils/http-methods";
import { AUDIT_LOG } from "./urls";

export const auditLogs = async () => {
  return await get(`${AUDIT_LOG}`);
};
