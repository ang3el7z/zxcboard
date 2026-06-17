declare const __APP_VERSION__: string
declare const __COMMIT_ID__: string
// Build-time flag. When false, the sing-box native API (ConnectRPC/protobuf
// client and the Tools page) is tree-shaken out of the bundle.
declare const __SINGBOX_NATIVE__: boolean
// Build-time font selection: all | cdn | firasans | misans | pingfang | sarasa | none
declare const __FONT__: string

declare module 'vue-virtual-scroller'
declare interface Navigator {
  standalone?: boolean
}

type ToolTipParams = {
  data: {
    value: number
    name: number
  }
  seriesName: string
  color: string
}
