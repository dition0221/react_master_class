import { useQuery } from "@tanstack/react-query";
import ApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
// API
import { fetchCoinChart } from "../api";
// Atom
import { isDarkAtom } from "../atoms";
// Components
import Loader from "../components/Loader";
import NoData from "../components/NoData";

/* Interface */
export interface IChartProps {
  coinId: string;
}

export interface IData {
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
  // Theme
  const isDark = useRecoilValue(isDarkAtom);
  // parameter
  const { coinId } = useOutletContext<IChartProps>();
  // react-query
  const { isLoading, data } = useQuery<IData[]>(["chart", coinId], () =>
    fetchCoinChart(coinId)
  );
  const isError = !Array.isArray(data);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <NoData />
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
              mode: isDark ? "dark" : "light",
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
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString()
              ),
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100],
              },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
              x: {
                format: "yy-MM-dd, ddd",
              },
            },
          }}
        />
      )}
    </>
  );
}
