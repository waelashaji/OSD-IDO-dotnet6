using IDO.Models;
using Microsoft.AspNetCore.Mvc;

namespace IDO_dotnet6.dotnet.Services
{
    public interface IIssueService
    {
        Task<ActionResult<IEnumerable<Issue>>> getAll();
        Task<IActionResult> updateOne(Issue issue);
        Task<ActionResult<Issue>> createOne(Issue issue);
    }
}
