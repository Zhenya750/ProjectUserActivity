using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ProjectUserActivity.Models;

namespace ProjectUserActivity.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private ApplicationContext db;

        public UsersController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return db.Users;
        }

        [HttpGet]
        [Route("rollingretention/{day}")]
        public IActionResult GetRollingRetention(int day)
        {
            if (day < 0)
            {
                return BadRequest();
            }

            var installDay = DateTime.Now.Date;

            int a = db.Users.Where(user => 
                user.Registration <= installDay && (user.LastActivity - installDay).Days >= day).Count();

            int b = db.Users.Where(user => (installDay >= user.Registration)).Count();

            if (b == 0)
            {
                return Ok(100);
            }

            double rollingRetention = Math.Round(a * 100 / (double)b, 2);
            return Ok(rollingRetention);
        }

        [HttpGet]
        [Route("totaldays")]
        public int[] GetTotalDays()
        {
            int[] usersTotalDays = db.Users.Select(user => (user.LastActivity - user.Registration).Days).ToArray();
            return usersTotalDays;
        }

        [HttpGet]
        [Route("clear")]
        public IActionResult Clear()
        {
            db.Users.RemoveRange(db.Users);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public IActionResult Post([FromForm] User user)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            db.SaveChanges();
            return Ok(user);
        }
    }
}
