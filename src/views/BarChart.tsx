import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  groupTasksByPriority,
  groupTasksByDifficulty,
  groupTasksByEstimate,
} from "../util/helper";
import { getAllFinishedTasks } from "../apiService";
import { ChartData } from "../type";

// eslint-disable-next-line
import "chart.js/auto";

function BarCharts() {
  const [chartDataPriority, setChartDataPriority] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Tasks by Priority",
        data: [],
        backgroundColor: "#629DDD",
        borderWidth: 2,
      },
    ],
  });
  const [chartDataDifficulty, setChartDataDifficulty] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Tasks by Difficulty",
        data: [],
        backgroundColor: "#629DDD",
        borderWidth: 2,
      },
    ],
  });
  const [chartDataEstimate, setChartDataEstimate] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Tasks by Estimated Time",
        data: [],
        backgroundColor: "#629DDD",
        borderWidth: 2,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllFinishedTasks();

        const groupedDataPriority = groupTasksByPriority(data);

        setChartDataPriority({
          labels: groupedDataPriority.map((obj) => obj.priority),
          datasets: [
            {
              label: "Tasks by Priority",
              data: groupedDataPriority.map((obj) => obj.count),
              backgroundColor: "#629DDD",
              borderWidth: 2,
            },
          ],
        });

        const groupedDataDifficulty = groupTasksByDifficulty(data);
        setChartDataDifficulty({
          labels: groupedDataDifficulty.map((obj) => obj.difficulty),
          datasets: [
            {
              label: "Tasks by Difficulty",
              data: groupedDataDifficulty.map((obj) => obj.count),
              backgroundColor: "#629DDD",
              borderWidth: 2,
            },
          ],
        });

        const groupedDataEstimate = groupTasksByEstimate(data);
        setChartDataEstimate({
          labels: groupedDataEstimate.map((obj) => obj.estimate),
          datasets: [
            {
              label: "Tasks by Estimated Time",
              data: groupedDataEstimate.map((obj) => obj.count),
              backgroundColor: "#629DDD",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tasks Statistics
          </h2>
          <p className="mt-4 text-base text-gray-500">
            These charts represent the distribution of tasks across different
            priorities, difficulties, and estimated times. Gain insights into
            the numbers of tasks in each category.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 mt-5">
            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
              <Bar
                data={chartDataPriority}
                options={{ responsive: true, indexAxis: "y" }}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 mt-5">
            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg mt-4">
              <Bar
                data={chartDataDifficulty}
                options={{ responsive: true, indexAxis: "y" }}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 mt-5">
            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg mt-4">
              <Bar
                data={chartDataEstimate}
                options={{ responsive: true, indexAxis: "y" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarCharts;
