export enum BotStatus {
  STARTED = 'started',
  PAUSED = 'paused',
  RUNNING = 'running',
  STOPPED = 'stopped',
  DISABLED = 'disabled',
  SUSPENDED = 'suspended',
}

export enum TradeType {
  INTRADAY = 'intraday',
  DELIVERY = 'delivery',
  SWING = 'swing',
  POSITIONAL = 'positional',
  FUTURES = 'futures',
  OPTIONS = 'options',
  AUCITON = 'auction',
}

export enum ExchangeType {
  BSE = 'bse',
  NSE = 'nse',
}

export enum OrderSide {
  BUY = 'buy',
  SELL = 'sell',
}

export enum OrderStatus {
  PENDING = 'pending',
  FILLED = 'filled',
  CANCELLED = 'cancelled',
}

export enum StopLossType {
  FIXED = 'fixed',
  TRAILING = 'trailing',
}

export enum Strategies {
  OPEN_LOW = 'open_low',
  OPEN_HIGH = 'open_high',
}
