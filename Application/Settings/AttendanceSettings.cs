using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Settings;

public class AttendanceSettings
{
    public TimeOnly WorkDayEndTime { get; set; } = new TimeOnly(23, 59, 0);
}