using System.Text.Json.Serialization;

public class CoinCapResponse
{
    [JsonPropertyName("data")]
    public CoinCapData Data { get; set; }
}

public class CoinCapData
{
    [JsonPropertyName("priceUsd")]
    public decimal PriceUsd { get; set; }
}