---
title: "nginx пакеты для Linux｜適用於 Linux 的 nginx 軟體包"
title_original: "nginx пакеты для Linux"
source: "https://nginx.org/ru/linux_packages.html"
chapter: ["ru"]
order: 327
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-29T09:42:34.204Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx](<326 [02 ru] nginx.md>)　｜　[下一篇：Index of download｜下載索引 ➡](<328 下載索引.md>)

# nginx пакеты для Linux｜適用於 Linux 的 nginx 軟體包

> 章節：[ru](<000 目錄.md#c-9>)

## nginx: пакеты для Linux｜nginx：Linux 軟體包

|   |
| --- |
| [Поддерживаемые дистрибутивы и версии](#distributions)<br>[Инструкции по установке](#instructions)<br>     [RHEL и производные](#RHEL)<br>     [Debian](#Debian)<br>     [Ubuntu](#Ubuntu)<br>     [SLES](#SLES)<br>     [Alpine](#Alpine)<br>     [Amazon Linux](#Amazon-Linux)<br>[Пакеты с исходным кодом](#sourcepackages)<br>[Динамические модули](#dynmodules)<br>[Подписи](#signatures)<br>[支援的發行版和版本](#distributions)<br> [安裝說明](#instructions)<br> [ RHEL及其衍生版本](#RHEL)<br> [Debian](#Debian)<br> [Ubuntu](#Ubuntu)<br> SLES (https://nginx.org/ru/linux_packages.html#SLES)<br> [Alpine](#Alpine)<br> [Amazon Linux](#Amazon-Linux)<br> [原始碼套件](#sourcepackages)<br> [動態模組](#dynmodules)<br> [簽章](#signatures) |

#### Поддерживаемые дистрибутивы и версии｜支援的發行版和版本

Пакеты nginx доступны для следующих дистрибутивов Linux и их версий:

Nginx軟體套件適用於以下Linux發行版和版本：

[RHEL и производные](#RHEL)

[RHEL及其衍生物](#RHEL)

> |   |   |
> | --- | --- |
> | Версия<br>版本 | Поддерживаемые платформы<br>支援的平台 |
> | 8.x | x86\_64, aarch64/arm64 |
> | 9.x | x86\_64, aarch64/arm64 |
> | 10.x | x86\_64, aarch64/arm64 |

[Debian](#Debian)

[Debian](#Debian)

> |   |   |
> | --- | --- |
> | Версия<br>版本 | Поддерживаемые платформы<br>支援的平台 |
> | 11.x “bullseye” | x86\_64, aarch64/arm64 |
> | 12.x “bookworm”<br>12.x 「書蟲」 | x86\_64, aarch64/arm64 |
> | 13.x “trixie” | x86\_64, aarch64/arm64 |

[Ubuntu](#Ubuntu)

[Ubuntu](#Ubuntu)

> |   |   |
> | --- | --- |
> | Версия<br>版本 | Поддерживаемые платформы<br>支援的平台 |
> | 22.04 “jammy” | x86\_64, aarch64/arm64 |
> | 24.04 “noble”<br>24.04 「高貴的」 | x86\_64, aarch64/arm64 |
> | 26.04 “resolute”<br>26.04 「堅定的」 | x86\_64, aarch64/arm64 |

[SLES](#SLES)

> |   |   |
> | --- | --- |
> | Версия<br>版本 | Поддерживаемые платформы<br>支援的平台 |
> | 15 SP6+ | x86\_64 |
> | 16 | x86\_64, aarch64/arm64 |

[Alpine](#Alpine)

[Alpine](#Alpine)

> |   |   |
> | --- | --- |
> | Версия<br>版本 | Поддерживаемые платформы<br>支援的平台 |
> | 3.21 | x86\_64, aarch64/arm64 |
> | 3.22 | x86\_64, aarch64/arm64 |
> | 3.23 | x86\_64, aarch64/arm64 |
> | 3.24 | x86\_64, aarch64/arm64 |

[Amazon Linux](#Amazon-Linux)

[Amazon Linux](#Amazon-Linux)

> |   |   |
> | --- | --- |
> | Версия<br>版本 | Поддерживаемые платформы<br>支援的平台 |
> | 2023 | x86\_64, aarch64/arm64 |

#### Инструкции по установке｜安裝說明

Для того, чтобы поставить nginx на новой машине, необходимо подключить и настроить репозиторий пакетов nginx. После этого можно будет установить и обновлять nginx из этого репозитория.

要在新機器上安裝 nginx，您需要啟用並設定 nginx 軟體套件倉庫。之後，您就可以從該倉庫安裝並更新 nginx 了。

#### RHEL и производные｜RHEL及其衍生物

Эта секция применима к Red Hat Enterprise Linux и его производным, таким как CentOS, Oracle Linux, Rocky Linux, AlmaLinux.

本節適用於 Red Hat Enterprise Linux 及其衍生版本，例如 CentOS、Oracle Linux、Rocky Linux、AlmaLinux。

Установите пакеты, необходимые для подключения yum-репозитория:

安裝連接 yum 倉庫所需的軟體包：

> ```bash
>
> 『`bash
> sudo yum install yum-utils
> ```

Для подключения yum-репозитория создайте файл с именем `/etc/yum.repos.d/nginx.repo` со следующим содержимым:

若要連接 yum 倉庫，請建立名為`/etc/yum.repos.d/nginx.repo`的文件，並新增以下內容：

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

По умолчанию используется репозиторий для стабильной версии nginx. Если предпочтительно использовать пакеты для основной версии nginx, выполните следующую команду:

預設情況下，系統會使用 nginx 穩定版本的軟體倉庫。如果您希望使用 nginx 主版本的軟體包，請執行以下命令：

> ```bash
>
> 『`bash
> sudo yum-config-manager --enable nginx-mainline
> ```

Чтобы установить nginx, выполните следующую команду:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo yum install nginx
> ```

При запросе подтверждения GPG-ключа проверьте, что отпечаток ключа совпадает с `573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`, и, если это так, подтвердите его.

當提示確認GPG鍵時，檢查該鍵的指紋是否與`573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`匹配，如果匹配，則確認該鍵。

#### Debian

Установите пакеты, необходимые для подключения apt-репозитория:

安裝連接 apt 軟體倉庫所需的軟體包：

> ```bash
>
> 『`bash
> sudo apt install curl gnupg2 ca-certificates lsb-release debian-archive-keyring
> ```

Теперь нужно импортировать официальный ключ, используемый apt для проверки подлинности пакетов. Скачайте ключ:

現在您需要匯入 apt 用於驗證軟體包真偽的官方金鑰。下載金鑰：

> ```bash
>
> 『`bash
> curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
>     | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
> ```

Проверьте, верный ли ключ был загружен:

檢查是否下載了正確的金鑰：

> ```
> gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
> ```

Вывод команды должен содержать полный отпечаток ключа `573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62`:

指令輸出應包含`573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62`鍵的完整指紋：

> ```
> pub   rsa2048 2011-08-19 [SC] [expires: 2027-05-24]
>
> pub rsa2048 2011-08-19 [ SC ] [過期時間：2027-05-24]
>       573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
> uid                      nginx signing key <signing-key@nginx.com>
>
> uid nginx 簽章金鑰<signing-key@nginx.com>
> ```

Вывод команды может содержать и другие ключи, используемые для подписи пакетов.

命令輸出可能包含用於簽署軟體包的其他密鑰。

Для подключения apt-репозитория для стабильной версии nginx, выполните следующую команду:

若要連接 nginx 穩定版的 apt 軟體來源，請執行下列指令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> https://nginx.org/packages/debian `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```

Если предпочтительно использовать пакеты для основной версии nginx, выполните следующую команду вместо предыдущей:

如果您希望使用 nginx 主版本的軟體包，請執行以下命令，而不是先前的命令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> https://nginx.org/packages/mainline/debian `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```

Для использования пакетов из нашего репозитория вместо распространяемых в дистрибутиве, настройте закрепление:

若要使用我們倉庫中的軟體包而不是發行版提供的軟體包，請設定版本鎖定：

> ```
> echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
>     | sudo tee /etc/apt/preferences.d/99nginx
> ```

Чтобы установить nginx, выполните следующие команды:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo apt update
> sudo apt install nginx
> ```

#### Ubuntu

Установите пакеты, необходимые для подключения apt-репозитория:

安裝連接 apt 軟體倉庫所需的軟體包：

> ```bash
>
> 『`bash
> sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
> ```

Теперь нужно импортировать официальный ключ, используемый apt для проверки подлинности пакетов. Скачайте ключ:

現在您需要匯入 apt 用於驗證軟體包真偽的官方金鑰。下載金鑰：

> ```bash
>
> 『`bash
> curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
>     | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
> ```

Проверьте, верный ли ключ был загружен:

檢查是否下載了正確的金鑰：

> ```
> gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
> ```

Вывод команды должен содержать полный отпечаток ключа `573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62`:

指令輸出應包含`573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62`鍵的完整指紋：

> ```
> pub   rsa2048 2011-08-19 [SC] [expires: 2027-05-24]
>
> pub rsa2048 2011-08-19 [ SC ] [過期時間：2027-05-24]
>       573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
> uid                      nginx signing key <signing-key@nginx.com>
>
> uid nginx 簽章金鑰<signing-key@nginx.com>
> ```

Вывод команды может содержать и другие ключи, используемые для подписи пакетов.

命令輸出可能包含用於簽署軟體包的其他密鑰。

Для подключения apt-репозитория для стабильной версии nginx, выполните следующую команду:

若要連接 nginx 穩定版的 apt 軟體來源，請執行下列指令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> https://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```

Если предпочтительно использовать пакеты для основной версии nginx, выполните следующую команду вместо предыдущей:

如果您希望使用 nginx 主版本的軟體包，請執行以下命令，而不是先前的命令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> https://nginx.org/packages/mainline/ubuntu `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```

Для использования пакетов из нашего репозитория вместо распространяемых в дистрибутиве, настройте закрепление:

若要使用我們倉庫中的軟體包而不是發行版提供的軟體包，請設定版本鎖定：

> ```
> echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
>     | sudo tee /etc/apt/preferences.d/99nginx
> ```

Чтобы установить nginx, выполните следующие команды:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo apt update
> sudo apt install nginx
> ```

#### SLES

Установите пакеты, необходимые для подключения zypper-репозитория:

安裝連接 zypper 倉庫所需的軟體包：

> ```bash
>
> 『`bash
> sudo zypper install curl ca-certificates gpg2
> ```

Для подключения zypper-репозитория для стабильной версии nginx, выполните следующую команду:

若要連接 zypper 倉庫以安裝穩定版 nginx，請執行下列指令：

> ```bash
>
> 『`bash
> sudo zypper addrepo --gpgcheck --type yum --refresh --check \
>     'https://nginx.org/packages/sles/$releasever_major' nginx-stable
>
>     ' https://nginx.org/packages/sles/$releasever_major' nginx-stable
> ```

Если предпочтительно использовать пакеты для основной версии nginx, выполните следующую команду вместо предыдущей:

如果您希望使用 nginx 主版本的軟體包，請執行以下命令，而不是先前的命令：

> ```bash
>
> 『`bash
> sudo zypper addrepo --gpgcheck --type yum --refresh --check \
>     'https://nginx.org/packages/mainline/sles/$releasever_major' nginx-mainline
>
>     ' https://nginx.org/packages/mainline/sles/$releasever_major' nginx-mainline
> ```

Теперь нужно импортировать официальный ключ, используемый zypper/rpm для проверки подлинности пакетов. Скачайте ключ:

現在您需要匯入 zypper/rpm 用於驗證軟體包真偽的官方金鑰。下載金鑰：

> ```bash
>
> 『`bash
> curl -o /tmp/nginx_signing.key https://nginx.org/keys/nginx_signing.key
> ```

Проверьте, верный ли ключ был загружен:

檢查是否下載了正確的金鑰：

> ```
> gpg --with-fingerprint /tmp/nginx_signing.key
> ```

Вывод команды должен содержать полный отпечаток ключа `573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`:

指令輸出應包含`573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`鍵的完整指紋：

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

Импортируйте ключ в базу данных rpm:

將金鑰導入rpm資料庫：

> ```bash
>
> 『`bash
> sudo rpmkeys --import /tmp/nginx_signing.key
> ```

Чтобы установить nginx, выполните следующую команду:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo zypper install nginx
> ```

#### Alpine｜高山

Установите пакеты, необходимые для подключения apk-репозитория:

安裝連接 APK 儲存庫所需的軟體包：

> ```bash
>
> 『`bash
> sudo apk add openssl curl ca-certificates
> ```

Для подключения apk-репозитория для стабильной версии nginx, выполните следующую команду:

若要連接 nginx 穩定版的 APK 倉庫，請執行下列指令：

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

Если предпочтительно использовать пакеты для основной версии nginx, выполните следующую команду вместо предыдущей:

如果您希望使用 nginx 主版本的軟體包，請執行以下命令，而不是先前的命令：

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

Теперь нужно импортировать официальный ключ, используемый apk для проверки подлинности пакетов. Скачайте ключ:

現在您需要匯入 APK 用於驗證軟體包真偽的官方金鑰。下載金鑰：

> ```bash
>
> 『`bash
> curl -o /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub
> ```

Проверьте, верный ли ключ был загружен:

檢查是否下載了正確的金鑰：

> ```
> openssl rsa -pubin -in /tmp/nginx_signing.rsa.pub -text -noout
> ```

Вывод команды должен содержать следующий модуль:

命令輸出應包含以下模組：

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

Переместите ключ в каталог доверенных ключей apk:

將金鑰移至 APK 的受信任金鑰目錄：

> ```bash
>
> 『`bash
> sudo mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/
> ```

Чтобы установить nginx, выполните следующую команду:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo apk add nginx@nginx
> ```

Тэг `@nginx` должен быть указан и при установке пакетов с [динамическими модулями](#dynmodules):

安裝帶有 [動態模組](#dynmodules)的軟體包時，也必須指定`@nginx`標籤：

> ```bash
>
> 『`bash
> sudo apk add nginx-module-image-filter@nginx nginx-module-njs@nginx
> ```

#### Amazon Linux

Установите пакеты, необходимые для подключения yum-репозитория:

安裝連接 yum 倉庫所需的軟體包：

> ```bash
>
> 『`bash
> sudo yum install yum-utils
> ```

Для подключения yum-репозитория для Amazon Linux 2 создайте файл с именем `/etc/yum.repos.d/nginx.repo` со следующим содержимым:

若要為 Amazon Linux 2 啟用 yum 儲存庫，請建立名為`/etc/yum.repos.d/nginx.repo`的文件，並新增以下內容：

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

Для подключения yum-репозитория для Amazon Linux 2023 создайте файл с именем `/etc/yum.repos.d/nginx.repo` со следующим содержимым:

若要啟用 Amazon Linux 2023 yum 儲存庫，請建立名為`/etc/yum.repos.d/nginx.repo`的文件，並新增以下內容：

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

По умолчанию используется репозиторий для стабильной версии nginx. Если предпочтительно использовать пакеты для основной версии nginx, выполните следующую команду:

預設情況下，系統會使用 nginx 穩定版本的軟體倉庫。如果您希望使用 nginx 主版本的軟體包，請執行以下命令：

> ```bash
>
> 『`bash
> sudo yum-config-manager --enable nginx-mainline
> ```

Чтобы установить nginx, выполните следующую команду:

若要安裝nginx，請執行以下命令：

> ```bash
>
> 『`bash
> sudo yum install nginx
> ```

При запросе подтверждения GPG-ключа проверьте, что отпечаток ключа совпадает с `573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`, и, если это так, подтвердите его.

當提示確認GPG金鑰時，檢查金鑰指紋是否與`573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62`金鑰匹配，如果匹配，則確認。

#### Пакеты с исходным кодом｜原始碼包

Исходные коды пакетов находятся в соответствующем [репозитории](https://github.com/nginx/pkg-oss).

這些軟體包的源代碼位於對應的(https://github.com/nginx/pkg-oss)存儲庫中。

Ветка репозитория `master` содержит исходные коды пакетов для mainline-версии, в то время как ветки `stable-*` содержат исходные коды пакетов для стабильных релизов. Для сборки бинарных пакетов запустите `make` в каталоге `debian/` для Debian/Ubuntu, или в каталоге `rpm/SPECS/` для RHEL и производных, SLES, и Amazon Linux, или в каталоге `alpine/` для Alpine.

`master`倉庫分支包含主線版本的原始碼包，而`stable-*`分支包含穩定版本的原始碼包。要建置`alpine/`進位包，請在 Debian/Ubuntu 的`debian/`目錄中運行`make` ，或在`rpm/SPECS/`及其衍生版本、 RHEL和 Amazon Linux 的SLES目錄中運行，或在 Al目錄中運行。

Исходные коды пакетов распространяются под той же [BSD-подобной лицензией из 2 пунктов](<354 頁.md>), что и сам nginx.

這些軟體包的源代碼以與 nginx 本身相同的 [BSD -like 2-clause](<354 頁.md>)許可證分發。

#### Динамические модули｜動態模組

Для того чтобы избежать увеличения числа зависимостей, основной пакет nginx не включает модули, которым требуются дополнительные библиотеки. Начиная с версии 1.9.11 nginx поддерживает [динамические модули](<285 [02.01 文件] 基本功能.md#load_module>), и следующие модули собираются как динамические и поставляются в виде отдельных пакетов:

為了避免增加相依性數量，核心 nginx 軟體包不包含需要額外函式庫的模組。從版本1.9.11 nginx 支援動態模組(https://nginx.org/ru/docs/ngx_core_module.html#load_module) ，以下模組以動態模組的形式建構並作為單獨的軟體包發布：

> ```
> nginx-module-geoip
> nginx-module-image-filter
> nginx-module-njs
>
> nginx-module-etc
> nginx-module-perl
> nginx-module-xslt
> ```

В дополнение к этому, начиная с версии 1.25.3 следующий модуль поставляется в виде отдельного пакета:

此外，從版本1.25.3開始，以下模組將作為單獨的軟體包提供：

> ```
> nginx-module-otel
>
> nginx-module-hotel
> ```

В дополнение к этому, начиная с версии 1.29.1 следующий модуль поставляется в виде отдельного пакета:

此外，從版本1.29.1開始，以下模組將作為單獨的軟體包提供：

> ```
> nginx-module-acme
> ```

#### Подписи｜簽名

Поскольку наши [PGP-ключи](<178 [01 在] PGP公鑰.md>) находятся на том же сервере, что и пакеты, им следует доверять в равной степени. Поэтому мы настоятельно рекомендуем дополнительно проверить подлинность загруженных PGP-ключей. В PGP есть понятие “сети доверия”, когда ключ подписывается чьим-либо другим ключом, тот в свою очередь третьим, и т.д. Это зачастую позволяет построить цепочку от произвольного ключа до ключа человека, которого вы знаете и кому доверяете лично, и таким образом удостовериться в подлинности первого ключа в цепочке. Подробно эта концепция описана в [GPG Mini Howto](https://www.gnupg.org/howtos/en/GPGMiniHowto-1.html). У наших ключей есть достаточное количество подписей, поэтому проверить их подлинность относительно несложно.

由於我們的 [PGP-keys](<178 [01 在] PGP公鑰.md>) 與軟體包位於同一伺服器上，因此它們應該受到同等信任。因此，我們強烈建議您額外檢查下載的PGP金鑰的真實性。在PGP中有一個「信任網路」的概念，其中金鑰由其他人的金鑰簽名，而其他人的金鑰又由第三方簽名，依此類推。這通常允許您從隨機密鑰到您認識並親自信任的人的密鑰建立一條鏈，從而驗證鏈中第一個密鑰的真實性。這個概念在[GPG Mini Howto](https://www.gnupg.org/howtos/en/GPGMiniHowto-1.html)中有詳細描述。我們的金鑰有足夠數量的簽名，因此驗證其真實性相對容易。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx](<326 [02 ru] nginx.md>)　｜　[下一篇：Index of download｜下載索引 ➡](<328 下載索引.md>)
