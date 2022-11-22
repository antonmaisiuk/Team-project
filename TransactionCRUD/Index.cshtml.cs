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
    public class IndexModel : PageModel
    {
        private readonly Elaborate.Data.ElaborateContext _context;

        public IndexModel(Elaborate.Data.ElaborateContext context)
        {
            _context = context;
        }

        public IList<Transaction> Transaction { get;set; }

        public async Task OnGetAsync()
        {
            Transaction = await _context.Transaction.ToListAsync();
        }
    }
}
