interface OrderSide {
  buy: 'buy';
  sell: 'sell';
}

interface OrderType {
  market: 'market';
  limit: 'limit';
  stop: 'stop';
  stop_limit: 'stop_limit';
  trailing_stop: 'trailing_stop';
}

interface TimeInForce {
  day: 'day';
  gtc: 'gtc';
  opg: 'opg';
  cls: 'cls';
  ioc: 'ioc';
  fok: 'fok';
}

interface OrderClass {
  simple: 'simple';
  bracket: 'bracket';
  oco: 'oco';
  oto: 'oto';
}
