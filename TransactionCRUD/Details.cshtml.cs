using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Elaborate.Data;
using Elaborate.Models;

namespace Elaborate.Pages.TransactionCRUD
{
    public class DetailsModel : PageModel
    {
        private readonly Elaborate.Data.ElaborateContext _context;

        public DetailsModel(Elaborate.Data.ElaborateContext context)
        {
            _context = context;
        }

        public Transaction Transaction { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Transaction = await _context.Transaction.FirstOrDefaultAsync(m => m.Id == id);

            if (Transaction == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
