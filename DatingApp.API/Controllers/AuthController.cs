using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [ActivatorUtilitiesConstructor]
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
      //  private readonly UsersController _userControl;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            //_userControl = userControl;
            _mapper = mapper;
            _config = config;
            _repo = repo;
        }

        [HttpPost("register")]

        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //validate request
            //if not using apicontroller
            //if(!ModelState.IsValid)
            //return BadRequest(ModelState);

            //username converted to lowrcase to avoid conflict

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username Already Exists");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailsDto>(createdUser);

            return CreatedAtRoute("GetUser",new { controller = "Users" , id = createdUser.Id}, userToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            //checking user with username and password
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            //creating claims 2 claims, details for token includes id and username of user
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username),

            };

            // var identity = new ClaimsIdentity(claims);
            // identity.FindFirst("NameIdentifier");

            //creates a key to  check if the user returns a valid token , 

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            //so the serer signs the token using credentials and encryts the key with hashing algorithm

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // creates a token through token descriptor and pass  details(id,usrname) through subjects
            //sets expiring date and credentials whcih include the encryted key

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            //used to create a token jwttokenhandler is required to create a token

            var tokenHandler = new JwtSecurityTokenHandler();

            //uses tokenhandler to write the tokrndescrption into the token thus creating the token

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }
    }
}