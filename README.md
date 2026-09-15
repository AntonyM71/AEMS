# AEMS (Athlete and Event Management System)

[![Quality gate status](https://sonarcloud.io/api/project_badges/measure?project=AntonyM71_AEMS&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=AntonyM71_AEMS)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=AntonyM71_AEMS&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=AntonyM71_AEMS)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=AntonyM71_AEMS&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=AntonyM71_AEMS)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=AntonyM71_AEMS&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=AntonyM71_AEMS)

## Overview

AEMS manages freestyle kayaking competitions, from local club events to full ICF international championships, handling scoring, real-time results, and competition workflow.

### Why AEMS?

**Built for the Kayaking Community** - Developed with competition organizers and judges, so it fits how freestyle kayaking events actually run.

**Competition-Tested** - Deployed at competitions from local club events to international championships.

**Touch-First Design** - Built for tablets and touchscreens, so judges and scribes can score fast.

**Network Resilient** - Runs on the venue's local network, with no internet connection required.

### Key Features

- ✅ **Multi-Judge Scoring System** - Support for ICF-standard judging panels with real-time score aggregation
- ✅ **Live Score Tracking** - Instant updates across all devices with WebSocket technology
- ✅ **Professional PDF Reports** - Generate heat results, phase summaries, and final rankings
- ✅ **CSV Data Import & Export** - Imports from registration systems; exports for record keeping and analysis
- ✅ **Offline Operation** - Works on local networks without internet connectivity, and reconnects on its own after a network drop
- ✅ **Touch-Optimized Interface** - Designed for tablet devices used by judges
- ✅ **Automatic Backup & Recovery** - Built-in data protection and recovery systems
- ✅ **Role-Based Access** - Separate interfaces for Head Judges, Scribes, and Administrators
- ✅ **Hardware Timing Integration** - Bespoke timing boxes with Raspberry Pi integration for precise timing control
- ✅ **Arena Display Screens** - Live competition data feeds for spectator displays and venue screens
- ✅ **Broadcast Overlay Support** - Real-time data feeds for live streaming and broadcast integration

## Deployment Options

### Self-Hosted (Free)
Perfect for clubs and organizers comfortable with technical setup:
- Complete source code available on GitHub
- Docker-based deployment for easy installation
- Documentation and setup guides
- Community support through GitHub issues

### Professional Support Services

**Competition-Ready Deployment** - Let us handle the technical details while you focus on running your event.

#### What's Included:
- **Pre-Event Setup** - Configuration and testing before your event
- **On-Site Technical Support** - Dedicated technician throughout your event
- **Hardware Consultation** - Recommendations for tablets, networking equipment
- **Custom Configuration** - Scoring setup matched to your competition format
- **Training Session** - Hands-on training for judges and event staff
- **Post-Event Analysis** - Results validation and data archival

#### Service Packages:

**Local Events (1-2 days)**
- Remote setup and configuration
- Phone/video support during event
- Custom scoring sheets if needed

**Regional Championships (2-4 days)**
- On-site setup and configuration
- Dedicated technical support throughout event
- Equipment recommendations and testing
- Judge training session

**International Competitions**
- Complete technical management
- Redundant systems and backup procedures
- Multi-language support if required
- Integration with live streaming/timing systems
- Custom development for special requirements

## System Requirements

### Minimal Setup (Club Events)
- Touchscreen laptop with Docker runtime
- Modern web browser (Chrome/Firefox/Safari)
- SSD recommended for faster load times

### Professional Setup (Championships)
- Server machine (laptop or dedicated hardware)
- 3-6 tablets (11" recommended) for judges/scribes
- Dedicated wireless router for competition network
- Power supplies and backup batteries
- Optional: Display monitors for spectators
- Optional: Raspberry Pi timing boxes for precision timing

## Getting Started

### For Self-Hosting
1. **Technical Setup** - Follow our [Server Setup Guide](/docs/deployment/server_setup_guide.md)
2. **Broadcast Graphics** - Follow [Running AEMS With the Graphics Server](/docs/deployment/aems-with-graphics-server.md) when using overlay graphics packs
3. **Development** - See [Software Maintenance Guide](/docs/smg.md) for contributing
4. **Community** - Join discussions via [GitHub Issues](https://github.com/your-repo/issues)

### For Professional Support
📧 **Email**: [kayak.freestyle.app@gmail.com](mailto:kayak.freestyle.app@gmail.com)
📱 **Consultation**: Available for planning calls and technical assessments
🏆 **Competition Support**: On-site services primarily available across Europe; availability in other regions may be possible upon request.

> Please contact us to confirm service availability and scheduling for your specific location or event.
*"Professional competition management shouldn't require a computer science degree. Let us handle the technology so you can focus on delivering an amazing event for your athletes."*

## Open Source Commitment

The core scoring functionality of AEMS stays **free and open source**. Professional services fund that development, so the platform keeps pace with competitions and technology.

### Contributing
- 🐛 **Bug Reports** - Help us improve through [GitHub Issues](https://github.com/AntonyM71/AEMS/issues)
- 💡 **Feature Requests** - Suggest improvements based on your competition experience
- 🔧 **Development** - See [Contributing Guidelines](/contributing.md)
- 📖 **Documentation** - Help improve setup guides and user documentation

## Mobile Apps

For informal practice and training sessions, try our companion mobile apps:

- [🤖 Google Play](https://play.google.com/store/apps/details?id=com.kayakfreestyle.kayakfreestyleapp)
- [🍎 Apple Store](https://apps.apple.com/sk/app/kayak-freestyle-app/id1627445855)

---

*AEMS is developed by paddlers, for paddlers. Whether you're running a local club competition or an international championship, we're here to help make your event successful.*