using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;


public class PersonController : BaseApiController
{
    private readonly ILogger<PersonController> _logger;
    private readonly IPersonRepository _personRepository;
    private readonly IMapper _mapper;

    public PersonController(ILogger<PersonController> logger, IPersonRepository personRepository, IMapper mapper)
    {
        _mapper = mapper;
        _personRepository = personRepository;
        _logger = logger;
    }


    [HttpGet("GetPersons")]
    public async Task<ActionResult<IEnumerable<PersonDto>>> GetPersons() //get list of users
    {
        // userParams.CurrentUserId = User.GetuserName();
        var users = await _personRepository.GetPersonsAsync();
        return Ok(users);

    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<PersonDto>> GetUserByID(int Id) //get list of users
    {
        var selectedPerson = await _personRepository.GetPersonbyIdAsync(Id);
        var mapping = _mapper.Map<PersonDto>(selectedPerson);
        return mapping;
    }

}
