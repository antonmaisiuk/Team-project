using AutoMapper;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using Elaborate.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate
{
    public class ApplicationMappingProfile : Profile
    {
        public ApplicationMappingProfile()
        {




            //Podobno autoMapper przepisze wartości pól które są takie same (takie same pola)
            CreateMap<CreateTransactionDto, Transaction>();
            CreateMap<CreateInvestmentCryptoCurrencyDto, InvestmentStock>();
            CreateMap<CreateInvestmentPreciousMetalsDto, InvestmentPreciousMetal>();
            CreateMap<CreateInvestmentStockDto, InvestmentStock>();
        }
    }
}
