export default function accumulateDataTotal(statistics, valuePaths) {

  return statistics.reduce((acc, curValue) => {
    const accData = {};

    valuePaths.forEach(valuePath => {
      accData[valuePath] = Number(acc[valuePath]) + Number(curValue[valuePath]);
    });

    return accData;
  });
}
