const KpiMetricTableSkeleton = () => (
  <div className="w-full animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded bg-gray-200"></div>
      ))}
  </div>
);

export default KpiMetricTableSkeleton;
