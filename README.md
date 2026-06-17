# zxcboard

<p align="center">
  <img src="./readme/pc.png" height="300">
  <img src="./readme/mobile.png" height="300">
</p>

## **Requirement**

Browser support

- Chrome 111 (released March 2023)
- Firefox 128 (released July 2024)
- Safari 16.4 (released March 2023)
- Not supported on iOS 16.4 jailbroken version.

## **Download**

Releases and source code:

- [GitHub repository](https://github.com/ang3el7z/zxcboard)
- [Latest release](https://github.com/ang3el7z/zxcboard/releases/latest)
- [GitHub Pages panel](https://ang3el7z.github.io/zxcboard/)

> By default the builds **do not** include sing-box native API support (the Tools
> page: terminal, Tailscale, network tools, QR code — which pull in extra
> ConnectRPC/protobuf and xterm code). To get a release build **with** it, append
> `-singbox-native` to any variant below, e.g.
> [`dist-singbox-native.zip`](https://github.com/ang3el7z/zxcboard/releases/latest/download/dist-singbox-native.zip)
> or `dist-misans-only-singbox-native.zip`. The same suffix works for the
> `gh-pages-*` dev branches too (e.g. `gh-pages-no-fonts-singbox-native`).

release:

- [dist.zip](https://github.com/ang3el7z/zxcboard/releases/latest/download/dist.zip)
- [dist-no-fonts.zip](https://github.com/ang3el7z/zxcboard/releases/latest/download/dist-no-fonts.zip)
- [dist-cdn-fonts.zip](https://github.com/ang3el7z/zxcboard/releases/latest/download/dist-cdn-fonts.zip)
- [dist-firasans-only.zip](https://github.com/ang3el7z/zxcboard/releases/latest/download/dist-firasans-only.zip)
- [dist-misans-only.zip](https://github.com/ang3el7z/zxcboard/releases/latest/download/dist-misans-only.zip)
- [dist-pingfang-only.zip](https://github.com/ang3el7z/zxcboard/releases/latest/download/dist-pingfang-only.zip)
- [dist-sarasa-only.zip](https://github.com/ang3el7z/zxcboard/releases/latest/download/dist-sarasa-only.zip)

dev:

- [gh-pages.zip](https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages.zip)
- [gh-pages-no-fonts.zip](https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages-no-fonts.zip)
- [gh-pages-cdn-fonts.zip](https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages-cdn-fonts.zip)
- [gh-pages-firasans-only.zip](https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages-firasans-only.zip)
- [gh-pages-misans-only.zip](https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages-misans-only.zip)
- [gh-pages-pingfang-only.zip](https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages-pingfang-only.zip)
- [gh-pages-sarasa-only.zip](https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages-sarasa-only.zip)

## **Docker Setup**

To run zxcboard via Docker, use the following command:

```
docker run -d -p 80:80 ghcr.io/ang3el7z/zxcboard:latest
```

## **Install as panel**

Hosted panel:

- `https://ang3el7z.github.io/zxcboard/`

ZIP for Mihomo `external-ui-url`:

- `https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages.zip`

ZIP for no-fonts build:

- `https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages-no-fonts.zip`

Release ZIP:

- `https://github.com/ang3el7z/zxcboard/releases/latest/download/dist.zip`

Example for Mihomo:

```yaml
external-ui: ui
external-ui-url: https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages.zip
external-ui-name: zxcboard
```

Example for sing-box Clash API download URL:

```json
{
  "experimental": {
    "clash_api": {
      "external_ui": "ui",
      "external_ui_download_url": "https://github.com/ang3el7z/zxcboard/archive/refs/heads/gh-pages.zip",
      "external_ui_download_detour": "DIRECT"
    }
  }
}
```

For auto-upgrade from inside the panel, point the core to your `zxcboard` ZIP/release URL instead of the upstream panel.

## Tips

1. The connection table can be dragged with the left mouse button, and right-clicking can copy cell content.
2. Right-clicking on a node / node group card will perform a speedtest for the node / node group.
3. The proxy group sorting is based on the node order in the GLOBAL group. In Mihomo, it follows the configuration file order, while in sing-box, route.final is placed first, with the rest following the configuration file order. If you need custom ordering, you can specify the order by overriding the GLOBAL group.
4. The dashboard supports PWA (Progressive Web App), which can provide a native app-like experience on mobile devices through "Add to Home Screen".
5. The dashboard's upgrade button and auto-upgrade functionality require proper configuration of the core's UI download path ([mihomo](https://wiki.metacubex.one/config/general/#_9) | [sing-box](https://sing-box.sagernet.org/configuration/experimental/clash-api/#external_ui_download_url)), otherwise clicking update may result in updating to the core's default panel.

## 提示

1. 连接表格可被鼠标左键拖动，右键可复制单元格内容。
2. 右键点击节点/节点组卡片可对节点/节点组进行测速。
3. 面板的节点组排序是根据GLOBAL组中的节点顺序排序的，在Mihomo中会是按配置文件的顺序，在sing-box中会把route.final放到第一位，其余按照配置文件顺序，如果你需要自定义顺序，可通过覆盖GLOBAL组指定顺序
4. 面板支持PWA（Progressive Web App），可以在移动设备上通过"添加到主屏幕"获得类原生app的体验
5. 面板的更新按钮和自动更新功能需要正确的配置核心的ui下载路径 ([mihomo](https://wiki.metacubex.one/config/general/#_9) | [sing-box](https://sing-box.sagernet.org/configuration/experimental/clash-api/#external_ui_download_url)), 否则可能会在点击更新后更新为核心默认面板

## URL params format

#### basic example

http://host:port/#/setup?hostname=ipordomain&port=9090&secret=123456

1. **`http` / `https`**
   - Determines the protocol (`http` or `https`).
   - Default: current page protocol

2. **`hostname`**
   - The Clash API's IP or domain.

3. **`port`**
   - The Clash API port.

4. **`secondaryPath`**
   - Optional path appended to the base URL.
   - Default: An empty string.

5. **`secret`**
   - Password for authentication.

6. **`disableUpgradeCore`**
   - Set '1' to hide upgrade core button

7. **`disableTunMode`**
   - Set '1' to hide tun switch

### I code just for fun, not for money. If you really want to donate, please consider donating to [UNICEF](https://www.unicef.org/) to help hungry children.
