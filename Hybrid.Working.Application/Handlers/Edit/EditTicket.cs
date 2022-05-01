using Hybrid.Working.Application.Common;
using MediatR;

namespace Hybrid.Working.Application.CalendarEvent.Create
{
    public class CreateTicketRequest : IRequest<Response>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int? EtaDays { get; set; }
        public bool IsInSprint { get; set; }
        public string? CreatedBy { get; set; }
    }

    public class CreateTicketHandler : IRequestHandler<CreateTicketRequest, Response>
    {
        private readonly IApplicationDbContext _context;

        public CreateTicketHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response> Handle(CreateTicketRequest request, CancellationToken cancellationToken)
        {
            _context.Ticket.Add(new Domain.Entities.Ticket
            {
                Description = request.Description,
                Title = request.Title,
                Status = "Pending",
                EtaDays = request.EtaDays,
                DateAdded = DateTime.Now,
                IsInSprint = request.IsInSprint,
                CreatedBy = request.CreatedBy
            });

            await _context.SaveChangesAsync(cancellationToken);

            return new Response();
        }
    }
}
