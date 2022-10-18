import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { user_data } from "../../Data/user_data";
// import { ranking } from "../../Data/ranking_recieved";
import { COLUMNS } from "./columns";
import { Multiselect } from "multiselect-react-dropdown";

function UserSearch() {
  const [tableData, setTableData] = useState([{}]);
  const [userId, setUserId] = useState("");
  const [chosenActivites, setChosenActivites] = useState([]);
  const [chosenCrops, setChosenCrops] = useState([]);
  function convert_to_displayable(lst) {
    const bool_to_str = (x) => (x ? "True" : "false");
    return lst.map((x) => ({
      id: x["id"],
      Activities: x?.["Activities"]?.join(" | "),
      kharif_crops: x?.["kharif_crops"]?.join(" | "),
      Farmertype: x?.["Farmertype"],
      district: x?.["district"],
      Own_animal_large: bool_to_str(x?.["Own_animal_large"]),
      Own_animal_small: bool_to_str(x?.["Own_animal_small"]),
      Own_poultry: bool_to_str(x?.["Own_poultry"]),
    }));
  }

  function get_option(key) {
    let lst = [];
    for (let dic of user_data) {
      lst = [...lst, ...dic[key]];
    }
    return [...new Set(lst)];
  }

  function filter_data(lst1, lst2) {
    setTableData(
      convert_to_displayable(
        user_data.filter((data) => {
          for (let item of lst1) {
            if (!data["Activities"].includes(item)) {
              return false;
            }
          }
          for (let item of lst2) {
            if (!data["kharif_crops"].includes(item)) {
              return false;
            }
          }
          return true;
        })
      )
    );
  }

  useEffect(() => {
    filter_data(chosenActivites, chosenCrops);
  }, [chosenActivites, chosenCrops]);

  useEffect(() => {
    setUserId(
      JSON.parse(localStorage.getItem("metarank"))["id"] || "9583860237"
    );
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const activites = useMemo(() => get_option("Activities"), []);
  const kharifCrops = useMemo(() => get_option("kharif_crops"), []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          color: "black",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <h1>Filters</h1>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <div>Current User Id</div>
          <div>{userId}</div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Set User Id"
            style={{ fontSize: "20px" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                localStorage.setItem(
                  "metarank",
                  JSON.stringify({
                    ...JSON.parse(localStorage.getItem("metarank")),
                    id: e.target.value,
                  })
                );
                setUserId(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div>Filter Activites</div>
          <Multiselect
            showArrow
            options={activites}
            isObject={false}
            onSelect={(lst, _) => {
              setChosenActivites(lst);
              filter_data(chosenActivites, chosenCrops);
            }}
            onRemove={(lst, _) => {
              setChosenActivites(lst);
              filter_data(chosenActivites, chosenCrops);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div>Filter Crops</div>
          <Multiselect
            showArrow
            options={kharifCrops}
            isObject={false}
            onSelect={(lst, _) => {
              setChosenCrops(lst);
              filter_data(chosenActivites, chosenCrops);
            }}
            onRemove={(lst, _) => {
              setChosenCrops(lst);
              filter_data(chosenActivites, chosenCrops);
            }}
          />
        </div>
      </div>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "#282c34",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserSearch;
