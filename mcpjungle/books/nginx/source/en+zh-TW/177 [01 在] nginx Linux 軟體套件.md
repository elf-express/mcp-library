---
title: "nginx Linux packages｜nginx Linux 軟體套件"
title_original: "nginx Linux packages"
source: "https://nginx.org/en/linux_packages.html"
chapter: ["en"]
order: 177
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-29T09:40:15.200Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx](<176 [01 在] nginx.md>)　｜　[下一篇：PGP public keys｜PGP公鑰 ➡](<178 [01 在] PGP公鑰.md>)

# nginx Linux packages｜nginx Linux 軟體套件

> 章節：[en｜在](<000 目錄.md#c-1>)

## nginx: Linux packages｜nginx：Linux 軟體包

|   |
| --- |
| [Supported distributions and versions](#distributions)<br>[Installation instructions](#instructions)<br>     [RHEL and derivatives](#RHEL)<br>     [Debian](#Debian)<br>     [Ubuntu](#Ubuntu)<br>     [SLES](#SLES)<br>     [Alpine](#Alpine)<br>     [Amazon Linux](#Amazon-Linux)<br>[Source Packages](#sourcepackages)<br>[Dynamic Modules](#dynmodules)<br>[Signatures](#signatures)<br>[支援的發行版和版本](#distributions)<br> [安裝說明](#instructions)<br> [ RHEL及其衍生版本](#RHEL)<br> [Debian](#Debian)<br> [Ubuntu SLES (https://nginx.org/en/linux_packages.html#Ubuntu)<br> (https://nginx.org/en/linux_packages.html#SLES)<br> [Alpine](#Alpine)<br> [Amazon Linux](#Amazon-Linux)<br> [原始碼套件](#sourcepackages)<br> [動態模組](#dynmodules)<br> [簽章](#signatures) |

#### Supported distributions and versions｜支援的發行版和版本

nginx packages are available for the following Linux distributions and versions:

nginx軟體套件適用於以下Linux發行版和版本：

[RHEL and derivatives](#RHEL)

[RHEL及其衍生物](#RHEL)

> |   |   |
> | --- | --- |
> | Version<br>版本 | Supported Platforms<br>支援的平台 |
> | 8.x | x86\_64, aarch64/arm64 |
> | 9.x | x86\_64, aarch64/arm64 |
> | 10.x | x86\_64, aarch64/arm64 |

[Debian](#Debian)

[Debian](#Debian)

> |   |   |
> | --- | --- |
> | Version<br>版本 | Supported Platforms<br>支援的平台 |
> | 11.x “bullseye” | x86\_64, aarch64/arm64 |
> | 12.x “bookworm”<br>12.x 「書蟲」 | x86\_64, aarch64/arm64 |
> | 13.x “trixie” | x86\_64, aarch64/arm64 |

[Ubuntu](#Ubuntu)

[Ubuntu](#Ubuntu)

> |   |   |
> | --- | --- |
> | Version<br>版本 | Supported Platforms<br>支援的平台 |
> | 22.04 “jammy” | x86\_64, aarch64/arm64 |
> | 24.04 “noble”<br>24.04 「高貴的」 | x86\_64, aarch64/arm64 |
> | 26.04 “resolute”<br>26.04 “確定的” | x86\_64, aarch64/arm64 |

[SLES](#SLES)

> |   |   |
> | --- | --- |
> | Version<br>版本 | Supported Platforms<br>支援的平台 |
> | 15 SP6+ | x86\_64 |
> | 16 | x86\_64, aarch64/arm64 |

[Alpine](#Alpine)

[Alpine](#Alpine)

> |   |   |
> | --- | --- |
> | Version<br>版本 | Supported platforms<br>支援的平台 |
> | 3.21 | x86\_64, aarch64/arm64 |
> | 3.22 | x86\_64, aarch64/arm64 |
> | 3.23 | x86\_64, aarch64/arm64 |
> | 3.24 | x86\_64, aarch64/arm64 |

[Amazon Linux](#Amazon-Linux)

[Amazon Linux](#Amazon-Linux)

> |   |   |
> | --- | --- |
> | Version<br>版本 | Supported platforms<br>支援的平台 |
> | 2023 | x86\_64, aarch64/arm64 |

#### Installation instructions｜安裝說明

Before you install nginx for the first time on a new machine, you need to set up the nginx packages repository. Afterward, you can install and update nginx from the repository.

在新機器上首次安裝 nginx 之前，需要先設定 nginx 軟體套件倉庫。之後，就可以從該倉庫安裝更新 nginx 了。

#### RHEL and derivatives｜RHEL及其衍生物

This section applies to Red Hat Enterprise Linux and its derivatives such as CentOS, Oracle Linux, Rocky Linux, AlmaLinux.

本節適用於 Red Hat Enterprise Linux 及其衍生版本，例如 CentOS、Oracle Linux、Rocky Linux、AlmaLinux。

Install the prerequisites:

安裝必備組件：

> ```bash
>
> 『`bash
> sudo yum install yum-utils
> ```

To set up the yum repository, create the file named `/etc/yum.repos.d/nginx.repo` with the following contents:

若要設定 yum 倉庫，請建立名為`/etc/yum.repos.d/nginx.repo`的文件，並新增以下內容：

> ```
> [nginx-stable]
> name=nginx stable repo
>
> name=nginx穩定版倉庫
> baseurl=https://nginx.org/packages/centos/$releasever/$basearch/
>
> baseurl= https://nginx.org/packages/centos/$releasever/$basearch/
> gpgcheck=1
> enabled=1
>
> 已啟用=1
> gpgkey=https://nginx.org/keys/nginx_signing.key
>
> gpgkey= https://nginx.org/keys/nginx_signing.key
> module_hotfixes=true
> 
> [nginx-mainline]
> name=nginx mainline repo
>
> 名稱=nginx 主線倉庫
> baseurl=https://nginx.org/packages/mainline/centos/$releasever/$basearch/
>
> baseurl= https://nginx.org/packages/mainline/centos/$releasever/$basearch/
> gpgcheck=1
> enabled=0
>
> 已啟用=0
> gpgkey=https://nginx.org/keys/nginx_signing.key
>
> gpgkey= https://nginx.org/keys/nginx_signing.key
> module_hotfixes=true
> ```

By default, the repository for stable nginx packages is used. If you would like to use mainline nginx packages, run the following command:

預設情況下，系統會使用穩定版 nginx 軟體套件的倉庫。如果您想使用主線 nginx 軟體包，請執行以下命令：

> ```bash
>
> 『`bash
> sudo yum-config-manager --enable nginx-mainline
> ```

To install nginx, run the following command:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo yum install nginx
> ```

When prompted to accept the GPG key, verify that the fingerprint matches `573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`, and if so, accept it.

當提示接受GPG金鑰時，驗證指紋是否與`573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`匹配，如果匹配，則接受它。

#### Debian

Install the prerequisites:

安裝必備組件：

> ```bash
>
> 『`bash
> sudo apt install curl gnupg2 ca-certificates lsb-release debian-archive-keyring
> ```

Import an official nginx signing key so apt could verify the packages authenticity. Fetch the key:

導入官方的 Nginx 簽章金鑰，以便 apt 可以驗證軟體包的真實性。取得密鑰：

> ```bash
>
> 『`bash
> curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
>     | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
> ```

Verify that the downloaded file contains the proper key:

確認下載的檔案包含正確的金鑰：

> ```
> gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
> ```

The output should contain the full fingerprint `573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62` as follows:

輸出結果應包含完整的指紋`573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62` ，如下所示：

> ```
> pub   rsa2048 2011-08-19 [SC] [expires: 2027-05-24]
>
> pub rsa2048 2011-08-19 [ SC ] [過期時間：2027-05-24]
>       573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
> uid                      nginx signing key <signing-key@nginx.com>
>
> uid nginx 簽章金鑰<signing-key@nginx.com>
> ```

Note that the output can contain other keys used to sign the packages.

請注意，輸出結果可能包含用於對軟體包進行簽署的其他金鑰。

To set up the apt repository for stable nginx packages, run the following command:

若要設定用於穩定版 nginx 軟體套件的 apt 倉庫，請執行下列指令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> https://nginx.org/packages/debian `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```

If you would like to use mainline nginx packages, run the following command instead:

如果您想使用主線 nginx 軟體包，請執行以下命令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> https://nginx.org/packages/mainline/debian `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```

Set up repository pinning to prefer our packages over distribution-provided ones:

設定倉庫鎖定，優先使用我們自己的軟體包而不是發行版提供的軟體包：

> ```
> echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
>     | sudo tee /etc/apt/preferences.d/99nginx
> ```

To install nginx, run the following commands:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo apt update
> sudo apt install nginx
> ```

#### Ubuntu

Install the prerequisites:

安裝必備組件：

> ```bash
>
> 『`bash
> sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
> ```

Import an official nginx signing key so apt could verify the packages authenticity. Fetch the key:

導入官方的 Nginx 簽章金鑰，以便 apt 可以驗證軟體包的真實性。取得密鑰：

> ```bash
>
> 『`bash
> curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
>     | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
> ```

Verify that the downloaded file contains the proper key:

確認下載的檔案包含正確的金鑰：

> ```
> gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
> ```

The output should contain the full fingerprint `573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62` as follows:

輸出結果應包含完整的指紋`573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62` ，如下所示：

> ```
> pub   rsa2048 2011-08-19 [SC] [expires: 2027-05-24]
>
> pub rsa2048 2011-08-19 [ SC ] [過期時間：2027-05-24]
>       573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
> uid                      nginx signing key <signing-key@nginx.com>
>
> uid nginx 簽章金鑰<signing-key@nginx.com>
> ```

Note that the output can contain other keys used to sign the packages.

請注意，輸出結果可能包含用於對軟體包進行簽署的其他金鑰。

To set up the apt repository for stable nginx packages, run the following command:

若要設定用於穩定版 nginx 軟體套件的 apt 倉庫，請執行下列指令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> https://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```

If you would like to use mainline nginx packages, run the following command instead:

如果您想使用主線 nginx 軟體包，請執行以下命令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> https://nginx.org/packages/mainline/ubuntu `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```

Set up repository pinning to prefer our packages over distribution-provided ones:

設定倉庫鎖定，優先使用我們自己的軟體包而不是發行版提供的軟體包：

> ```
> echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
>     | sudo tee /etc/apt/preferences.d/99nginx
> ```

To install nginx, run the following commands:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo apt update
> sudo apt install nginx
> ```

#### SLES

Install the prerequisites:

安裝必備組件：

> ```bash
>
> 『`bash
> sudo zypper install curl ca-certificates gpg2
> ```

To set up the zypper repository for stable nginx packages, run the following command:

若要為穩定的 nginx 軟體包設定 zypper 儲存庫，請執行以下命令：

> ```bash
>
> 『`bash
> sudo zypper addrepo --gpgcheck --type yum --refresh --check \
>     'https://nginx.org/packages/sles/$releasever_major' nginx-stable
>
>     ' https://nginx.org/packages/sles/$releasever_major' nginx-stable
> ```

If you would like to use mainline nginx packages, run the following command instead:

如果您想使用主線 nginx 軟體包，請執行以下命令：

> ```bash
>
> 『`bash
> sudo zypper addrepo --gpgcheck --type yum --refresh --check \
>     'https://nginx.org/packages/mainline/sles/$releasever_major' nginx-mainline
>
>     ' https://nginx.org/packages/mainline/sles/$releasever_major' nginx-mainline
> ```

Next, import an official nginx signing key so zypper/rpm could verify the packages authenticity. Fetch the key:

接下來，導入官方的 nginx 簽章金鑰，以便 zypper/rpm 可以驗證軟體包的真實性。取得密鑰：

> ```bash
>
> 『`bash
> curl -o /tmp/nginx_signing.key https://nginx.org/keys/nginx_signing.key
> ```

Verify that the downloaded file contains the proper key:

確認下載的檔案包含正確的金鑰：

> ```
> gpg --with-fingerprint /tmp/nginx_signing.key
> ```

The output should contain the full fingerprint `573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62` as follows:

輸出結果應包含完整的指紋`573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62` ，如下所示：

> ```
> pub  2048R/7BD9BF62 2011-08-19 [expires: 2027-05-24]
>
> 發布日期：2048R/7BD9BF62 發布日期：2011年8月19日 [有效期限至：2027年5月24日]
>       Key fingerprint = 573B FD6B 3D8F BC64 1079  A6AB ABF5 BD82 7BD9 BF62
>
>       金鑰指紋 = 573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62
> uid nginx signing key <signing-key@nginx.com>
>
> uid nginx 簽章金鑰<signing-key@nginx.com>
> ```

Finally, import the key to the rpm database:

最後，將金鑰匯入到rpm資料庫中：

> ```bash
>
> 『`bash
> sudo rpmkeys --import /tmp/nginx_signing.key
> ```

To install nginx, run the following command:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo zypper install nginx
> ```

#### Alpine｜高山

Install the prerequisites:

安裝必備組件：

> ```bash
>
> 『`bash
> sudo apk add openssl curl ca-certificates
> ```

To set up the apk repository for stable nginx packages, run the following command:

若要設定穩定版 nginx 軟體套件的 apk 倉庫，請執行下列指令：

> ```
> printf "%s%s%s%s\n" \
>     "@nginx " \
>
>     "@nginx" \
>     "https://nginx.org/packages/alpine/v" \
>     `egrep -o '^[0-9]+\.[0-9]+' /etc/alpine-release` \
>     "/main" \
>
>     “/主要的” \
>     | sudo tee -a /etc/apk/repositories
> ```

If you would like to use mainline nginx packages, run the following command instead:

如果您想使用主線 nginx 軟體包，請執行以下命令：

> ```
> printf "%s%s%s%s\n" \
>     "@nginx " \
>
>     "@nginx" \
>     "https://nginx.org/packages/mainline/alpine/v" \
>     `egrep -o '^[0-9]+\.[0-9]+' /etc/alpine-release` \
>     "/main" \
>
>     “/主要的” \
>     | sudo tee -a /etc/apk/repositories
> ```

Next, import an official nginx signing key so apk could verify the packages authenticity. Fetch the key:

接下來，匯入官方的 Nginx 簽章金鑰，以便 APK 可以驗證軟體包的真實性。取得密鑰：

> ```bash
>
> 『`bash
> curl -o /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub
> ```

Verify that downloaded file contains the proper key:

請確認下載的檔案包含正確的金鑰：

> ```
> openssl rsa -pubin -in /tmp/nginx_signing.rsa.pub -text -noout
> ```

The output should contain the following modulus:

輸出結果應包含以下模數：

> ```yaml
> Public-Key: (2048 bit)
>
> 公鑰：（2048 位元）
> Modulus:
>
> 模量：
>     00:fe:14:f6:0a:1a:b8:86:19:fe:cd:ab:02:9f:58:
>     2f:37:70:15:74:d6:06:9b:81:55:90:99:96:cc:70:
>     5c:de:5b:e8:4c:b2:0c:47:5b:a8:a2:98:3d:11:b1:
>     f6:7d:a0:46:df:24:23:c6:d0:24:52:67:ba:69:ab:
>     9a:4a:6a:66:2c:db:e1:09:f1:0d:b2:b0:e1:47:1f:
>     0a:46:ac:0d:82:f3:3c:8d:02:ce:08:43:19:d9:64:
>     86:c4:4e:07:12:c0:5b:43:ba:7d:17:8a:a3:f0:3d:
>     98:32:b9:75:66:f4:f0:1b:2d:94:5b:7c:1c:e6:f3:
>     04:7f:dd:25:b2:82:a6:41:04:b7:50:93:94:c4:7c:
>     34:7e:12:7c:bf:33:54:55:47:8c:42:94:40:8e:34:
>     5f:54:04:1d:9e:8c:57:48:d4:b0:f8:e4:03:db:3f:
>     68:6c:37:fa:62:14:1c:94:d6:de:f2:2b:68:29:17:
>     24:6d:f7:b5:b3:18:79:fd:31:5e:7f:4c:be:c0:99:
>     13:cc:e2:97:2b:dc:96:9c:9a:d0:a7:c5:77:82:67:
>     c9:cb:a9:e7:68:4a:e1:c5:ba:1c:32:0e:79:40:6e:
>     ef:08:d7:a3:b9:5d:1a:df:ce:1a:c7:44:91:4c:d4:
>     99:c8:88:69:b3:66:2e:b3:06:f1:f4:22:d7:f2:5f:
>     ab:6d
> Exponent: 65537 (0x10001)
>
> 指數：65537 (0x10001)
> ```

Finally, move the key to apk trusted keys storage:

最後，將金鑰移至 apk 可信任金鑰儲存位置：

> ```bash
>
> 『`bash
> sudo mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/
> ```

To install nginx, run the following command:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo apk add nginx@nginx
> ```

The `@nginx` tag should also be specified when installing packages with [dynamic modules](#dynmodules):

安裝帶有 [動態模組](#dynmodules)的軟體包時，也應指定`@nginx`標籤：

> ```bash
>
> 『`bash
> sudo apk add nginx-module-image-filter@nginx nginx-module-njs@nginx
> ```

#### Amazon Linux

Install the prerequisites:

安裝必備組件：

> ```bash
>
> 『`bash
> sudo yum install yum-utils
> ```

To set up the yum repository for Amazon Linux 2, create the file named `/etc/yum.repos.d/nginx.repo` with the following contents:

若要為 Amazon Linux 2 設定 yum 儲存庫，請建立名為`/etc/yum.repos.d/nginx.repo`的文件，並新增以下內容：

> ```
> [nginx-stable]
> name=nginx stable repo
>
> name=nginx穩定版倉庫
> baseurl=https://nginx.org/packages/amzn2/$releasever/$basearch/
>
> baseurl= https://nginx.org/packages/amzn2/$releasever/$basearch/
> gpgcheck=1
> enabled=1
>
> 已啟用=1
> gpgkey=https://nginx.org/keys/nginx_signing.key
>
> gpgkey= https://nginx.org/keys/nginx_signing.key
> module_hotfixes=true
> priority=9
>
> 優先權=9
> 
> [nginx-mainline]
> name=nginx mainline repo
>
> 名稱=nginx 主線倉庫
> baseurl=https://nginx.org/packages/mainline/amzn2/$releasever/$basearch/
>
> baseurl= https://nginx.org/packages/mainline/amzn2/$releasever/$basearch/
> gpgcheck=1
> enabled=0
>
> 已啟用=0
> gpgkey=https://nginx.org/keys/nginx_signing.key
>
> gpgkey= https://nginx.org/keys/nginx_signing.key
> module_hotfixes=true
> priority=9
>
> 優先權=9
> ```

To set up the yum repository for Amazon Linux 2023, create the file named `/etc/yum.repos.d/nginx.repo` with the following contents:

若要為 Amazon Linux 2023 設定 yum 儲存庫，請建立名為`/etc/yum.repos.d/nginx.repo`的文件，並新增以下內容：

> ```
> [nginx-stable]
> name=nginx stable repo
>
> name=nginx穩定版倉庫
> baseurl=https://nginx.org/packages/amzn/2023/$basearch/
>
> baseurl= https://nginx.org/packages/amzn/2023/$basearch/
> gpgcheck=1
> enabled=1
>
> 已啟用=1
> gpgkey=https://nginx.org/keys/nginx_signing.key
>
> gpgkey= https://nginx.org/keys/nginx_signing.key
> module_hotfixes=true
> priority=9
>
> 優先權=9
> 
> [nginx-mainline]
> name=nginx mainline repo
>
> 名稱=nginx 主線倉庫
> baseurl=https://nginx.org/packages/mainline/amzn/2023/$basearch/
>
> baseurl= https://nginx.org/packages/mainline/amzn/2023/$basearch/
> gpgcheck=1
> enabled=0
>
> 已啟用=0
> gpgkey=https://nginx.org/keys/nginx_signing.key
>
> gpgkey= https://nginx.org/keys/nginx_signing.key
> module_hotfixes=true
> priority=9
>
> 優先權=9
> ```

By default, the repository for stable nginx packages is used. If you would like to use mainline nginx packages, run the following command:

預設情況下，系統會使用穩定版 nginx 軟體套件的倉庫。如果您想使用主線 nginx 軟體包，請執行以下命令：

> ```bash
>
> 『`bash
> sudo yum-config-manager --enable nginx-mainline
> ```

To install nginx, run the following command:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo yum install nginx
> ```

When prompted to accept the GPG key, verify that the fingerprint matches `573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`, and if so, accept it.

當提示接受GPG金鑰時，驗證指紋是否與`573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`匹配，如果匹配，則接受它。

#### Source Packages｜原始碼包

Packaging sources can be found in the [packaging sources repository](https://github.com/nginx/pkg-oss).

可以在[打包資源庫](https://github.com/nginx/pkg-oss)中找到打包資源。

The `master` branch holds packaging sources for the current mainline version, while `stable-*` branches contain latest sources for stable releases. To build binary packages, run `make` in `debian/` directory on Debian/Ubuntu, or in `rpm/SPECS/` on RHEL and derivatives, SLES, and Amazon Linux, or in `alpine/` on Alpine.

`master`分支包含目前主線版本的打包原始碼，而`stable-*`分支包含穩定版本的最新原始碼。要建置`alpine/`進位軟體包，請在 Debian/Ubuntu 系統上於`debian/`目錄中運行`make` ，或在`rpm/SPECS/`及其衍生版本、 SLES和 Amazon 系統上於RHEL目錄中運行。

Packaging sources are distributed under the same [2-clause BSD-like license](<354 頁.md>) used by nginx.

打包原始碼根據與 nginx 相同的 [2 條款BSD類似許可證](<354 頁.md>)分發。

#### Dynamic Modules｜動態模組

Main nginx package is built with all modules that do not require additional libraries to avoid extra dependencies. Since version 1.9.11, nginx supports [dynamic modules](<125 [01.01 文件] 核心功能.md#load_module>) and the following modules are built as dynamic and shipped as separate packages:

nginx 主軟體包包含所有不需要額外函式庫的模組，以避免額外的依賴項。自版本1.9.11起，nginx 支援 [動態模組](<125 [01.01 文件] 核心功能.md#load_module>) ，以下模組以動態方式建構並作為單獨的軟體包發布：

> ```
> nginx-module-geoip
> nginx-module-image-filter
> nginx-module-njs
>
> nginx-module-etc
> nginx-module-perl
> nginx-module-xslt
> ```

Additionally, since version 1.25.3, the following module is shipped as a separate package:

此外，自版本1.25.3起，以下模組作為單獨的軟體包提供：

> ```
> nginx-module-otel
>
> nginx-module-hotel
> ```

Additionally, since version 1.29.1, the following module is shipped as a separate package:

此外，自版本1.29.1起，以下模組作為單獨的軟體包提供：

> ```
> nginx-module-acme
> ```

#### Signatures｜簽名

Since our [PGP keys](<178 [01 在] PGP公鑰.md>) and packages are located on the same server, they are equally trusted. It is highly advised to additionally verify the authenticity of the downloaded PGP key. PGP has the “Web of Trust”（信任網路） concept, when a key is signed by someone else’s key, that in turn is signed by another key and so on. It often makes possible to build a chain from an arbitrary key to someone’s key who you know and trust personally, thus verify the authenticity of the first key in a chain. This concept is described in details in [GPG Mini Howto](https://www.gnupg.org/howtos/en/GPGMiniHowto-1.html). Our keys have enough signatures, and their authenticity is relatively easy to check.

由於我們的 [PGP 金鑰](<178 [01 在] PGP公鑰.md>) 和軟體包位於同一伺服器上，因此它們同樣受信任。強烈建議另外驗證下載的PGP金鑰的真實性。 PGP 具有 “Web of Trust”（信任網路） 概念，當一個金鑰由其他人的金鑰簽署時，該金鑰又由另一個金鑰簽名，依此類推。通常可以從任意金鑰到您個人認識並信任的某人的金鑰建立一條鏈，從而驗證鏈中第一個金鑰的真實性。這個概念在[GPG Mini Howto](https://www.gnupg.org/howtos/en/GPGMiniHowto-1.html)中有詳細描述。我們的金鑰有足夠的簽名，並且其真實性相對容易檢查。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx](<176 [01 在] nginx.md>)　｜　[下一篇：PGP public keys｜PGP公鑰 ➡](<178 [01 在] PGP公鑰.md>)
