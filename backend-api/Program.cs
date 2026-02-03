var builder = WebApplication.CreateBuilder(args);

// 1. CONFIGURACIÓN DE SERVICIOS
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Unificamos CORS en una sola política para evitar conflictos
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo",
        policy => policy.WithOrigins("http://localhost:5173", "https://mellow-marigold-89311b.netlify.app")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

// 2. CONFIGURACIÓN DEL PIPELINE (EL ORDEN AQUÍ ES CLAVE)

// Swagger siempre visible para que puedas probar en Render si quieres
app.UseSwagger();
app.UseSwaggerUI();

// ACTIVAR CORS (Debe ir antes de los controladores)
app.UseCors("PermitirTodo");

app.UseAuthorization();

// IMPORTANTE: MapControllers debe estar AFUERA del if de Development
app.MapControllers(); 

app.MapGet("/weatherforecast", () =>
{
    var summaries = new[] { "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching" };
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}