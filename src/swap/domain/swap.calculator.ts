export interface SwapCalculation {
    grossValue: number,
    feeValue: number,
    finalValue: number,
    feeRate: number
}

export function calculateSwap(
    price: number,
    amount: number
): SwapCalculation {

    const feeRate = 0.015;

    const grossValue = price * amount;
    const feeValue = grossValue * feeRate;
    const finalValue = grossValue - feeValue;

    return {
        grossValue,
        feeValue,
        finalValue,
        feeRate
    }
}