using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    
    public enum NotificationType
    {
        // Leave
        LeaveRequested,
        LeaveApproved,
        LeaveRejected,
        LeaveCancelled,

        // Attendance
        ClockIn,
        ClockOut,

        // Salary
        SalaryCreated,
        SalaryUpdated,

        // General
        General
    }
}
