import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";
// API
import { fetchCoinChart } from "../api";
// Components
import Loader from "../components/Loader";

/* Interface */
interface IChartProps {
  coinId: string;
}

interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export default function Chart() {
  // parameter
  const { coinId } = useOutletContext<IChartProps>();
  // react-query
  const { isLoading, data } = useQuery<IData[]>(["chart", coinId], () =>
    fetchCoinChart(coinId)
  );
  const isError = !Array.isArray(data);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Loader text="Data Not Found" />
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data:
                (data?.map((price) => Number(price.close)) as number[]) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
          }}
        />
      )}
    </div>
  );
}
