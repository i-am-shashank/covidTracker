import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import Search from "@material-ui/icons/Search";

const tableIcons = {
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000080",
    },
  },
});

const Table = () => {
  let url = `https://disease.sh/v3/covid-19/countries`;

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchStateData = async () => {
      const countryArr = [];

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      data.map((val, idx) =>
        countryArr.push({ country: val?.country, cases: val?.todayCases })
      );

      const sortedData =(
        countryArr
          .map((el) => ({ cases: el.cases, country: el.country }))
          .sort((a, b) => (a.cases > b.cases ? -1 : b.cases > a.cases ? 1 : 0))
          .filter((value, index) => index < 5)
      );

      setTableData(sortedData);
    };

    fetchStateData();
  }, [url]);

  const [columnData, setColumnData] = useState([
    { title: "Country", field: "country" },
    { title: "Cases", field: "cases" },
  ]);

  return (
    <div className="table-data">
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title="Live Cases"
          columns={columnData}
          data={tableData}
          tableIcons={tableIcons}
          options={{
            search: false,
            paging: false,
            sorting: true,
            
          }}
        />
      </MuiThemeProvider>
    </div>
  );
};

export default Table;
