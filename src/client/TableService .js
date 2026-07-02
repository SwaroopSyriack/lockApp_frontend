import api from "./apiClient";

const TableService = {
  GetTables: async () => {
    try {
      const response = await api.get("/tables");

      return {
        success: true,
        data: response.data,
        message: "Fetch Successful",
      };
    } catch (error) {
      return {
        success: false,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Cannot fetch tables",
      };
    }
  },

  CreateTables: async (table_name, display_name, columns) => {
    try {
      const cleanedColumns = columns.map((col) => ({
        column_name: col.column_name,
        data_type: col.data_type,
        nullable: col.nullable,
        ...(col.default_value !== undefined && {
          default_value: col.default_value,
        }),
      }));

      const payload = {
        table_name: table_name,
        display_name: display_name,
        columns: cleanedColumns,
      };

      const response = await api.post("/tables", payload);

      return {
        success: true,
        data: response.data,
        message: "Table Created Successfully",
      };
    } catch (error) {
      console.log(error.response.data);
      return {
        success: false,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Cannot Create table",
      };
    }
  },
  MakeDefaultTable: async (id) => {
    try {
      const response = await api.patch(
        `tables/${id}/default`,
      );
      return {
        success: true,
        data: response.data,
        message: "Table Made As Default",
      };
    } catch (error) {
      console.log(error.response.data);
      return {
        success: false,
        data: error.response?.data || null,
        message:
          error.response?.data?.message ||
          "Error Cannot make the table as Default",
      };
    }
  },
  getCurrentTable: async () => {
    try {
      const response = await api.get(`tables/default`);
      return {
        success: true,
        data: response.data,
        message: "Fetch Successful",
      };
    } catch (error) {
      return {
        success: false,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Error Cannot find the Table",
      };
    }
  },
  insertToTable: async (id , data , timedata = '0') => {
    try{
      const response = await api.post(`tables/${id}/rows` , {data : data ,timedata :  timedata})
       return {
        success: true,
        data: response.data,
        message: "Successful Added the Data",
      };
    }
    catch(error){
      console.log(error)
      return {
        success: false,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Error Cannot insert to the Table",
      };

    }
  },
  getCurrentTableColumns: async() => {
    try{
      const response = await api.get(`tables/rows`)
      return{
        success: true,
        data: response.data,
        message: "Successful fetched the data",

      };
    }
    catch(error){
      return{
        success: false,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Error Cannot fetch Data",

      }
    }
  }
};

export default TableService;
