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
    public async Task<ActionResult<List<PersonDto>>> GetPersons() //get list of users
    {
        // userParams.CurrentUserId = User.GetuserName();
        var users = await _personRepository.GetPersonsAsync();
        return Ok(users);

    }
    [HttpGet]
    //get list of users with pagination
    public async Task<ActionResult<pageList<PersonDto>>> GetUsers([FromQuery] PersonParams userParams)
    {

        //userParams.CurrentUserId = User.GetuserID();

        var users = await _personRepository.GetPersonsAsyncPN(userParams);

        Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

        // var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
        return Ok(users);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<PersonDto>> GetUserByID(int Id) //get list of users
    {
        var selectedPerson = await _personRepository.GetPersonbyIdAsync(Id);
        var mapping = _mapper.Map<PersonDto>(selectedPerson);
        return mapping;
    }


    [HttpPut("{id}")]
    public async Task<ActionResult> updatePerson(PersonUpdateDto PersonUpdateDto, int Id)
    {
        var user = await _personRepository.GetPersonbyIdAsync(Id);
        //mapping the param into the user
        var mapping = _mapper.Map(PersonUpdateDto, user);
        _personRepository.update(mapping);
        if (_personRepository.SaveChanages())
        {
            return Ok(PersonUpdateDto);
        }
        return BadRequest("Failed to update user");
    }

    [HttpDelete("DeletePerson")]
    public async Task<ActionResult> DeletePerson(PersonDto PersonDto)
    {
        var user = await _personRepository.GetPersonbyIdAsync(PersonDto.Id);

        var mapping = _mapper.Map(PersonDto, user);

        if (_personRepository.DeletePerson(mapping))
        {
            return Ok();
        }
        return BadRequest("Failed to update user");
    }





}
