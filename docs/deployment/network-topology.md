# Network Topology Guide

## Recommended Setup

AEMS is designed to run on an offline network for competition environments. This ensures reliable operation without internet dependencies.

### Network Architecture

```
[Router] ── [Server Laptop (Static IP)]
    │
    ├── [Judge Tablet 1]
    ├── [Judge Tablet 2]
    ├── [Judge Tablet 3]
    └── [Display Devices]
```

### Hardware Requirements

- **Router**: Standard wireless router (802.11n or better)
- **Server Laptop**: Touchscreen laptop with Docker runtime, SSD recommended
- **Tablets**: 3-4 11" tablets or touchscreen laptops for scribes/judges
- **Power**: Power supplies/banks for all devices
- **Display**: Optional dedicated displays for results

### Network Configuration

1. **Router Setup**
   - Change default SSID and password
   - Change default admin credentials
   - Disable WPS and unnecessary services
   - Configure WPA3 or WPA2 security

2. **Static IP Assignment**
   - Server laptop: Configure DHCP reservation (recommended: 192.168.0.28)
   - Document IP addresses for all devices
   - Ensure IP range doesn't conflict with other networks

3. **Network Isolation**
   - Use dedicated competition network
   - No internet access required
   - Isolate from venue's main network

### Performance Characteristics

- **Expected Load**: ~10 concurrent requests per second
- **Concurrent Users**: ~5 active judges/scribes
- **Display Clients**: Multiple read-only connections
- **Network Capacity**: Standard WiFi easily handles this load

### Security Considerations

- Change all default passwords
- Use WPA3 encryption where possible
- Document network credentials securely
- Restrict admin access to competition officials only
- Consider MAC address filtering for additional security

### Troubleshooting

Common issues:
- **Device can't connect**: Check WiFi credentials and signal strength
- **Slow performance**: Verify router placement and check for interference
- **Connection drops**: Ensure adequate power to all devices