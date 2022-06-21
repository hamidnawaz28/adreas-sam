import chai from "chai";
import { compare } from "../utils/utility";
import _ from "lodash";

const { expect } = chai;

describe("UF~1: Test Utils Function", () => {
  it("If we are able to arrange them in ascending order", () => {
    const data = [{ logId: 14 }, { logId: 12 }];
    const orderedData = [{ logId: 12 }, { logId: 14 }];
    const ascendingOrder = data.sort(compare("logId"));
    const ifEqual = _.isEqual(orderedData, ascendingOrder);
    expect(ifEqual).to.be.true;
  });

  it("If we are able to arrange them in decending order", () => {
    const data = [{ logId: 12 }, { logId: 15 }];
    const orderedData = [{ logId: 15 }, { logId: 12 }];
    const decendingOrder = data.sort(compare("logId", true));
    const ifEqual = _.isEqual(orderedData, decendingOrder);
    expect(ifEqual).to.be.true;
  });
});
