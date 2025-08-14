namespace client.Services;

public interface IEtaCalculationService
{
    DateTime CalculateEta(string originPort, string destinationPort, DateTime departureDate, double distance = 0);
    double CalculateDistance(double lat1, double lon1, double lat2, double lon2);
}

public class EtaCalculationService : IEtaCalculationService
{
    // Average container ship speed in nautical miles per hour
    private const double AverageShipSpeed = 14.0;
    
    // Port coordinates dictionary (simplified for demo)
    private readonly Dictionary<string, (double Lat, double Lon)> _portCoordinates = new()
    {
        { "Shanghai", (31.2304, 121.4737) },
        { "Singapore", (1.2966, 103.7764) },
        { "Rotterdam", (51.9244, 4.4777) },
        { "Los Angeles", (33.7701, -118.1937) },
        { "Hamburg", (53.5511, 9.9937) },
        { "Antwerp", (51.2194, 4.4025) },
        { "Qingdao", (36.0986, 120.3719) },
        { "Busan", (35.1796, 129.0756) },
        { "Ningbo", (29.8683, 121.5440) },
        { "Guangzhou", (23.1291, 113.2644) },
        { "Tianjin", (39.3434, 117.3616) },
        { "Jebel Ali", (25.0657, 55.1713) },
        { "Klang", (3.0044, 101.3991) },
        { "Kaohsiung", (22.6273, 120.3014) },
        { "Hong Kong", (22.3193, 114.1694) },
        { "Laem Chabang", (13.0827, 100.8833) },
        { "Long Beach", (33.7701, -118.1937) },
        { "New York", (40.6892, -74.0445) },
        { "Savannah", (32.1313, -81.1435) },
        { "Norfolk", (36.8468, -76.2852) }
    };

    public DateTime CalculateEta(string originPort, string destinationPort, DateTime departureDate, double distance = 0)
    {
        try
        {
            // If distance is not provided, calculate it based on port coordinates
            if (distance == 0)
            {
                distance = GetDistanceBetweenPorts(originPort, destinationPort);
            }

            // If we still don't have distance, use a default estimate
            if (distance == 0)
            {
                distance = 5000; // Default 5000 nautical miles
            }

            // Calculate travel time in hours
            var travelTimeHours = distance / AverageShipSpeed;
            
            // Add some buffer time for port operations (24-48 hours)
            var bufferHours = 36;
            var totalHours = travelTimeHours + bufferHours;

            // Add potential delays based on route (simplified logic)
            var delayFactor = GetDelayFactor(originPort, destinationPort);
            totalHours *= delayFactor;

            return departureDate.AddHours(totalHours);
        }
        catch
        {
            // Fallback: add 14 days to departure date
            return departureDate.AddDays(14);
        }
    }

    public double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
    {
        const double earthRadiusNm = 3440.065; // Earth radius in nautical miles
        
        var dLat = ToRadians(lat2 - lat1);
        var dLon = ToRadians(lon2 - lon1);
        
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
        
        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        
        return earthRadiusNm * c;
    }

    private double GetDistanceBetweenPorts(string originPort, string destinationPort)
    {
        if (_portCoordinates.TryGetValue(originPort, out var origin) &&
            _portCoordinates.TryGetValue(destinationPort, out var destination))
        {
            return CalculateDistance(origin.Lat, origin.Lon, destination.Lat, destination.Lon);
        }
        
        return 0; // Return 0 if ports not found in our dictionary
    }

    private double GetDelayFactor(string originPort, string destinationPort)
    {
        // Simplified delay factor based on route complexity
        // In reality, this would consider weather, traffic, canal delays, etc.
        
        var route = $"{originPort}-{destinationPort}";
        
        // Routes through major canals or congested areas
        if (route.Contains("Shanghai") && route.Contains("Rotterdam") ||
            route.Contains("Singapore") && route.Contains("Hamburg"))
        {
            return 1.2; // 20% longer due to Suez Canal delays
        }
        
        if (route.Contains("Los Angeles") && route.Contains("Shanghai"))
        {
            return 1.1; // 10% longer due to Pacific weather
        }
        
        return 1.05; // Default 5% buffer for general delays
    }

    private static double ToRadians(double degrees)
    {
        return degrees * Math.PI / 180;
    }
}
