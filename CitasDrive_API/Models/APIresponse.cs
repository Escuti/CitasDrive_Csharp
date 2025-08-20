namespace CitasDrive_API.Models
{
    public class APIresponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }

        public APIresponse(bool success, string message, T? data) //Respuesta cuando hay datos en BD
        {
            Success = success;
            Message = message;
            Data = data;
        }

        public APIresponse(bool success, string message)//Respiesta cuando no hay datos en BD
        {
            Success = success;
            Message = message;
            Data = default;
        }
    }
}