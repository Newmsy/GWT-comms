using Hybrid.Working.Application.CalendarEvent.Create;
using Hybrid.Working.Application.CalendarEvent.Get;
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

        [HttpPost]
        public async Task<IActionResult> Post(CreateCalendarEventRequest request)
        {
            return Ok(await Mediator.Send(request));
        }
    }
}
