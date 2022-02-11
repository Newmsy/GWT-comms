using Hybrid.Working.Application.Common;
using MediatR;

namespace Hybrid.Working.Application.CalendarEvent.Create
{
    public class CreateCalendarEventRequest : IRequest<Response>
    {
        public string? EventJson { get; set; }
        public DateTime? Date { get; set; }
    }

    public class CreateCalendarEventHandler : IRequestHandler<CreateCalendarEventRequest, Response>
    {
        private readonly IApplicationDbContext _context;

        public CreateCalendarEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response> Handle(CreateCalendarEventRequest request, CancellationToken cancellationToken)
        {
            _context.CalendarEvents.Add(new Domain.Entities.CalendarEvent
            {
                Json = request.EventJson,
                Date = request.Date,
            });

            await _context.SaveChangesAsync(cancellationToken);

            return new Response();
        }
    }
}
