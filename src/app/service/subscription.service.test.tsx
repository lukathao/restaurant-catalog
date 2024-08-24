import "@testing-library/jest-dom";
import { getSubscriptionCostForUser } from "./subscription.servce";
import moment from "moment";


describe("Subscription Service Test", () =>{
  it("Gets correct subscription cost when cancel date is null", () =>{
    const testCost = getSubscriptionCostForUser(null, 100);
    const firstDayOfMonth = moment().startOf('month');
    const daysOfUse = moment().diff(firstDayOfMonth, "days") + 1;
    const actualCost = Math.trunc((100 / moment().daysInMonth()) * (daysOfUse));
    expect(testCost).toBe(actualCost);
  });

  it("Gets correct subscription cost when cancel date is yesterday", () =>{
    const yesterday = moment().subtract(1, "day").toDate();
    const testCost = getSubscriptionCostForUser(yesterday, 100);
    const firstDayOfMonth =  moment().startOf('month');
    const daysOfUse = moment(yesterday).diff(firstDayOfMonth, "days") + 1;
    const actualCost = Math.trunc((100 / moment().daysInMonth()) * (daysOfUse));
    expect(testCost).toBe(actualCost);
  });

  it("Gets correct subscription cost when cancel date is in the future", () =>{
    const nextYearDate = moment().add(1, "year").toDate();
    const testCost = getSubscriptionCostForUser(nextYearDate, 100);
    const currentDate = moment().toDate();
    const firstDayOfMonth = moment().startOf('month');
    const daysOfUse = moment(currentDate).diff(firstDayOfMonth, "days") + 1;
    const actualCost = Math.trunc((100 / moment().daysInMonth()) * (daysOfUse));
    expect(testCost).toBe(actualCost);
  });
  
});
