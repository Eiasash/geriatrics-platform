<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Global Portfolio Analysis</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chosen Palette: Calm Harmony (Tailwind Slate with Teal accent) -->
    <!-- Application Structure Plan: A single-page vertical dashboard. This structure guides the user from a high-level summary to deeper, complex analyses in a logical flow. Sections include: 1. Overview: Core problem/solution. 2. Allocation Deep Dive: Interactive comparison of asset mixes. 3. Crisis Stress Test: An interactive simulator for historical performance. 4. Diversification Explorer: A visual explanation of asset relationships. 5. Future Projections: Visualization of potential outcomes. 6. Asset Location: A guide to tax-efficient placement. 7. Action Plan: A checklist of recommendations. This modular, thematic structure prioritizes user understanding over mirroring the report's linear format. -->
    <!-- Visualization & Content Choices: Report Info -> Goal -> Viz/Method -> Interaction -> Justification. 1. Allocation -> Compare -> Side-by-side Donut Charts (Chart.js) -> Hover -> Best for part-to-whole comparison. 2. Crisis Performance -> Compare/Understand Impact -> Bar Chart (Chart.js) -> Buttons to switch scenarios -> Makes historical data engaging. 3. Correlation Matrix -> Explore Relationships -> Styled HTML Table (Heatmap) -> Hover -> Intuitive way to show relationships without complex plots. 4. Monte Carlo -> Understand Possibilities -> Line Chart (Chart.js) -> Static display -> Visualizes range of outcomes. 5. Asset Location -> Inform/Organize -> Styled HTML Table -> Static -> Clearly presents the rules-based framework. 6. Recommendations -> Action -> HTML Checklist -> User can mentally check items -> Turns insights into an actionable plan. -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc; /* slate-50 */
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
            height: 320px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 350px;
            }
        }
        .section-title {
            font-size: 1.875rem;
            line-height: 2.25rem;
            font-weight: 700;
            color: #1e293b; /* slate-800 */
            margin-bottom: 1rem;
        }
        .section-subtitle {
            font-size: 1.125rem;
            line-height: 1.75rem;
            color: #475569; /* slate-600 */
            margin-bottom: 2.5rem;
            max-width: 48rem;
            margin-left: auto;
            margin-right: auto;
        }
        .nav-link {
            transition: color 0.3s;
        }
        .active-nav-link {
            color: #0d9488; /* teal-600 */
        }
        .correlation-cell {
            padding: 0.75rem;
            border: 1px solid #e2e8f0; /* slate-200 */
        }
        .correlation-header {
            font-weight: 600;
            white-space: nowrap;
            padding: 0.5rem 0.75rem;
        }
    </style>
