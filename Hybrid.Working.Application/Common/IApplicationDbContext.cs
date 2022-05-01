using Microsoft.EntityFrameworkCore;

namespace Hybrid.Working.Application.Common
{
    public interface IApplicationDbContext
    {
        DbSet<Domain.Entities.CalendarEvent> CalendarEvents { get; }
        DbSet<Domain.Entities.Ticket> Ticket { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
