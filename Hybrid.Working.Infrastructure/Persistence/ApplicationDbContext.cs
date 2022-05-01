using Hybrid.Working.Application.Common;
using Hybrid.Working.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hybrid.Working.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CalendarEvent> CalendarEvents => Set<CalendarEvent>();
        public DbSet<Ticket> Ticket => Set<Ticket>();
        public DbSet<Files> File => Set<Files>();
    }
}
