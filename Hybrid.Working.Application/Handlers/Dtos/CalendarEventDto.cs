namespace Hybrid.Working.Application.CalendarEvent
{
    public class CalendarEventDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }
        
        public string? Description { get; set; }
        
        public Guid? FileId { get; set; }

        public DateTime? Date { get; set; }
    }
}
