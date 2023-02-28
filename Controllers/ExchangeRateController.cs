using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ExchangeRate.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExchangeRateController : ControllerBase
    {
        private readonly ApiService apiService;

        public ExchangeRateController(ApiService apiService)
        {
            this.apiService = apiService;
        }

        [HttpGet("{currencyCode}")]
        public async Task<decimal> Get(string currencyCode)
        {
            return await apiService.GetExchangeRate(currencyCode);
        }
    }
}