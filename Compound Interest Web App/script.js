/* Formulas */
    // CI = P * (1 + R / N) ** (N * T)
    // FV = PMT * (((1 + R / N) ** (N * T) - 1) / (R / N))
    // TB = CI + FV 
    // TC = P + (N * T * PMT)
    // TI = TB - TC 
    
/* Variables */
    // P = Principle 
    // R = Annual rate of interest 
    // N = Compound/Contribute frequency per year 
    // T = Investment time in years 
    // PMT = Additional payment per compound period 
    // WV = Word value (examples: quarterly = 4)
    // IA = Starting amount which is based on previous year's total (initial investment + all PMT thereafter)
    

function calculateValues() {   

    // Format numbers as currency
    let USDollar = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Replace current table data with new table data
    let element = document.getElementById("tableBody")
    if(typeof(element) != 'undefined' && element != null){
        element.remove()
    }
    let table = document.getElementById("table1")
    let tableBody = document.createElement('tbody')
        tableBody.setAttribute("id", "tableBody")
        table.appendChild(tableBody)

    // Total value at the end of duration
    let P = document.getElementById('P').value
    let R = document.getElementById('R').value
    let N = document.getElementById('N').value
    let T = document.getElementById('T').value
    let PMT = document.getElementById('PMT').value

    P = Number(P)
    PMT = Number(PMT)
    R = R / 100
    T = Number(T) 

    CI = P * (1 + R / N) ** (N * T)
    FV = PMT * (((1 + R / N) ** (N * T) - 1) / (R / N))
    TB = CI + FV 
    TC = P + (N * T * PMT)
    TI = TB - TC 

    // Table Data
    let contribution = [P] 
    let interest = []
    let balance = []
    for(let i = 0; i <= T; i++) {

        // Append rows to table
        let tableRow = document.createElement('tr');
            tableBody.appendChild(tableRow);

        // Year
        let tableDataYear = document.createElement('td');
            tableDataYear.innerText += i
            tableRow.appendChild(tableDataYear); 

        // Contribution
        let contributionValue = (contribution[i]) + (N * PMT)
            contribution.push(contributionValue) 
        let x = document.createElement('td'); 
            x.innerText += (`${USDollar.format(contribution[i])}`);
            tableRow.appendChild(x)    

        // Interest (at end of year)
        compoundInterest = P * (1 + R / N) ** (N * i)
        futureValue = PMT * (((1 + R / N) ** (N * i) - 1) / (R / N))
        let totalInterest = (compoundInterest + futureValue - contribution[i])
        let tableDataInterest = document.createElement('td')
            tableDataInterest.innerText += (`${USDollar.format(totalInterest)}`);
            tableRow.appendChild(tableDataInterest)
            interest.push(totalInterest)

        // Total balance (at end of year)
        let yearlyBalance = (contribution[i] + interest[i])
            yearlyBalance = Math.round(yearlyBalance * 100) / 100
            balance.push(yearlyBalance)
        let yearlyBalanceData = document.createElement('td')
            yearlyBalanceData.innerText += (`${USDollar.format(yearlyBalance)}`)
            tableRow.appendChild(yearlyBalanceData)
    }
}

function createChart() {

    // Replace old chart data with new chart data
    let element = document.getElementById("myChart");
    if(typeof(element) != 'undefined' && element != null){
        element.remove()
    } 
    let chartContainer = document.getElementById('chartContainer')
    let canvas = document.createElement('canvas')
        canvas.setAttribute('id', 'myChart')
        chartContainer.appendChild(canvas)

    // Create Chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Contribution', 'Profit'],
        datasets: [{
            data: [TC, TI],
            color: 'ffffff',
            backgroundColor: [
                '#3CF4D4',
                '#FF5398'
            ],
            borderColor: '#ffffff',  
            borderWidth: [2], 
        }]
    },
    options: {
        responsive: true, 
        maintainAspectRatio: false, 
        color: 'white' // Add this line to set the font color of the labels to white
    },
});
} 
 
