using ProjectUserActivity.Models.Validators;
using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectUserActivity.Models
{
    [UserRegistrationLessLastActivity]
    public class User
    {
        public int Id { get; private set; }

        [Required]
        public DateTime Registration { get; set; }

        [Required]
        public DateTime LastActivity { get; set; }
    }
}
