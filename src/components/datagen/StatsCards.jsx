import { useFadeSlide } from "../common/useFadeSlide";

export default function StatsCards() {
  const totalAnim = useFadeSlide({ delay: 120 });
  const qualityAnim = useFadeSlide({ delay: 220 });
  return (
    <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-4" s>
      <div className="bg-[#002D72] text-white p-6 rounded-xl" style={totalAnim}>
        <p className="text-xs">TOTAL RECORDS</p>
        <h2 className="text-3xl font-bold">1,284,092</h2>
      </div>

      <div className="bg-white border p-6 rounded-xl" style={qualityAnim}>
        <p className="text-xs text-slate-500">INGESTION QUALITY</p>
        <h2 className="text-2xl text-[#002D72] font-bold">99.98%</h2>
      </div>
    </div>
  );
}