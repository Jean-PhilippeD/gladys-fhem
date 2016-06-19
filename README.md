# Gladys Fhem

Gladys hooks to provide a control on your device through FHEM as gateway

Need Gladys version >= 3.0.0.

## Documentation

### FHEM side

In order Gladys detect your devices, your devices need to contains specific keyword by type:
- for Temperature sensor: temperature
- for Motion sensor: motion
- for Humidity sensor: humidity
- for Brightness sensor: brightness
- for Switchs 4 buttons: switchs
- for Binary (on-off state button): actuator
- for Door contact sensor: contact

If your device does multiple sensor, just add each sensor type in your name.
For example, a device which does brightness and motion sensor should/could be named as follow:
- yourDeviceId_brightness_motion

Be sure to get unique naming cause this will be the unique id for Gladys (but probably for FHEM also).

### Gladys side

To install this module : 

- Install the module in Gladys.
- Change the default FHEM parameters (FHEM_PORT and FHEM_HOST).
- Reboot Gladys.
- Then, launch Configuration on FHEM Module, your devices should have been detected. 

## Dev

This module has been tested only with EnOcean Devices, it may be different for Z-Wave, if you need compatibility, feel free to push me your request (with z-wave identifier from FHEM or any other protocol).
