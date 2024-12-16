import { Injectable } from '@nestjs/common';

@Injectable()
export class StartegyService {
  /**
   * Evaluates the open-high strategy for a given stock's bar data.
   * @param bars An array of bars (price data points) for a specific stock.
   * @returns An array of timestamps where the open-high condition is met.
   */
  evaluateOpenHighStrategy(bars: any[]): string[] {
    const openHighTimestamps: string[] = [];

    bars.forEach((bar) => {
      const openPrice = bar.o;
      const highPrice = bar.h;

      // Check if open price equals or is greater than high price for the bar (open-high condition)
      if (openPrice === highPrice || openPrice > highPrice) {
        openHighTimestamps.push(bar.t); // Add the timestamp if the condition is met
      }
    });

    return openHighTimestamps;
  }

  /**
   * Evaluates the open-low strategy for a given stock's bar data.
   * @param bars An array of bars (price data points) for a specific stock.
   * @returns An array of timestamps where the open-low condition is met.
   */
  evaluateOpenLowStrategy(bars: any[]): string[] {
    const openLowTimestamps: string[] = [];

    bars.forEach((bar) => {
      const openPrice = bar.o;
      const lowPrice = bar.l;

      // Check if open price equals low price for the bar (open-low condition)
      if (openPrice === lowPrice || openPrice < lowPrice) {
        openLowTimestamps.push(bar.t); // Add the timestamp if the condition is met
      }
    });

    return openLowTimestamps;
  }
}
