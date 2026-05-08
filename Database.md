# PROJECT_CONTEXT.md

## Stack
- Frontend: [أكمل: React / Next.js / Vue / غيره]
- Backend: ASP.NET Core + Entity Framework Core
- Database: PostgreSQL via Supabase
- Supabase Project ID: lcxqdaisvhqkslhzgmkv
- Supabase URL: https://lcxqdaisvhqkslhzgmkv.supabase.co
- Auth: Custom (JWT من الباك ايند) — لا يستخدم Supabase Auth

## نقطة حرجة
الـ Frontend يتصل بـ Supabase مباشرة لقراءة البيانات فقط (أو عبر API؟).
[وضّح: هل الفرونت يتصل بـ Supabase SDK مباشرة؟ أم يمر عبر API endpoints للباك ايند؟]

## Database Schema

### Users
| column       | type                     | nullable |
|--------------|--------------------------|----------|
| Id           | integer                  | NO       |
| Username     | text                     | NO       |
| Email        | text                     | NO       |
| PasswordHash | text                     | NO       |
| Role         | text                     | NO       |
| CreatedAt    | timestamp with time zone | NO       |
| EmployeeId   | integer                  | YES      |
| IsActive     | boolean                  | NO       |

### Employees
| column       | type                     | nullable |
|--------------|--------------------------|----------|
| Id           | integer                  | NO       |
| FirstName    | text                     | NO       |
| LastName     | text                     | NO       |
| Email        | text                     | NO       |
| PhoneNumber  | text                     | NO       |
| HireDate     | timestamp with time zone | NO       |
| IsActive     | boolean                  | NO       |
| DepartmentId | integer                  | NO       |
| UserId       | integer                  | NO       |
| PositionId   | integer                  | NO       |

### Departments
| column   | type    | nullable |
|----------|---------|----------|
| Id       | integer | NO       |
| Name     | text    | NO       |
| Location | text    | NO       |

### Positions
| column       | type    | nullable |
|--------------|---------|----------|
| Id           | integer | NO       |
| Title        | text    | NO       |
| SalaryMin    | numeric | NO       |
| SalaryMax    | numeric | NO       |
| DepartmentId | integer | NO       |

### Attendances
| column     | type                     | nullable |
|------------|--------------------------|----------|
| Id         | integer                  | NO       |
| Date       | timestamp with time zone | NO       |
| ClockIn    | time without time zone   | NO       |
| ClockOut   | time without time zone   | YES      |
| EmployeeId | integer                  | NO       |

### Leaves
| column           | type                     | nullable |
|------------------|--------------------------|----------|
| Id               | integer                  | NO       |
| EmployeeId       | integer                  | NO       |
| LeaveType        | integer                  | NO       |
| Status           | integer                  | NO       |
| StartDate        | timestamp with time zone | NO       |
| EndDate          | timestamp with time zone | NO       |
| TotalDays        | integer                  | NO       |
| Reason           | text                     | NO       |
| RequestedAt      | timestamp with time zone | NO       |
| ReviewedByUserId | integer                  | YES      |
| ReviewedById     | integer                  | YES      |
| ReviewedAt       | timestamp with time zone | YES      |
| RejectionReason  | text                     | YES      |

### Salaries
| column        | type                     | nullable |
|---------------|--------------------------|----------|
| Id            | integer                  | NO       |
| BaseAmount    | numeric                  | NO       |
| Allowances    | numeric                  | NO       |
| Deductions    | numeric                  | NO       |
| GrossAmount   | numeric                  | NO       |
| NetAmount     | numeric                  | NO       |
| Month         | integer                  | NO       |
| Year          | integer                  | NO       |
| EffectiveDate | timestamp with time zone | NO       |
| EmployeeId    | integer                  | NO       |

### Notifications
| column    | type                     | nullable |
|-----------|--------------------------|----------|
| Id        | integer                  | NO       |
| Title     | text                     | NO       |
| Message   | text                     | NO       |
| IsRead    | boolean                  | NO       |
| Type      | integer                  | NO       |
| CreatedAt | timestamp with time zone | NO       |
| UserId    | integer                  | NO       |

## Foreign Keys (العلاقات)
| جدول          | عمود         | يشير إلى   | عمود |
|---------------|--------------|------------|------|
| Positions     | DepartmentId | Departments| Id   |
| Employees     | DepartmentId | Departments| Id   |
| Employees     | UserId       | Users      | Id   |
| Employees     | PositionId   | Positions  | Id   |
| Attendances   | EmployeeId   | Employees  | Id   |
| Salaries      | EmployeeId   | Employees  | Id   |
| Leaves        | EmployeeId   | Employees  | Id   |
| Leaves        | ReviewedById | Users      | Id   |
| Notifications | UserId       | Users      | Id   |

## Enums (تحتاج توضيح من صديقك)
- Leaves.LeaveType: integer — ما القيم؟ (مثال: 1=Annual, 2=Sick, 3=...)
- Leaves.Status: integer — ما القيم؟ (مثال: 0=Pending, 1=Approved, 2=Rejected)
- Notifications.Type: integer — ما القيم؟
- Users.Role: text — ما القيم؟ (مثال: "Admin", "Employee", "Manager")

## ملاحظات تقنية للـ AI
- أسماء الجداول PascalCase — استخدمها بالضبط كما هي
- IDs تُدار بواسطة Entity Framework، لا تُدرجها يدوياً في الـ insert
- لا يوجد Supabase Auth — التوثيق عبر JWT من الباك ايند
- RLS Status: [تحقق من Supabase → Authentication → Policies]

## Current Progress
- [ ] أكمل هنا ما تم بناؤه
- [ ] أكمل هنا ما لم يكتمل بعد

## Known Issues
- [ ] أكمل هنا المشاكل الحالية