const BASE_URL = "https://api.coinpaprika.com/v1";

/* coin list at <Coins /> */
export async function fetchCoins() {
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

/* coin detail at <Coin /> */
// info
export async function fetchCoinInfo(coinId: string | undefined) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}
// tickers
export async function fetchCoinTickers(coinId: string | undefined) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}
// chart
export async function fetchCoinChart(coinId: string | undefined) {
  return await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
  ).json();
}
