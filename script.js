function calculateEstimatedRevenue() {
    const totalUsers = parseInt(document.getElementById('total-users').value, 10);
    const percentYearly = parseFloat(document.getElementById('percent-yearly').value) / 100;
    const percentMonthly = 1 - percentYearly;
    const generalConversionRate = parseFloat(document.getElementById('conversion-rate').value) / 100;

    const monthlyPrice = parseFloat(document.getElementById('monthly-price').value);
    const monthlyDiscount = parseFloat(document.getElementById('monthly-intro-discount').value) / 100;
    const monthlyDiscountPeriod = parseInt(document.getElementById('monthly-intro-period').value, 10);

    const yearlyPrice = parseFloat(document.getElementById('yearly-price').value);
    const yearlyDiscount = parseFloat(document.getElementById('yearly-intro-discount').value) / 100;
    const yearlyDiscountPeriod = parseInt(document.getElementById('yearly-intro-period').value, 10);

    let monthlyRevenue = monthlyPrice * generalConversionRate * totalUsers * percentMonthly;
    let yearlyRevenue = yearlyPrice * generalConversionRate * totalUsers * percentYearly;

    // Apply discounts
    monthlyRevenue *= (1 - monthlyDiscount) * Math.max(1, monthlyDiscountPeriod);
    yearlyRevenue *= (1 - yearlyDiscount) * Math.max(1, yearlyDiscountPeriod);

    let estimatedRevenue = monthlyRevenue + yearlyRevenue;

    document.getElementById('result').textContent = estimatedRevenue.toFixed(2);
    document.getElementById('percent-yearly-value').textContent = `${(percentYearly * 100).toFixed(0)}%`;

    // Breakdown display
    let breakdownText = `
        <strong>Total Users:</strong> ${totalUsers}<br>
        <strong>% Yearly:</strong> ${(percentYearly * 100).toFixed(2)}%<br>
        <strong>General Conversion Rate:</strong> ${(generalConversionRate * 100).toFixed(2)}%<br>
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
