const financialData = require("./financial.json");

console.log("Financial data: ", getFiancialObject());

function getFiancialObject() {
    const financialObject = {};
    financialObject.result = financialData.reduce((a, b) => a + parseFloat(b.cost), 0);
    return financialObject;
}

function earningPerCompany() {
    const earningsPerCompany = {};
    financialData.forEach((item) => {
        const company = item.detailsOfPayent.company;
        const earn = parseFloat(item.cost);
        if (earningsPerCompany.hasOwnProperty(company)) {
            earningsPerCompany[company] += earn;
        } else {
            earningsPerCompany[company] = earn;
        }
    });
    console.log(earningsPerCompany);
}
function spendingsPerType() {
    const spendingsPerType = {};
    financialData.forEach((item) => {
        const type = item.detailsOfPayent.Type;
        const spending = parseFloat(item.cost);
        if (spendingsPerType.hasOwnProperty(type)) {
            spendingsPerType[type] += spending;
        } else {
            spendingsPerType[type] = spending;
        }
    });
    console.log(spendingsPerType);
}

function spendingsByMonth() {
    const spendingPerMonth = {};
    financialData.forEach((item) => {
        const month = parseFloat(item.detailsOfPayent.date.slice(3, 5));
        const spending = parseFloat(item.cost);
        if (spendingPerMonth.hasOwnProperty(month)) {
            spendingPerMonth[month] += spending;
        } else {
            spendingPerMonth[month] = spending;
        }
    });
    const sortedMonths = Object.keys(spendingPerMonth).sort((a, b) => {
        return parseFloat(a) - parseFloat(b);
    });
    const sortedSpendingPerMonth = {};
    sortedMonths.forEach((month) => {
        sortedSpendingPerMonth[month] = spendingPerMonth[month];
    });
    console.log(sortedSpendingPerMonth);
    return sortedSpendingPerMonth;
}

function spendingsByDay() {
    const spendingPerDay = {};
    financialData.forEach((item) => {
        const year = parseFloat(item.detailsOfPayent.date.slice(6, 10));
        const month = parseFloat(item.detailsOfPayent.date.slice(3, 5));
        const day = parseFloat(item.detailsOfPayent.date.slice(0, 2));
        const spending = parseFloat(item.cost);
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        if (spendingPerDay.hasOwnProperty(dayOfWeek)) {
            spendingPerDay[dayOfWeek] += spending;
        } else {
            spendingPerDay[dayOfWeek] = spending;
        }
    });
    console.log(spendingPerDay);
}

earningPerCompany();
spendingsPerType();
spendingsByMonth();
spendingsByDay();
