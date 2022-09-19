using IDO.Data;
using IDO.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IDO_dotnet6.dotnet.Services
{
    public class IssueService : ControllerBase, IIssueService
    {
        private IDODBContext _context;

        public IssueService(IDODBContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Issue>>> getAll()
        {
            return Ok(await _context.Issues.ToListAsync());
        }

        public async Task<IActionResult> updateOne(Issue request)
        {
            var Issue = await _context.Issues.FindAsync(request.Id);
            if (Issue == null)
                return BadRequest("not found");

            Issue.Category = request.Category;
            Issue.DueDate = request.DueDate;
            Issue.Estimate = request.Estimate;
            Issue.Title = request.Title;
            Issue.Status = request.Status;
            Issue.Importance = request.Importance;
            await _context.SaveChangesAsync();
            return Ok(request);
        }


        public async Task<ActionResult<Issue>> createOne(Issue request)
        {
            _context.Issues.Add(request);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetIssue", new { id = request.Id }, request.Id);

        }

    }
}
