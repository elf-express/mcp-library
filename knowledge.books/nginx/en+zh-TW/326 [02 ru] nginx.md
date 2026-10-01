---
title: "nginx"
source: "https://nginx.org/ru/index.html"
chapter: ["ru"]
order: 326
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-29T09:42:33.190Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx компания｜nginx公司](<325 [02 ru] nginx公司.md>)　｜　[下一篇：nginx пакеты для Linux｜適用於 Linux 的 nginx 軟體包 ➡](<327 [02 ru] 適用於 Linux 的 nginx 軟體包.md>)

# nginx

> 章節：[ru](<000 目錄.md#c-9>)

## nginx

|   |
| --- |
| [Основная функциональность HTTP-сервера](#basic_http_features)<br>[Другие возможности HTTP-сервера](#other_http_features)<br>[Функциональность почтового прокси-сервера](#mail_proxy_server_features)<br>[Функциональность TCP/UDP прокси-сервера](#generic_proxy_server_features)<br>[Архитектура и масштабируемость](#architecture_and_scalability)<br>[Протестированные ОС и платформы](#tested_os_and_platforms)<br>[基本功能]HTTP-伺服器](https://nginx.org/ru/index.html#basic_http_features)<br>其他選項 HTTP-伺服器](https://nginx.org/ru/index.html#other_http_features)<br>【郵件代理伺服器功能】(https://nginx.org/ru/index.html#mail_proxy_server_features)<br>功能性 TCP/UDP 代理伺服器(https://nginx.org/ru/index.html#generic_proxy_server_features)<br>【架構與可擴展性】(https://nginx.org/ru/index.html#architecture_and_scalability)<br>[已測試的作業系統和平台](#tested_os_and_platforms) |

nginx ("*engine x*") — это HTTP-сервер, обратный прокси сервер с поддержкой кеширования и балансировки нагрузки, TCP/UDP прокси-сервер, а также почтовый прокси-сервер. Изначально разработан [Игорем Сысоевым](http://sysoev.ru/) и распространяется под [лицензией BSD из 2 пунктов](<354 頁.md>).

nginx（「*engine x*」）是一個HTTP伺服器，一個支援快取和負載平衡的反向代理，一個TCP/UDP代理伺服器，以及一個郵件代理伺服器。最初由[Igor Sysoev](http://sysoev.ru/)開發，並根據[BSD 2條款許可證](<354 頁.md>)分發。

nginx известен своей исключительной гибкостью, высокой производительностью и минимальным потреблением ресурсов. Он также:

nginx 以其卓越的靈活性、高效能和極低的資源消耗而聞名。它還具有以下特點：

-   самый популярный веб-сервер в мире \[[Netcraft](https://news.netcraft.com/archives/category/web-server-survey/)\];  
    世界上最受歡迎的網頁伺服器 \[[Netcraft](https://news.netcraft.com/archives/category/web-server-survey/) \];
-   один из самых востребованных [Docker-образов](https://hub.docker.com/search?q=nginx) \[[DataDog](https://www.datadoghq.com/docker-adoption/#six)\];  
    最受歡迎的 [Docker 映像](https://hub.docker.com/search?q=nginx) \[[DataDog](https://www.datadoghq.com/docker-adoption/#six) \];
-   активно используется в [Ingress-контроллерах для Kubernetes](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/), включая [наш собственный](https://github.com/nginxinc/kubernetes-ingress).  
    它被積極用於 [Kubernetes 的 Ingress 控制器](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) ，包括 [我們自己的](https://github.com/nginxinc/kubernetes-ingress) 。

Корпоративное распространение, коммерческая поддержка и тренинги осуществляются компанией [F5, Inc.](<325 [02 ru] nginx公司.md>)

企業分銷、商業支援和培訓由 [F5, Inc. 提供](<325 [02 ru] nginx公司.md>)

#### Основная функциональность HTTP-сервера｜HTTP伺服器的主要功能

-   Обслуживание статических запросов, [индексных файлов](<236 [02.01.01 http] 模組 ngx_http_index_module.md>), [автоматическое создание списка файлов](<218 [02.01.01 http] ngx_http_autoindex_module 模組.md>), [кэш дескрипторов открытых файлов](<221 [02.01.01 http] 模組 ngx_http_core_module.md#open_file_cache>);  
    處理靜態查詢、[索引檔案](<236 [02.01.01 http] 模組 ngx_http_index_module.md>) 、[自動建立檔案清單](<218 [02.01.01 http] ngx_http_autoindex_module 模組.md>) 、[開啟檔案描述子快取](<221 [02.01.01 http] 模組 ngx_http_core_module.md#open_file_cache>) ；
-   [Акселерированное обратное проксирование с кэшированием](<248 [02.01.01 http] ngx_http_proxy_module 模組.md>), [распределение нагрузки и отказоустойчивость](<266 [02.01.01 http] ngx_http_upstream_module 模組.md>);  
    [帶快取的加速反向代理](<248 [02.01.01 http] ngx_http_proxy_module 模組.md>) ，[負載平衡與容錯](<266 [02.01.01 http] ngx_http_upstream_module 模組.md>) ；
-   Акселерированная поддержка [FastCGI](<225 [02.01.01 http] ngx_http_fastcgi_module 模組.md>), [uwsgi](<268 [02.01.01 http] 模組 ngx_http_uwsgi_module.md>), [SCGI](<254 [02.01.01 http] 模組 ngx_http_scgi_module.md>) и [memcached](<244 [02.01.01 http] ngx_http_memcached_module 模組.md>) серверов с кэшированием, [распределение нагрузки и отказоустойчивость](<266 [02.01.01 http] ngx_http_upstream_module 模組.md>);  
    加速支援 [FastCGI](<225 [02.01.01 http] ngx_http_fastcgi_module 模組.md>) , [uwsgi](<268 [02.01.01 http] 模組 ngx_http_uwsgi_module.md>) , [SCGI](<254 [02.01.01 http] 模組 ngx_http_scgi_module.md>)和 [memcached](<244 [02.01.01 http] ngx_http_memcached_module 模組.md>)伺服器的快取、[負載平衡和容錯](<266 [02.01.01 http] ngx_http_upstream_module 模組.md>) ;
-   Модульность, фильтры, в том числе [сжатие (gzip)](<231 [02.01.01 http] 模組 ngx_http_gzip_module.md>), byte-ranges (докачка), chunked ответы, [XSLT-фильтр](<271 [02.01.01 http] 模組 ngx_http_xslt_module.md>), [SSI-фильтр](<259 [02.01.01 http] 模組 ngx_http_ssi_module.md>), [преобразование изображений](<235 [02.01.01 http] 模組 ngx_http_image_filter_module.md>); несколько подзапросов на одной странице, обрабатываемые в SSI-фильтре через прокси или FastCGI/uwsgi/SCGI, выполняются параллельно;  
    模組化、過濾器包括 [壓縮 (gzip)](<231 [02.01.01 http] 模組 ngx_http_gzip_module.md>) 、位元組範圍（恢復下載）、 (https://nginx.org/ru/docs/http/ngx_http_ssi_module.html) XSLT (https://nginx.org/ru/docs/http/ngx_http_xslt_module.html) SSI -過濾器](https://nginx.org/ru/docs/http/ngx_http_image_filter_module.html) ；單一頁面上的多個子請求，透過代理程式或 FastCGI/uwsgi/ SCGI在SSI -過濾器中處理，並行執行；
-   [Поддержка SSL и расширения TLS SNI](<260 [02.01.01 http] 模組 ngx_http_ssl_module.md>);  
    [支持SSL和TLS SNI擴展](<260 [02.01.01 http] 模組 ngx_http_ssl_module.md>) ；
-   Поддержка [HTTP/2](<269 [02.01.01 http] 模組 ngx_http_v2_module.md>) с приоритизацией на основе весов и зависимостей;  
    支援 [HTTP /2](<269 [02.01.01 http] 模組 ngx_http_v2_module.md>) ，並根據權重和依賴關係進行優先排序；
-   Поддержка [HTTP/3](<270 [02.01.01 http] ngx_http_v3_module 模組.md>).  
    支持 [HTTP /3](<270 [02.01.01 http] ngx_http_v3_module 模組.md>) 。

#### Другие возможности HTTP-сервера｜HTTP伺服器的其他功能

-   [Виртуальные серверы](<272 [02.01.01 http] nginx 如何處理請求.md>), определяемые по IP-адресу и имени;  
    [虛擬伺服器](<272 [02.01.01 http] nginx 如何處理請求.md>) ，由IP位址及名稱標識；
-   Поддержка [keep-alive](<221 [02.01.01 http] 模組 ngx_http_core_module.md#keepalive_timeout>) и pipelined соединений;  
    支援 [keep-alive](<221 [02.01.01 http] 模組 ngx_http_core_module.md#keepalive_timeout>)和流水線連接；
-   [Настройка форматов логов](<242 [02.01.01 http] 模組 ngx_http_log_module.md#log_format>), [буферизованная запись в лог](<242 [02.01.01 http] 模組 ngx_http_log_module.md#access_log>), [быстрая ротация логов](<204 [02.01 文件] nginx 管理.md#logs>), [запись в syslog](<321 [02.01 文件] 寫入系統日誌.md>);  
    [設定日誌格式](<242 [02.01.01 http] 模組 ngx_http_log_module.md#log_format>) , [緩衝日誌](<242 [02.01.01 http] 模組 ngx_http_log_module.md#access_log>) , [快速日誌輪替](<204 [02.01 文件] nginx 管理.md#logs>) , [寫入系統日誌](<321 [02.01 文件] 寫入系統日誌.md>) ;
-   [Специальные страницы](<221 [02.01.01 http] 模組 ngx_http_core_module.md#error_page>) для ошибок 3xx-5xx;  
    [特殊頁](<221 [02.01.01 http] 模組 ngx_http_core_module.md#error_page>)用於錯誤 3xx-5xx；
-   rewrite-модуль: [изменение URI с помощью регулярных выражений](<253 [02.01.01 http] ngx_http_rewrite_module 模組.md>);  
    重寫模組：[使用正規表示式修改URI](<253 [02.01.01 http] ngx_http_rewrite_module 模組.md>) ；
-   [Выполнение разных функций](<253 [02.01.01 http] ngx_http_rewrite_module 模組.md#if>) в зависимости от [адреса клиента](<227 [02.01.01 http] 模組 ngx_http_geo_module.md>);  
    [執行不同功能](<253 [02.01.01 http] ngx_http_rewrite_module 模組.md#if>)根據 [客戶地址](<227 [02.01.01 http] 模組 ngx_http_geo_module.md>) ;
-   Ограничение доступа в зависимости от [адреса клиента](<213 [02.01.01 http] 模組 ngx_http_access_module.md>), [по паролю (HTTP Basic аутентификация)](<215 [02.01.01 http] 模組 ngx_http_auth_basic_module.md>) и по [результату подзапроса](<217 [02.01.01 http] ngx_http_auth_request_module 模組.md>);  
    根據[客戶端位址](<213 [02.01.01 http] 模組 ngx_http_access_module.md>) 、[透過密碼（ HTTP基本驗證）](<215 [02.01.01 http] 模組 ngx_http_auth_basic_module.md>)和[子查詢結果](<217 [02.01.01 http] ngx_http_auth_request_module 模組.md>)進行存取限制；
-   Проверка [HTTP referer](<252 [02.01.01 http] ngx_http_referer_module 模組.md>);  
    檢查 [HTTP引用](<252 [02.01.01 http] ngx_http_referer_module 模組.md>) ;
-   [Методы PUT, DELETE, MKCOL, COPY и MOVE](<222 [02.01.01 http] ngx_http_dav_module 模組.md>);  
    [方法PUT, DELETE, MKCOL, COPY和MOVE](<222 [02.01.01 http] ngx_http_dav_module 模組.md>) ;
-   [FLV](<226 [02.01.01 http] ngx_http_flv_module 模組.md>) и [MP4](<246 [02.01.01 http] ngx_http_mp4_module 模組.md>) стриминг;  
    [FLV](<226 [02.01.01 http] ngx_http_flv_module 模組.md>)和 [MP4](<246 [02.01.01 http] ngx_http_mp4_module 模組.md>)流媒體；
-   [Ограничение скорости отдачи ответов](<221 [02.01.01 http] 模組 ngx_http_core_module.md#limit_rate>);  
    [響應速率限制](<221 [02.01.01 http] 模組 ngx_http_core_module.md#limit_rate>) ;
-   Ограничение числа одновременных [соединений](<239 [02.01.01 http] 模組 ngx_http_limit_conn_module.md>) и [запросов](<240 [02.01.01 http] ngx_http_limit_req_module 模組.md>) с одного адреса;  
    限制來自同一位址的並發連線數(https://nginx.org/ru/docs/http/ngx_http_limit_conn_module.html)和請求數(https://nginx.org/ru/docs/http/ngx_http_limit_req_module.html) ；
-   [Геолокация по IP-адресу](<228 [02.01.01 http] 模組 ngx_http_geoip_module.md>);  
    [透過IP地址進行地理位置定位](<228 [02.01.01 http] 模組 ngx_http_geoip_module.md>) ;
-   [A/B-тестирование](<258 [02.01.01 http] 模組 ngx_http_split_clients_module.md>);  
    [A/B 測試](<258 [02.01.01 http] 模組 ngx_http_split_clients_module.md>) ;
-   [Зеркалирование запросов](<245 [02.01.01 http] ngx_http_mirror_module 模組.md>);  
    [請求鏡像](<245 [02.01.01 http] ngx_http_mirror_module 模組.md>) ;
-   Встроенный [Perl](<247 [02.01.01 http] ngx_http_perl_module 模組.md>);  
    內建 [Perl](<247 [02.01.01 http] ngx_http_perl_module 模組.md>) ;
-   сценарный язык [njs](<290 [02.01.03 紐澤西州] 模組 nginx JavaScript.md>).  
    腳本語言 [njs](<290 [02.01.03 紐澤西州] 模組 nginx JavaScript.md>) .

#### Функциональность почтового прокси-сервера｜郵件代理伺服器功能

-   Перенаправление пользователя на [IMAP](<279 [02.01.02 郵件] 模組 ngx_mail_imap_module.md>)\- или [POP3](<280 [02.01.02 郵件] ngx_mail_pop3_module 模組.md>)\-сервер с использованием внешнего HTTP-сервера [аутентификации](<277 [02.01.02 郵件] ngx_mail_auth_http_module 模組.md>);  
    使用外部HTTP [驗證](<277 [02.01.02 郵件] ngx_mail_auth_http_module 模組.md>)伺服器將使用者重新導向至 [IMAP](<279 [02.01.02 郵件] 模組 ngx_mail_imap_module.md>) \- 或 [POP3](<280 [02.01.02 郵件] ngx_mail_pop3_module 模組.md>) \- 伺服器；
-   Проверка пользователя с помощью внешнего HTTP-сервера [аутентификации](<277 [02.01.02 郵件] ngx_mail_auth_http_module 模組.md>) и перенаправление соединения на внутренний [SMTP](<283 [02.01.02 郵件] 模組 ngx_mail_smtp_module.md>)\-сервер;  
    使用外部HTTP [身份驗證](<277 [02.01.02 郵件] ngx_mail_auth_http_module 模組.md>)伺服器驗證用戶，並將連線重定向到內部 [SMTP](<283 [02.01.02 郵件] 模組 ngx_mail_smtp_module.md>)伺服器；
-   Методы аутентификации:  
    身份驗證方法：
    -   [POP3](<280 [02.01.02 郵件] ngx_mail_pop3_module 模組.md#pop3_auth>): USER/PASS, APOP, AUTH LOGIN/PLAIN/CRAM-MD5;
    -   [IMAP](<279 [02.01.02 郵件] 模組 ngx_mail_imap_module.md#imap_auth>): LOGIN, AUTH LOGIN/PLAIN/CRAM-MD5;
    -   [SMTP](<283 [02.01.02 郵件] 模組 ngx_mail_smtp_module.md#smtp_auth>): AUTH LOGIN/PLAIN/CRAM-MD5;
-   Поддержка [SSL](<284 [02.01.02 郵件] 模組 ngx_mail_ssl_module.md>);  
    支持 [SSL](<284 [02.01.02 郵件] 模組 ngx_mail_ssl_module.md>) ;
-   Поддержка [STARTTLS и STLS](<284 [02.01.02 郵件] 模組 ngx_mail_ssl_module.md#starttls>).  
    支持 [STARTTLS和STLS](<284 [02.01.02 郵件] 模組 ngx_mail_ssl_module.md#starttls>) 。

#### Функциональность TCP/UDP прокси-сервера｜代理伺服器TCP/UDP功能

-   [Проксирование TCP и UDP;](<307 [02.01.04 溪流] 模組 ngx_stream_proxy_module.md>)  
    [代理TCP和UDP ;](<307 [02.01.04 溪流] 模組 ngx_stream_proxy_module.md>)
-   Поддержка [SSL](<313 [02.01.04 溪流] 模組 ngx_stream_ssl_module.md>) и расширения TLS [SNI](<314 [02.01.04 溪流] ngx_stream_ssl_preread_module 模組.md>) для TCP;  
    支持 [SSL](<313 [02.01.04 溪流] 模組 ngx_stream_ssl_module.md>)和TLS [SNI](<314 [02.01.04 溪流] ngx_stream_ssl_preread_module 模組.md>)擴展，用於TCP ;
-   [Распределение нагрузки и отказоустойчивость](<316 [02.01.04 溪流] 模組 ngx_stream_upstream_module.md>);  
    [負載分擔與容錯](<316 [02.01.04 溪流] 模組 ngx_stream_upstream_module.md>) ;
-   Ограничение доступа в зависимости от [адреса клиента](<296 [02.01.04 溪流] ngx_stream_access_module 模組.md>);  
    基於[客戶端位址的存取限制](<296 [02.01.04 溪流] ngx_stream_access_module 模組.md>) ；
-   Выполнение разных функций в зависимости от [адреса клиента](<227 [02.01.01 http] 模組 ngx_http_geo_module.md>);  
    根據[客戶地址](<227 [02.01.01 http] 模組 ngx_http_geo_module.md>)執行不同的功能；
-   Ограничение числа одновременных [соединений](<301 [02.01.04 溪流] ngx_stream_limit_conn_module 模組.md>) с одного адреса;  
    限制來自同一位址的並發連接數(https://nginx.org/ru/docs/stream/ngx_stream_limit_conn_module.html) ；
-   [Настройка форматов логов](<302 [02.01.04 溪流] 模組 ngx_stream_log_module.md#log_format>), [буферизованная запись в лог](<302 [02.01.04 溪流] 模組 ngx_stream_log_module.md#access_log>), [быстрая ротация логов](<204 [02.01 文件] nginx 管理.md#logs>), [запись в syslog](<321 [02.01 文件] 寫入系統日誌.md>);  
    [設定日誌格式](<302 [02.01.04 溪流] 模組 ngx_stream_log_module.md#log_format>) , [緩衝日誌](<302 [02.01.04 溪流] 模組 ngx_stream_log_module.md#access_log>) , [快速日誌輪替](<204 [02.01 文件] nginx 管理.md#logs>) , [記錄到系統日誌](<321 [02.01 文件] 寫入系統日誌.md>) ;
-   [Геолокация по IP-адресу](<299 [02.01.04 溪流] 模組 ngx_stream_geoip_module.md>);  
    [透過IP地址進行地理位置定位](<299 [02.01.04 溪流] 模組 ngx_stream_geoip_module.md>) ;
-   [A/B-тестирование](<312 [02.01.04 溪流] ngx_stream_split_clients_module 模組.md>);  
    [A/B 測試](<312 [02.01.04 溪流] ngx_stream_split_clients_module 模組.md>) ;
-   сценарный язык [njs](<290 [02.01.03 紐澤西州] 模組 nginx JavaScript.md>).  
    腳本語言 [njs](<290 [02.01.03 紐澤西州] 模組 nginx JavaScript.md>) .

#### Архитектура и масштабируемость｜架構和可擴展性

-   Один главный и несколько рабочих процессов, рабочие процессы работают под непривилегированным пользователем;  
    一個主進程和多個工作進程，工作進程以非特權使用者身分執行；
-   [Гибкость конфигурации](<208 [02.01 文件] nginx 設定範例.md>);  
    [配置靈活性](<208 [02.01 文件] nginx 設定範例.md>) ；
-   [Изменение настроек](<204 [02.01 文件] nginx 管理.md#reconfiguration>) и [обновление исполняемого файла](<204 [02.01 文件] nginx 管理.md#upgrade>) без перерыва в обслуживании клиентов;  
    [更改設定](<204 [02.01 文件] nginx 管理.md#reconfiguration>)和 [更新執行檔](<204 [02.01 文件] nginx 管理.md#upgrade>)不會中斷客戶服務；
-   [Поддержка](<207 [02.01 文件] 化合物加工方法.md>) kqueue (FreeBSD 4.1+), epoll (Linux 2.6+), /dev/poll (Solaris 7 11/99+), event ports (Solaris 10), select и poll;  
    [Поддержка](<207 [02.01 文件] 化合物加工方法.md>) kqueue (FreeBSD 4.1 +), epoll (Linux 2.6 +), /dev/poll (Solaris 7 11/99+), event ports (Sollectse),
-   Использование возможностей, предоставляемых kqueue, таких как EV\_CLEAR, EV\_DISABLE (для временного выключения события), NOTE\_LOWAT, EV\_EOF, число доступных данных, коды ошибок;  
    使用 kqueue 提供的功能，例如EV \_CLEAR、 EV \_DISABLE（暫時停用事件）、 NOTE \_LOWAT、 EV \_EOF、可用資料數量、錯誤代碼；
-   Использование возможностей, предоставляемых epoll, таких как EPOLLRDHUP (Linux 2.6.17+, glibc 2.8+) и EPOLLEXCLUSIVE (Linux 4.5+, glibc 2.24+);  
    使用 epoll 提供的功能，例如 EPOLLRDHUP（Linux 2.6.17 +，glibc 2.8 +）和 EPOLLEXCLUSIVE（Linux 4.5 +，glibc 2.24 +）；
-   Поддержка sendfile (FreeBSD 3.1+, Linux 2.2+, macOS 10.5+), sendfile64 (Linux 2.4.21+) и sendfilev (Solaris 8 7/01+);  
    例如 sendfile（FreeBSD 3.1 +、Linux 2.2 +、macOS 10.5 +）、sendfile64（Linux 2.4.21 +）和 sendfilev（Solaris 87/01+）；
-   Поддержка [файлового AIO](<221 [02.01.01 http] 模組 ngx_http_core_module.md#aio>) (FreeBSD 4.3+, Linux 2.6.22+);  
    支援 [文件AIO](<221 [02.01.01 http] 模組 ngx_http_core_module.md#aio>) (FreeBSD 4.3 +, Linux 2.6.22 +);
-   Поддержка [DIRECTIO](<221 [02.01.01 http] 模組 ngx_http_core_module.md#directio>) (FreeBSD 4.4+, Linux 2.4+, Solaris 2.6+, macOS);  
    支援 [DIRECTIO](<221 [02.01.01 http] 模組 ngx_http_core_module.md#directio>) (FreeBSD 4.4 +, Linux 2.4 +, Solaris 2.6 +, macOS);
-   [Поддержка](<221 [02.01.01 http] 模組 ngx_http_core_module.md#listen>) accept-фильтров (FreeBSD 4.1+, NetBSD 5.0+) и TCP\_DEFER\_ACCEPT (Linux 2.4+);  
    [支援](<221 [02.01.01 http] 模組 ngx_http_core_module.md#listen>)接受過濾器（FreeBSD 4.1 +，NetBSD 5.0 +）和TCP \_DEFER\_ACCEPT（Linux 2.4 +）；
-   На 10 000 неактивных HTTP keep-alive соединений расходуется около 2.5M памяти;  
    10,000 個不活躍的HTTP保持連線消耗約 2.5M 記憶體；
-   Минимум операций копирования данных.  
    最少的資料複製操作。

#### Протестированные ОС и платформы｜已測試的作業系統和平台

-   FreeBSD 3 — 12 / i386; FreeBSD 5 — 12 / amd64; FreeBSD 11 / ppc; FreeBSD 12 / ppc64;  
    FreeBSD 3 — 12 / i386；FreeBSD 5 — 12 / amd64；FreeBSD 11 / ppc；FreeBSD 12 / ppc64；
-   Linux 2.2 — 4 / i386; Linux 2.6 — 5 / amd64; Linux 3 — 4 / armv6l, armv7l, aarch64, ppc64le; Linux 4 — 5 / s390x;  
    Linux 2.2 — 4 / i386；Linux 2.6 — 5 / amd64；Linux 3 — 4 / armv6l、armv7l、aarch64、ppc64le；Linux 4 — 5 / s390x；
-   Solaris 9 / i386, sun4u; Solaris 10 / i386, amd64, sun4v; Solaris 11 / x86;  
    Solaris 9 / i386、sun4u； Solaris 10 / i386、amd64、sun4v； Solaris 11/x86；
-   AIX 7.1 / powerpc;
-   HP-UX 11.31 / ia64;
-   macOS / ppc, i386, x86\_64;  
    macOS / ppc、i386、x86\_64；
-   Windows XP, Windows Server 2003, Windows 7, Windows 10, Windows 11.  
    Windows XP 、Windows Server 2003、Windows 7、Windows 10、Windows 11。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx компания｜nginx公司](<325 [02 ru] nginx公司.md>)　｜　[下一篇：nginx пакеты для Linux｜適用於 Linux 的 nginx 軟體包 ➡](<327 [02 ru] 適用於 Linux 的 nginx 軟體包.md>)
