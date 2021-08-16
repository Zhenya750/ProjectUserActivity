using System.ComponentModel.DataAnnotations;

namespace ProjectUserActivity.Models.Validators
{
    public class UserRegistrationLessLastActivityAttribute : ValidationAttribute
    {
        public UserRegistrationLessLastActivityAttribute()
        {
            ErrorMessage = "Registration date can't exceed the last activity date";
        }

        public override bool IsValid(object value)
        {
            User user = value as User;
            return user.Registration <= user.LastActivity;
        }
    }
}
