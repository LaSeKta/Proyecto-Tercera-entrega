const ctx = document.getElementById('progress-chart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Resistencia',
            data: [80, 85, 90, 95],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false
        }, {
            label: 'Fuerza Muscular',
            data: [75, 78, 82, 85],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Porcentaje'
                }
            }
        }
    }
});


const ctxResistance = document.getElementById('resistance-chart').getContext('2d');
const resistanceChart = new Chart(ctxResistance, {
    type: 'bar',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Resistencia',
            data: [80, 85, 90, 95],
            backgroundColor: 'rgb(54, 162, 235)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Kg'
                }
            }
        }
    }
});


const ctxMuscle = document.getElementById('muscle-strength-chart').getContext('2d');
const muscleStrengthChart = new Chart(ctxMuscle, {
    type: 'bar',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Fuerza Muscular',
            data: [75, 78, 82, 85],
            backgroundColor: 'rgb(255, 99, 132)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Porcentaje'
                }
            }
        }
    }
});


const ctxCompliance = document.getElementById('exercise-compliance-chart').getContext('2d');
const exerciseComplianceChart = new Chart(ctxCompliance, {
    type: 'doughnut',
    data: {
        labels: ['Cumplido', 'No Cumplido'],
        datasets: [{
            label: 'Cumplimiento de Ejercicios',
            data: [85, 15],
            backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});