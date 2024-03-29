﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Elaborate.Elaborate.Entities
{
    public class Account : IdentityUser
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Nazwa Konta")]
        [Required]
        public string UserName { get; set; }
        [Display(Name = "Adres E-mail")]
        [Required]
        [Index(IsUnique = true)]
        public string Email { get; set; }
        [Display(Name = "Numer telefonu")]
        [Required]
        [Index(IsUnique = true)]
        public string PhoneNumber { get; set; }
        [Display(Name = "Hasło")]
        [Required]
        [JsonIgnore]
        public string PasswordHash { get; set; }

        public virtual List<Transaction> ListOfTransactions { get; set; }
    }
}
