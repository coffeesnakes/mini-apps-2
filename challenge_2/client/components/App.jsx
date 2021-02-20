import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import axios from "axios";

const App = (props) => {
  const [chartRef, setRef] = useState(React.createRef());

  useEffect(() => {
    fetchHistData();
  }, []);

  const fetchHistData = (
    currency = "EUR",
    start = "2020-01-01",
    end = "2020-07-29"
  ) => {
    axios
      .get("http://localhost:3000/api/historical-data", {
        params: {
          currency: currency,
          start: start,
          end: end,
        },
      })
      .then((response) => {
        let dates = Object.keys(response.data);
        let prices = dates.map((date) =>
          Number(response.data[date].toFixed(2))
        );
        const btcChart = chartRef.current.getContext("2d");
        new Chart(btcChart, {
          type: "line",
          data: {
            labels: dates,
            datasets: [
              {
                label: "BTC Closing Price (EUR)",
                data: prices,
                backgroundColor: ["#a8dadc"],
                borderColor: ["#1d3557"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  gridLines: {
                    drawOnChartArea: false,
                    drawBorder: true,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    drawOnChartArea: false,
                    drawBorder: true,
                  },
                },
              ],
            },
            tooltips: {
              displayColors: false,
              titleFontSize: 16,
              bodyFontSize: 14,
              xPadding: 10,
              yPadding: 10,
              callbacks: {
                label: (tooltipItem, data) => {
                  return `${tooltipItem.value}€`;
                },
              },
            },
          },
        });
      })
      .catch((error) => `Error getting hisorical data ${error}`);
  };

  return (
    <div>
      <canvas
        id="BTCChart"
        ref={chartRef}
        style={({ width: "600" }, { height: "400" })}
      />
      <br />
      <p>
        Powered by <a href="https://www.coindesk.com/price/bitcoin">CoinDesk</a>
      </p>
    </div>
  );
};

export default App;
