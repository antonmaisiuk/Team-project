using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Elaborate.Data;
using Elaborate.Models;
using Elaborate.Elaborate.Entities;
using Elaborate.Helpers;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using System.Data.Entity;
using User.Management.Service.Services;
using User.Management.Service.Models;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace Elaborate.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAccountRepository _repository;
        private readonly JwtService _jwtService;
        private readonly AccountContext _context;
        private readonly IEmailService _emailService;
        private readonly UserManager<IdentityUser> _userManager;
        /// <summary>
        /// Konstruktor
        /// </summary>
        public AuthController(IAccountRepository repository, JwtService jwtService, AccountContext context, IEmailService emailService, UserManager<IdentityUser> userManager)
        {
            _repository = repository;
            _jwtService = jwtService;
            _context = context;
            _emailService = emailService;
            _userManager = userManager;
        }


        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterDto dto)
        {
            if (ModelState.IsValid)
            {
                // sprawdź, czy podany adres e-mail nie jest już przypisany do innego konta
                if (_context.Accounts.Any(u => u.Email == dto.Email))
                {
                    return StatusCode(StatusCodes.Status400BadRequest,
                        new { message = "Email is already taken" });
                }
                // sprawdź, czy podany numer telefonu nie jest już przypisany do innego konta
                if (_context.Accounts.Any(u => u.PhoneNumber == dto.Phone))
                {
                    return StatusCode(StatusCodes.Status400BadRequest,
                        new { message = "Phone number is already taken" });
                }



                //Przepisywanie do Account wartości atrybutów 
                var account = new Account
                {
                    UserName = dto.Name,
                    Email = dto.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                    PhoneNumber = dto.Phone

                };

                //Tworzenie użytkownika i zapisywanie do bazy danych
                _repository.Create(account);

                //Add Token to Verify the email....
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(account);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "api", new { token, email = account.Email }, Request.Scheme);
                var message = new Message(new string[] { account.Email! }, "Confirmation email link", confirmationLink!);
                _emailService.SendEmail(message);



                return StatusCode(StatusCodes.Status200OK,
                   new { Status = "Success", Message = $"User created & Email Sent to {account.Email} SuccessFully" });
            }

            return View(dto);
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = _context.Accounts.FirstOrDefault(u => u.Email == email);
            if (user != null)
            {
                user.EmailConfirmed = true; // zmiana wartości właściwości
                _context.SaveChanges(); // zapisanie zmian w bazie danych

                return StatusCode(StatusCodes.Status200OK,
                    new { Status = "Success", Message = "Email Verified Successfully" });
            }

            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Status = "Error", Message = "This User Doesnot exist!" });
        }





        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "Invalid Credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            var jwt = Request.Cookies["jwt"];

            if (jwt != null)
            {
                try
                {
                    var token = _jwtService.Verify(jwt);

                    int userId = int.Parse(token.Issuer);
                    var user = _repository.GetById(userId);

                    return Ok(user);
                }
                catch (SecurityTokenExpiredException)
                {
                    // Token wygasł, wykonaj odpowiednie akcje.
                    Response.Cookies.Delete("jwt");
                    return Unauthorized();
                }
                catch
                {
                    // Weryfikacja nie powiodła się lub wystąpił inny błąd.
                    return Unauthorized();
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]

        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"

            });
        }

        [HttpGet]
        public IActionResult TestEmail()
        {
            var message = new Message(new string[]
            { "fabgkamil@gmail.com" }, "Test", "<h1>Subscibe to my channel!<h1>");


            _emailService.SendEmail(message);
            return StatusCode(StatusCodes.Status200OK,
                new { Status = "Succes", Message = "Email Sent Succesfully" });
        }

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            var email = dto.Email;
            var user = _repository.GetByEmail(dto.Email);

            //var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var forgotPasswordlink = Url.Action(nameof(ResetPassword), "api", new { token, email = user.Email }, Request.Scheme);
                var message = new Message(new string[] { user.Email! }, "Forgot Password link", forgotPasswordlink!);

                _emailService.SendEmail(message);
                return StatusCode(StatusCodes.Status200OK,
                    new { Status = "Success", Message = $"Password Changed request is sent on Email {user.Email}. Please Open your email & click the link" });
            }

            return StatusCode(StatusCodes.Status400BadRequest,
                    new { Status = "Error", Message = $"Could not send link to email, please try again." });
        }

        [HttpGet("ResetPassword")]
        public async Task<IActionResult> ResetPassword(string token, string email)
        {
            //Przepisywanie token i email do konkretnego konta
            var model = new ResetPasswordDto { 
                Token = token, 
                Email = email 
            };

            return Ok(new
            {
                model
            });
        }

        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPassword)
        {         
            var user = _repository.GetByEmail(resetPassword.Email);
            //var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            //Problem z tokenem, bez niego działa 
            if (user != null)
            {
                var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
                if (!resetPassResult.Succeeded)
                {
                    foreach (var error in resetPassResult.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return Ok(ModelState);
                }
                return StatusCode(StatusCodes.Status200OK,
                    new { Status = "Success", Message = $"Password has been changed" });

            }
            return StatusCode(StatusCodes.Status400BadRequest,
                    new { Status = "Error", Message = $"Could not send link to email, please try again." });
        }
    }
}
