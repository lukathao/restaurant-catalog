import "@testing-library/jest-dom";
import { daysInBetween, firstDayOfMonth, lastDayOfMonth, monthlyCharge, Subscription, User } from "./subservice.service";

describe("Subscription Test", () => {
  it("gets correct days in between", () =>{
    const testDays = daysInBetween(firstDayOfMonth(new Date()), lastDayOfMonth(new Date()))
    // August
    expect(testDays).toBe(31);
  });
  //case 1: user is active before the first of the month, and has no deactivated date
  //return days from first of the month until today
  it("gets correct cost for case1", () =>{ 
    let users: User[] = [];
    const user = getUserCase1();
    users.push(user)
    const testCost = monthlyCharge("082024", getTestSubscription(), users);
    const pricePerDay = getPricePerDay();
    const activeDays = Math.floor(daysInBetween(firstDayOfMonth(new Date()), new Date()));
    const actualCost = Math.round( activeDays * pricePerDay);
    expect(testCost).toBe(actualCost);
  });
  //case 2: user is active before the first of the month, but deactivated before today
  //return days from first of the month until deactivatd day
  it("gets correct cost for case 2", () =>{
    let users: User[] = [];
    const user = getUserCase2();
    users.push(user);
    const testCost = monthlyCharge("082024", getTestSubscription(), users);
    const pricePerDay = getPricePerDay();
    let activeDays = 0;
    if (user.deactivatedOn != null) {
      activeDays = daysInBetween(firstDayOfMonth(new Date()), user.deactivatedOn);
    }
    const actualCost = Math.round(activeDays * pricePerDay);
    expect(testCost).toBe(actualCost);
  });
  //case 3: user is active after the first of the month, and has no deactivated date
  //return days from active to today
  it("gets correct cost for case 3", () => {
    let users: User[] = [];
    const user = getUserCase3();
    users.push(user)
    const testCost = monthlyCharge("082024", getTestSubscription(), users);
    const pricePerDay = getPricePerDay();
    let activeDays = 0;
    activeDays = daysInBetween(user.activatedOn, new Date());
    const actualCost = Math.round(activeDays * pricePerDay);
    expect(testCost).toBe(actualCost);
  });
  //case 4: user is active after the first of the month, and deactivated before today
  //return days from active to deactivated
  it("gets correct cost for case 4", () => {
    let users: User[] = [];
    const user = getUserCase4();
    users.push(user);
    console.log(user);
    const testCost = monthlyCharge("082024", getTestSubscription(), users);
    const pricePerDay = getPricePerDay();
    let activeDays = 0;
    if (user.deactivatedOn != null) {
      activeDays = Math.floor(daysInBetween(user.activatedOn, user.deactivatedOn));
    }
    const actualCost = Math.round(activeDays * pricePerDay);
    expect(testCost).toBe(actualCost);
  });
  //case 5: user deactivated before the first of the month, and has not reactivated before the first of the month
  //return 0, no active days in the month
  it("gets correct cost for case 5", () => {
    let users: User[] = [];
    const user = getUserCase5();
    users.push(user);
    const testCost = monthlyCharge("082024", getTestSubscription(), users);
    const pricePerDay = getPricePerDay();
    let activeDays = 0;
    if (user.deactivatedOn != null) {
      activeDays = 0
    }
    const actualCost = Math.round(activeDays * pricePerDay);
    expect(testCost).toBe(actualCost);
  });
  //case 6: user deactivated before the first of the month, and reactivated before the first of the month
  //return days from first of the month until today
  it("gets correct cost for case 6", () => {
    let users: User[] = [];
    const user = getUserCase6();
    users.push(user);
    const testCost = monthlyCharge("082024", getTestSubscription(), users);
    const pricePerDay = getPricePerDay();
    let activeDays = 0;
    if (user.deactivatedOn != null) {
      activeDays = daysInBetween(firstDayOfMonth(new Date()), new Date());
    }
    const actualCost = Math.round(activeDays * pricePerDay);
    expect(testCost).toBe(actualCost);
  });
  //case 7: user deactivated before the first of the month, and activated after or on the first of the month
  //return days from activated date to today
  it("gets correct cost for case 7", () => {
    let users: User[] = [];
    const user = getUserCase7();
    users.push(user)
    const testCost = monthlyCharge("082024", getTestSubscription(), users);
    const pricePerDay = getPricePerDay();
    let activeDays = 0;
    if (user.deactivatedOn != null) {
      activeDays = daysInBetween(user.activatedOn, new Date());
    }
    const actualCost = Math.round(activeDays * pricePerDay);
    expect(testCost).toBe(actualCost);
  });
  //case 8: user deactivated after the first of the month, and reactivated before or on today
  //return days from first of month to deactivated day and days from activated day until today
  it("gets correct cost for case 8", () => {
    let users: User[] = [];
    const user = getUserCase8();
    users.push(user)
    const testCost = monthlyCharge("082024", getTestSubscription(), users);
    const pricePerDay = getPricePerDay();
    let activeDays = 0;
    if (user.deactivatedOn != null) {
      activeDays = daysInBetween(firstDayOfMonth(new Date()), user.deactivatedOn) + daysInBetween(user.activatedOn, new Date());
    }
    const actualCost = Math.round(activeDays * pricePerDay);
    expect(testCost).toBe(actualCost);
  });
});

