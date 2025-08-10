export function monthDiff(dateFrom: Date, dateTo: Date): number {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
}

export function get6moTimestampRange() {
  const now = new Date();
  const sixMonthsAgo = new Date();

  // Set sixMonthsAgo to 6 months before now
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  const currentMonthStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
    0,
    0,
    0
  ).toISOString();

  const sixMonthsAgoEnd = new Date(
    sixMonthsAgo.getFullYear(),
    sixMonthsAgo.getMonth() + 1,
    0,
    23,
    59,
    59
  ).toISOString();
  return {
    timestamp_6months_ago: sixMonthsAgoEnd,
    timestamp_current_month: currentMonthStart,
  };
}
