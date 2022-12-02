using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using AutoMapper;
using Elaborate.Models;

namespace Elaborate.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CategoryController(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        //[Route("categories")]
        [HttpGet("categories")]
        public ActionResult<IEnumerable<TransCategory>> GetAll()
        {
            var categories = _dbContext
                .TransCategories
                .ToList();

            return Ok(categories);
        }

        //[HttpGet("{id}")]
        //public ActionResult<TransCategory> Get([FromRoute] int id)
        //{
        //    var categories = _dbContext
        //        .TransCategories
        //        .FirstOrDefault(r => r.Id == id);

        //    if (categories is null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(categories);
        //}

        [HttpPost]
        public ActionResult CreateTransactionCategory([FromBody] TransCategoryDto dto)
        {
            var categories = _mapper.Map<TransCategory>(dto);
            _dbContext.TransCategories.Add(categories);
            _dbContext.SaveChanges();


            return Created($"/api/TransCategory/{categories.Id}", null);
        }

        //[HttpPost]
        //public ActionResult<IEnumerable<TransCategory>> Add(TransCategory transCategory)
        //{
        //    if (_dbContext.Database.CanConnect())
        //    {
        //        _dbContext.TransCategories.Add(transCategory);
        //        _dbContext.SaveChanges();
        //    }
        //    return Ok(transCategory);
        //}
    }
}
