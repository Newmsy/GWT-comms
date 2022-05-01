using Hybrid.Working.Application.CalendarEvent.Create;
using Hybrid.Working.Application.CalendarEvent.Get;
using Hybrid.Working.Application.CalendarEvent.GetAll;
using Microsoft.AspNetCore.Mvc;

namespace Hybrid.Working.Web.Controllers
{
    public class TicketController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await Mediator.Send(new GetCalendarEventRequest { CalendarEventId = id }));
        }

        [HttpGet("ticket/getall")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await Mediator.Send(new GetTicketsRequest{}));
        }
        
        [HttpPut("ticket")]
        public async Task<IActionResult> Update(EditTicketRequest request)
        {
            return Ok(await Mediator.Send(request));
        }
        
        [HttpDelete("ticket")]
        public async Task<IActionResult> Delete(DeleteTicketRequest request)
        {
            return Ok(await Mediator.Send(request));
        }

        [HttpPost("ticket")]
        public async Task<IActionResult> Post(CreateTicketRequest request)
        {
            return Ok(await Mediator.Send(request));
        }
    }
}