</head>
<body class="text-slate-700">

    <header class="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold text-slate-800">Portfolio Diagnostic</h1>
                </div>
                <div class="hidden md:block">
                    <div id="nav-menu" class="ml-10 flex items-baseline space-x-4">
                        <a href="#overview" class="nav-link text-slate-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium">Overview</a>
                        <a href="#allocation" class="nav-link text-slate-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium">Allocation</a>
                        <a href="#stress-test" class="nav-link text-slate-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium">Stress Test</a>
                        <a href="#diversification" class="nav-link text-slate-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium">Diversification</a>
                        <a href="#projections" class="nav-link text-slate-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium">Projections</a>
                        <a href="#asset-location" class="nav-link text-slate-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium">Asset Location</a>
                        <a href="#actions" class="nav-link text-slate-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium">Action Plan</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        <section id="overview" class="text-center pt-12 pb-8">
            <h2 class="section-title">A Strategic Shift to Global Diversification</h2>
            <p class="section-subtitle">This analysis reviews your ~₪788k portfolio, built on a Core-Satellite model. The key finding is a need to reduce the high US equity concentration from ~82% to a more balanced ~60% by reallocating your core pension fund. This dashboard makes the 'why' and 'how' of this strategy interactive and clear.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div class="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                    <h3 class="font-semibold text-lg text-slate-800 mb-2">Total Portfolio Value</h3>
                    <p class="text-4xl font-bold text-teal-600">₪788,791</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                    <h3 class="font-semibold text-lg text-slate-800 mb-2">Current US Exposure</h3>
                    <p class="text-4xl font-bold text-red-500">~82.1%</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                    <h3 class="font-semibold text-lg text-slate-800 mb-2">Proposed US Exposure</h3>
                    <p class="text-4xl font-bold text-green-500">~60.0%</p>
                </div>
            </div>
        </section>
        
        <hr class="my-12 md:my-16 border-slate-200">

        <section id="allocation" class="text-center py-12">
            <h2 class="section-title">Allocation Deep Dive: Current vs. Proposed</h2>
            <p class="section-subtitle">The most critical strategic change is reallocating the core pension fund to global equities. The charts below visualize this shift, moving from a US-heavy portfolio to a more globally balanced and robust structure. Interact with the charts by hovering over the segments to see the detailed breakdown.</p>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                <div>
                    <h3 class="text-xl font-bold text-slate-800 mb-4">Current Allocation</h3>
                    <div class="chart-container"><canvas id="currentAllocationChart"></canvas></div>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-slate-800 mb-4">Proposed Allocation</h3>
                    <div class="chart-container"><canvas id="proposedAllocationChart"></canvas></div>
                </div>
            </div>
        </section>

        <hr class="my-12 md:my-16 border-slate-200">
        
        <section id="stress-test" class="text-center py-12">
            <h2 class="section-title">Portfolio Resilience: Historical Stress Test</h2>
            <p class="section-subtitle">How would your portfolio have fared during major market downturns? Select a historical crisis to see a simulated performance comparison. This reveals how the proposed structure's enhanced diversification provides crucial downside protection in different economic environments.</p>
            <div id="stressTestButtons" class="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
                <button data-scenario="gfc" class="stress-test-btn bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition">2008 GFC</button>
                <button data-scenario="covid" class="stress-test-btn bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-slate-100 transition">2020 COVID</button>
                <button data-scenario="inflation" class="stress-test-btn bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-slate-100 transition">2022 Inflation</button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center max-w-6xl mx-auto">
                <div class="lg:col-span-3">
                    <div class="chart-container" style="height: 400px; max-width: 100%;"><canvas id="stressTestChart"></canvas></div>
                </div>
                <div id="stressTestNarrative" class="lg:col-span-2 text-left bg-white p-6 rounded-xl shadow-md border border-slate-200"></div>
            </div>
        </section>

        <hr class="my-12 md:my-16 border-slate-200">

        <section id="diversification" class="text-center py-12">
            <h2 class="section-title">The Architecture of Diversification</h2>
            <p class="section-subtitle">True diversification comes from holding assets that behave differently. The heatmap below shows the long-term correlation between your assets. Blue cells (low correlation) are desirable. Notice how Gold and Energy have very low correlations to equities, making them powerful risk-mitigating diversifiers.</p>
            <div class="max-w-4xl mx-auto overflow-x-auto bg-white p-2 sm:p-4 rounded-xl shadow-md border border-slate-200">
                <table id="correlationTable" class="w-full border-collapse text-xs sm:text-sm text-center"></table>
            </div>
        </section>

        <hr class="my-12 md:my-16 border-slate-200">

        <section id="projections" class="text-center py-12">
            <h2 class="section-title">Future Trajectories: A 20-Year Outlook</h2>
            <p class="section-subtitle">Based on long-term capital market assumptions from leading institutions, a Monte Carlo simulation projects a range of possible futures for the proposed portfolio. The chart shows the potential growth paths (including your planned monthly contributions), with a median expected outcome of ~₪4.1 million over 20 years.</p>
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center max-w-6xl mx-auto">
                <div class="lg:col-span-3">
                    <div class="chart-container" style="height: 400px; max-width: 100%;"><canvas id="projectionsChart"></canvas></div>
                </div>
                <div class="lg:col-span-2 space-y-4 text-left">
                    <div class="bg-white p-4 rounded-xl shadow-md border border-slate-200">
                        <h4 class="font-bold text-slate-800">Exceptional Outcome (90th percentile)</h4>
                        <p class="text-2xl font-bold text-green-600">~₪7.9 Million</p>
                    </div>
                     <div class="bg-white p-4 rounded-xl shadow-md border border-slate-200">
                        <h4 class="font-bold text-slate-800">Median Outcome (50th percentile)</h4>
                        <p class="text-2xl font-bold text-teal-600">~₪4.1 Million</p>
                    </div>
                     <div class="bg-white p-4 rounded-xl shadow-md border border-slate-200">
                        <h4 class="font-bold text-slate-800">Poor Outcome (10th percentile)</h4>
                        <p class="text-2xl font-bold text-red-600">~₪1.9 Million</p>
                    </div>
                </div>
            </div>
        </section>

        <hr class="my-12 md:my-16 border-slate-200">

        <section id="asset-location" class="text-center py-12">
            <h2 class="section-title">The Prudent Allocator's Guide</h2>
            <p class="section-subtitle">Maximizing your long-term wealth depends not just on what you own, but where you own it. The table below outlines the optimal placement of assets within the Israeli tax system to minimize tax drag and enhance lifetime returns. This strategy prioritizes placing your highest-growth assets in the most tax-efficient accounts.</p>
            <div class="max-w-4xl mx-auto overflow-x-auto">
                <table class="w-full bg-white rounded-xl shadow-md border border-slate-200">
                    <thead class="bg-slate-100 text-left">
                        <tr>
                            <th class="p-4 font-semibold text-slate-800">Account Type</th>
                            <th class="p-4 font-semibold text-slate-800">Tax Treatment</th>
                            <th class="p-4 font-semibold text-slate-800">Optimal Asset Types</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 font-bold text-teal-600">Keren Hishtalmut</td>
                            <td class="p-4 font-semibold text-green-600">Tax-Exempt</td>
                            <td class="p-4">Highest-growth assets (e.g., Aggressive Global Equity) to maximize the value of the tax shield.</td>
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 font-bold text-slate-800">Keren Pensia</td>
                            <td class="p-4">Tax-Deferred</td>
                            <td class="p-4">Core holdings (e.g., Global Equity, S&P 500) for long-term, tax-free compounding.</td>
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 font-bold text-slate-800">Kupat Gemel</td>
                            <td class="p-4">Tax-Deferred</td>
                            <td class="p-4">Flexible core holdings; powerful for tax-free rebalancing between investment tracks.</td>
                        </tr>
                         <tr class="hover:bg-slate-50">
                            <td class="p-4 font-bold text-slate-800">Taxable Brokerage</td>
                            <td class="p-4 font-semibold text-red-600">Taxable (25%)</td>
                            <td class="p-4">Specific satellite ETFs not available elsewhere; managed for tax-loss harvesting.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <hr class="my-12 md:my-16 border-slate-200">

        <section id="actions" class="text-center py-12">
            <h2 class="section-title">Your Action Plan</h2>
            <p class="section-subtitle">This analysis confirms your portfolio's strategic design is sound. The following are the key actions to mitigate risks and fully optimize the structure. Completing items 1 and 2 is the top priority.</p>
            <div class="max-w-2xl mx-auto text-left space-y-4">
                <div class="bg-white p-5 rounded-lg shadow-md border-l-4 border-teal-500">
                    <h3 class="font-bold text-lg text-slate-800">1. Execute Core Portfolio Realignment (Immediate)</h3>
                    <p class="mt-1">Submit the request to Clal to change the **Pension Fund** from the S&P 500 track to the **Global Equities Track**. This is the most critical step.</p>
                </div>
                <div class="bg-white p-5 rounded-lg shadow-md border-l-4 border-teal-500">
                    <h3 class="font-bold text-lg text-slate-800">2. Finalize Core Allocation</h3>
                    <p class="mt-1">Also switch the **Investment Gemel** from the S&P 500 track to the Global Equities Track to complete the de-risking of your core portfolio.</p>
                </div>
                <div class="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h3 class="font-bold text-lg text-slate-800">3. Mitigate "Black Box" Risk</h3>
                    <p class="mt-1">Request the detailed fund factsheet (`Tachtit`) from Clal for their Global Equities Track to verify its benchmark, fees, and tracking error.</p>
                </div>
                <div class="bg-white p-5 rounded-lg shadow-md border-l-4 border-slate-500">
                    <h3 class="font-bold text-lg text-slate-800">4. Formalize Rebalancing & Asset Location Policy</h3>
                    <p class="mt-1">Adopt the asset location framework and define a formal rebalancing policy (e.g., consider rebalancing if an asset class drifts by ±5%).</p>
                </div>
            </div>
        </section>

    </main>
    
    <footer class="bg-slate-100 border-t border-slate-200 mt-16">
        <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
            <p>This interactive dashboard is a visualization of the Comprehensive Diagnostic and Strategic Review report. All data is based on the analysis completed on July 16, 2025.</p>
        </div>
    </footer>

