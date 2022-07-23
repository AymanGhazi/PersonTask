using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AdminController : BaseApiController
{
    private readonly ILogger<AdminController> _logger;
    private readonly UserManager<Person> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly IPersonRepository _personRepository;
    private readonly IMapper _mapper;

    private readonly AccountController _accountController;

    public AdminController(ILogger<AdminController> logger, UserManager<Person> userManager, ApplicationDbContext context,
    IPersonRepository personRepository, IMapper mapper
  )
    {

        _mapper = mapper;
        _personRepository = personRepository;
        _context = context;
        _userManager = userManager;
        _logger = logger;
    }
    // [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("{Id}")]
    public async Task<ActionResult> GetpersonWithRoles(int Id)
    {
        var users = await _userManager.Users
        .Include(r => r.Roles)
        .ThenInclude(r => r.Role)
        .Select(u => new
        {
            u.Id,
            email = u.Email,
            roles = u.Roles.Select(r => r.Role.Name).ToList()
        })
        .FirstOrDefaultAsync(P => P.Id == Id);
        return Ok(users);
    }
    //[Authorize(Policy = "RequireAdminRole")]
    [HttpPost("edit-person")]
    public async Task<ActionResult> EditPerson([FromBody] EditPerson person, [FromQuery] string roles)
    {
        var SelectedRoles = roles.Split(",").ToArray();
        var user = await _userManager.FindByIdAsync(person.Id.ToString());
        if (user == null)
        {
            return NotFound();
        }
        user.AvatarId = person.AvatarId;
        user.UserName = person.userName;
        user.Email = person.Email;
        user.DateOfBirth = person.DateOfBirth;
        user.Gender = person.Gender;
        user.PhoneNumber = person.PhoneNumber;
        user.Addresses = person.Addresses.Select(add =>
                                            new Address
                                            {
                                                City = add.City,
                                                Country = add.Country,
                                                Street = add.Street
                                            }).ToList();
        var addresses = _context.Addresses.Where(a => a.PersonId == user.Id).ToList();
        if (addresses.Count() > 0)
        {
            _context.Addresses.RemoveRange(addresses);
        }

        var EditResult = await _userManager.UpdateAsync(user);
        var userRoles = await _userManager.GetRolesAsync(user);

        var EditRolesresult = await _userManager.AddToRolesAsync(user, SelectedRoles.Except(userRoles));
        if (!EditRolesresult.Succeeded || !EditResult.Succeeded)
        {
            BadRequest("failed to add to Roles");
        }

        EditRolesresult = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(SelectedRoles));
        if (!EditRolesresult.Succeeded)
        {
            BadRequest("Failed To remove from Roles");
        }

        return Ok(new { result = "successfull" });
    }
    [HttpPost("add-person")]
    public async Task<ActionResult<UserDto>> AddPerson([FromBody] RegisterDto Newperson, [FromQuery] string roles)
    {
        if (await _personRepository.userExist(Newperson.Email)) return BadRequest("Email is taken");
        var SelectedRoles = roles.Split(",").ToArray();
        var person = new Person
        {
            DateOfBirth = Newperson.DateOfBirth,
            UserName = Newperson.userName,
            Email = Newperson.Email,
            Gender = Newperson.Gender,
            PhoneNumber = Newperson.PhoneNumber,
            Addresses = Newperson.Addresses.Select(add =>
                                                new Address
                                                {
                                                    City = add.City,
                                                    Country = add.Country,
                                                    Street = add.Street
                                                }).ToList()
        };
        var result = await _userManager.CreateAsync(person, "Pa$$w0rd");

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        var AddRolesresult = await _userManager.AddToRolesAsync(person, SelectedRoles);
        if (!AddRolesresult.Succeeded)
        {
            BadRequest("failed to add to Roles");
        }
        return Ok(new { result = "successfull" });

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePerson(int id)
    {
        var user = await _personRepository.GetPersonbyIdAsync(id);
        if (_personRepository.DeletePerson(user))
        {
            return Ok(new { result = "Deleted" });
        }
        return BadRequest("Failed to update user");
    }

}
