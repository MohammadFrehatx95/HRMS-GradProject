
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Auth
{
    public  class ChangePasswordDto
    {
        public string Email { get; set; } = null!;

        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
    ErrorMessage = "Must have uppercase letter and number")]
        public string CurrentPassword { get; set; } = null!;
        [Required]
        [MinLength(6)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
    ErrorMessage = "Must have uppercase letter and number")]
        public string NewPassword { get; set; } = null!;

        [Required]
        [Compare("NewPassword", ErrorMessage = "Passwords don't match")]
        public string ConfirmNewPassword { get; set; } = null!;


    }
}
