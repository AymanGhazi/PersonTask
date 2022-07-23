using System;
using System.Linq;
using API.Data;
using API.DTOs;
using API.Entities;
using API.extensions;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.DataProtection;

namespace API.Helpers
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {

            CreateMap<Person, PersonDto>()
               .ForMember(dest => dest.Addresses, opt => opt.MapFrom(src => src.Addresses))
               .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalcAge()));

            CreateMap<PersonDto, Person>()
            .ForMember(a => a.Addresses, opt => opt.MapFrom(a => a.Addresses));


            CreateMap<Address, AddressDto>();
            CreateMap<AddressDto, Address>();

            CreateMap<PersonUpdateDto, Person>()
            .ForMember(a => a.Addresses, opt => opt.MapFrom(src => src.Addresses));

            CreateMap<RegisterDto, Person>()
             .ForMember(a => a.Addresses, opt => opt.MapFrom(src => src.Addresses));


        }

    }
}