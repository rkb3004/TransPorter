using System.Net.Http.Json;
using client.Models;

namespace client.Services;

public interface IShipmentService
{
    Task<List<Shipment>> GetShipmentsAsync();
    Task<Shipment?> GetShipmentAsync(int id);
    Task<Shipment> CreateShipmentAsync(CreateShipmentRequest request);
    Task<Shipment> UpdateShipmentAsync(int id, UpdateShipmentRequest request);
    Task DeleteShipmentAsync(int id);
}

public class ShipmentService : IShipmentService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "http://localhost:3000/api";

    public ShipmentService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Shipment>> GetShipmentsAsync()
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<ApiResponse<List<Shipment>>>($"{BaseUrl}/shipments");
            return response?.Data ?? new List<Shipment>();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching shipments: {ex.Message}");
            return new List<Shipment>();
        }
    }

    public async Task<Shipment?> GetShipmentAsync(int id)
    {
        try
        {
            return await _httpClient.GetFromJsonAsync<Shipment>($"{BaseUrl}/shipments/{id}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching shipment {id}: {ex.Message}");
            return null;
        }
    }

    public async Task<Shipment> CreateShipmentAsync(CreateShipmentRequest request)
    {
        var response = await _httpClient.PostAsJsonAsync($"{BaseUrl}/shipments", request);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Shipment>() ?? throw new InvalidOperationException("Failed to create shipment");
    }

    public async Task<Shipment> UpdateShipmentAsync(int id, UpdateShipmentRequest request)
    {
        var response = await _httpClient.PutAsJsonAsync($"{BaseUrl}/shipments/{id}", request);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Shipment>() ?? throw new InvalidOperationException("Failed to update shipment");
    }

    public async Task DeleteShipmentAsync(int id)
    {
        var response = await _httpClient.DeleteAsync($"{BaseUrl}/shipments/{id}");
        response.EnsureSuccessStatusCode();
    }
}
