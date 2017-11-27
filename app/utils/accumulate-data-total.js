/**
 * Accumulate all data values by provided valuePaths
 * @param {Array} statistics
 * @param {Array} valuePaths
 * @returns {Object} Object with accumulated values
 */

export default function accumulateDataTotal(data, valuePaths) {
  return data.reduce((acc, curValue) => {
    const accData = {};

    valuePaths.forEach(valuePath => {
      accData[valuePath] = Number(acc[valuePath]) + Number(curValue[valuePath]);
    });

    return accData;
  });
}
