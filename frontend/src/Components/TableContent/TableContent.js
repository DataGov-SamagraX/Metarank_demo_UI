import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { item_data } from "../../Data/item_data";
// import { ranking } from "../../Data/ranking_recieved";
import { COLUMNS } from "./columns";
import {getRanking}	from "../../actions"

function TableContent() {
  const dispatch = useDispatch();
  const rankingList = useSelector(state=>state.ranking);
  const {error,loading,ranking} = rankingList;
  const [items, setItems] = useState([]);
  const [tableData, setTableData] = useState([{}]);
  useEffect(() => {
    dispatch(getRanking());
  }, []);
  useEffect(() => {
    setItems(ranking["items"]?.sort((a, b) => b.score - a.score));
  }, [ranking,loading]);

  useEffect(() => {
    setTableData(
      items?.map((item, rank, _) => ({
        rank: rank + 1,
        value: item.score,
        id: item.item,
        ...item_data[item.item],
      }))
    );
  }, [items]);

  const columns = useMemo(() => COLUMNS, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });
  return (
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
  );
}

export default TableContent;
