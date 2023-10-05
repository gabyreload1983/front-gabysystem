import React, { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieOrdersPending({
  orders,
  labels,
  sector,
  onHandleClick,
}) {
  const chartRef = useRef();
  let pendings = 0;
  let process = 0;

  orders.forEach((order) => {
    if (order.estado === 21 && order.codiart === sector) pendings += 1;
    if (order.estado === 22 && order.codiart === sector) process += 1;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cantidad",
        data: [pendings, process],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 2,
        link: [
          `/orders/search/pending-${sector === ".PC" ? "pc" : "imp"}`,
          "/orders/search/in-process",
        ],
      },
    ],
  };

  const options = {};

  const onClick = (event) => {
    const clickDatasetIndex = getElementAtEvent(chartRef.current, event)[0]
      .datasetIndex;
    const index = getElementAtEvent(chartRef.current, event)[0].index;

    const link = data.datasets[0].link[index];
    onHandleClick(link);
  };

  return (
    <>
      <Pie data={data} ref={chartRef} onClick={onClick} options={options} />
    </>
  );
}
