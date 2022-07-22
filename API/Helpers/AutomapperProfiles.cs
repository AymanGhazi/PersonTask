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
               .ForMember(dest => dest.Adresses, opt => opt.MapFrom(src => src.Adresses))
               .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalcAge()));

            CreateMap<PersonDto, Person>()
            .ForMember(a => a.Adresses, opt => opt.MapFrom(a => a.Adresses));
           

            CreateMap<Address, AddressDto>();
            CreateMap<AddressDto, Address>();

            CreateMap<PersonUpdateDto, Person>()
            .ForMember(a => a.Adresses, opt => opt.MapFrom(src => src.Adresses));

            CreateMap<RegisterDto, Person>()
             .ForMember(a => a.Adresses, opt => opt.MapFrom(src => src.Addresses));


        }

    }
}