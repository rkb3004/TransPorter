using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using client;
using client.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Configure HttpClient for API calls
builder.Services.AddScoped(sp => new HttpClient());

// Register services
builder.Services.AddScoped<IShipmentService, ShipmentService>();
builder.Services.AddScoped<IEtaCalculationService, EtaCalculationService>();

await builder.Build().RunAsync();
