# AI Paper Partner - React 應用程式指南

## 完成項目

已成功將 wireframe.html 遷移為完整的 React 應用程式！

### ✅ 已實作功能

1. **完整頁面系統**
   - `/chat` - 聊天對話頁面
   - `/projects` - 專案管理頁面
   - `/upload` - 論文上傳頁面
   - `/papers` - 論文管理頁面
   - `/settings` - 模型設定頁面

2. **元件架構**
   - Layout 元件（AppLayout, Sidebar, Header）
   - UI 基礎元件（Button, Input, Textarea, Modal, Card）
   - 功能元件（MessageBubble, ProjectCard, PaperCard, etc.）

3. **狀態管理**
   - ProjectContext - 管理專案狀態
   - ChatContext - 管理聊天狀態

4. **Service Layer**
   - Mock API 服務層已建立
   - 準備好串接後端 API

## 啟動應用程式

```bash
# 安裝依賴（如果還沒安裝）
npm install

# 啟動開發伺服器
npm run dev

# 訪問應用程式
# 開啟瀏覽器到 http://localhost:5173
```

## 專案結構

```
src/
├── components/
│   ├── ui/              # 基礎 UI 元件
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Modal.tsx
│   │   └── Card.tsx
│   └── layout/          # 佈局元件
│       ├── AppLayout.tsx
│       ├── Sidebar.tsx
│       └── Header.tsx
├── contexts/            # 全域狀態管理
│   ├── ProjectContext.tsx
│   └── ChatContext.tsx
├── pages/              # 頁面元件
│   ├── ChatPage.tsx
│   ├── ProjectsPage.tsx
│   ├── UploadPage.tsx
│   ├── PapersPage.tsx
│   └── SettingsPage.tsx
├── services/           # API 服務層
│   └── api.ts
├── types/             # TypeScript 型別定義
│   └── index.ts
├── utils/             # 工具函式
│   ├── cn.ts          # classnames 合併工具
│   └── index.ts
├── App.tsx            # 主應用程式 + 路由配置
├── main.tsx           # 應用程式入口
└── index.css          # 全域樣式
```

## 主要功能說明

### 1. Chat 頁面
- 顯示對話紀錄
- 發送訊息功能（Mock）
- 管理引用論文標籤
- 移除引用論文

### 2. Projects 頁面
- 顯示所有專案
- 建立新專案（含 Modal）
- 切換專案
- 點擊專案卡片自動跳轉到 Chat

### 3. Upload 頁面
- 上傳區域（待實作檔案上傳）
- 顯示最近上傳進度

### 4. Papers 頁面
- 顯示所有論文
- Chat、View、Delete 按鈕（Mock）

### 5. Settings 頁面
- System Prompt 設定
- Model Parameters（Temperature, Top P, Max Tokens, Language）
- RAG Configuration（Retrieval Count, Similarity Threshold）
- 儲存設定（Mock）

## Mock API 服務

所有 API 呼叫目前都是 Mock 實作，位於 `src/services/api.ts`。
當後端 API 準備好時，只需要替換這些函式的實作即可。

### 現有 Mock Services:
- `chatService.sendMessage()` - 發送訊息
- `projectService.createProject()` - 建立專案
- `projectService.getProjects()` - 取得專案列表
- `paperService.uploadPaper()` - 上傳論文
- `paperService.getPapers()` - 取得論文列表
- `settingsService.saveSettings()` - 儲存設定

## 下一步

1. **後端整合**
   - 將 `src/services/api.ts` 中的 Mock API 替換為實際 API 呼叫
   - 使用現有的 axios 依賴進行 HTTP 請求

2. **功能增強**
   - 實作檔案上傳功能
   - 實作論文預覽功能
   - 加入錯誤處理和 Loading 狀態

3. **效能優化**
   - 使用 React Query 管理 API 狀態（已安裝 @tanstack/react-query）
   - 實作虛擬滾動（如果列表很長）

## 技術堆疊

- **React 19** - UI 框架
- **TypeScript** - 型別安全
- **Vite** - 建置工具
- **Tailwind CSS 4** - 樣式框架
- **React Router v7** - 路由管理
- **Lucide React** - 圖示庫
- **TanStack React Query** - 資料抓取（已安裝但未使用）
- **Axios** - HTTP 客戶端（已安裝但未使用）

## 開發指令

```bash
# 開發模式
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview

# Lint 檢查
npm run lint

# 修復 Lint 問題
npm run lint:fix

# 格式化程式碼
npm run format

# 檢查格式化
npm run format:check
```

## 注意事項

1. 所有互動功能目前使用 `alert()` 或 `console.log()` 做示意
2. 資料存儲在 Context 中，重新載入頁面會重置
3. 準備好串接真實 API 時，只需要修改 `src/services/api.ts`
