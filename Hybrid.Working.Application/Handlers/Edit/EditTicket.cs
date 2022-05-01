using Hybrid.Working.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hybrid.Working.Application.CalendarEvent.Create
{
    public class EditTicketRequest : IRequest<Response>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? EtaDays { get; set; }
        public bool IsInSprint { get; set; }
        public string? CreatedBy { get; set; }
        public string Status { get; set; }
    }

    public class EditTicketHandler : IRequestHandler<EditTicketRequest, Response>
    {
        private readonly IApplicationDbContext _context;

        public EditTicketHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response> Handle(EditTicketRequest request, CancellationToken cancellationToken)
        {
            var ticket = await _context.Ticket.FirstOrDefaultAsync(ticket => ticket.Id == request.Id);

            if (ticket == null) throw new NullReferenceException("Couldn't find that ticket");
            
            ticket.Description = request.Description;
            ticket.Title = request.Title;
            ticket.IsInSprint = request.IsInSprint;
            ticket.EtaDays = request.EtaDays;
            ticket.Status = request.Status;
            ticket.IsInSprint = request.IsInSprint;
            ticket.DateUpdated = DateTime.Now;
            
            _context.Ticket.Update(ticket);

            await _context.SaveChangesAsync(cancellationToken);

            return new Response();
        }
    }
}
