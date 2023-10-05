function createEmployeeRecord(employeeData){
    return{
        firstName:employeeData[0],
        familyName:employeeData[1],
        title:employeeData[2],
        payPerHour:employeeData[3],
        timeInEvents:[],
        timeOutEvents:[],
    };
}
function createEmployeeRecords(employeeData){
    return employeeData.map((data)=>{
        return {
            firstName:data[0],
            familyName:data[1],
            title:data[2],
            payPerHour:data[3],
            timeInEvents:[],
            timeOutEvents:[]

        };
    });
}
function createTimeInEvent(employee,timestamp){
    let [date,hour]= timestamp.split(" ");
    employee.timeInEvents.push({
        type:"TimeIn",
        date: date,
        hour: parseInt(hour,10)
    });
    return employee;
}
function createTimeOutEvent(employee,timestamp){
    let [date,hour]= timestamp.split(" ");
    employee.timeOutEvents.push({
        type:"TimeOut",
        date: date,
        hour: parseInt(hour,10)
    });
    return employee;
}
function hoursWorkedOnDate(employee,date){
    const timeInEvent=employee.timeInEvents.find(event=>event.date === date);
    const timeOutEvent= employee.timeOutEvents.find(event=> event.date === date);

    if(timeInEvent && timeOutEvent){
        const timeInHour= timeInEvent.hour;
        const timeOutHour = timeOutEvent.hour;
        return(timeOutHour-timeInHour)/100;
    }
    return 0;
}
function wagesEarnedOnDate(employee,date){
    const hoursWorked= hoursWorkedOnDate(employee,date);
    const hourlyRate= employee.payPerHour;
    return hoursWorked * hourlyRate;
}
function allWagesFor(employee){
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((acc, date) => {
        return acc + wagesEarnedOnDate(employee, date);
    }, 0);
    return totalWages;
}
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
}


