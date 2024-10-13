// Function lagu xisaabinayo bartilmaameedka guud ee sanadlaha ah, iyadoo loo eegayo taariikhda la geliyey
function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
  
    function getWorkingDays(year, month) {
        const daysInMonth = getDaysInMonth(year, month);
        let workingDays = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 5) { // Not Friday
                workingDays++;
            }
        }
        return workingDays;
    }
  
    function getWorkedDaysInMonth(year, month, start, end) {
        const daysInMonth = getDaysInMonth(year, month);
        let workedDays = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            if (currentDate >= start && currentDate <= end) {
                const dayOfWeek = currentDate.getDay();
                if (dayOfWeek !== 5) { // Not Friday
                    workedDays++;
                }
            }
        }
        return workedDays;
    }

    const result = {
        totalWorkedDays: 0,
        monthlyTargets: [], 
        totalTarget: 0,
    };
  
    let totalWorkingDays = 0;
    let currentDate = new Date(start);
  
    while (currentDate <= end) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
  
        const workingDaysInMonth = getWorkingDays(year, month);
        totalWorkingDays += workingDaysInMonth;

        const workedDaysInMonth = getWorkedDaysInMonth(year, month, start, end);
        result.totalWorkedDays += workedDaysInMonth;

        // Store worked days for each month
        result.monthlyTargets.push(workedDaysInMonth);
  
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(1);
    }
  
    const dailyTarget = totalAnnualTarget / totalWorkingDays;
  
    // Calculate monthly targets based on the stored worked days
    for (let workedDays of result.monthlyTargets) {
        const monthlyTarget = workedDays * dailyTarget;
        result.totalTarget += monthlyTarget;
    }

    return result;
}

// Example usage
const startDate = '2024-01-01';
const endDate = '2024-03-31';  // February has 28 days
const totalAnnualTarget = 5220;

const targetData = calculateTotalTarget(startDate, endDate, totalAnnualTarget);
console.log(targetData);
