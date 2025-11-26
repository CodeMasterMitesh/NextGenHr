const nav = document.getElementById('nav');
nav.innerHTML = `
    <a class="nav-link active" href="dashboard.html"><i class="bi bi-speedometer2"></i> <span>Dashboard</span></a>
    <a class="nav-link" href="#approvals"><i class="bi bi-check2-square"></i> <span>Approvals</span></a>
      <a class="nav-link" href="#reminders"><i class="bi bi-bell"></i> <span>Reminders</span></a>
      <a class="nav-link" href="#users"><i class="bi bi-people"></i> <span>Users</span></a>
      <a class="nav-link" href="employee.html"><i class="bi bi-people"></i> <span>Employee</span></a>
      <a class="nav-link" href="#departments"><i class="bi bi-diagram-3"></i> <span>Departments</span></a>
      <a class="nav-link" href="#leaves"><i class="bi bi-calendar-check"></i> <span>Leave Requests</span></a>
      <a class="nav-link" href="#payroll"><i class="bi bi-cash-stack"></i> <span>Payroll</span></a>
      <a class="nav-link" href="#company"><i class="bi bi-building"></i> <span>Company</span></a>`;