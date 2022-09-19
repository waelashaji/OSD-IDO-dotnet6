using IDO.Data;
using IDO.Models;
using IDO_dotnet6.dotnet.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace IDO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssuesController : ControllerBase
    {
        private readonly IIssueService _issueService;

        public IssuesController(IIssueService issueService)
        {
            _issueService = issueService;
        }

        // GET: api/Issues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Issue>>> GetIssues()
        {
            return await _issueService.getAll();
        }

        // PUT: api/Issues/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIssue(Issue request)
        {
            return await _issueService.updateOne(request);
        }

        // POST: api/Issues
        [HttpPost]
        public async Task<ActionResult<Issue>> PostIssue(Issue request)
        {
            return await _issueService.createOne(request);
        }

    }
}
