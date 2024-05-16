import { getOrderTier } from "../../../utils";

export default function StatisticsRepaired({ statistics, title }) {
  return (
    <div className="col-12 col-md-6 bg-dark text-white">
      <h2>{title}</h2>
      <p>TOTAL: {statistics.repair}</p>
      <p>
        {getOrderTier(0)}: {statistics.zero}
        {" >>> "}
        {((statistics.zero * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(1)}: {statistics.one}
        {" >>> "}
        {((statistics.one * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(2)}: {statistics.two}
        {" >>> "}
        {((statistics.two * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(3)}: {statistics.three}
        {" >>> "}
        {((statistics.three * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(4)}: {statistics.four}
        {" >>> "}
        {((statistics.four * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(5)}: {statistics.five}
        {" >>> "}
        {((statistics.five * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(6)}: {statistics.six}
        {" >>> "}
        {((statistics.six * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(7)}: {statistics.seven}
        {" >>> "}
        {((statistics.seven * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(8)}: {statistics.eight}
        {" >>> "}
        {((statistics.eight * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(9)}: {statistics.nine}
        {" >>> "}
        {((statistics.nine * 100) / statistics.repair).toFixed(2)}%
      </p>
      <p>
        {getOrderTier(10)}: {statistics.ten}
        {" >>> "}
        {((statistics.ten * 100) / statistics.repair).toFixed(2)}%
      </p>
    </div>
  );
}
