# WebGIS

* Đây là 1 website quản lý nhạc sử dụng PHP mà MySQL

![GitHub language count](https://img.shields.io/github/languages/count/RageOfFire/WebGIS)
![Discord](https://img.shields.io/discord/752171524919918672)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/RageOfFire/WebGIS)
![GitHub last commit](https://img.shields.io/github/last-commit/RageOfFire/WebGIS)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/RageOfFire/WebGIS)
![GitHub repo size](https://img.shields.io/github/repo-size/RageOfFire/WebGIS)
![GitHub followers](https://img.shields.io/github/followers/RageOfFire)
![GitHub Repo stars](https://img.shields.io/github/stars/RageOfFire/WebGIS)

## Mô tả

* Giao diện:
![Giao diện](/img/giaodien.png?raw=true "Giao diện")

## Các chức năng chính

* Bật tắt lớp bản đồ
* Hiển thị thông tin bản đồ khi ấn vào
* Tìm kiếm

## Bắt đầu

### Yêu cầu

* [Xampp](https://www.apachefriends.org/download.html)
* [PostgreSQL](https://www.postgresql.org/download/) và extensions [PostGIS](https://postgis.net/install/)
* [GeoServer](https://geoserver.org/download/)

### Cài đặt

* Đưa folder vào htdocs trong Xampp
* Tạo csdl và đưa file .shp vô postgreSQL
* Đưa file .sld lên styles vào tạo layers của geoserver

[Tham khảo](https://cuongdx313.wordpress.com/2016/04/07/webgis-voi-geoserver-postgis-openlayer-bai-1-tao-database-voi-postgresql-va-postgis/)

## Hướng dẫn sửa 1 số lỗi

Nếu gặp phải lỗi này:
![Lỗi](/img/Error.png?raw=true "Lỗi")

* Vào xampp chọn config của tomcat chọn **web.xml** gán code sau:

```xml
    <filter>
    <filter-name>CorsFilter</filter-name>
    <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
    <init-param>
    <param-name>cors.allowed.origins</param-name>
    <param-value>*</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.methods</param-name>
    <param-value>GET,POST,HEAD,OPTIONS,PUT</param-value>
    </init-param>
    <init-param>
    <param-name>cors.allowed.headers</param-name>
    <param-value>Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers</param-value>
    </init-param>
    <init-param>
    <param-name>cors.exposed.headers</param-name>
    <param-value>Access-Control-Allow-Origin,Access-Control-Allow-Credentials</param-value>
    </init-param>
    <init-param>
    <param-name>cors.support.credentials</param-name>
    <param-value>true</param-value>
    </init-param>
    <init-param>
    <param-name>cors.preflight.maxage</param-name>
    <param-value>10</param-value>
    </init-param>
    </filter>
    <filter-mapping>
    <filter-name>CorsFilter</filter-name>
    <url-pattern>/*</url-pattern>
    </filter-mapping>
```

* Sửa lỗi trên Google chrome:
Tạo 1 folder tên temp ở ổ C
Mở terminal và chạy lệnh sau:

```sh
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=C:\temp

```

## Hỗ trợ

![GitHub issues](https://img.shields.io/github/issues/RageOfFire/KoraBot)
![GitHub pull requests](https://img.shields.io/github/issues-pr/RageOfFire/KoraBot)

## Tác giả

* [RageOfFire](https://github.com/RageOfFire)
