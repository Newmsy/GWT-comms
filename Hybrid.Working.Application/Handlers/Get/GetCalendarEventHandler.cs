using Hybrid.Working.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hybrid.Working.Application.CalendarEvent.Get
{
    public class GetCalendarEventRequest : IRequest<Response<CalendarEventDto>>
    {
        public Guid CalendarEventId { get; set; }
    }

    public class GetCalendarEventsHandler : IRequestHandler<GetCalendarEventRequest, Response<CalendarEventDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetCalendarEventsHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response<CalendarEventDto>> Handle(GetCalendarEventRequest request, CancellationToken cancellationToken)
        {
            var response = new Response<CalendarEventDto>();

            var calendarEvent = await _context.CalendarEvents.FirstOrDefaultAsync(x => x.Id == request.CalendarEventId, cancellationToken);

            if (calendarEvent == null) return response;

            response.SetData(new CalendarEventDto 
            { 
                Id = calendarEvent.Id,
                Description = calendarEvent.Description,
                Title = calendarEvent.Title,
                FileId = calendarEvent.FileId,
                Date = calendarEvent.Date,
            });

            return response;
        }
    }
}
