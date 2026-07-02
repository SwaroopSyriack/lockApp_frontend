import { useEffect, useState } from "react";
import TableService from "../../client/tableService ";

const rows = [
  {
    id: "f84a-92bc-1294",
    name: "Alexandra Vance",
    company: "Global Logistics Inc.",
    country: "United Kingdom",
    policy: "Cyber Risk",
    coverage: "$12.5M",
    time: "Oct 24, 2023",
  },
];

export default function DataTable() {
  const [tablename, setTableName] = useState("");
  const [tableRowData, setTableRowData] = useState([]);
  const [columnData, setColumnData] = useState([]);

  async function fetchTableData() {
    const result = await TableService.getCurrentTableColumns();
    if (result?.success) {
      setTableName(result.data.table_name);
      setTableRowData(result.data.rows);
      const columns = Object.keys(result.data.rows[0]);
      setColumnData(columns);
    } else {
      console.log("Error some error occured");
    }
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
  <table className="w-full text-sm border-collapse">
    <thead>
      <tr className="bg-slate-50 border-b border-slate-200">
        {columnData.map((col) => (
          <th
            key={col}
            className="px-4 py-2.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wide border-r border-slate-200 last:border-r-0"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {tableRowData.map((row, i) => (
        <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
          {columnData.map((col) => (
            <td
              key={col}
              className="px-4 py-2.5 font-mono text-sm text-slate-800 border-r border-slate-100 last:border-r-0"
            >
              {String(row[col])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}