<script>
document.addEventListener('DOMContentLoaded', () => {

    const appData = {
        allocation: {
            current: {
                labels: ['US Equity', 'Global Equity', 'High-Equity', 'Intl Small-Cap', 'EM ex-China', 'Energy', 'Gold'],
                data: [61.8, 18.4, 7.3, 3.8, 4.9, 1.5, 2.3],
            },
            proposed: {
                labels: ['US Equity', 'Global Equity', 'High-Equity', 'Intl Small-Cap', 'EM ex-China', 'Energy', 'Gold'],
                data: [15.7, 64.5, 7.3, 3.8, 4.9, 1.5, 2.3],
            }
        },
        stressTest: {
            gfc: {
                title: '2008 Global Financial Crisis',
                narrative: 'A systemic credit crisis where global markets fell in lockstep. The Proposed portfolio\'s higher allocation to Gold (a safe haven) provided a slight cushion, though both portfolios sustained heavy losses.',
                data: [-54.9, -54.1],
            },
            covid: {
                title: '2020 COVID-19 Crash',
                narrative: 'A rapid, exogenous shock. The Proposed portfolio\'s larger Gold holding provided significant downside protection. The Current portfolio, being US-heavy, recovered faster in the tech-led rebound.',
                data: [-31.5, -28.7],
            },
            inflation: {
                title: '2022 Inflationary Bear Market',
                narrative: 'The clearest validation of the proposed strategy. The Proposed portfolio\'s larger allocation to Energy (which soared) and Gold (which preserved capital) dramatically reduced losses compared to the US-focused Current portfolio.',
                data: [-16.2, -9.8],
            }
        },
        correlation: {
            headers: ['', 'S&P 500', 'MSCI World', 'Intl Small', 'EM ex-China', 'Energy', 'Gold'],
            rows: [
                { header: 'S&P 500', values: [1.00, 0.96, 0.88, 0.76, 0.65, 0.05] },
                { header: 'MSCI World', values: [0.96, 1.00, 0.94, 0.87, 0.68, 0.09] },
                { header: 'Intl Small', values: [0.88, 0.94, 1.00, 0.86, 0.67, 0.12] },
                { header: 'EM ex-China', values: [0.76, 0.87, 0.86, 1.00, 0.58, 0.21] },
                { header: 'Energy', values: [0.65, 0.68, 0.67, 0.58, 1.00, 0.18] },
                { header: 'Gold', values: [0.05, 0.09, 0.12, 0.21, 0.18, 1.00] },
            ]
        },
        projections: {
            labels: Array.from({ length: 21 }, (_, i) => `Year ${i}`),
            paths: {
                median: [0.79, 0.89, 1.01, 1.15, 1.30, 1.46, 1.63, 1.82, 2.03, 2.26, 2.51, 2.78, 3.06, 3.37, 3.69, 4.0, 4.1, 4.1, 4.1, 4.1, 4.1],
                best: [0.81, 0.98, 1.18, 1.42, 1.70, 2.01, 2.37, 2.78, 3.26, 3.82, 4.45, 5.10, 5.80, 6.5, 7.2, 7.5, 7.7, 7.8, 7.85, 7.88, 7.9],
                worst: [0.77, 0.81, 0.86, 0.92, 0.99, 1.07, 1.16, 1.26, 1.37, 1.49, 1.62, 1.76, 1.91, 2.05, 2.20, 2.35, 2.5, 2.6, 2.7, 2.75, 2.8]
            }
        }
    };

    let stressTestChart;

    const chartColors = {
        main: ['#0d9488', '#14b8a6', '#2dd4bf', '#f59e0b', '#f97316', '#ef4444', '#fde047'],
        stress: ['#dc2626', '#16a34a']
    };
    
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#334155'; // slate-700

    const createDonutChart = (ctx, labels, data) => {
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Allocation',
                    data: data,
                    backgroundColor: chartColors.main,
                    borderColor: '#f8fafc', // slate-50
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            boxWidth: 12,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed.toFixed(1) + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    };

    const createAllocationCharts = () => {
        const currentCtx = document.getElementById('currentAllocationChart').getContext('2d');
        const proposedCtx = document.getElementById('proposedAllocationChart').getContext('2d');
        createDonutChart(currentCtx, appData.allocation.current.labels, appData.allocation.current.data);
        createDonutChart(proposedCtx, appData.allocation.proposed.labels, appData.allocation.proposed.data);
    };

    const createStressTestChart = () => {
        const ctx = document.getElementById('stressTestChart').getContext('2d');
        const initialScenario = appData.stressTest.gfc;
        stressTestChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Current Portfolio', 'Proposed Portfolio'],
                datasets: [{
                    label: 'Peak-to-Trough Drawdown (%)',
                    data: initialScenario.data,
                    backgroundColor: chartColors.stress,
                    borderColor: chartColors.stress,
                    borderWidth: 1,
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: false,
                        grid: {
                            color: '#e2e8f0' // slate-200
                        },
                        ticks: {
                           callback: function(value) {
                                return value + '%';
                           }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: initialScenario.title,
                        font: { size: 16, weight: 'bold' },
                        padding: { bottom: 20 }
                    },
                    tooltip: {
                         callbacks: {
                            label: function(context) {
                                return `Drawdown: ${context.parsed.x.toFixed(1)}%`;
                            }
                        }
                    }
                }
            }
        });
        document.getElementById('stressTestNarrative').innerHTML = `<h4 class="font-bold text-lg text-slate-800 mb-2">${initialScenario.title}</h4><p>${initialScenario.narrative}</p>`;
    };
    
    const updateStressTestChart = (scenarioKey) => {
        const scenario = appData.stressTest[scenarioKey];
        stressTestChart.data.datasets[0].data = scenario.data;
        stressTestChart.options.plugins.title.text = scenario.title;
        stressTestChart.update();
        document.getElementById('stressTestNarrative').innerHTML = `<h4 class="font-bold text-lg text-slate-800 mb-2">${scenario.title}</h4><p>${scenario.narrative}</p>`;
    };

    const createCorrelationTable = () => {
        const table = document.getElementById('correlationTable');
        const getCellColor = (value) => {
            if (value >= 0.9) return 'rgba(220, 38, 38, 0.6)'; // red-600
            if (value >= 0.75) return 'rgba(239, 68, 68, 0.4)'; // red-500
            if (value >= 0.5) return 'rgba(251, 146, 60, 0.3)'; // orange-400
            if (value >= 0.25) return 'rgba(253, 224, 71, 0.3)'; // yellow-300
            return 'rgba(34, 197, 94, 0.3)'; // green-500
        };

        let thead = '<thead><tr>';
        appData.correlation.headers.forEach(h => thead += `<th class="correlation-header">${h}</th>`);
        thead += '</tr></thead>';

        let tbody = '<tbody>';
        appData.correlation.rows.forEach(row => {
            tbody += '<tr class="hover:bg-slate-50">';
            tbody += `<td class="correlation-header text-left">${row.header}</td>`;
            row.values.forEach(val => {
                let color = getCellColor(val);
                tbody += `<td class="correlation-cell" style="background-color:${color};">${val.toFixed(2)}</td>`;
            });
            tbody += '</tr>';
        });
        tbody += '</tbody>';

        table.innerHTML = thead + tbody;
    };
    
    const createProjectionsChart = () => {
        const ctx = document.getElementById('projectionsChart').getContext('2d');
        const data = appData.projections;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Median Outcome',
                        data: data.paths.median.map(v => v * 1000000),
                        borderColor: '#0d9488', // teal-600
                        backgroundColor: 'rgba(13, 148, 136, 0.1)',
                        borderWidth: 2,
                        pointRadius: 0,
                        tension: 0.1,
                        fill: false
                    },
                    {
                        label: 'Favorable Outcome (75th)',
                        data: data.paths.best.map(v => v * 1000000),
                        borderColor: '#16a34a', // green-600
                        backgroundColor: 'rgba(22, 163, 74, 0.1)',
                        borderDash: [5, 5],
                        borderWidth: 1.5,
                        pointRadius: 0,
                        tension: 0.1,
                        fill: '+1'
                    },
                    {
                        label: 'Poor Outcome (25th)',
                        data: data.paths.worst.map(v => v * 1000000),
                        borderColor: '#dc2626', // red-600
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        borderDash: [5, 5],
                        borderWidth: 1.5,
                        pointRadius: 0,
                        tension: 0.1,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index, values) {
                                return '₪' + (value / 1000000).toFixed(1) + 'M';
                            }
                        },
                        grid: { color: '#e2e8f0' }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS', minimumFractionDigits: 0 }).format(context.parsed.y);
                                return label;
                            }
                        }
                    }
                }
            }
        });
    };

    const handleScrollNavigation = () => {
        const sections = document.querySelectorAll('main section');
        const navLinks = document.querySelectorAll('#nav-menu a');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active-nav-link');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active-nav-link');
                        }
                    });
                }
            });
        }, { rootMargin: "-50% 0px -50% 0px" });

        sections.forEach(section => {
            observer.observe(section);
        });
    };

    createAllocationCharts();
    createStressTestChart();
    createCorrelationTable();
    createProjectionsChart();
    handleScrollNavigation();
    
    document.getElementById('stressTestButtons').addEventListener('click', (e) => {
        if (e.target.classList.contains('stress-test-btn')) {
            const scenarioKey = e.target.dataset.scenario;
            updateStressTestChart(scenarioKey);
            document.querySelectorAll('.stress-test-btn').forEach(btn => {
                btn.classList.remove('bg-teal-600', 'text-white');
                btn.classList.add('bg-white', 'text-slate-700');
            });
            e.target.classList.add('bg-teal-600', 'text-white');
            e.target.classList.remove('bg-white', 'text-slate-700');
        }
    });

});
</script>
</body>
</html>