using System.ComponentModel.DataAnnotations;

namespace client.Models;

public enum ShipmentStatus
{
    InTransit,
    ArrivedAtPort,
    Delayed,
    Delivered
}

public class Shipment
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(50)]
    public string ContainerId { get; set; } = string.Empty;
    
    [Required]
    [StringLength(100)]
    public string OriginPort { get; set; } = string.Empty;
    
    [Required]
    [StringLength(100)]
    public string DestinationPort { get; set; } = string.Empty;
    
    [Required]
    public DateTime DepartureDate { get; set; }
    
    public string Status { get; set; } = "In Transit";
    
    [Required]
    public DateTime Eta { get; set; }
    
    public double? LastKnownLat { get; set; }
    
    public double? LastKnownLng { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
}

// API Response Models
public class ApiResponse<T>
{
    public T Data { get; set; } = default!;
    public Pagination? Pagination { get; set; }
}

public class Pagination
{
    public int Total { get; set; }
    public int Limit { get; set; }
    public int Offset { get; set; }
    public bool HasMore { get; set; }
}

public class CreateShipmentRequest
{
    [Required]
    [StringLength(50)]
    public string ContainerId { get; set; } = string.Empty;
    
    [Required]
    [StringLength(100)]
    public string OriginPort { get; set; } = string.Empty;
    
    [Required]
    [StringLength(100)]
    public string DestinationPort { get; set; } = string.Empty;
    
    [Required]
    public DateTime DepartureDate { get; set; }
    
    public string Status { get; set; } = "In Transit";
    
    [Required]
    public DateTime Eta { get; set; }
    
    public double? LastKnownLat { get; set; }
    
    public double? LastKnownLng { get; set; }
}

public class UpdateShipmentRequest
{
    public string? Status { get; set; }
    
    public DateTime? Eta { get; set; }
    
    public double? LastKnownLat { get; set; }
    
    public double? LastKnownLng { get; set; }
}
