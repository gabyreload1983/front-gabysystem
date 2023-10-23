import React, { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieOrdersPending({
  pending,
  process,
  labels,
  sector,
  onHandleClick,
}) {
  const chartRef = useRef();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cantidad",
        data: [pending?.length, process?.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 2,
        link: [
          `/orders/search?sector=${
            sector === ".PC" ? "pc" : "imp"
          }&state=pending`,
          `/orders/search?sector=${
            sector === ".PC" ? "pc" : "imp"
          }&state=process`,
        ],
      },
    ],
  };

  const options = {};

  const onClick = (event) => {
    const clickDatasetIndex = getElementAtEvent(chartRef.current, event)[0]
      ?.datasetIndex;
    const index = getElementAtEvent(chartRef.current, event)[0]?.index;

    const link = data.datasets[0].link[index];
    onHandleClick(link);
  };

  return (
    <>
      <Pie data={data} ref={chartRef} onClick={onClick} options={options} />
    </>
  );
}
