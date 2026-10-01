---
title: "Remote debugging the kernel"
source: "https://docs.opnsense.org/development/how-tos/kernel_debugging.html"
chapter: ["Development Manual","How-tos"]
order: 372
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:49.239Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ProfilingDebugging the kernel](<371 ProfilingDebugging the kernel.md>)　｜　[下一篇：Project Relations ➡](<373 Project Relations.md>)

# Remote debugging the kernel

> 章節：[Development Manual](<000 目錄.md#c-52>) › [How-tos](<000 目錄.md#c-63>)

FreeBSD supports remote debugging using a serial interface. Since most virtual solutions support serial interfaces it can be quite convenient to deploy a kernel and start a debug session on another machine.

The setup assumes two (virtual) machines with a serial (rs232) connection in between.

[![](<../images/b800c804-blockdiag-51ee775ab4d0b0956e2879627609be.png>)](https://docs.opnsense.org/_images/blockdiag-51ee775ab4d0b0956e2879627609bee55b87586f.png)

## Configure and build a kernel

Use our toolchain described in detail [here](https://github.com/opnsense/tools) and add the following options to your `SMP` file in `/usr/tools/config/[VERSION]/SMP`

```
#nomakeoptions DEBUG
options        GDB                     # Support remote GDB.
makeoptions    DEBUG=-g
```

Next clean and build a kernel

```
make clean-obj,kernel kernel
```

## Install the kernel on test vm

With the build finished, we should have a kernel package on the build machine available at the following location:

> `/usr/local/opnsense/build/[Version]/[Architecture]/sets/kernel*.txz`

Copy this package to the test vm and install it using our `opnsense-update` command:

```
opnsense-update -ikfr [version] -l /location/from/
```

Where \[version\] is the version part of the kernel package, such as `19.1.2`

## Configure the test vm

To be able to connect to the test machine using `kgdb`, you need to make sure some settings are set.

Edit `/boot/device.hints` and change or add `hint.uart.0.flags` to the following:

```
hint.uart.0.flags="0xc0"
```

Also /boot/loader.conf.local should have a baud-rate configured for the serial device:

```
comconsole_speed="115200"
```

## Test your setup

Login to the test machine and force a debug session in gdb, using the following commands:

```
# sysctl debug.kdb.current=gdb
# sysctl debug.kdb.enter=1
db> gdb
Step to enter the remote GDB backend.
db> c (continue)
```

Then go to the build machine, make sure gdb is installed (`pkg install gdb`) and go to the directory where the debug symbols are and start a session, ask a backtrace `bt` and continue normal operation `c`:

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ProfilingDebugging the kernel](<371 ProfilingDebugging the kernel.md>)　｜　[下一篇：Project Relations ➡](<373 Project Relations.md>)
