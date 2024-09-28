// import React, { useRef, useEffect } from 'react';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import { Card } from 'antd';
// import { Chart, registerables } from 'chart.js';
// import './Charts.css';
//
// // Register all necessary components with Chart.js
// Chart.register(...registerables);
//
// const Charts = () => {
//     const lineRef = useRef(null);
//     const barRef = useRef(null);
//     const pieRef = useRef(null);
//
//     const lineData = {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//         datasets: [
//             {
//                 label: 'Users',
//                 data: [65, 59, 80, 81, 56, 55, 40],
//                 fill: false,
//                 backgroundColor: 'rgb(75, 192, 192)',
//                 borderColor: 'rgba(75, 192, 192, 0.2)',
//             },
//         ],
//     };
//
//     const barData = {
//         labels: ['Electr.', 'Freelancer', 'Carpenter', 'Plumber', 'Painter'],
//         datasets: [
//             {
//                 label: 'Service Providers',
//                 data: [12, 19, 3, 5, 2],
//                 backgroundColor: 'rgb(75, 192, 192)',
//             },
//         ],
//     };
//
//     const pieData = {
//         labels: ['Users', 'Service Providers', 'Tasks'],
//         datasets: [
//             {
//                 label: 'Dataset',
//                 data: [300, 50, 100],
//                 backgroundColor: [
//                     'rgb(255, 99, 132)',
//                     'rgb(54, 162, 235)',
//                     'rgb(255, 205, 86)',
//                 ],
//             },
//         ],
//     };
//
//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//     };
//
//     useEffect(() => {
//         const lineChart = new Chart(lineRef.current, {
//             type: 'line',
//             data: lineData,
//             options,
//         });
//
//         const barChart = new Chart(barRef.current, {
//             type: 'bar',
//             data: barData,
//             options,
//         });
//
//         const pieChart = new Chart(pieRef.current, {
//             type: 'pie',
//             data: pieData,
//             options,
//         });
//
//         return () => {
//             lineChart.destroy();
//             barChart.destroy();
//             pieChart.destroy();
//         };
//     }, []);
//
//     return (
//         <div className="charts-container">
//             <Card title="Progress Charts" className="card">
//                 <div className="charts-row">
//                     <Card title="Line Chart" className="chart-card">
//                         <canvas ref={lineRef}></canvas>
//                     </Card>
//                     <Card title="Bar Chart (Vertical)" className="chart-card">
//                         <canvas ref={barRef}></canvas>
//                     </Card>
//                 </div>
//                 <div className="charts-row">
//                     {/*<Card title="Bar Chart (Vertical)" className="chart-card">*/}
//                     {/*    <canvas ref={barRef}></canvas>*/}
//                     {/*</Card>*/}
//                     <Card title="Pie Chart" className="chart-card">
//                         <canvas ref={pieRef}></canvas>
//                     </Card>
//                 </div>
//             </Card>
//         </div>
//     );
// };
//
// export default Charts;
import React from 'react';
import { Row, Col, Card } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

const Charts = () => {
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Users',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Users',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Users', 'Service Providers', 'Tasks'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const barDataVendor = {
        labels: ['Electricians', 'Plumbers', 'Carpenters', 'Painters', 'Masons', 'Gardeners', 'Roofers'
                , 'Locksmiths', 'Cleaners', 'Mechanics', 'Tailors', 'Cooks', 'Drivers', 'Nannies', 'Teachers',
        ],
        datasets: [
            {
                label: 'Vendors per Category',
                data: [8, 12, 5, 7, 6, 3, 4,
                    2, 9, 10, 4, 6, 8, 5, 7,
                ],  // Example data for each category
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(199, 199, 199, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="charts-container">
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Line Chart" bordered={false}>
                        <Line data={lineData} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Bar Chart (Vertical)" bordered={false}>
                        <Bar data={barData} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Card title="Pie Chart" bordered={false}>
                            <Pie data={pieData} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Bar Chart (Vertical)" bordered={false} style={{ overflowX: 'scroll' }}>
                        <div style={{ width: '900px' }}>
                            <Bar data={barDataVendor} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Charts;

