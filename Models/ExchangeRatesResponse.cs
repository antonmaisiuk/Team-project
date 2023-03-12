using System.Text.Json.Serialization;

public class ExchangeRatesResponse
{
    [JsonPropertyName("table")]
    public string Table { get; set; }

    [JsonPropertyName("currency")]
    public string Currency { get; set; }

    [JsonPropertyName("code")]
    public string Code { get; set; }

    [JsonPropertyName("rates")]
    public Rate[] Rates { get; set; }
}

public class Rate
{
    [JsonPropertyName("no")]
    public string No { get; set; }

    [JsonPropertyName("effectiveDate")]
    public string EffectiveDate { get; set; }

    [JsonPropertyName("mid")]
    public decimal Mid { get; set; }
}