interface HeaderData {
      text: string,
      sortKey: string
}


export const HEADER_DATA: HeaderData[] = [
      {
            text: "Player Name",
            sortKey: "playerName",
      },
      {
            text: "Team Name",
            sortKey: "teamNickname"
      },
      {
            text: "Position",
            sortKey: "position"
      },
      {
            text: "Stat Type",
            sortKey: "statType",
      },
      {
            text: "Optimal Line",
            sortKey: "line"
      },
      {
            text: "Low Line",
            sortKey: "lowLine"
      },
      {
            text: "High Line",
            sortKey: "highLine"
      },
      {
            text: "Market Status",
            sortKey: "marketSuspended"
      },
]