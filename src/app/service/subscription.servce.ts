import moment from "moment";

class MockUsers {
  name: String;
  canceledDate: Date | null | undefined;
  price: number;

  constructor(name: String) {
    this.name = name;
    this.canceledDate =null;
    this.price = 10000;
  }

  setCanceledDate(date: Date){
    this.canceledDate = date;
  }
}

let usersCanceledThisMonth = 0;
let usersCanceledLastMonth = 0;
let usersCanceledLastYear = 0;

const firstOfMonth = moment().startOf('month');

export function createMockUsers(): MockUsers[] {
  let users: MockUsers[] = [];
  const mockCanceledDateThisMonth: Date = moment("2024-08-10").toDate();
  const mockCanceledDateLastMonth: Date = moment("2024-07-10").toDate();
  const mockCanceledDateLastYear: Date = moment("2023-08-10").toDate();
  for (let i = 0; i <= 100; i++) {
    let user: MockUsers = new MockUsers(i.toString());
    if (i % 15 == 0) {
      user.setCanceledDate(mockCanceledDateThisMonth);
      usersCanceledThisMonth++;
    }
    if (i % 9 == 0) {
      user.setCanceledDate(mockCanceledDateLastMonth);
      usersCanceledLastMonth++;
    }
    if (i % 33 == 0) {
      user.setCanceledDate(mockCanceledDateLastYear)
      usersCanceledLastYear++;
    }
    users.push(user);
  }
  return users;
}

export function createMockUserFutureOneYear(): MockUsers[] {
  let users: MockUsers[] = [];
  let user: MockUsers = new MockUsers("future");
  user.canceledDate = moment().add(1, "year").toDate();
  users.push(user);
  return users;
}

export function createMockUserTomorrow(): MockUsers[] {
  let users: MockUsers[] = [];
  let user: MockUsers = new MockUsers("tomorrow");
  user.canceledDate = moment().add(1, "day").toDate();
  users.push(user);
  return users;
}

//if user canceled this month then get prorated cost
export function getSubscriptionCostForUser(cancelDate: Date | null | undefined, price: number) : number {
  //if cancel date is in the future or null
  //set it to today
  const currentDate = moment().toDate();
  if ((!cancelDate) || (cancelDate > currentDate)) {
    cancelDate = currentDate;
  }
  //get days in between and include today
  const daysOfUse: number = moment(cancelDate).diff(firstOfMonth, "days") + 1;
  const proratedCost = (price / moment().daysInMonth()) * (daysOfUse);
  //round down and drop decimal places, working with pennies
  return Math.trunc(proratedCost);
}

// if not working with pennies, then need to truncate to two decimal places
// Math.floor(x * 100) / 100



export function testCancelDateOnFirst() {
  //assume current date is the first
  const currentDate = moment("2024-08-01").toDate();
  const isEqual = moment(currentDate).isBefore(firstOfMonth);
  const daysInBetween: number = moment(currentDate).diff(firstOfMonth);
  console.log(isEqual);
  console.log(daysInBetween);
  return;
}

export function testEquivalency() {
  const nullDate = null; 
  const undefinedDate = undefined;
  let unSetData;
  if (!nullDate) {
    console.log("this catches nulls");
  }
  if (!undefinedDate) {
    console.log("this catches undefined");
  }
  if(!unSetData) {
    console.log("this catches unset");
  }
  return;
}

// Get the monthly total for subscriptions
export function getMonthlyTotal(): number {
  // testCancelDateOnFirst();
  testEquivalency();
  let total: number = 0;
  // const users = createMockUsers();
  // const users = createMockUserFutureOneYear();
  const users = createMockUserTomorrow();
  users.forEach(user => {
    try {
      if (!moment(user.canceledDate).isBefore(firstOfMonth) || (!user.canceledDate)) {
        total += getSubscriptionCostForUser(user.canceledDate, user.price);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return total;
}
