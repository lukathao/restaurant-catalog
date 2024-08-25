
export interface User {
  id: number;
  name: string;
  activatedOn: Date;
  deactivatedOn: Date | null;
  customerId: number;
}

export interface Subscription {
  id: number;
  customerId: number;
  monthlyPriceInCents: number;
}

export function createTestWithActiveUsers(): number {
  const sub = getTestSubscription();
  const users = getTestActiveUsers();
  const testMonthlyCharge = monthlyCharge("082024", sub, users);
  console.log(testMonthlyCharge);
  return testMonthlyCharge;
}

export function createTestWithNoActiveUsers(): number {
  const sub = getTestSubscription();
  const users = getTestNoActiveUsers();
  const testMonthlyCharge = monthlyCharge("082024", sub, users);
  console.log(testMonthlyCharge);
  return testMonthlyCharge;
}

export function createTestWithReActivedUsers(): number {
  const sub = getTestSubscription();
  const users = getTestReActivedUsers();
  const testMonthlyCharge = monthlyCharge("082024", sub, users);
  console.log(testMonthlyCharge);
  return testMonthlyCharge;
}

/**
 * Computes the monthly charge for a given subscription.
 *
 * @returns The total monthly bill for the customer in cents, rounded
 * to the nearest cent. For example, a bill of $20.00 should return 2000.
 * If there are no active users or the subscription is null, returns 0.
 *
 * @param month - Always present
 *   Has the following structure:
 *   "2022-04"  // April 2022 in YYYY-MM format
 *
 * @param subscription - May be null
 *   If present, has the following structure (see Subscription interface):
 *   {
 *     'id': 763,
 *     'customerId': 328,
 *     'monthlyPriceInCents': 359  // price per active user per month
 *   }
 *
 * @param users - May be empty, but not null
 *   Has the following structure (see User interface):
 *   [
 *     {
 *       id: 1,
 *       name: "Employee #1",
 *       customerId: 1,
 *   
 *       // when this user started
 *       activatedOn: new Date("2021-11-04"),
 *   
 *       // last day to bill for user
 *       // should bill up to and including this date
 *       // since user had some access on this date
 *       deactivatedOn: new Date("2022-04-10")
 *     },
 *     {
 *       id: 2,
 *       name: "Employee #2",
 *       customerId: 1,
 *   
 *       // when this user started
 *       activatedOn: new Date("2021-12-04"),
 *   
 *       // hasn't been deactivated yet
 *       deactivatedOn: null
 *     },
 *   ]
 */
export function monthlyCharge(yearMonth: string, subscription: Subscription | null, users: User[]): number {
  let total: number = 0;
  const daysInMonth = daysInBetween(firstDayOfMonth(new Date()), lastDayOfMonth(new Date()));
  let pricePerDay = 0;
  if (subscription !== null) {
    try {
      pricePerDay = subscription.monthlyPriceInCents / daysInMonth;
      users.forEach(user => {
        const activeDays = getNumberOfActiveDays(user);
        total+= activeDays * pricePerDay;
      });
      return Math.round(total);
    } catch (error) {
      console.log(error);
      return 0;
    }
  } else {
//     return 0 since subscription does not exist
//     or throw an error and handle it
    return 0;
  }
}
            
