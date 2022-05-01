using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hybrid.Working.Domain.Entities
{
    public class CalendarEvent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Title { get; set; }
        
        public string? Description { get; set; }
        
        public Guid? FileId { get; set; }

        public DateTime? Date { get; set; }
    }
}
