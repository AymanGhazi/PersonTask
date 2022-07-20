using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.services
{
    public class TokenService : ITokenService
    {
        //one key for encryupt and decryupt private key and public
        private readonly SymmetricSecurityKey _Key;
        private readonly UserManager<Person> _UserManager;

        public TokenService(IConfiguration config, UserManager<Person> UserManager)
        {
            _UserManager = UserManager;
            _Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

        }
        public async Task<string> CreateToken(Person Person)
        {

            var Creds = new SigningCredentials(_Key, SecurityAlgorithms.HmacSha512Signature);

            var Claims = new List<Claim>{
             new Claim(JwtRegisteredClaimNames.NameId,Person.Id.ToString()),
             new Claim(JwtRegisteredClaimNames.UniqueName,Person.UserName)
           };

            var Roles = await _UserManager.GetRolesAsync(Person);

            Claims.AddRange(Roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(Claims),
                Expires = DateTime.Now.AddHours(24),
                SigningCredentials = Creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}