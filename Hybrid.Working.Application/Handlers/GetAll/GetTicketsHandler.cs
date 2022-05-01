using Hybrid.Working.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hybrid.Working.Application.CalendarEvent.GetAll
{
    public class GetTicketsRequest : IRequest<Response<List<TicketDto>>>
    {
        
    }

    public class GetTicketsHandler : IRequestHandler<GetTicketsRequest, Response<List<TicketDto>>>
    {
        private readonly IApplicationDbContext _context;

        public GetTicketsHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<TicketDto>>> Handle(GetTicketsRequest request, CancellationToken cancellationToken)
        {
            var response = new Response<List<TicketDto>>();

            var tickets = new List<Domain.Entities.Ticket>();

            
            tickets = await _context.Ticket.ToListAsync(cancellationToken);
            

            response.SetData(tickets.Select(ToDto).ToList());

            return response;
        }

        private TicketDto ToDto(Domain.Entities.Ticket ticket)
        {
            return new TicketDto
            {
                Id = ticket.Id,
                Title = ticket.Title,
                Description = ticket.Description,
                Status = ticket.Status,
                CreatedBy = ticket.CreatedBy,
                DateAdded = ticket.DateAdded,
                DateUpdated = ticket.DateUpdated,
                EtaDays = ticket.EtaDays,
                IsInSprint = ticket.IsInSprint
            };
        }
    }
}
