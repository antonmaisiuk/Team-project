﻿using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using AutoMapper;
using Elaborate.Models;
using System;
using System.Threading.Tasks;
using Elaborate.Helpers;

namespace Elaborate.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public CategoryController(ApplicationDbContext dbContext, IMapper mapper, JwtService jwtService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        [HttpGet("categories")]
        public ActionResult<IEnumerable<TransCategory>> GetAll()
        {
            var categories = _dbContext
                .TransCategories
                .ToList();

            return Ok(categories);
        }


        [HttpPost("addTransCategory")]
        public ActionResult CreateTransactionCategory([FromBody] TransCategoryDto dto)
        {
            var categories = _mapper.Map<TransCategory>(dto);
            _dbContext.TransCategories.Add(categories);
            _dbContext.SaveChanges();

            var categoriesList = _dbContext
               .TransCategories
               .ToList();

            return Ok(categoriesList);
        }

        /// <summary>
        /// Bartosz Truszkowski
        /// </summary>
        /// <param name="id"></param>
        /// <param name="DeleteCategort"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategort(int id)
        {
            var CategorynToDelete = _dbContext.TransCategories.FirstOrDefault(t => t.Id == id);

            if (CategorynToDelete is null)
                return NotFound("Nie znaleziono kategorii o podanym id");
            
            _dbContext.TransCategories.Remove(CategorynToDelete);

            await _dbContext.SaveChangesAsync();

            return Ok(CategorynToDelete);
        }
    }
}
