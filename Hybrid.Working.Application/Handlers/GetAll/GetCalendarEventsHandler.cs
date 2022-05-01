using Hybrid.Working.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hybrid.Working.Application.CalendarEvent.GetAll
{
    public class GetCalendarEventsRequest : IRequest<Response<List<CalendarEventDto>>>
    {
        public DateTime? Date { get; set; }
    }

    public class GetCalendarEventsHandler : IRequestHandler<GetCalendarEventsRequest, Response<List<CalendarEventDto>>>
    {
        private readonly IApplicationDbContext _context;

        public GetCalendarEventsHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<CalendarEventDto>>> Handle(GetCalendarEventsRequest request, CancellationToken cancellationToken)
        {
            var response = new Response<List<CalendarEventDto>>();

            var calendarEvents = new List<Domain.Entities.CalendarEvent>();

            if (request.Date.HasValue)
            {
                calendarEvents = await _context.CalendarEvents.Where(x => x.Date == request.Date).ToListAsync(cancellationToken);
            }
            else
            {
                calendarEvents = await _context.CalendarEvents.ToListAsync(cancellationToken);
            }

            response.SetData(calendarEvents.Select(ToDto).ToList());

            return response;
        }

        private CalendarEventDto ToDto(Domain.Entities.CalendarEvent calendarEvent)
        {
            return new CalendarEventDto
            {
                Id = calendarEvent.Id,
                Title = calendarEvent.Title,
                Description = calendarEvent.Description,
                FileId = calendarEvent.FileId,
                Date = calendarEvent.Date,
            };
        }
    }
}
