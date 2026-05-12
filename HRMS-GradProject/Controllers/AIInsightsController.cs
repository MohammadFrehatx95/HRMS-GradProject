using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HRMS_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AIInsightsController : ControllerBase
    {
        public class ChatRequest { public string Message { get; set; } = string.Empty; }

        private readonly ILeaveService _leaveService;
        private readonly IEmployeeService _employeeService;
        private readonly IAttendanceService _attendanceService;
        private readonly ISalaryService _salaryService;
        private readonly IDepartmentService _departmentService;
        private readonly IConfiguration _configuration;

        public AIInsightsController(
            ILeaveService leaveService,
            IEmployeeService employeeService,
            IAttendanceService attendanceService,
            ISalaryService salaryService,
            IDepartmentService departmentService,
            IConfiguration configuration)
        {
            _leaveService = leaveService;
            _employeeService = employeeService;
            _attendanceService = attendanceService;
            _salaryService = salaryService;
            _departmentService = departmentService;
            _configuration = configuration;
        }

        // ─── Core Groq helper (OpenAI Compatible) ──────────────────────────────
        private async Task<string> GetAIResponseAsync(string prompt)
        {
            string apiKey = _configuration["GroqApiKey"];
            if (string.IsNullOrEmpty(apiKey)) return "💡 يرجى إعداد مفتاح Groq API.";

            string url = "https://api.groq.com/openai/v1/chat/completions";
            var requestBody = new
            {
                model = "llama-3.1-8b-instant",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                temperature = 0.5
            };

            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            
            try 
            {
                var response = await httpClient.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    using var jsonDoc = JsonDocument.Parse(responseString);
                    var root = jsonDoc.RootElement;
                    string text = root.GetProperty("choices")[0]
                                     .GetProperty("message")
                                     .GetProperty("content").GetString() ?? "";
                    
                    text = text.Replace("**", "").Replace("\n", " ");
                    return "🚀 " + text.Trim();
                }

                return "💡 عذراً، خدمة الذكاء الاصطناعي (Groq) غير متوفرة حالياً.";
            }
            catch 
            {
                return "💡 حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.";
            }
        }

        // ─── Build full admin context from ALL tables ──────────────────────────
        private async Task<string> BuildAdminContextAsync()
        {
            try
            {
                var employees = await _employeeService.GetAllAsync(1, 200);
                var leaves = await _leaveService.GetAllAsync(1, 500);
                var attendance = await _attendanceService.GetAllAsync(1, 500);
                var salaries = await _salaryService.GetAllAsync(1, 500);
                var departments = await _departmentService.GetAllAsync();

                var empNames = string.Join(", ", employees.Items.Select(e => e.FullName));
                var pendingLeaves = leaves.Items.Count(l => l.Status == "Pending");
                var approvedLeaves = leaves.Items.Count(l => l.Status == "Approved");
                var workingNow = attendance.Items.Where(a => a.ClockIn != null).Select(a => a.EmployeeName).Distinct().ToList();
                var missingOut = attendance.Items.Where(a => a.ClockOut == null && a.ClockIn != null).Select(a => a.EmployeeName).Distinct().ToList();
                var totalSalaryNet = salaries.Items.Sum(s => s.NetAmount);
                var totalSalaryGross = salaries.Items.Sum(s => s.GrossAmount);
                var deptNames = string.Join(", ", departments.Select(d => d.Name));

                // Per-department employee count
                var deptBreakdown = employees.Items
                    .GroupBy(e => e.DepartmentName ?? "غير محدد")
                    .Select(g => $"{g.Key}: {g.Count()} موظف")
                    .ToList();

                return $@"
[قاعدة بيانات كاملة من النظام - Kawadir HRMS - للمدير فقط]:
- إجمالي الموظفين: {employees.TotalCount}
- أسماء الموظفين: {empNames}
- الأقسام ({departments.Count} قسم): {deptNames}
- توزيع الموظفين على الأقسام: {string.Join(" | ", deptBreakdown)}
- طلبات الإجازة المعلقة: {pendingLeaves}
- طلبات الإجازة الموافق عليها: {approvedLeaves}
- إجمالي طلبات الإجازة: {leaves.Items.Count}
- الموظفون العاملون الآن (سجلوا دخولاً): {(workingNow.Any() ? string.Join(", ", workingNow) : "لا يوجد")}
- موظفون لم يسجلوا خروجاً بعد: {(missingOut.Any() ? string.Join(", ", missingOut) : "لا يوجد")}
- إجمالي الرواتب الإجمالية المدفوعة: {totalSalaryGross:F0} JD
- إجمالي الرواتب الصافية المدفوعة: {totalSalaryNet:F0} JD
";
            }
            catch
            {
                return "[تعذّر جلب بعض البيانات من قاعدة البيانات]";
            }
        }

        // ─── Unified page-aware insight endpoint ──────────────────────────────
        [HttpGet("insight/{page}")]
        [Authorize]
        public async Task<IActionResult> GetPageInsight(string page, [FromQuery] string role = "employee")
        {
            bool isAdmin = User.IsInRole("Admin") || User.IsInRole("HR");
            string prompt;

            if (isAdmin)
            {
                string ctx = await BuildAdminContextAsync();
                prompt = page.ToLower() switch
                {
                    "employees" => $@"{ctx}
أنت خبير موارد بشرية. بناءً على البيانات أعلاه، أعط المدير نصيحة واحدة مختصرة (سطر واحد فقط) تخص إدارة الموظفين (مثل: توزيع الأقسام، معدل الحضور، أو اقتراح إجراء). لا مقدمات.",

                    "leaves" => $@"{ctx}
أنت خبير موارد بشرية. بناءً على البيانات أعلاه، أعط المدير نصيحة واحدة مختصرة (سطر واحد) تخص إدارة طلبات الإجازة المعلقة والمعتمدة. لا مقدمات.",

                    "departments" => $@"{ctx}
أنت خبير موارد بشرية. بناءً على البيانات أعلاه، أعط المدير نصيحة واحدة مختصرة (سطر واحد) تخص هيكل الأقسام وتوزيع الموظفين. لا مقدمات.",

                    "salary" => $@"{ctx}
أنت خبير مالي في الموارد البشرية. بناءً على بيانات الرواتب أعلاه، أعط المدير نصيحة واحدة مختصرة (سطر واحد) حول ميزانية الرواتب أو توزيعها. لا مقدمات.",

                    "attendance" => $@"{ctx}
أنت خبير موارد بشرية. بناءً على بيانات الحضور أعلاه، أعط المدير نصيحة واحدة مختصرة (سطر واحد) حول الالتزام بمواعيد الحضور والغياب. لا مقدمات.",

                    // dashboard default
                    _ => $@"{ctx}
أنت مستشار موارد بشرية. بناءً على البيانات الشاملة أعلاه، أعط المدير نصيحة إدارية واحدة مختصرة (سطر واحد) تصلح لنظرة عامة. لا مقدمات."
                };
            }
            else
            {
                // Employee - fetch personal data only
                var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                string personalCtx = "";
                if (int.TryParse(userIdStr, out int userId))
                {
                    try
                    {
                        var myLeaves = await _leaveService.GetMyLeavesAsync(userId, 1, 100);
                        var totalApproved = myLeaves.Items.Where(l => l.Status == "Approved" && l.LeaveType == "Annual").Sum(l => l.TotalDays);
                        var pending = myLeaves.Items.Count(l => l.Status == "Pending");
                        personalCtx = $"- رصيد الإجازات السنوية المتبقي: {14 - totalApproved} يوم\n- طلبات إجازة معلقة: {pending}";
                    }
                    catch { }
                }

                prompt = page.ToLower() switch
                {
                    "leaves" => $@"أنت مرشد وظيفي. بياناتي: {personalCtx}. أعطني نصيحة قصيرة جداً (سطر واحد) حول كيفية التخطيط للإجازات باحترافية. لا مقدمات.",
                    "salary" => $@"أنت مرشد وظيفي. أعطني نصيحة قصيرة جداً (سطر واحد) حول أهمية مراجعة كشف الراتب الشهري والتأكد من دقته. لا مقدمات.",
                    "attendance" => $@"أنت مرشد وظيفي. أعطني نصيحة قصيرة جداً (سطر واحد) حول الالتزام بمواعيد الحضور وتأثيره على التقييم السنوي. لا مقدمات.",
                    _ => $@"أنت مرشد وظيفي. بياناتي: {personalCtx}. أعطني نصيحة وظيفية قصيرة جداً (سطر واحد) تناسبني. لا مقدمات."
                };
            }

            string advice = await GetAIResponseAsync(prompt);
            return Ok(new { data = advice, success = true });
        }

        // ─── Legacy admin endpoint (kept for backward compat) ─────────────────
        [HttpGet("admin")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAdminInsight()
        {
            return await GetPageInsight("dashboard", "admin");
        }

        // ─── Legacy employee endpoint ──────────────────────────────────────────
        [HttpGet("employee")]
        [Authorize]
        public async Task<IActionResult> GetEmployeeInsight()
        {
            return await GetPageInsight("dashboard", "employee");
        }

        // ─── Specific employee insight (for Employees table button) ───────────
        [HttpGet("employee-insight/{employeeId}")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetSpecificEmployeeInsight(int employeeId)
        {
            try
            {
                var employee = await _employeeService.GetByIdAsync(employeeId);
                if (employee == null) return NotFound("الموظف غير موجود");

                var attendance = await _attendanceService.GetMyAttendanceAsync(employeeId, 1, 100);
                var leaves = await _leaveService.GetMyLeavesAsync(employeeId, 1, 100);

                var totalLeaves = leaves.Items.Count;
                var missingPunches = attendance.Items.Count(a => a.ClockOut == null);
                var approvedLeaves = leaves.Items.Count(l => l.Status == "Approved");

                string prompt = $@"أنت خبير موارد بشرية. أعطني تقييماً سرياً ومختصراً جداً (سطر أو سطرين) حول كيفية التعامل مع هذا الموظف.
البيانات: الاسم: {employee.FullName}، المنصب: {employee.PositionTitle}، القسم: {employee.DepartmentName}.
إجمالي طلبات الإجازة: {totalLeaves}، الإجازات الموافق عليها: {approvedLeaves}، حالات نسيان بصمة الخروج: {missingPunches}.
اقترح إجراءً (ترقية / تحفيز / لفت نظر) بناءً على هذه الأرقام. كن مباشراً واحترافياً بالعربية.";

                string advice = await GetAIResponseAsync(prompt);
                advice = advice.Replace("✨ ", "").Replace("💡 ", "").Replace("🚀 ", "");
                return Ok(new { data = advice, success = true });
            }
            catch
            {
                return Ok(new { data = "لا توجد بيانات كافية لهذا الموظف لإعطاء نصيحة دقيقة.", success = true });
            }
        }

        // ─── Secure Chat endpoint ──────────────────────────────────────────────
        [HttpPost("chat")]
        [Authorize]
        public async Task<IActionResult> ChatWithAI([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest("الرسالة فارغة.");

            bool isAdmin = User.IsInRole("Admin") || User.IsInRole("HR");
            string contextData = "";
            string roleConstraints;

            if (isAdmin)
            {
                roleConstraints = "أنت تتحدث مع مدير النظام أو مسؤول الموارد البشرية. يحق لك الوصول لجميع البيانات المرفقة والإجابة بشكل شامل ودقيق.";
                contextData = await BuildAdminContextAsync();
            }
            else
            {
                roleConstraints = "أنت تتحدث مع موظف عادي. يُمنع الإفصاح عن بيانات أي موظف آخر أو رواتبهم. أجب فقط على أسئلته الشخصية أو اشرح له كيفية استخدام النظام. إذا طلب بيانات خارج صلاحياته، اعتذر بلباقة.";
                var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (int.TryParse(userIdStr, out int userId))
                {
                    try
                    {
                        var myLeaves = await _leaveService.GetMyLeavesAsync(userId, 1, 100);
                        var totalApproved = myLeaves.Items.Where(l => l.Status == "Approved" && l.LeaveType == "Annual").Sum(l => l.TotalDays);
                        contextData = $"\n[بياناتك الشخصية]:\n- إجازات سنوية مستهلكة: {totalApproved} أيام\n- الرصيد المتبقي: {14 - totalApproved} أيام\n";
                    }
                    catch { }
                }
            }

            string systemPrompt = $@"أنت مساعد ذكي ومحترف مخصص لنظام إدارة الموارد البشرية Kawadir HRMS.
{roleConstraints}
البيانات المتوفرة:
{contextData}
التعليمات:
1. أجب بإيجاز شديد جداً وبشكل مباشر على قدر السؤال (جملة أو جملتين كحد أقصى).
2. لا تقم بسرد تفاصيل أو شروحات إضافية إلا إذا طلب منك المستخدم ذلك صراحةً (لتوفير الاستهلاك).
3. أجب كأنك جزء من النظام نفسه وليس كذكاء اصطناعي خارجي.
رسالة المستخدم: {request.Message}";

            string response = await GetAIResponseAsync(systemPrompt);
            response = response.Replace("✨ ", "").Replace("💡 ", "").Replace("🚀 ", "");
            return Ok(new { data = response, success = true });
        }
    }
}
