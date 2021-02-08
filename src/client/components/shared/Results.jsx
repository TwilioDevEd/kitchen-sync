import React, { useState, useRef, useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { Bar } from 'react-chartjs-2';

const chartOptions = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        display: true,
        ticks: {
          beginAtZero: true,
          precision: 0,
        },
      },
    ],
  },
};

export default function Results({ items, outOfStockItem }) {
  const [chartData, setChartData] = useState(getChartData(items));
  const chart = useRef();

  useEffect(() => {
    setChartData(getChartData(items));
    chart.current.chartInstance.update();
  }, [items]);

  return (
    <Row className={`mb-4 ${items.length ? '' : 'invisible'}`}>
      <Col>
        <Card className="shadow-sm h-100">
          <Card.Body>
            <Card.Title>
              What item should replace '{outOfStockItem}
              '?
              <p className="text-danger"> Vote at twil.io/group-order</p>
            </Card.Title>
            <Bar ref={chart} data={chartData} options={chartOptions} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

function getChartData(items) {
  const data = {
    labels: [],
    datasets: [
      {
        backgroundColor: '#42d77d',
        borderColor: '#42d77d',
        data: [],
      },
    ],
  };

  items.forEach((item) => {
    data.labels.push(item.name);
    data.datasets[0].data.push(item.votes);
  });

  return data;
}
