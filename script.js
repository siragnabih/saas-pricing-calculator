// Function to update slider values
function updateSliderValue(sliderId, valueId, isPercentage = false) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    valueDisplay.textContent = isPercentage ? slider.value + '%' : slider.value;
}

// Function to calculate and update the LTV
function calculateAndUpdateLTV() {
    // Extract values from sliders and inputs
    const monthlyPrice = parseFloat(document.getElementById('monthly-price').value);
    const yearlyPrice = parseFloat(document.getElementById('yearly-price').value);
    const conversionRate = parseFloat(document.getElementById('conversion-rate').value) / 100;
    const ltv = parseFloat(document.getElementById('ltv').value);
    const introPriceMonthly = parseFloat(document.getElementById('intro-price-monthly').value);
    const introPeriodMonthly = parseInt(document.getElementById('intro-period-monthly').value, 10);
    const introPriceYearly = parseFloat(document.getElementById('intro-price-yearly').value);
    const introPeriodYearly = parseInt(document.getElementById('intro-period-yearly').value, 10);

    // Calculate the effective monthly and yearly prices considering introductory prices
    let effectiveMonthlyPrice = introPriceMonthly && introPeriodMonthly ? introPriceMonthly : monthlyPrice;
    let effectiveYearlyPrice = introPriceYearly && introPeriodYearly ? introPriceYearly : yearlyPrice;

    // Calculate LTV
    let calculatedLTV = (effectiveMonthlyPrice * conversionRate * ltv) + (effectiveYearlyPrice * conversionRate * ltv);

    // Update the result display
    document.getElementById('result').textContent = calculatedLTV.toFixed(2);
}

// Event listeners for sliders
document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('input', () => {
        updateSliderValue(slider.id, slider.id + '-value', slider.id === 'conversion-rate');
        calculateAndUpdateLTV();
    });
});

// Initial calculation and display update
window.onload = () => {
    calculateAndUpdateLTV();
    document.querySelectorAll('.slider').forEach(slider => {
        updateSliderValue(slider.id, slider.id + '-value', slider.id === 'conversion-rate');
    });
};
