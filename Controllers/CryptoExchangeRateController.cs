using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class CryptoExchangeRateController : ControllerBase
{
    private readonly ApiService coinCapApiService;

    public CryptoExchangeRateController(ApiService coinCapApiService)
    {
        this.coinCapApiService = coinCapApiService;
    }

    [HttpGet("{currencyCode}")]
    public async Task<ActionResult<decimal>> GetCryptoValue(string currencyCode)
    {
        try
        {
            decimal value = await coinCapApiService.GetCryptoCurrencyValue(currencyCode);
            return Ok(value);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}