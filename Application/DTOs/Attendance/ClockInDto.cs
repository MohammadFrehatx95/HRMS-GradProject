using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Application.DTOs.Attendance
{
    
    public class ClockInDto
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeOnly ClockIn { get; set; }
    }
}
