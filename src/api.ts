const BASE_URL = "https://api.coinpaprika.com/v1";

/* coin list at <Coins /> */
export async function fetchCoins() {
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

export async function fetchCoinInfo(coinId: string | undefined) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinTickers(coinId: string | undefined) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}
