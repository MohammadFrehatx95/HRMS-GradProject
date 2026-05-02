using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Application.DTOs.Attendance
{
   
    public class ClockOutDto
    {
        [Required]
        public TimeOnly ClockOut { get; set; }
    }
}
