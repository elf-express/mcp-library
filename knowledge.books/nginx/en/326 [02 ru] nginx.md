---
title: "nginx"
source: "https://nginx.org/ru/index.html"
chapter: ["ru"]
order: 326
lang: "other"
translated_by: "original"
captured: "2026-09-29T09:42:33.190Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx компания](<325 [02 ru] nginx компания.md>)　｜　[下一篇：nginx пакеты для Linux ➡](<327 [02 ru] nginx пакеты для Linux.md>)

# nginx

> 章節：[ru](<000 目錄.md#c-9>)

## nginx

|   |
| --- |
| [Основная функциональность HTTP-сервера](#basic_http_features)<br>[Другие возможности HTTP-сервера](#other_http_features)<br>[Функциональность почтового прокси-сервера](#mail_proxy_server_features)<br>[Функциональность TCP/UDP прокси-сервера](#generic_proxy_server_features)<br>[Архитектура и масштабируемость](#architecture_and_scalability)<br>[Протестированные ОС и платформы](#tested_os_and_platforms) |

nginx ("*engine x*") — это HTTP-сервер, обратный прокси сервер с поддержкой кеширования и балансировки нагрузки, TCP/UDP прокси-сервер, а также почтовый прокси-сервер. Изначально разработан [Игорем Сысоевым](http://sysoev.ru/) и распространяется под [лицензией BSD из 2 пунктов](<354 page.md>).

nginx известен своей исключительной гибкостью, высокой производительностью и минимальным потреблением ресурсов. Он также:

-   самый популярный веб-сервер в мире \[[Netcraft](https://news.netcraft.com/archives/category/web-server-survey/)\];
-   один из самых востребованных [Docker-образов](https://hub.docker.com/search?q=nginx) \[[DataDog](https://www.datadoghq.com/docker-adoption/#six)\];
-   активно используется в [Ingress-контроллерах для Kubernetes](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/), включая [наш собственный](https://github.com/nginxinc/kubernetes-ingress).

Корпоративное распространение, коммерческая поддержка и тренинги осуществляются компанией [F5, Inc.](<325 [02 ru] nginx компания.md>)

#### Основная функциональность HTTP-сервера

-   Обслуживание статических запросов, [индексных файлов](<236 [02.01.01 http] Модуль ngx_http_index_module.md>), [автоматическое создание списка файлов](<218 [02.01.01 http] Модуль ngx_http_autoindex_module.md>), [кэш дескрипторов открытых файлов](<221 [02.01.01 http] Модуль ngx_http_core_module.md#open_file_cache>);
-   [Акселерированное обратное проксирование с кэшированием](<248 [02.01.01 http] Модуль ngx_http_proxy_module.md>), [распределение нагрузки и отказоустойчивость](<266 [02.01.01 http] Модуль ngx_http_upstream_module.md>);
-   Акселерированная поддержка [FastCGI](<225 [02.01.01 http] Модуль ngx_http_fastcgi_module.md>), [uwsgi](<268 [02.01.01 http] Модуль ngx_http_uwsgi_module.md>), [SCGI](<254 [02.01.01 http] Модуль ngx_http_scgi_module.md>) и [memcached](<244 [02.01.01 http] Модуль ngx_http_memcached_module.md>) серверов с кэшированием, [распределение нагрузки и отказоустойчивость](<266 [02.01.01 http] Модуль ngx_http_upstream_module.md>);
-   Модульность, фильтры, в том числе [сжатие (gzip)](<231 [02.01.01 http] Модуль ngx_http_gzip_module.md>), byte-ranges (докачка), chunked ответы, [XSLT-фильтр](<271 [02.01.01 http] Модуль ngx_http_xslt_module.md>), [SSI-фильтр](<259 [02.01.01 http] Модуль ngx_http_ssi_module.md>), [преобразование изображений](<235 [02.01.01 http] Модуль ngx_http_image_filter_module.md>); несколько подзапросов на одной странице, обрабатываемые в SSI-фильтре через прокси или FastCGI/uwsgi/SCGI, выполняются параллельно;
-   [Поддержка SSL и расширения TLS SNI](<260 [02.01.01 http] Модуль ngx_http_ssl_module.md>);
-   Поддержка [HTTP/2](<269 [02.01.01 http] Модуль ngx_http_v2_module.md>) с приоритизацией на основе весов и зависимостей;
-   Поддержка [HTTP/3](<270 [02.01.01 http] Модуль ngx_http_v3_module.md>).

#### Другие возможности HTTP-сервера

-   [Виртуальные серверы](<272 [02.01.01 http] Как nginx обрабатывает запросы.md>), определяемые по IP-адресу и имени;
-   Поддержка [keep-alive](<221 [02.01.01 http] Модуль ngx_http_core_module.md#keepalive_timeout>) и pipelined соединений;
-   [Настройка форматов логов](<242 [02.01.01 http] Модуль ngx_http_log_module.md#log_format>), [буферизованная запись в лог](<242 [02.01.01 http] Модуль ngx_http_log_module.md#access_log>), [быстрая ротация логов](<204 [02.01 docs] Управление nginx.md#logs>), [запись в syslog](<321 [02.01 docs] Запись в syslog.md>);
-   [Специальные страницы](<221 [02.01.01 http] Модуль ngx_http_core_module.md#error_page>) для ошибок 3xx-5xx;
-   rewrite-модуль: [изменение URI с помощью регулярных выражений](<253 [02.01.01 http] Модуль ngx_http_rewrite_module.md>);
-   [Выполнение разных функций](<253 [02.01.01 http] Модуль ngx_http_rewrite_module.md#if>) в зависимости от [адреса клиента](<227 [02.01.01 http] Модуль ngx_http_geo_module.md>);
-   Ограничение доступа в зависимости от [адреса клиента](<213 [02.01.01 http] Модуль ngx_http_access_module.md>), [по паролю (HTTP Basic аутентификация)](<215 [02.01.01 http] Модуль ngx_http_auth_basic_module.md>) и по [результату подзапроса](<217 [02.01.01 http] Модуль ngx_http_auth_request_module.md>);
-   Проверка [HTTP referer](<252 [02.01.01 http] Модуль ngx_http_referer_module.md>);
-   [Методы PUT, DELETE, MKCOL, COPY и MOVE](<222 [02.01.01 http] Модуль ngx_http_dav_module.md>);
-   [FLV](<226 [02.01.01 http] Модуль ngx_http_flv_module.md>) и [MP4](<246 [02.01.01 http] Модуль ngx_http_mp4_module.md>) стриминг;
-   [Ограничение скорости отдачи ответов](<221 [02.01.01 http] Модуль ngx_http_core_module.md#limit_rate>);
-   Ограничение числа одновременных [соединений](<239 [02.01.01 http] Модуль ngx_http_limit_conn_module.md>) и [запросов](<240 [02.01.01 http] Модуль ngx_http_limit_req_module.md>) с одного адреса;
-   [Геолокация по IP-адресу](<228 [02.01.01 http] Модуль ngx_http_geoip_module.md>);
-   [A/B-тестирование](<258 [02.01.01 http] Модуль ngx_http_split_clients_module.md>);
-   [Зеркалирование запросов](<245 [02.01.01 http] Модуль ngx_http_mirror_module.md>);
-   Встроенный [Perl](<247 [02.01.01 http] Модуль ngx_http_perl_module.md>);
-   сценарный язык [njs](<290 [02.01.03 njs] Модуль nginx JavaScript.md>).

#### Функциональность почтового прокси-сервера

-   Перенаправление пользователя на [IMAP](<279 [02.01.02 mail] Модуль ngx_mail_imap_module.md>)\- или [POP3](<280 [02.01.02 mail] Модуль ngx_mail_pop3_module.md>)\-сервер с использованием внешнего HTTP-сервера [аутентификации](<277 [02.01.02 mail] Модуль ngx_mail_auth_http_module.md>);
-   Проверка пользователя с помощью внешнего HTTP-сервера [аутентификации](<277 [02.01.02 mail] Модуль ngx_mail_auth_http_module.md>) и перенаправление соединения на внутренний [SMTP](<283 [02.01.02 mail] Модуль ngx_mail_smtp_module.md>)\-сервер;
-   Методы аутентификации:
    -   [POP3](<280 [02.01.02 mail] Модуль ngx_mail_pop3_module.md#pop3_auth>): USER/PASS, APOP, AUTH LOGIN/PLAIN/CRAM-MD5;
    -   [IMAP](<279 [02.01.02 mail] Модуль ngx_mail_imap_module.md#imap_auth>): LOGIN, AUTH LOGIN/PLAIN/CRAM-MD5;
    -   [SMTP](<283 [02.01.02 mail] Модуль ngx_mail_smtp_module.md#smtp_auth>): AUTH LOGIN/PLAIN/CRAM-MD5;
-   Поддержка [SSL](<284 [02.01.02 mail] Модуль ngx_mail_ssl_module.md>);
-   Поддержка [STARTTLS и STLS](<284 [02.01.02 mail] Модуль ngx_mail_ssl_module.md#starttls>).

#### Функциональность TCP/UDP прокси-сервера

-   [Проксирование TCP и UDP;](<307 [02.01.04 stream] Модуль ngx_stream_proxy_module.md>)
-   Поддержка [SSL](<313 [02.01.04 stream] Модуль ngx_stream_ssl_module.md>) и расширения TLS [SNI](<314 [02.01.04 stream] Модуль ngx_stream_ssl_preread_module.md>) для TCP;
-   [Распределение нагрузки и отказоустойчивость](<316 [02.01.04 stream] Модуль ngx_stream_upstream_module.md>);
-   Ограничение доступа в зависимости от [адреса клиента](<296 [02.01.04 stream] Модуль ngx_stream_access_module.md>);
-   Выполнение разных функций в зависимости от [адреса клиента](<227 [02.01.01 http] Модуль ngx_http_geo_module.md>);
-   Ограничение числа одновременных [соединений](<301 [02.01.04 stream] Модуль ngx_stream_limit_conn_module.md>) с одного адреса;
-   [Настройка форматов логов](<302 [02.01.04 stream] Модуль ngx_stream_log_module.md#log_format>), [буферизованная запись в лог](<302 [02.01.04 stream] Модуль ngx_stream_log_module.md#access_log>), [быстрая ротация логов](<204 [02.01 docs] Управление nginx.md#logs>), [запись в syslog](<321 [02.01 docs] Запись в syslog.md>);
-   [Геолокация по IP-адресу](<299 [02.01.04 stream] Модуль ngx_stream_geoip_module.md>);
-   [A/B-тестирование](<312 [02.01.04 stream] Модуль ngx_stream_split_clients_module.md>);
-   сценарный язык [njs](<290 [02.01.03 njs] Модуль nginx JavaScript.md>).

#### Архитектура и масштабируемость

-   Один главный и несколько рабочих процессов, рабочие процессы работают под непривилегированным пользователем;
-   [Гибкость конфигурации](<208 [02.01 docs] Пример конфигурации nginx.md>);
-   [Изменение настроек](<204 [02.01 docs] Управление nginx.md#reconfiguration>) и [обновление исполняемого файла](<204 [02.01 docs] Управление nginx.md#upgrade>) без перерыва в обслуживании клиентов;
-   [Поддержка](<207 [02.01 docs] Методы обработки соединений.md>) kqueue (FreeBSD 4.1+), epoll (Linux 2.6+), /dev/poll (Solaris 7 11/99+), event ports (Solaris 10), select и poll;
-   Использование возможностей, предоставляемых kqueue, таких как EV\_CLEAR, EV\_DISABLE (для временного выключения события), NOTE\_LOWAT, EV\_EOF, число доступных данных, коды ошибок;
-   Использование возможностей, предоставляемых epoll, таких как EPOLLRDHUP (Linux 2.6.17+, glibc 2.8+) и EPOLLEXCLUSIVE (Linux 4.5+, glibc 2.24+);
-   Поддержка sendfile (FreeBSD 3.1+, Linux 2.2+, macOS 10.5+), sendfile64 (Linux 2.4.21+) и sendfilev (Solaris 8 7/01+);
-   Поддержка [файлового AIO](<221 [02.01.01 http] Модуль ngx_http_core_module.md#aio>) (FreeBSD 4.3+, Linux 2.6.22+);
-   Поддержка [DIRECTIO](<221 [02.01.01 http] Модуль ngx_http_core_module.md#directio>) (FreeBSD 4.4+, Linux 2.4+, Solaris 2.6+, macOS);
-   [Поддержка](<221 [02.01.01 http] Модуль ngx_http_core_module.md#listen>) accept-фильтров (FreeBSD 4.1+, NetBSD 5.0+) и TCP\_DEFER\_ACCEPT (Linux 2.4+);
-   На 10 000 неактивных HTTP keep-alive соединений расходуется около 2.5M памяти;
-   Минимум операций копирования данных.

#### Протестированные ОС и платформы

-   FreeBSD 3 — 12 / i386; FreeBSD 5 — 12 / amd64; FreeBSD 11 / ppc; FreeBSD 12 / ppc64;
-   Linux 2.2 — 4 / i386; Linux 2.6 — 5 / amd64; Linux 3 — 4 / armv6l, armv7l, aarch64, ppc64le; Linux 4 — 5 / s390x;
-   Solaris 9 / i386, sun4u; Solaris 10 / i386, amd64, sun4v; Solaris 11 / x86;
-   AIX 7.1 / powerpc;
-   HP-UX 11.31 / ia64;
-   macOS / ppc, i386, x86\_64;
-   Windows XP, Windows Server 2003, Windows 7, Windows 10, Windows 11.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx компания](<325 [02 ru] nginx компания.md>)　｜　[下一篇：nginx пакеты для Linux ➡](<327 [02 ru] nginx пакеты для Linux.md>)
