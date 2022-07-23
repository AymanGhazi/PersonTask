using System.ComponentModel;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.interfaces;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<Person> userManager;
        private readonly SignInManager<Person> signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IPersonRepository personRepository;

        public AccountController(
            UserManager<Person> userManager,
             SignInManager<Person> signInManager,
             ITokenService tokenService,
             IMapper mapper,
             IPersonRepository personRepository)
        {
            _mapper = mapper;
            this.personRepository = personRepository;
            this.userManager = userManager;
            this.signInManager = signInManager;
            _tokenService = tokenService;

        }
        //[fromBody] is not necessary as we get [ApiController in the decorated of the controller]
        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            //see below
            if (await personRepository.userExist(registerDto.Email)) return BadRequest("Email is taken");

            var user = _mapper.Map<Person>(registerDto);
            var result = await userManager.CreateAsync(user, registerDto.password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            var RoleResult = await userManager.AddToRoleAsync(user, "Member");
            if (!RoleResult.Succeeded)
            {
                return BadRequest(RoleResult.Errors);
            }

            return new UserDto
            {
                Id = user.Id,
                userName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                AvatarId = user.AvatarId,
                Gender = user.Gender,
                PhoneNumber = user.PhoneNumber,
                Adresses = user.Addresses.Select(add =>
                                            new AddressDto
                                            {
                                                City = add.City,
                                                Country = add.Country,
                                                Street = add.Street
                                            }).ToList()
            };
        }
        //login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> login([FromBody] loginDto loginDto)
        {
            var user = await userManager.Users
            .Include(p => p.Addresses)
            .SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Invalid Email");

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();


            return new UserDto
            {
                Id = user.Id,
                PhoneNumber = user.PhoneNumber,
                Age = user.Age,
                DateOfBirth = user.DateOfBirth,
                userName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                AvatarId = user.AvatarId,
                Gender = user.Gender,
                Adresses = user.Addresses.Select(add =>
                                            new AddressDto
                                            {
                                                City = add.City,
                                                Country = add.Country,
                                                Street = add.Street
                                            }).ToList()
            };
        }
    }
}