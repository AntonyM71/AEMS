# Timer Hardware

This document contains the bill of materials for a small timer for freestyle competitons.

> This system uses electronics and mains power, damage to components or electrocution are possible if the system is assembled incorrectly, so the work should only be undertaken by suitably qualified and experienced people.

## Bill of Materials

For this stage of the project, we souced all the materials from [The Pi Hut](https://thepihut.com/)

- 5V power supply for raspberry PI
- 64GB SD Card loaded with [Raspberry Pi OS](https://www.raspberrypi.com/software/)
- [Raspberry Pi Zero 2 With Header](https://thepihut.com/products/raspberry-pi-zero-2?variant=43855634497731)
- [E-Ink Display pHAT - 2.13"](https://thepihut.com/products/eink-display-phat-2-13-250x122)
- 2 Non-locking switches (such as those in [Project Box 1 for Raspberry Pi](https://thepihut.com/products/project-box-1-for-raspberry-pi))
- Small Buzzer (such as those in [Project Box 1 for Raspberry Pi](https://thepihut.com/products/project-box-1-for-raspberry-pi))

# Connection Diagram

```mermaid
graph LR
    subgraph RaspberryPi[Raspberry Pi]
        GPIO3[GPIO Pin 4 - Start Timer Switch Input]
        GPIO4[GPIO Pin 5 - Cancel Timer Switch Input]
        GPIO27[GPIO Pin 27 - Buzzer Output]
        GPIO6[GPIO Pin 6 - Ready Light]
        GPIO14[GPIO Pin 14 - Running Light]
        PowerRail5V[5V Power Rail]
        Ground[0V Power Rail]
    end

    PowerRail5V[5V Power Rail] -->  Switch1[Start Timer Switch]
    PowerRail5V --> Switch2[Cancel Timer Switch]
    PowerRail5V --> GPIO27
    PowerRail5V --> GPIO6
    PowerRail5V --> GPIO14

    Switch1[Start Timer Switch] -->  GPIO3
    Switch2[Cancel Timer Switch] --> GPIO4
    GPIO27 --> Buzzer[Buzzer]
    GPIO6 --> ReadyLED[Ready LED + 330]
    GPIO14 --> RunningLED[Running LED]
    GPIO3 --> Ground
    GPIO4 --> Ground
    Buzzer --> Ground
    ReadyLED --> R1[330 Ohm Resistor]
    RunningLED --> R2[330 Ohm Resistor]
    R1 --> Ground
    R2 --> Ground


```
