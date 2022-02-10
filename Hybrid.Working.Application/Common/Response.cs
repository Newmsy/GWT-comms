namespace Hybrid.Working.Application.Common
{
    public class Response
    {
        public List<string> Errors { get; } = new List<string>();

        public bool Succeeded => Errors.Count == 0;
    }

    public class Response<T> : Response
    {
        public T? Data { get; private set; }

        public Response(T data)
        {
            Data = data;
        }

        public Response()
        {
        }

        public void SetData(T data)
        {
            Data = data;
        }
    }
}
