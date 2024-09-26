import { Direction, ITransaction, Side, TransactionType } from "../interfaces/alpaca";

export const processAccountActivities = (activities: any[]): ITransaction[] => {
  const mapActivityTypeToTransactionType = (activityType: string): TransactionType => {
    switch (activityType) {
      case "CSD":
        return TransactionType.DEPOSIT;
      case "CSW":
        return TransactionType.WITHDRAWAL;
      case "FILL":
        return TransactionType.FILL;
      default:
        throw new Error(`Unknown activity type: ${activityType}`);
    }
  };

  return activities.map((activity) => {
    const direction = activity.net_amount > 0 ? Direction.credit : Direction.debit;
    const side = activity.side ? (activity.side === "buy" ? Side.buy : Side.sell) : Side.buy;
    const createdAt = activity.transaction_time
      ? new Date(activity.transaction_time).toISOString()
      : new Date(activity.date).toISOString();

    // Calculate the correct amount for FILL activities
    const amount = activity.activity_type === "FILL" ? activity.price * activity.qty : activity.net_amount || 0;

    return {
      id: activity.id,
      symbol: activity.symbol,
      type: mapActivityTypeToTransactionType(activity.activity_type),
      amount: Math.abs(amount), // Use absolute value to ensure positive amount
      qty: activity.qty,
      direction: direction,
      side: side,
      createdAt: createdAt,
    };
  });
};
