namespace IDO.Models
{
  public class Issue
  {
    public int? Id { get; set; }

    public string? Title { get; set; } 
    public string? Category { get; set; } 

    public string? Status { get; set; } 

    public string? Estimate { get; set; } 

    public DateTime? DueDate { get; set; }

    public string? Importance { get; set; }

    public User? User { get; set; }
  }

  public enum Priority
  {
    Low, Medium, High
  }
  public enum Status
  {
    todo, doing, done
  }
}

