

namespace Application.DTOs.Employee;

public class EmployeeDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";  
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public DateTime HireDate { get; set; }
    public bool IsActive { get; set; }
    public int DepartmentId { get; set; }
    public string DepartmentName { get; set; } = string.Empty; 
    // ✅ W1/I4 Fix: أضف PositionId وPositionTitle لدعم نموذج التعديل وعرض البيانات
    public int PositionId { get; set; }
    public string PositionTitle { get; set; } = string.Empty;
    public int UserId { get; set; }
}

