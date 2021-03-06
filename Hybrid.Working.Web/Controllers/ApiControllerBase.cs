using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Hybrid.Working.Web.Controllers
{
    [ApiController, Route("api")]
    public class ApiControllerBase : ControllerBase
    {
        private ISender? _mediator;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<ISender>();
    }
}
