using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public class ApiService
{
    private readonly string apiUrl = "http://api.nbp.pl/api/"; // Jak u¿ywaæ tego API -> https://api.nbp.pl/
    private readonly HttpClient httpClient;

    public ApiService()
    {
        httpClient = new HttpClient();
        httpClient.BaseAddress = new Uri(apiUrl);
    }

    public async Task<decimal> GetExchangeRate(string currencyCode)
    {
        string[] tables = { "A", "B", "C" };

        foreach (string table in tables)
        {
            string endpoint = $"exchangerates/rates/{table}/{currencyCode}/?format=json";

            HttpResponseMessage response = await httpClient.GetAsync(endpoint);

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                try
                {
                    var options = new JsonSerializerOptions
                    {
                        IgnoreNullValues = true
                    };

                    ExchangeRatesResponse ratesResponse = JsonSerializer.Deserialize<ExchangeRatesResponse>(responseBody, options);

                    if (ratesResponse.Rates.Length > 0)
                    {
                        return ratesResponse.Rates[0].Mid;
                    }
                }
                catch (JsonException ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
        throw new Exception($"No exchange rate found for currency code {currencyCode}.");
    }
}