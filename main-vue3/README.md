### 解决 Electron 安装很慢的办法

#### window 系统

**window 系统**：使用 `npm config edit` 命令打开 npm 的配置文件，**mac 系统**：使用 `open .npmrc` 命令打开 npm 的配置文件，打开之后在 `registry=https://registry.npm.taobao.org/` 下一行添加：

```
electron_mirror=https://cdn.npm.taobao.org/dist/electron/
```

### 快捷键

页面刷新：Ctrl + r。

开启 DevTools：Shift + Ctrl + D + N + H。

### dialog.showOpenDialog

- openDirectory：允许选择文件夹。

- res.filePaths[0]：选择的文件夹路径。

### BUG 记录

评论：如果第一级评论中输入了内容，再打开子级评论输入框输入内容，此时会同时提交两次评论，即；内外评论都会提交。

上下篇：需要先根据时间排序，再获取上下篇文章。
