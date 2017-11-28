/**
 * All settings for statistics report
 */

export const STATISTICS_REPORT_SETTINGS = [
  {
    label: 'Date',
    valuePath: 'time',
    columnWidth: '150px',
    date: true,
    withoutChart: true
  }, {
    label: 'Searches',
    valuePath: 'searches',
    columnWidth: '110px',
    color: '#0074D9'
  }, {
    label: 'Clicks',
    valuePath: 'clicks',
    columnWidth: '80px',
    color: '#7FDBFF'
  }, {
    label: 'Unq. clicks',
    valuePath: 'unique_clicks',
    columnWidth: '120px',
    color: '#39CCCC'
  }, {
    label: 'CTR',
    valuePath: 'ctr',
    columnWidth: '80px',
    average: true,
    color: '#3D9970'
  }, {
    label: 'Booking',
    valuePath: 'bookings',
    columnWidth: '100px',
    color: '#2ECC40'
  }, {
    label: 'Sales',
    valuePath: 'sales',
    columnWidth: '80px',
    color: '#01FF70'
  }, {
    label: 'BTR',
    valuePath: 'btr',
    columnWidth: '70px',
    average: true,
    color: '#FFDC00'
  }, {
    label: 'STR',
    valuePath: 'str',
    columnWidth: '70px',
    average: true,
    color: '#FF851B'
  }, {
    label: 'Success %',
    valuePath: 'success',
    columnWidth: '120px',
    average: true,
    color: '#FF4136'
  }, {
    label: 'Errors %',
    valuePath: 'errors',
    columnWidth: '100px',
    average: true,
    color: '#F012BE'
  }, {
    label: 'Zeros %',
    valuePath: 'zeros',
    columnWidth: '100px',
    average: true,
    color: '#B10DC9'
  }, {
    label: 'T/O %',
    valuePath: 'timeouts',
    columnWidth: '80px',
    average: true,
    color: '#001f3f'
  }, {
    label: 'Avg Resp',
    valuePath: 'duration',
    average: true,
    color: '#85144b'
  }
];
