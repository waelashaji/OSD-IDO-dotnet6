using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IDO.Data;
using IDO.Models;
using Microsoft.AspNetCore.SignalR;

namespace IDO.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class IssuesController : ControllerBase
  {
    private readonly IDODBContext _context;

    public IssuesController(IDODBContext context)
    {
      _context = context;
    }

    // GET: api/Issues
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Issue>>> GetIssues()
    {
      return await _context.Issues.ToListAsync();
    }

    // GET: api/Issues/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Issue>> GetIssue(int? id)
    {
      var issue = await _context.Issues.FindAsync(id);

      if (issue == null)
      {
        return NotFound();
      }

      return issue;
    }

    // PUT: api/Issues/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutIssue(Issue request)
    {
      var Issue = await _context.Issues.FindAsync(request.Id);
      if (Issue == null)
        return BadRequest("not found");
      Issue.Category = request.Category;
      Issue.DueDate = request.DueDate;
      Issue.Estimate = request.Estimate;
      Issue.Title = request.Title;
      Issue.Status= request.Status;
      Issue.Importance= request.Importance;

            await _context.SaveChangesAsync();
      return Ok(await _context.Issues.ToListAsync());
    }

    // POST: api/Issues
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Issue>> PostIssue(Issue issue)
    {
      _context.Issues.Add(issue);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetIssue", new { id = issue.Id }, issue.Id);  
    }

  }
}
