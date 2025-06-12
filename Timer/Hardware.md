# Timer Hardware

This document contains the bill of materials for a small timer for freestyle competitons.

> This system uses electronics and mains power, damage to components or electrocution are possible if the system is assembled incorrectly, so the work should only be undertaken by suitably qualified and experienced people.

## Bill of Materials

For this stage of the project, we souced all the materials from [The Pi Hut](https://thepihut.com/)

- 240V to 12V 15A Power Supply
- 12V to 5V 2.5A power supply for raspberry PI
- 64GB SD Card loaded with [Raspberry Pi OS](https://www.raspberrypi.com/software/)
- [Raspberry Pi Zero 2 With Header](https://thepihut.com/products/raspberry-pi-zero-2?variant=43855634497731)
- 2 Non-locking switches Ideally waterproof and able to be mounted in a hole
- Car Horn (12V 10A)
- Two Electronics Project Boxes
- Male and Female XLR connectors (Ideally Waterproof)
- XLR Cable
- 330 Ohm and 1k Ohm resistors.
- LEDs
- 6 Digit TM1637 7 Segment Display
- 2N3904 Transistor
- Misc connecting wires and electrical connectors (spade crimps, WAGO, etc)

> Transistor example
> https://elinux.org/RPi_GPIO_Interface_Circuits#Using_an_NPN_transistor

# Connection Diagram

```mermaid
graph LR
    subgraph 12vPSU[12v PSU]
        12vPositive[Pos]
        12vNegative[Neg]
        12vGround[Ground]

    end
    subgraph 5vPSU[5v PSU]
        5vPositive[Pos]
        5vNegative[Neg]

    end
    subgraph RaspberryPi[Raspberry Pi]
        GPIO3[GPIO Pin 4 - Start Timer Switch Input]
        GPIO4[GPIO Pin 5 - Cancel Timer Switch Input]
        GPIO8[GPIO Pin 8 - Display Clock]
        GPIO7[GPIO Pin 4 - Display DIO]
        GPIO15[GPIO Pin 15 - Buzzer Output]
        GPIO6[GPIO Pin 6 - Ready Light]
        GPIO14[GPIO Pin 14 - Running Light]
        PowerRail5V[5V Power Rail]
        PowerRail33V[3.3V Power Rail]
        RPIGround[0V Power Rail]
    end

    subgraph RelayModule[5V Triggered Relay Module]
        IN[ Control Signal In]
        IN --> CoilPositive
        PowerRail5V --> CoilPositive[Coil +]
        CoilNegative[Coil -] --> RPIGround
        NO[Normally Open]
        COM[Common Contact] --> 12vNegative
        NC[Normally Closed]
        COM --> NO
        COM --> NC
    end
    subgraph Display[ TM1637 6-Digit Display]
        VCC
        GND
        DIO
        CLK
    end
    PowerRail33V --> VCC
    GPIO8 --> CLK
    GPIO7 --> DIO
    GND --> RPIGround
    subgraph Transistor[ 2N3904 Transistor]
        Collector --> Base
        Base --> Emitter
    end
    subgraph FrontPanel[Front Panel]
        PowerRail5V[5V Power Rail] -->  Switch1[Start Timer Switch]
        PowerRail5V --> Switch2[Cancel Timer Switch]
        GPIO6 --> ReadyLED[Ready LED + 330]
        GPIO14 --> RunningLED[Running LED]
        Display

    end
    subgraph XLR[XLR Connector]
        XLR1[Pin 1]
        XLR2[Pin 2]
        XLR3[Pin 3]
    end
    PowerRail5V --> PowerRail33V

    PowerRail5V --> Collector
    GPIO15 --> TransistorProtectionResistor[1K Resistor]
    TransistorProtectionResistor --> Base
    Emitter --> IN
    12vPositive --> COM
    12vNegative --> RCD
    NO --> XLR1
    XLR1 --> Horn
    MainsPower[Mains Power] --> RCD[Residual Current Device USA: GFCI]
    RCD --> MainsPower
    RCD --> 12vPositive
    RCD --> 12vGround
    12vPositive --> 5vPositive
    5vNegative --> 12vNegative
    5vPositive --> |Micro USB|PowerRail5V
    RPIGround --> |Micro USB|5vNegative
    CoilPositive --> Coil
    Coil --> CoilNegative
    PowerRail5V[5V Power Rail] -->  Switch1[Start Timer Switch]

    PowerRail5V --> GPIO15
    PowerRail5V --> GPIO6
    PowerRail5V --> GPIO14
    PowerRail5V --> GPIO7
    PowerRail5V --> GPIO8

    Horn --> XLR3
    XLR3 --> 12vNegative
    12vGround --> XLR2

    Switch1[Start Timer Switch] -->  GPIO3
    Switch2[Cancel Timer Switch] --> GPIO4


    GPIO3 --> RPIGround
    GPIO4 --> RPIGround

    ReadyLED --> R1[330 Ohm Resistor]
    RunningLED --> R2[330 Ohm Resistor]
    R1 --> RPIGround
    R2 --> RPIGround


```
