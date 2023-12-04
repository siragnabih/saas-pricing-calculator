function calculateEstimatedRevenue() {
    const totalUsers = parseInt(document.getElementById('total-users').value, 10);
    const percentYearly = parseFloat(document.getElementById('percent-yearly').value) / 100;
    const percentMonthly = 1 - percentYearly;
    const generalConversionRate = parseFloat(document.getElementById('conversion-rate').value) / 100;

    const avgSubscriptionMonths = parseFloat(document.getElementById('avg-subscription-months').value);
    const avgSubscriptionYears = parseFloat(document.getElementById('avg-subscription-years').value);

    const monthlyPrice = parseFloat(document.getElementById('monthly-price').value);
    const monthlyDiscount = parseFloat(document.getElementById('monthly-intro-discount').value) / 100;
    const monthlyDiscountPeriod = parseFloat(document.getElementById('monthly-intro-period').value);

    const yearlyPrice = parseFloat(document.getElementById('yearly-price').value);
    const yearlyDiscount = parseFloat(document.getElementById('yearly-intro-discount').value) / 100;
    const yearlyDiscountPeriod = parseFloat(document.getElementById('yearly-intro-period').value);

    // Monthly Revenue Calculation
    let monthlyRevenue = monthlyPrice * generalConversionRate * totalUsers * percentMonthly;
    if (avgSubscriptionMonths > 0) {
        monthlyRevenue *= Math.min(avgSubscriptionMonths, 12);
        if (monthlyDiscountPeriod > 0) {
            const discountDuration = Math.min(monthlyDiscountPeriod, avgSubscriptionMonths);
            monthlyRevenue *= ((avgSubscriptionMonths - discountDuration) + discountDuration * (1 - monthlyDiscount)) / avgSubscriptionMonths;
        }
    }

    // Yearly Revenue Calculation
    let yearlyRevenue = yearlyPrice * generalConversionRate * totalUsers * percentYearly;
    if (avgSubscriptionYears > 0) {
        yearlyRevenue *= avgSubscriptionYears;
        if (yearlyDiscountPeriod > 0) {
            const discountDuration = Math.min(yearlyDiscountPeriod, avgSubscriptionYears);
            yearlyRevenue *= ((avgSubscriptionYears - discountDuration) + discountDuration * (1 - yearlyDiscount)) / avgSubscriptionYears;
        }
    }

    let estimatedRevenue = monthlyRevenue + yearlyRevenue;

    document.getElementById('result').textContent = estimatedRevenue.toFixed(2);
    document.getElementById('percent-yearly-value').textContent = `${(percentYearly * 100).toFixed(0)}%`;

    let breakdownText = `
        <strong>Total Users:</strong> ${totalUsers}<br>
        <strong>% Yearly:</strong> ${(percentYearly * 100).toFixed(2)}%<br>
        <strong>General Conversion Rate:</strong> ${(generalConversionRate * 100).toFixed(2)}%<br>
        <strong>Average Subscription Months:</strong> ${avgSubscriptionMonths}<br>
        <strong>Average Subscription Years:</strong> ${avgSubscriptionYears}<br>
        <strong>Monthly Revenue:</strong> ${monthlyRevenue.toFixed(2)}<br>
        <strong>Yearly Revenue:</strong> ${yearlyRevenue.toFixed(2)}<br>
        <strong>Estimated Total Revenue:</strong> ${estimatedRevenue.toFixed(2)}
    `;
    document.getElementById('breakdown').innerHTML = breakdownText;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', calculateEstimatedRevenue);
    });

    calculateEstimatedRevenue();
});
