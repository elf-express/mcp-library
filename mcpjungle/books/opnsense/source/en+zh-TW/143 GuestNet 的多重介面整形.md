---
title: "Multi Interface shaping for a GuestNet｜GuestNet 的多重介面整形"
title_original: "Multi Interface shaping for a GuestNet"
source: "https://docs.opnsense.org/manual/how-tos/shaper_guestnet.html"
chapter: ["Firewall","Traffic Shaping","Configuration / How-tos"]
order: 143
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:32:53.348Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Prioritize Applications (Weighted) using Queues｜使用佇列對應用程式進行優先權排序（加權）](<142 使用佇列對應用程式進行優先權排序（加權）.md>)　｜　[下一篇：Fighting Bufferbloat with FQ_CoDel｜使用 FQ_CoDel 對抗緩衝區膨脹 ➡](<144 使用 FQ_CoDel 對抗緩衝區膨脹.md>)

# Multi Interface shaping for a GuestNet｜GuestNet 的多重介面整形

> 章節：[Firewall](<000 目錄.md#c-26>) › [Traffic Shaping](<000 目錄.md#c-29>) › [Configuration / How-tos](<000 目錄.md#c-30>)

One of the options with OPNsense’s traffic shaper is its ability to add shaping rules based upon two interfaces. This option allows you to shape traffic differently based on the direction the traffic is moving between interfaces.

OPNsense 流量整形器的選項之一是能夠基於兩個介面新增整形規則。此選項可讓您根據流量在介面之間移動的方向以不同方式調整流量。

For this example we will use this functionality to share a symmetric 10 Mbps internet connection between a primary LAN network and a Guest Network.

在此範例中，我們將使用此功能在主 LAN 網路和訪客網路之間共用對稱 10 Mbps 網路連線。

The LAN network will not be limited, traffic from users on our Guest Network will be limited to a total of 2 Mbps Download and 1 Mbps Upload.

LAN 網路不會受到限制，訪客網路上的使用者流量將限制為總共 2 Mbps 下載和 1 Mbps 上傳。

[![](<../images/3696f3c8-nwdiag-3f7508e3160ba25a71f8ec8c2d2ece7a1.png>)](https://docs.opnsense.org/_images/nwdiag-3f7508e3160ba25a71f8ec8c2d2ece7a17d9529a.png)

Simple network diagram

簡單網路圖

## Step 1 - Create Upload and Download Pipes｜步驟 1 - 建立上傳和下載管道

On the **Pipes** tab click the **+** button in the lower right corner. An empty **Edit Pipe** screen will popup.

在 **管道**標籤上，按一下右下角的**+**按鈕。將彈出一個空的**編輯管道**螢幕。

Create Pipe For Upload (GuestNet - em2)

建立上傳管道（GuestNet - em2）

|   |   |   |
| --- | --- | --- |
| **enabled**<br>**啟用** | Checked<br>已檢查 | *Check to enable the pipe*<br>*檢查以啟用管道* |
| **bandwidth**<br>**頻寬** | 1 | *Numeric value of the desired bandwidth*<br>*所需頻寬的數值* |
| **bandwidth Metric**<br>**頻寬指標** | Mbit/s<br>兆位元/秒 | *Metric to use with the numeric value*<br>*與數值一起使用的量測* |
| **mask**<br>**面具** | (Empty)<br>（空） | *Leave empty*<br>*留空* |
| **description**<br>**描述** | PipeUp-1Mbps | *Free field, enter something descriptive*<br>*自由字段，輸入描述性內容* |

Create Pipe For Download (GuestNet - em2)

建立下載管道（GuestNet - em2）

|   |   |   |
| --- | --- | --- |
| **enabled**<br>**啟用** | Checked<br>已檢查 | *Check to enable the pipe*<br>*檢查以啟用管道* |
| **bandwidth**<br>**頻寬** | 2 | *Numeric value of the desired bandwidth*<br>*所需頻寬的數值* |
| **bandwidth Metric**<br>**頻寬指標** | Mbit/s<br>兆位元/秒 | *Metric to use with the numeric value*<br>*與數值一起使用的量測* |
| **mask**<br>**面具** | (Empty)<br>（空） | *Leave empty*<br>*留空* |
| **description**<br>**描述** | PipeDown-2Mbps | *Free field, enter something descriptive*<br>*自由字段，輸入描述性內容* |

## Step 2 - Create Rules｜第 2 步 - 建立規則

On the **Rules** tab click the **+** button in the lower right corner. An empty **Edit rule** screen will popup.

在 **規則**標籤上，按一下右下角的**+**按鈕。將彈出一個空的**編輯規則**螢幕。

Important - Before you continue!

重要 - 在繼續之前！

First change the mode to advanced, see the toggle in the left top corner of the popup dialog. One click should shift it from red (disabled) to green (enabled).

首先將模式變更為高級，請參閱彈出對話方塊左上角的切換按鈕。單擊即可將其從紅色（禁用）更改為綠色（啟用）。

Create a rule for the download traffic

建立下載流量規則

|   |   |   |
| --- | --- | --- |
| **sequence**<br>**序列** | 11 | *Auto generated number, overwrite only when needed*<br>11 *自動產生編號，僅在需要時覆寫* |
| **interface**<br>**介面** | WAN | *Select the interface connected to the internet*<br>*選擇連接到網際網路的介面* |
| **interface2**<br>**介面2** | GuestNet<br>訪客網 | *Select the interface that matches your GuestNet*<br>*選擇與您的 GuestNet 相符的介面* |
| **proto**<br>**原型** | ip | *Select the protocol, IP in our example*<br>*選擇協議，在我們的範例中為IP* |
| **source**<br>**來源** | any<br>任何 | *The source address, leave on any*<br>*來源位址，任意留* |
| **src-port**<br>**來源端口** | any<br>任何 | *The source port to shape, leave on any*<br>*要塑造的來源端口，保留任何* |
| **destination**<br>**目的地** | any<br>任何 | *The destination IP to shape, leave on any*<br>*目的地IP塑造，留下任意* |
| **dst-port**<br>**目標端口** | any<br>任何 | *The destination port to shape, leave on any*<br>*目的港自行塑造，任意留任* |
| **direction**<br>**方向** | in<br>在 | *Match incoming packages (download)*<br>*符合傳入的套件（下載）* |
| **target**<br>**目標** | PipeDown-2Mbps | *Select the Download pipe*<br>*選擇下載管道* |
| **description**<br>**描述** | GuestNetDownload<br>訪客網路下載 | *Enter a descriptive name*<br>*輸入描述性名稱* |

Create a rule for the upload traffic

建立上傳流量規則

|   |   |   |
| --- | --- | --- |
| **sequence**<br>**序列** | 21 | *Auto generated number, overwrite only when needed*<br>21 *自動產生編號，僅在需要時覆寫* |
| **interface**<br>**介面** | WAN | *Select the interface connected to the internet*<br>*選擇連接到網際網路的介面* |
| **interface2**<br>**介面2** | GuestNet<br>訪客網 | *Select the interface that matches your GuestNet*<br>*選擇與您的 GuestNet 相符的介面* |
| **proto**<br>**原型** | ip | *Select the protocol, IP in our example*<br>*選擇協議，在我們的範例中為IP* |
| **source**<br>**來源** | any<br>任何 | *The source address, leave on any*<br>*來源位址，任意留* |
| **src-port**<br>**來源端口** | any<br>任何 | *The source port to shape, leave on any*<br>*要塑造的來源端口，保留任何* |
| **destination**<br>**目的地** | any<br>任何 | *The destination IP to shape, leave on any*<br>*目的地IP塑造，留下任意* |
| **dst-port**<br>**目標端口** | any<br>任何 | *The destination port to shape, leave on any*<br>*目的港自行塑造，任意留任* |
| **direction**<br>**方向** | out<br>出 | *Match outgoing packages (upload)*<br>*符合傳出包（上傳）* |
| **target**<br>**目標** | PipeUp-1Mbps | *Select the Upload pipe*<br>*選擇上傳管道* |
| **description**<br>**描述** | GuestNetUpload<br>訪客網路上傳 | *Enter a descriptive name*<br>*輸入描述性名稱* |

Now press ![apply](<../images/ca819e9a-applybtn.png>) to activate the traffic shaping rules.

現在按![apply](<../images/ca819e9a-applybtn.png>)啟動流量整形規則。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Prioritize Applications (Weighted) using Queues｜使用佇列對應用程式進行優先權排序（加權）](<142 使用佇列對應用程式進行優先權排序（加權）.md>)　｜　[下一篇：Fighting Bufferbloat with FQ_CoDel｜使用 FQ_CoDel 對抗緩衝區膨脹 ➡](<144 使用 FQ_CoDel 對抗緩衝區膨脹.md>)
