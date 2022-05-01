using Hybrid.Working.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hybrid.Working.Application.CalendarEvent.Create
{
    public class DeleteTicketRequest : IRequest<Response>
    {
        public Guid Id { get; set; }
    }

    public class DeleteTicketHandler : IRequestHandler<DeleteTicketRequest, Response>
    {
        private readonly IApplicationDbContext _context;

        public DeleteTicketHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response> Handle(DeleteTicketRequest request, CancellationToken cancellationToken)
        {
            var ticket = await _context.Ticket.FirstOrDefaultAsync(ticket => ticket.Id == request.Id);

            if (ticket == null) throw new NullReferenceException("Couldn't find that ticket");
            
            _context.Ticket.Remove(ticket);

            await _context.SaveChangesAsync(cancellationToken);

            return new Response();
        }
    }
}
