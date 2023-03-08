using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public partial class ApiService
{
    private readonly string nbpApiUrl = "http://api.nbp.pl/api/";           // Jak u¿ywaæ tego API -> https://api.nbp.pl/
    private readonly string coinCapApiUrl = "https://api.coincap.io/v2/";   // Jak u¿ywaæ tego API -> https://docs.coincap.io/
    private readonly HttpClient httpClient;

    public ApiService()
    {
        httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
    }

    public async Task<decimal> GetExchangeRate(string currencyCode)
    {
        var nbpApiService = new NbpApiService(httpClient, nbpApiUrl);
        return await nbpApiService.GetExchangeRate(currencyCode);
    }

    public async Task<decimal> GetCryptoCurrencyValue(string currencyName)
    {
        var coinCapApiService = new CoinCapApiService(httpClient, coinCapApiUrl);
        return await coinCapApiService.GetCryptoCurrencyValue(currencyName);
    }
}

public partial class ApiService
{
    private class NbpApiService
    {
        private readonly HttpClient httpClient;
        private readonly string apiUrl;

        public NbpApiService(HttpClient httpClient, string apiUrl)
        {
            this.httpClient = httpClient;
            this.apiUrl = apiUrl;
        }

        public async Task<decimal> GetExchangeRate(string currencyCode)
        {
            string[] tables = { "A", "B", "C" };

            foreach (string table in tables)
            {
                string endpoint = $"exchangerates/rates/{table}/{currencyCode}/?format=json";

                HttpResponseMessage response = await httpClient.GetAsync(apiUrl + endpoint);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    ExchangeRatesResponse ratesResponse = JsonSerializer.Deserialize<ExchangeRatesResponse>(responseBody);

                    if (ratesResponse.Rates.Length > 0)
                    {
                        return ratesResponse.Rates[0].Mid;
                    }
                }
            }
            throw new Exception($"No exchange rate found for currency code {currencyCode}.");
        }
    }
}

public partial class ApiService
{
    private class CoinCapApiService
    {
        private readonly HttpClient httpClient;
        private readonly string apiUrl;

        public CoinCapApiService(HttpClient httpClient, string apiUrl)
        {
            this.httpClient = httpClient;
            this.apiUrl = apiUrl;
        }

        public async Task<decimal> GetCryptoCurrencyValue(string currencyName)
        {
            string endpoint = $"assets/{currencyName}";

            HttpResponseMessage response = await httpClient.GetAsync(apiUrl + endpoint);

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                JObject jObject = JObject.Parse(responseBody);
                decimal priceUsd = (decimal)jObject.SelectToken("data.priceUsd");
                return priceUsd;
            }

            throw new Exception($"No value found for cryptocurrency {currencyName}.");
        }
    }
}