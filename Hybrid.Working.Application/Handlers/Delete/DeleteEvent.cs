using Hybrid.Working.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hybrid.Working.Application.CalendarEvent.Create
{
    public class DeleteEventRequest : IRequest<Response>
    {
        public Guid Id { get; set; }
    }

    public class DeleteEventHandler : IRequestHandler<DeleteEventRequest, Response>
    {
        private readonly IApplicationDbContext _context;

        public DeleteEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response> Handle(DeleteEventRequest request, CancellationToken cancellationToken)
        {
            var calendarEvent = await _context.CalendarEvents.FirstOrDefaultAsync(ticket => ticket.Id == request.Id);

            if (calendarEvent == null) throw new NullReferenceException("Couldn't find that event");
            
            _context.CalendarEvents.Remove(calendarEvent);

            await _context.SaveChangesAsync(cancellationToken);

            return new Response();
        }
    }
}
