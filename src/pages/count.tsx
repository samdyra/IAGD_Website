import React from "react";
import { api } from "~/utils/api";
import { Chart } from "react-google-charts";
import { writeFile, utils } from "xlsx";
import { useCallback } from "react";

const Count = () => {
  const { data: countData, isLoading: isCountDataLoading } =
    api.count.getVotersForCandidateOne.useQuery();
  const { data: wholeData, isLoading: isTableDataLoading } =
    api.count.getAllPaginated.useQuery(
      {
        page: 1,
      },

      {
        keepPreviousData: true,
        cacheTime: 60 * 60 * 1000,
        select: (data) => {
          const censorPhoneNumber = (phoneNumber: string) => {
            return (
              phoneNumber.slice(0, -3).replace(/./g, "*") +
              phoneNumber.slice(-3)
            );
          };

          const censorTokenNumber = (phoneNumber: string) => {
            return (
              phoneNumber.slice(0, -3).replace(/./g, "*") +
              phoneNumber.slice(-3)
            );
          };
          return data.map((voter) => [
            voter.id,
            censorPhoneNumber(voter.phoneNumber),
            voter.hasVoted,
            censorTokenNumber(voter.voterToken),
            voter.choseCandidateNum,
          ]);
        },
      }
    );

  // console.log(wholeData);
  // const exportFile = useCallback(() => {
  //   /* generate worksheet from state */
  //   const ws = utils.json_to_sheet(wholeData);
  //   /* create workbook and append worksheet */
  //   const wb = utils.book_new();
  //   utils.book_append_sheet(wb, ws, "Data");
  //   /* export to XLSX */
  //   writeFile(wb, "SheetJSReactAoO.xlsx");
  // }, [wholeData]);

  // exportFile();

  const isLoading = isCountDataLoading || isTableDataLoading;

  if (isLoading) {
    return <p>...loading</p>;
  }

  const pieChartData = [
    ["Candidate", "Count"],
    ["Candidate 1", countData?.countCandidateOne],
    ["Candidate 2", countData?.countCandidateTwo],
  ];

  const pieChartOptions = {
    title: "Live Count Percentage",
  };

  const tableData = [
    ["id", "phone number", "has voted", "voter token", "chose candidate"],
    ...(wholeData as []),
  ];

  const tableOptions = {
    title: "Company Performance",
    // curveType: "function",
    // legend: { position: "bottom" },
  };

  return (
    <div>
      <div className="flex justify-center ">
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={pieChartOptions}
          width={"100%"}
          height={"500px"}
        />
      </div>

      <div className="flex justify-center ">
        <Chart
          chartType="Table"
          data={tableData}
          options={{
            width: 1280,
          }}
        />
      </div>
    </div>
  );
};

export default Count;
