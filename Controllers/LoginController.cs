using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using AutoMapper;
using Elaborate.Models;
using System;

namespace Elaborate.Controllers
{
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public LoginController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
