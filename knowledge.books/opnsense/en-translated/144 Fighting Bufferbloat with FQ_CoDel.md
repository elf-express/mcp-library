---
title: "Fighting Bufferbloat with FQ_CoDel"
source: "https://docs.opnsense.org/manual/how-tos/shaper_bufferbloat.html"
chapter: ["Firewall","Traffic Shaping","Configuration / How-tos"]
order: 144
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:54.355Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Multi Interface shaping for a GuestNet](<143 Multi Interface shaping for a GuestNet.md>)　｜　[下一篇：Control Plane Shaping ➡](<145 Control Plane Shaping.md>)

# Fighting Bufferbloat with FQ_CoDel

> 章節：[Firewall](<000 目錄.md#c-26>) › [Traffic Shaping](<000 目錄.md#c-29>) › [Configuration / How-tos](<000 目錄.md#c-30>)

## Fighting Bufferbloat with FQ\_CoDel

Bufferbloat is the undesirable latency that comes from a router or other network equipment buffering too much data. This occurs because the router cannot immediately transmit data through a slow (bottleneck) link, so it “buffers” those packets. New traffic can get stuck behind those buffered packets, resulting in enormous (even multi-second) delays to all traffic. End users see this as lagging in games, stuttering in video & voice calls, or a general sense that “the network is slow”.

The AQM/SQM algorithms can eliminate that latency, significantly improving the end-user experience. One AQM is **FQ\_CoDel** e.g. Flow Queueing with Controlled Delay. It ensures that packets from small flows are sent in a timely fashion, while large flows share the bottleneck’s capacity.

Here is an overview of the FQ\_CoDel algorithm that performs these tasks in parallel:

1.  Separate every traffic flow’s arriving packets into their own queue.
    
2.  Remove a small batch of packets from a queue, round-robin style, and transmit that batch through the (slow) bottleneck link to the ISP. When each batch has been fully sent, retrieve a batch from the next queue, and so on.
    
3.  Offer back pressure to flows that are sending “more than their share” of data.
    

This last step is the heart of the FQ\_CoDel algorithm. It measures the time that a packet remains in a queue (its “sojourn time”). That’s how it determines that a flow is using more than its share. If packets have been in a queue “too long” (that is, if their sojourn times exceed the *target* setting for longer than the *interval*), FQ\_CoDel begins to mark or drop some of those packets to cause the sender to slow down.

For more details, see RFC 8290 [https://datatracker.ietf.org/doc/html/rfc8290](https://datatracker.ietf.org/doc/html/rfc8290).

Attention

If you are running IPv6 or any dynamic routing protocol, consider creating a Control plane specific class [Control Plane Shaping](<145 Control Plane Shaping.md>).

## Parameters of FQ\_CoDel

FQ\_CoDel uses the following parameters in its algorithm.

|   |   |
| --- | --- |
| **target** | *Maximum time packets should dwell in a queue. (Default: 5ms)* |
| **interval** | *When sojourn times exceed the target for more than this interval, drop or mark packets to slow that flow. (Default: 100ms)* |
| **quantum** | *Maximum number of bytes to dequeue for transmission at one time. Should be set to the value of Interface MTU. (Default: 1514 bytes, 1500+14B hardware header, max 9000)* |
| **limit** | *Size of all queues managed by FQ\_CoDel instance. It is the hard limit on the real queue size in packets (Default: 10240, max 20480).* |
| **flows** | *Sets the number of queues into which the incoming packets are classified (Default: 1024, max 65535)* |
| **CoDel ECN** | *Enable packet marking for ECN-enabled TCP flows when queue delay becomes high. (Default: Disabled)* |

## Configuring FQ\_CoDel for OPNsense

In the configuration steps below, assume these advertised ISP speeds:

|  | Download | Upload |
| --- | --- | --- |
| Mbit/s | 530 | 30 |

To begin, go to Firewall ‣ Shaper ‣ Pipes. Select the *advanced mode*

After configuring the Pipes and Queues (below), be sure to read the [Tuning FQ\_CoDel](#tuning-fq-codel) section below that describes the brief final tuning process.

### Step 1a - Create Download Pipe

On the **Pipes** tab click the **+** button in the lower right corner. An empty **Edit Pipe** screen pops up.

#### Create Pipe For Download

| Setting | Default | Description |
| --- | --- | --- |
| **enabled** | Checked | *Check to enable the pipe* |
| **bandwidth** | 495 | *Set initially to 85% of ISP advertised BW, tune later - numeric* |
| **bandwidth Metric** | Mbit/s | *Metric associated with the bandwidth* |
| **queue** | (empty) | *Leave empty: queues are configured separately* |
| **mask** | (none) | *Leave empty* |
| **scheduler type** | FQ\_CoDel | *Enables FQ\_CoDel in scheduler* |
| **Enable CoDel** | (empty) | *Leave empty: use FQ as selected above* |
| **(FQ-)CoDel target** | (empty) | *Leave as default (default 5ms); tune later* |
| **(FQ-)CoDel interval** | (empty) | *Leave as default: tune later* |
| **(FQ-)CoDel ECN** | Checked | *Check to enable packet marking ECN for ECN enabled flows* |
| **FQ-CoDel quantum** | (empty) | *Set to your WAN MTU. For Ethernet let it default* |
| **FQ-CoDel limit** | (empty) | *Leave as default; tune later* |
| **FQ-CoDel flows** | (empty) | *Leave as default (default 1024)* |
| **description** | Download | *Free field, enter something descriptive* |

### Step 1b - Create Upload Pipe

On the **Pipes** tab click the **+** button in the lower right corner. An empty **Edit Pipe** screen pops up.

Follow the same process as for the Download pipe, entering the 85% upload bandwidth value and entering “Upload” for the **description**

### Step 2a - Create Download Queue

On the **Queues** tab click the **+** button in the lower right corner. An empty **Edit queue** screen pops up.

#### Create Queue For Download

|   |   |   |
| --- | --- | --- |
| **enabled** | Checked | *Check to enable the queue* |
| **pipe** | Download | *Select our Pipe* |
| **weight** | 100 | *FQ\_CoDel ignores the weight: set to 100* |
| **mask** | (none) | *Leave empty: FQ will handle fairness* |
| **Enable CoDel** | (empty) | *Leave empty: use FQ as selected in Pipe* |
| **(FQ-)CoDel target** | (empty) | *Leave empty for a queue* |
| **(FQ-)CoDel interval** | (empty) | *Leave empty for a queue* |
| **(FQ-)CoDel ECN** | (empty) | *Leave empty for a queue* |
| **description** | Download-Queue | *Free field, enter something descriptive* |

Note

target, interval, ECN actually refer to CoDel and not FQ\_CoDel in the queue

### Step 2b - Create Upload Queue

On the **Queues** tab click the **+** button in the lower right corner. An empty **Edit queue** screen pops up.

Follow the same process as for the Download queue, selecting the **Upload pipe**, and entering “Upload-Queue” for the **description**

### Step 3a - Create Download Rule

On the **Rules** tab click the **+** button in the lower right corner. An empty **Edit rule** screen pops up.

#### Create a Rule For Download

|   |   |   |
| --- | --- | --- |
| **enabled** | Checked | *Check to enable the rule* |
| **sequence** | 1 | *Auto generated number, overwrite only when needed* |
| **interface** | WAN | *Select the interface connected to the internet* |
| **proto** | ip | *Select the protocol, IP in our example* |
| **source** | any | *The source address to shape, leave on any* |
| **src-port** | any | *The source port to shape, leave on any* |
| **destination** | any | *The destination IP to shape, leave on any* |
| **dst-port** | any | *The destination port to shape, leave on any* |
| **direction** | in | *Matches incoming or outgoing packets or both (default). We want to shape Download e.g ingress on WAN* |
| **target** | Download-Queue | *Select the Download queue* |
| **description** | Download-Rule | *Enter a descriptive name* |

### Step 3b - Create Upload Rule

On the **Rules** tab click the **+** button in the lower right corner. An empty **Edit rule** screen pops up.

Follow the same process as for the Download rule, using the same values except:

-   **sequence** (set to 2);
    
-   **direction** (set to “out”)
    
-   **target** (set to “Upload-Queue”);
    
-   **description** (set to “Upload-Rule”)
    

### Step 4 - Finalizing the configuration

Now press ![apply](<../images/ca819e9a-applybtn.png>) to activate the traffic shaping rules.

---

## Test for Bufferbloat

There are several web sites that measure the latency during download and upload to give an indication of bufferbloat in your network. Each of these clearly labels the download and upload rates, as well the latency during those tests. See these screen shots below.

They are all substantially the same. Pick one and use it for all your measurements.

**Waveform Speed Test** [https://www.waveform.com/tools/bufferbloat](https://www.waveform.com/tools/bufferbloat)

[![../../_images/waveform_bufferbloat_test_post_config_tuning.png](<../images/c26a48cf-waveform_bufferbloat_test_post_config_tu.png>)](https://docs.opnsense.org/_images/waveform_bufferbloat_test_post_config_tuning.png)

**Cloudflare** [https://speed.cloudflare.com/](https://speed.cloudflare.com/)

[![../../_images/cloudflare_speedtest.png](<../images/2f77ccc9-cloudflare_speedtest.png>)](https://docs.opnsense.org/_images/cloudflare_speedtest.png)

**Speedtest.net** [http://speedtest.net](http://speedtest.net/)

[![../../_images/speedtest_net.png](<../images/17e13b03-speedtest_net.png>)](https://docs.opnsense.org/_images/speedtest_net.png)

## Tuning FQ\_CoDel

After you configure the pipes and queues (above), take a few minutes to “tune” your FQ\_CoDel instance for your ISP. To do this:

First, run any of the speed tests above before applying any shaper. Run several tests to get average data rates and latency. Write those values down.

While you are configuring FQ\_CoDel, enter an initial value for the “bandwidth” that is 85% of the advertised rate from the ISP. (That is, if the download service is 100 Mbit/s, set the speed to 85 Mbit/s; for 40 Mbit/s upload, set it to 40 x 85%, or 34 Mbit/s.)

The remainder of the process is iterative, but brief:

-   Run a speed test to see the latency
    
-   Increase the Download bandwidth setting a bit
    
-   Run a speed test again. If the latency remains low, increase the bandwidth setting again.
    
-   Keep doing this until the latency increases, then back off the setting.
    
-   Do the same with the Upload bandwidth setting
    

When each of the Download and Upload bandwidth settings are as high as possible without increasing latency, you’re done.

## Detailed FQ-CoDel Tuning

FQ\_CoDel is designed to be a “no-knobs” algorithm. After you enter the Download and Upload bandwidth settings, the defaults for the other parameters work very well out of the box for virtually all situations. Before you invest further time in tuning, try the router for a day. If it’s “good enough”, you are done.

Read on if you want to go further.

*FQ-CoDel “out of the box” default settings*

<table>
<tr><th>FQ_C Parameter</th><th colspan="2">Default</th></tr>
<tr><td>quantum</td><td colspan="2">1514</td></tr>
<tr><td>target</td><td colspan="2">5</td></tr>
<tr><td>interval</td><td colspan="2">100</td></tr>
<tr><td>limit</td><td colspan="2">10240</td></tr>
<tr><td>flows</td><td colspan="2">1024</td></tr>
<tr><td>ECN</td><td colspan="2">OFF</td></tr>
</table>

### quantum

Quantum is one of these parameters that were constantly discussed what should be the proper value. Within the internet there is a lot of discussion that it should be set to 300 per 100 Mbit/s of BW. **This however is wrong.**

Quantum specifies number of bytes a queue can serve before being moved to the tail of old. As we are doing Fair Queueing we want to aim to serve all queues equally.

**The proper value of Quantum should be no more or less than is the WAN MTU.**

Note

At lower rates, below 100 Mbit/s, setting the quantum to 300 ensures that more smaller packets get through faster than big ones. It doesn’t matter much at higher rates. The quantum should be set to the MTU or 300 if you have low bandwidth and the cpu power. Setting the quantum lower causes more loops touching all the packets so it eats slightly more cpu

### target & interval

Target is the acceptable minimum standing/persistent queue delay for each FQ-CoDel queue. This minimum delay is identified by tracking the local minimum queue delay that packets experience. Target should be tuned to be at least the transmission time of a single MTU-sized packet at the WAN egress link speed.

To do this we can run excessive ping to the HOP after your OPNsense and take the **average rtt round up as your Target**. In this case 12ms

```
Example from the CLI of OPNsense

traceroute 1.1.1.1
traceroute to 1.1.1.1 (1.1.1.1), 64 hops max, 40 byte packets
1  192.168.0.1  0.463 ms  0.453 ms  0.480 ms     <<<< LAN Interface of OPN
2  10.205.5.1  10.879 ms  11.010 ms  11.079 ms   <<<< ISP directly connected Device to OPN WAN

ping -s 1472 -c 1000 -D 10.205.5.1
PING 10.205.5.1 (10.205.5.1) 1472(1500) bytes of data.
1480 bytes from 10.205.5.1: icmp_seq=0 ttl=255 time=13.1 ms
1480 bytes from 10.205.5.1: icmp_seq=1 ttl=255 time=10.4 ms

--- 10.205.5.1 ping statistics ---
1000 packets transmitted, 1000 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.800/11.429/45.992/4.796 ms
```

Note

Target is a good parameter for tune to prevent CoDel being too aggressive at low BW. Otherwise Target should be around 5-10% of Interval

Interval is used to ensure that the measured minimum delay does not become too stale. It’s value is chosen to give endpoints time to react to a drop without being so long that response times suffer.

Note

Interval default 100ms works usually well (10ms-1s, excels at range 10ms-300ms). If you want to tune Interval it should to be set around the worst case RTT scenario through the bottleneck

### limit

Default limit size of 10240 packets is too much. The creators recommended value 1000 for sub 10 Gbit/s connections. The default limit will never be reached for sub 10 Gbit/s WAN connections. Before that could happen FQ\_CoDel would already take action. So it is healthy to reduce the limit.

The over-large packet limit leads to bad results during slow start on some benchmarks. Reducing it too low could impact new flow start.

Note

For FreeBSD there is a [BUG](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=276890) opened for CPU hogging due to excessive logging caused when the limit queue is exceeded. Additionally one of the creators of CoDel raised a [discussion](https://marc.info/?t=170776797300003&r=1&w=2) to improve the implementation of FQ\_CoDel on FreeBSD.

Note

The CPU hogging due to excessive logging was [fixed](https://github.com/opnsense/src/commit/8684f75c425) for OPNsense by the devs on release 25.7.8 Its now safe and beneficial to use the limit parameter and lower it from the default value.

### flows

The “flows” parameter sets the number of queues into which the incoming packets are classified. Due to the stochastic nature of hashing, multiple flows may end up being hashed into the same slot.

This parameter can be set only at initialization time in the current implementation (needs reboot of device), since memory has to be allocated for the hash table.

Warning

Setting too high number can cause the device to be stuck. Be careful with this one.

### ECN

Current best practice is to turn off ECN on uplinks running at less than 4 Mbit/s (if you want good VOIP performance; a single packet at 1 Mbit/s takes 13ms, and packet drops get you this latency back).

ECN IS useful on downlinks on a home router, where the terminating hop is only one or two hops away, and connected to a system that handles ECN correctly.

Note

If you are experiencing slow starts disable ECN

## External references

-   [https://www.rfc-editor.org/rfc/rfc8290.html](https://www.rfc-editor.org/rfc/rfc8290.html)
    
-   [https://www.rfc-editor.org/rfc/rfc8289#section-4.2](https://www.rfc-editor.org/rfc/rfc8289#section-4.2)
    
-   [https://man.freebsd.org/cgi/man.cgi?query=ipfw&apropos=0&sektion=8&manpath=FreeBSD+14.1-RELEASE&arch=default&format=html](https://man.freebsd.org/cgi/man.cgi?query=ipfw&apropos=0&sektion=8&manpath=FreeBSD+14.1-RELEASE&arch=default&format=html)
    
-   [https://www.bufferbloat.net/projects/codel/wiki/Best\_practices\_for\_benchmarking\_Codel\_and\_FQ\_Codel/](https://www.bufferbloat.net/projects/codel/wiki/Best_practices_for_benchmarking_Codel_and_FQ_Codel/)
    
-   [https://forum.opnsense.org/index.php?topic=4949.msg20862#msg20862](https://forum.opnsense.org/index.php?topic=4949.msg20862#msg20862)
    
-   [https://forum.opnsense.org/index.php?topic=39046.msg191251#msg191251](https://forum.opnsense.org/index.php?topic=39046.msg191251#msg191251)
    
-   [https://www.man7.org/linux/man-pages/man8/tc-fq\_codel.8.html](https://www.man7.org/linux/man-pages/man8/tc-fq_codel.8.html)
    
-   [https://bugs.freebsd.org/bugzilla/show\_bug.cgi?id=276890](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=276890)
    
-   [https://marc.info/?t=170776797300003&r=1&w=2](https://marc.info/?t=170776797300003&r=1&w=2)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Multi Interface shaping for a GuestNet](<143 Multi Interface shaping for a GuestNet.md>)　｜　[下一篇：Control Plane Shaping ➡](<145 Control Plane Shaping.md>)