//get number of activate days for user
//cases when there is active subscription:
//case 1: user is active before the first of the month, and has no deactivated date or deactivated date in the future
//return days from first of the month until today
//case 2: user is active before the first of the month, but deactivated before today
//return days from first of the month until deactivatd day
//case 3: user is active after the first of the month, and has no deactivated date
//return days from active to today
//case 4: user is active after the first of the month, and deactivated before today
//return days from active to deactivated
//case 5: user deactivated before the first of the month, and has not reactivated before the first of the month
//return 0, no active days in the month
//case 6: user deactivated before the first of the month, and reactivated before the first of the month
//return days from first of the month until today
//case 7: user deactivated before the first of the month, and activated after or on the first of the month
//return days from activated date to today
//case 8: user deactivated after the first of the month, and reactivated before or on today
//return days from first of month to deactivated day and days from activated day until today
function getNumberOfActiveDays(user: User): number {
  const firstOfMonth = firstDayOfMonth(new Date());
  const lastOfMonth = lastDayOfMonth(new Date());
  const today = new Date();
  //case 1: user is active before the first of the month, and has no deactivated date or deactivated date in the future
  //return days from first of the month until today
  if ((user.activatedOn < firstOfMonth) && ((!user.deactivatedOn)||(user.deactivatedOn > today))) {
    console.log("user: " + user.id + " is hitting case 1");
    return daysInBetween(firstOfMonth, today);
  }
  //case 2: user is active before the first of the month, but deactivated before today and deactivated after first of month
  //return days from first of the month until deactivated day
  if ((user.activatedOn < firstOfMonth)&&(user.deactivatedOn!=null) && (user.deactivatedOn < today)&&(user.deactivatedOn > firstOfMonth)) {
    console.log("user: " + user.id + " is hitting case 2");
    return daysInBetween(firstOfMonth, user.deactivatedOn);
  }
  //case 3: user is active after the first of the month, and has no deactivated date
  //return days from active to today
  if((user.activatedOn > firstOfMonth)&&(!user.deactivatedOn)) {
    console.log("user: " + user.id + " is hitting case 3");
    const days = daysInBetween(user.activatedOn, today);
    return daysInBetween(user.activatedOn, today)
  }
  //case 4: user is active after the first of the month, and deactivated before today
  //return days from active to deactivated
  if ((user.activatedOn>firstOfMonth) && (user.deactivatedOn!=null)&&(user.deactivatedOn<today)&&(user.activatedOn<user.deactivatedOn)) {
    console.log("user: " + user.id + " is hitting case 4");
    return daysInBetween(user.activatedOn, user.deactivatedOn);
  }
  //case 5: user deactivated before the first of the month, and has not reactivated before the first of the month
  //return 0, no active days in the month
  if ((user.deactivatedOn!=null)&&(user.deactivatedOn < firstOfMonth)&&(user.activatedOn<firstOfMonth)&&(user.activatedOn<user.deactivatedOn)) {
    console.log("user: " + user.id + " is hitting case 5");
    return 0;
  }
  //case 6: user activated > deactivated, and deactivated before the first of the month and reactivated before the first of the month
  //return days from first of the month until today
  if ((user.deactivatedOn!=null)&&(user.activatedOn > user.deactivatedOn)&&(user.deactivatedOn<firstOfMonth)&&(user.activatedOn<firstOfMonth)) {
    console.log("user: " + user.id + " is hitting case 6");
    return daysInBetween(firstOfMonth, today);
  }
  //case 7: user deactivated before the first of the month, and activated after or on the first of the month
  //return days from activated date to today
  if((user.deactivatedOn!=null)&&(user.activatedOn>user.deactivatedOn)&&(user.deactivatedOn<firstOfMonth)&&(user.activatedOn>firstOfMonth)) {
    console.log("user: " + user.id + " is hitting case 7");
    return daysInBetween(user.activatedOn, today);
  }
  //case 8: user deactivated after the first of the month, and reactivated before or on today
  //return days from first of month to deactivated day and days from activated day until today
  if((user.deactivatedOn!=null) &&(user.deactivatedOn>firstOfMonth)&&(user.activatedOn<=today)&&(user.deactivatedOn<user.activatedOn)) {
    return daysInBetween(firstOfMonth, user.deactivatedOn) + daysInBetween(user.activatedOn, today);
  }
  return 0;
}
 

/*******************
* Helper functions *
*******************/

// takes in two dates, get days in between
// https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
// add 1 day to be inclusive
export function daysInBetween(firstDate: Date, secondDate: Date): number {
  let days = 0;
  if (secondDate >= firstDate) {
    days = ((secondDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24)) + 1;
  } else {
    days = ((firstDate.getTime() - secondDate.getTime()) / (1000 * 3600 * 24)) + 1;
  }
  return Math.floor(days);
}

/**
  Takes a Date instance and returns a Date which is the first day
  of that month. For example:

  firstDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 1)

  Input type: Date
  Output type: Date
**/
export function firstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
  Takes a Date object and returns a Date which is the last day
  of that month. For example:

  lastDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 31)

  Input type: Date
  Output type: Date
**/
export function lastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
  Takes a Date object and returns a Date which is the next day.
  For example:

  nextDay(new Date(2022, 3, 17)) // => new Date(2022, 3, 18)
  nextDay(new Date(2022, 3, 31)) // => new Date(2022, 4, 1)

  Input type: Date
  Output type: Date
**/
function nextDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
}

function getTestSubscription(): Subscription {
  let sub: Subscription = {
    "customerId": 123,
    "id" : 1,
    "monthlyPriceInCents": 1000
  };
  return sub;
}

function getTestActiveUsers(): User[] {
  let users : User[] = [];
    let dateMonthAgo = new Date();
    dateMonthAgo.setMonth(dateMonthAgo.getMonth() - 1);
    for(let i = 0; i < 1; i++) {
      users.push(
        {
          "id": i,
          "name": i.toString(),
          "customerId": i,
          "activatedOn": dateMonthAgo,
          "deactivatedOn" : null,
        }
      )
    };
    return users;
}

function getTestNoActiveUsers(): User[] {
  let users : User[] = [];
    let dateMonthAgo = new Date();
    dateMonthAgo.setMonth(dateMonthAgo.getMonth() - 1);
    let dateAYearAgo = new Date();
    dateAYearAgo.setFullYear(dateMonthAgo.getFullYear() - 1);
    for(let i = 0; i < 1; i++) {
      users.push(
        {
          "id": i,
          "name": i.toString(),
          "customerId": i,
          "activatedOn": dateAYearAgo,
          "deactivatedOn" : dateMonthAgo,
        }
      )
    };
    return users;
}

function getTestReActivedUsers(): User[] {
  let users : User[] = [];
    let dateMonthAgo = new Date();
    dateMonthAgo.setMonth(dateMonthAgo.getMonth() - 1);
    let yesterday = new Date();
    yesterday.setDate(dateMonthAgo.getDay() - 1);
    for(let i = 0; i < 1; i++) {
      users.push(
        {
          "id": i,
          "name": i.toString(),
          "customerId": i,
          "activatedOn": yesterday,
          "deactivatedOn" : dateMonthAgo,
        }
      )
    };
    return users;
}
