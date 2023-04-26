// Your code here
function createEmployeeRecord(array) {
    return {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : [],

    }
    
}
function createEmployeeRecords(array) {
    let newArray = array.map((obj) => (createEmployeeRecord(obj)));
    return newArray;
}
function createTimeInEvent(employeeRecord, timeStamp) {
    let inHour = parseInt(timeStamp.slice(-4), 10);
    let inDate = timeStamp.split(" ")[0];
    employeeRecord.timeInEvents.push({
        type : "TimeIn",
        hour : inHour,
        date : inDate,
    })
    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, timeStamp) {
    let outHour = parseInt(timeStamp.slice(-4), 10);
    let outDate = timeStamp.split(" ")[0];
    employeeRecord.timeOutEvents.push({
        type : "TimeOut",
        hour : outHour,
        date : outDate,
    })
    return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, day) {
    let timeIn = employeeRecord.timeInEvents.find((element) => element.date === day).hour;
    let timeOut = employeeRecord.timeOutEvents.find((element) => element.date === day).hour;
    return parseInt((timeOut - timeIn) / 100);
}
function wagesEarnedOnDate(record, date) {
    let completedWorkHours = hoursWorkedOnDate(record, date);
    let payAmount = record.payPerHour;
    return completedWorkHours * payAmount;
}
function allWagesFor(object) {
    let allDates = object.timeOutEvents.map((element) => element.date);
    let allHours = allDates.map((date) => wagesEarnedOnDate(object, date));

    const sum = (x, y) => x + y;
    let salaryAmount = allHours.reduce(sum);
    return salaryAmount;
}
function calculatePayroll(array) {
    let payrollBurden = 0;
    array.forEach(element => {
        payrollBurden += allWagesFor(element);       
    });
    return payrollBurden;
}