function getTestSubscription(): Subscription {
  let sub: Subscription = {
    "customerId": 123,
    "id" : 1,
    "monthlyPriceInCents": 1000
  };
  return sub;
}

function getPricePerDay(): number {
  return getTestSubscription().monthlyPriceInCents / Math.floor(daysInBetween(firstDayOfMonth(new Date()), lastDayOfMonth(new Date())));
}

//cases when there is active subscription:

//case 1: user is active before the first of the month, and has no deactivated date or deactive date in the future
//return days from first of the month until today
function getUserCase1(): User {
  let dateMonthAgo = new Date();
  dateMonthAgo.setMonth(dateMonthAgo.getMonth() - 1);
  return {
    "id": 1,
    "name": "user"+1,
    "customerId": 1,
    "activatedOn": dateMonthAgo,
    "deactivatedOn" : null,
  }
}
//case 2: user is active before the first of the month, but deactivated before today
//return days from first of the month until deactivated day
function getUserCase2(): User {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let dateAYearAgo = new Date();
  dateAYearAgo.setFullYear(dateAYearAgo.getFullYear() - 1);
  return {
    "id": 2,
    "name": "user"+2,
    "customerId": 2,
    "activatedOn": dateAYearAgo,
    "deactivatedOn" : yesterday,
  }

}
//case 3: user is active after the first of the month, and has no deactivated date
//return days from active to today
function getUserCase3(): User {
  let activeDate = new Date();
  activeDate.setDate(activeDate.getDate() - 2);
  return {
    "id": 3,
    "name": "user"+3,
    "customerId": 3,
    "activatedOn": activeDate,
    "deactivatedOn" : null,
  }
}
//case 4: user is active after the first of the month, and deactivated before today
//return days from active to deactivated
function getUserCase4(): User {
  let activeDate = new Date();
  activeDate.setDate(activeDate.getDate() - 10);
  let deactiveDate = new Date();
  deactiveDate.setDate(deactiveDate.getDate() - 1);
  return {
    "id": 4,
    "name": "user"+4,
    "customerId": 4,
    "activatedOn": activeDate,
    "deactivatedOn" : deactiveDate,
  };
}
//case 5: user deactivated before the first of the month, and has not reactivated before the first of the month
//return 0, no active days in the month
function getUserCase5(): User {
  let dateMonthAgo = new Date();
  dateMonthAgo.setMonth(dateMonthAgo.getMonth() - 1);
  let dateAYearAgo = new Date();
  dateAYearAgo.setFullYear(dateMonthAgo.getFullYear() - 1);
  return {
    "id": 5,
    "name": "user"+5,
    "customerId": 5,
    "activatedOn": dateAYearAgo,
    "deactivatedOn" : dateMonthAgo,
  };
}
//case 6: user deactivated before the first of the month, and reactivated before the first of the month
//return days from first of the month until today
function getUserCase6(): User {
  let dateMonthAgo = new Date();
  dateMonthAgo.setMonth(dateMonthAgo.getMonth() - 1);
  let dateAYearAgo = new Date();
  dateAYearAgo.setFullYear(dateMonthAgo.getFullYear() - 1);
  return {
    "id": 6,
    "name": "user"+6,
    "customerId": 6,
    "activatedOn": dateMonthAgo,
    "deactivatedOn" : dateAYearAgo,
  };
}
//case 7: user deactivated before the first of the month, and activated after or on the first of the month
//return days from activated date to today
function getUserCase7(): User {
    let dateMonthAgo = new Date();
    dateMonthAgo.setMonth(dateMonthAgo.getMonth() - 1);
    let dateFewDaysAgo = new Date();
    dateFewDaysAgo.setDate(dateFewDaysAgo.getDate() - 5);
    return {
      "id": 7,
      "name": "user"+7,
      "customerId": 7,
      "activatedOn": dateFewDaysAgo,
      "deactivatedOn" : dateMonthAgo,
    };
}
//case 8: user deactivated after the first of the month, and reactivated before or on today
//return days from first of month to deactivated day and days from activated day until today
function getUserCase8(): User {
    let afterFirstOfMonth = new Date();
    afterFirstOfMonth.setDate(firstDayOfMonth(new Date()).getDate() + 2);
    let dateFewDaysAgo = new Date();
    dateFewDaysAgo.setDate(new Date().getDate() - 3);
    return {
      "id": 8,
      "name": "user"+8,
      "customerId": 8,
      "activatedOn": dateFewDaysAgo,
      "deactivatedOn" : afterFirstOfMonth,
    };
}
