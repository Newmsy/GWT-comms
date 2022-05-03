using Hybrid.Working.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hybrid.Working.Application.CalendarEvent.Create
{
    public class EditEventRequest : IRequest<Response>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }

    public class EditEventHandler : IRequestHandler<EditEventRequest, Response>
    {
        private readonly IApplicationDbContext _context;

        public EditEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response> Handle(EditEventRequest request, CancellationToken cancellationToken)
        {
            var calendarEvent = await _context.CalendarEvents.FirstOrDefaultAsync(ce => ce.Id == request.Id);

            if (calendarEvent == null) throw new NullReferenceException("Couldn't find that event");
            
            calendarEvent.Description = request.Description;
            calendarEvent.Title = request.Title;
            calendarEvent.Date = request.Date;

            _context.CalendarEvents.Update(calendarEvent);

            await _context.SaveChangesAsync(cancellationToken);

            return new Response();
        }
    }
}
