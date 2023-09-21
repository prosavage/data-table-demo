"use client"
import { MarketData } from "@/data";
import React, { useEffect, useState } from "react"
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import { Toggle } from "./Toggle";
import { NameTeamSearchInput } from "./NameTeamSearchInput";
import { StatusFilter } from "./StatusFilter";
import { HEADER_DATA as HEADER_ENTRIES } from "./TableData";
import { TableRowEntry } from "./TableSingleEntry";

interface TableProps {
      mkData: MarketData[]
}

enum SortDirection {
      ASCENDING = "ASCENDING",
      DESCENDING = "DESCENDING"
}

interface CurrentSort {
      key: string,
      direction: SortDirection
}


export const Table: React.FC<TableProps> = ({ mkData }) => {

      const [data, setData] = useState<MarketData[]>(mkData)
      const [filteredData, setFilteredData] = useState<MarketData[]>(data)

      const [curSort, setCurSort] = useState<CurrentSort | undefined>()

      // undefined means the filter isn't set.
      const [statTypeFilter, setStatTypeFilter] = useState<string | undefined>()
      const [nameFilter, setNameFilter] = useState<string | undefined>()
      const [marketStatusFilter, setMarketStatusFilter] = useState<string | undefined>()
      const [positionFilter, setPositionFilter] = useState<string | undefined>()

      useEffect(() => {
            const filtered = data.filter((entry) => {
                  if (positionFilter && positionFilter !== entry.position.toUpperCase()) return false;
                  if (marketStatusFilter) {
                        const isSuspended = entryIsSuspended(entry);
                        if (marketStatusFilter === "OPEN" && isSuspended) return false;
                        if (marketStatusFilter === "SUSPENDED" && !isSuspended) return false;
                  }
                  if (statTypeFilter && entry.statType.toUpperCase() !== statTypeFilter) return false;
                  if (nameFilter &&
                        (!entry.playerName.toUpperCase().includes(nameFilter)
                              && !entry.teamNickname.toUpperCase().includes(nameFilter))
                        // Its important to have abbreviations in here, people will try to search using them.
                        && !entry.teamAbbr.toUpperCase().includes(nameFilter)
                  )
                        return false;

                  return true;
            });

            setFilteredData(filtered);
      }, [data, nameFilter, marketStatusFilter, statTypeFilter, positionFilter]);


      const applySort = (key: string) => {
            setCurSort(prev => {
                  const direction = prev?.key === key
                        ? toggleDirection(prev.direction)
                        : SortDirection.ASCENDING;

                  return { key, direction };
            });

            setData(prevData => {
                  return [...prevData].sort((a, b) => compareValues(a[key], b[key], curSort?.direction));
            });
      };

      const toggleDirection = (direction: SortDirection) =>
            direction === SortDirection.ASCENDING
                  ? SortDirection.DESCENDING
                  : SortDirection.ASCENDING;

      const compareValues = (a: any, b: any, direction?: SortDirection) => {
            if (a < b) return direction === SortDirection.ASCENDING ? -1 : 1;
            if (a > b) return direction === SortDirection.ASCENDING ? 1 : -1;
            return 0;
      };

      const applyManualSuspension = (entry: MarketData) => {
            const newData = data.map((e) => {
                  if (e.playerName === entry.playerName && e.statType === entry.statType) {
                        return { ...e, manualSuspension: !entryIsSuspended(entry) }
                  }
                  return e
            })
            setData(newData)
      }


      const renderHeader = () => {
            return <tr>
                  {
                        HEADER_ENTRIES.map((entry, i) => {
                              let sortIcon = <AiOutlineSortAscending className={"ml-2 text-lg"} />
                              if (curSort && curSort.key == entry.sortKey && curSort.direction === SortDirection.DESCENDING) {
                                    sortIcon = <AiOutlineSortDescending className={"ml-2 text-lg"} />
                              }

                              return <th
                                    key={i + "-" + entry.text}
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                                    onClick={() => applySort(entry.sortKey)}>
                                    <div className="flex flex-row items-center">
                                          <p>
                                                {entry.text}
                                          </p>
                                          {sortIcon}
                                    </div>
                              </th>
                        }
                        )
                  }
            </tr >
      }

      const entryIsSuspended = (entry: MarketData) => {
            // Explicit check because it can be undefined if not set.
            // Which will evaluate to false.
            if (entry.manualSuspension !== undefined) {
                  return entry.manualSuspension
            }

            return entry.marketSuspended
      }


      const renderRow = (entry: MarketData) => {
            const suspended = entryIsSuspended(entry)
            const baseKey = entry.playerId + "-" + entry.statTypeId + "-"
            return [
                  <TableRowEntry key={baseKey + entry.playerId}>{entry.playerName}</TableRowEntry>,
                  <TableRowEntry key={baseKey + entry.teamId}>{entry.teamNickname} <span className="text-gray-500">({entry.teamAbbr})</span></TableRowEntry>,
                  <TableRowEntry key={baseKey + entry.position}>{entry.position.toUpperCase()}</TableRowEntry>, ,
                  <TableRowEntry key={baseKey + entry.statType}>{entry.statType.toUpperCase()}</TableRowEntry>,
                  <TableRowEntry key={baseKey + entry.line}>{entry.line}</TableRowEntry>,
                  <TableRowEntry key={baseKey + entry.lowLine}>{entry.lowLine}</TableRowEntry>,
                  <TableRowEntry key={baseKey + entry.highLine}>{entry.highLine}</TableRowEntry>,
                  <div key={baseKey + entry.line +  "-" + entry.marketSuspended} className="flex flex-row items-center justify-between">
                        {suspended ? <p className="text-red-500 font-mono">SUSPENDED</p> : <p className="text-green-500 font-mono">OPEN</p>}
                        <Toggle className={"ml-2"} onChangeHandler={() => applyManualSuspension(entry)} checked={suspended} />
                  </div>
            ].map((text, i) =>
                  <td key={i + "-" + entry.playerId + "-" + entry.statTypeId} scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${suspended ? "bg-gray-100" : ""}`}>
                        {text}
                  </td>
            )
      }

      const filters = [
            {
                  filter: positionFilter,
                  label: "Position",
                  options: ["PG", "GSW", "SF", "SG", "PF", "C"],
                  onFilter: (type: string) => setPositionFilter(type.toUpperCase() === "CLEAR" ? undefined : type.toUpperCase())
            },
            {
                  filter: marketStatusFilter,
                  label: "Market Status",
                  options: ["OPEN", "SUSPENDED"],
                  onFilter: (type: string) => setMarketStatusFilter(type.toUpperCase() === "CLEAR" ? undefined : type.toUpperCase())
            },
            {
                  filter: statTypeFilter,
                  label: "Stat Type",
                  options: ["ASSISTS", "REBOUNDS", "POINTS", "STEALS"],
                  onFilter: (type: string) => setStatTypeFilter(type.toUpperCase() === "CLEAR" ? undefined : type.toUpperCase())
            }

      ]

      return (
            <div className="rounded-lg mt-4 bg-white">
                  <div className="w-full flex flex-row p-3 justify-between flex-wrap items-center">
                        <NameTeamSearchInput onQuery={(query) => setNameFilter(query.toUpperCase())} />
                        <div className="flex flex-col items-center w-full my-1 sm:flex-row sm:w-auto">
                              {filters.map((filter, i) => <StatusFilter
                                    key={i + "-" + filter.label}
                                    className="my-1 sm:mr-1 w-full sm:w-auto"
                                    filter={filter.filter}
                                    label={filter.label}
                                    options={filter.options}
                                    onFilter={filter.onFilter}
                              />)}
                              <button
                                    disabled={!statTypeFilter && !marketStatusFilter && !positionFilter}
                                    className="w-full sm:w-auto my-1 justify-center rounded-md bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    onClick={() => {
                                          setStatTypeFilter(undefined)
                                          setMarketStatusFilter(undefined)
                                          setPositionFilter(undefined)
                                    }}
                              >
                                    Clear Filters
                              </button>
                        </div>
                  </div>
                  <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                              <thead className={"text-xs text-gray-700 uppercase bg-gray-50"}>
                                    {renderHeader()}
                              </thead>
                              <tbody>
                                    {filteredData.map((entry: MarketData, i) => <tr
                                          key={i + "-" + entry.playerId + "-" + entry.statTypeId}
                                          className="border-b"
                                    >
                                          {/* a row is pretty simple, so using React.memo won't be too much better. */}
                                          {renderRow(entry)}
                                    </tr>)}
                              </tbody>
                        </table>
                  </div>

            </div>
      );
}