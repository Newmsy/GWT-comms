using Hybrid.Working.Application.CalendarEvent.Create;
using Hybrid.Working.Application.CalendarEvent.Get;
using Hybrid.Working.Application.CalendarEvent.GetAll;
using Microsoft.AspNetCore.Mvc;

namespace Hybrid.Working.Web.Controllers
{
    public class CalendarEventController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await Mediator.Send(new GetCalendarEventRequest { CalendarEventId = id }));
        }

        [HttpGet("event/getall")]
        public async Task<IActionResult> GetAll(DateTime? date)
        {
            return Ok(await Mediator.Send(new GetCalendarEventsRequest { Date = date }));
        }

        [HttpPost("event")]
        public async Task<IActionResult> Post(CreateCalendarEventRequest request)
        {
            return Ok(await Mediator.Send(request));
        }
    }
}
