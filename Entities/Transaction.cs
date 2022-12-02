using Microsoft.VisualBasic;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Elaborate.Entities
{
    public class Transaction
    {
            public Transaction(DateTime date, decimal value, string title, string comment,  int accountId)
            {
            this.Date = date;
            this.Value = value;
            this.Title = title;
            this.Comment = comment;
            this.AccountId = accountId;
            //this.TransCategoryId = transactionCatId;
                try
                {
                    string mySqlConnectionString = "server=146.59.126.32;port=3306;uid=user;pwd=Yg5udzLxxw9ADsT;database=elaborate-db";

                    using var con = new MySqlConnection(mySqlConnectionString);
                    con.Open();
                    string query = "SELECT MAX(Id) FROM Transactions ";
                    var cmd = new MySqlCommand(query, con);
                    var maxId = Int32.Parse(cmd.ExecuteScalar().ToString());
                    this.Id = maxId + 1;
                    con.Close();
                }
                catch (Exception ex)
                {

                }
            }

            [Key]
            public int Id { get; set; }

            [Display(Name = "Data stworzenia Transakcji")]
            [Required]
            public DateTime Date { get; set; }

            [Display(Name = "Wartość Transakcji")]
            [Required]
            public decimal Value { get; set; }

            [Display(Name = "Nazwa transakcji")]
            [Required]
            public string Title { get; set; }

            [Display(Name = "Komentarz do Transakcji")]
            public string Comment { get; set; }
            public int AccountId { get; set; }
            public virtual Account Account { get; set; }
            public int TransCategoryId { get; set; }
            public virtual TransCategory TransCategory { get; set; }
    }
}
