# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# GDP-FE

國泰金控集團-客戶數據營運平台-前端專案

## 目錄

- [GDP-FE](#GDP-FE)
  - [目錄](#目錄)
  - [使用工具](#使用工具)
  - [環境建立](#環境建立)
  - [下載及執行專案](#下載及執行專案)
  - [開發流程](#開發流程)
    - [建立開發分支](#建立開發分支)
    - [提交程式碼](#提交程式碼)
  - [專案架構](#專案架構)
  - [程式碼風格規範](#程式碼風格規範)
  - [組件 .vue 檔規範](#組件-vue-檔規範)
  - [Git Commit 規範](#git-commit-規範)
    - [格式](#格式)
    - [原子性提交](#原子性提交)
  - [Git 分支建立](#git-分支建立)
    - [修正](#修正)
  - [包版步驟](#包版步驟)
  - [Vue 型別定義](#vue-型別定義)
    - [computed](#computed)
    - [ref](#ref)
  - [Code Snippets 程式碼片段](#code-snippets-程式碼片段)
    - [Vue 頁面相關](#vue-頁面相關)
    - [非頁面相關](#非頁面相關)
  - [開發注意事項](#開發注意事項)

## 使用工具

- 執行環境 - [Node.js 18 LTS (長期維護版)](https://nodejs.org/zh-tw)
- 套件管理 - [pnpm 9](https://pnpm.io/zh-TW/installation)
- 版本控制 - [GIT](https://git-scm.com)
- 編輯器 - [Visual Studio Code](https://code.visualstudio.com)

## 環境建立

1. 安裝 Node 18 LTS - 使用 [volta](https://docs.volta.sh/guide/) (推薦) 或 [nvm](https://github.com/nvm-sh/nvm) (macOS 需按照步驟 4 設定 husky) 安裝及管理 Node 版本。
2. 安裝 pnpm - 參考 [官網安裝說明](https://pnpm.io/zh/installation) 或直接使用以下指令安裝。

   ```bash
   npm install -g pnpm
   ```

3. 安裝 GIT - 從 [官網](https://git-scm.com/) 下載並安裝 GIT。
4. 如果使用 macOS 系統 + nvm 管理 node 版本，請執行以下指令新增 ~/.huskyrc，請參考 [husky 官網](https://typicode.github.io/husky/#/?id=command-not-found) 說明。

   ```bash
   cat << 'EOF' >> ~/.huskyrc
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   EOF
   ```

## 下載及執行專案

1. 安裝專案所需依賴包

   ```bash
   pnpm install
   ```

2. 執行開發環境服務

   ```bash
   pnpm run dev
   ```

3. 使用 VS Code 開啟專案，並安裝專案推薦套件（VS Code 右下角會提示安裝）
4. 啟用 [Volar Takeover 模式](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)，優化 VS Code 開發 Vue TypeScript 效能

## 開發流程

### 建立開發分支

1. 切換到 develop 分支

   ```bash
   git checkout develop
   ```

2. 將 develop 本地端(local)與遠端(origin)同步

   ```bash
   git pull
   ```

3. 建立開發分支，命名方式為 feature/功能名稱，功能名稱使用 kebab-case 命名法，例如 feature/dashboard-page。

   ```bash
   git branch feature/<name>
   ```

### 提交程式碼

執行以下步驟時，<mark> 請確保所有修改都已 commit 或
stash，避免操作失敗，修改記錄遺失 </mark>，有疑問請詢問專案負責工程師。

1. 使用 git rebase interactive 將多餘的 commit 合併，方便 Rebase 與 Code Review，此步驟推薦使用 GUI 操作。

   ```bash
   // commit hash 為從 develop 建立開發分支的 commit
   git rebase -i <commit hash>
   ```

2. 切換到 develop 分支

   ```bash
   git checkout develop
   ```

3. 將 develop 本地端(local)與遠端(origin)同步

   ```bash
   git pull
   ```

4. 將開發分支 merge 到 develop，確保開發分支有 develop 最新程式碼，<mark>遇到衝突時請詢問相關開發人員</mark>。

   ```bash
   git merge develop
   ```

## 專案架構

```bash
.
├── .vscode                # 統一開發人員 VS Code 套件及設定檔
│   ├── extensions.json    # 編輯器套件
│   ├── settings.json      # 編輯器設定
│   └── xxx.code-snippets  # 程式碼模板
├── public                 # 靜態資源
├── src                    # 開發資源
│   ├── assets             # 共用資源
│   ├── components         # 共用組件
│   ├── composables        # 共用 Vue 組合式函數
│   ├── configs            # 共用設定檔
│   ├── enums              # enums檔
│   ├── guards             # 路由守衛
│   ├── layouts            # 佈局組件
│   ├── models             # 共用型別
│   ├── router             # 路由設定
│   ├── services           # API Services
│   ├── stores             # 狀態管理
│   ├── styles             # 共用樣式
│   ├── views              # 頁面組件
│   ├── app.vue            # 根組件
│   ├── env.d.ts      # 全域型別
│   └── main.ts            # 進入點
├── .editorconfig          # editorConfig 設定
├── .eslintignore          # eslint 忽略檔案設定
├── .eslintrc.cjs          # eslint 設定
├── .gitignore             # git 忽略檔案設定
├── .prettierignore        # prettier 忽略檔案設定
├── .prettierrc.json       # prettier 設定
├── auto-imports.d.ts      # 按需引入方法設定
├── components.d.ts        # 按需引入組件設定
├── index.html             # index.html
├── package.json           # 專案設定檔
├── pnpm-lock.yaml         # pnpm-lock 檔
├── README.md              # 專案說明
├── tsconfig.app.json      # tsconfig 設定
├── tsconfig.config.json   # tsconfig 設定
├── tsconfig.json          # tsconfig 設定
└── vite.config.ts         # vite 設定
```

## 程式碼風格規範

1. 參考 [Vue 官方程式碼風格規範 Style Guide](https://vuejs.org/style-guide)

2. 使用工具檢查及規範
   - [CommitLint](https://commitlint.js.org) - 檢查 commit 訊息
   - [EditorConfig](https://editorconfig.org) - 統一 Visual Studio Code 檔案排版設定
   - [ESLint](https://eslint.org) - 檢查程式碼語法、統一編寫風格
   - [Prettier](https://prettier.io) - 統一程式碼排版風格
   - [StyleLint](https://stylelint.io) - 檢查樣式語法、統一編寫風格

## 組件 .vue 檔規範

參考 [.vue 檔撰寫規範](./readme/COMPONENT.md)

## Git Commit 規範

Commit 訊息依照 [約定式提交 (Conventional Commits)](https://www.conventionalcommits.org/zh-hant/v1.0.0/)，可使用 [cz-cli](https://github.com/commitizen/cz-cli) 或 VS Code 套件 [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) 協助編寫 commit 訊息。

> 注意 : 每個 commit 應保持原子性提交。

### 原子性提交

什麼是原子性提交 (atomic commits) ?

> 以最小單位變更為一個 commit、一次只做一件事。

理由有下列 :

- 方便追蹤與理解修改目的和原因。
- 原子變化是可逆變化，容易回復歷史版本。
- 乾淨的 git 歷史記錄。
- 更容易 code review。

## Vue 型別定義

### computed

computed 當使用 `computed<T>` 或 `ComputedRef<T>` 方式定義型別時，
在型別部分符合(必填)時，就算多其他屬性 (非必填) 也不會報錯，會造成輸入錯誤的 key 也不會顯示型別錯誤，
這將會發生淺在的 BUG，且自動提示會不正確，建議型別定義方式改為 `computed((): T => ())`，例如以下範例:

```typescript
type Setting = {
  name: string
  type: string
  formatType?: string
}

// ❌ computed<T>
const settingComputed = computed<Setting>(() => ({
  name: 'foo',
  type: 'bar',
  formatAmount: 'float' // 應該報錯，formatAmount 未定義
}))

// ❌ ComputedRef<T>
const settingComputed: ComputedRef<Setting> = computed(() => ({
  name: 'foo',
  type: 'bar',
  formatAmount: 'float' // 應該報錯，formatAmount 未定義
}))

// ✅ computed((): T => ())
const settingComputed = computed(
  (): Setting => ({
    name: 'foo',
    type: 'bar',
    formatAmount: 'float' // 報錯，formatAmount 未定義
  })
)
```

### ref

ref 當使用 `Ref<T>` 方式定義型別時，和 `ComputedRef<T>` 一樣有型別檢測問題，建議使用 `ref<T>` 例如以下範例:

```typescript
type Setting = {
  name: string
  type: string
  formatType?: string
}

// ❌ Ref<T>
const settingRef: Ref<Setting[]> = ref([
  {
    name: 'foo',
    type: 'bar',
    formatAmount: 'float' // 應該報錯，formatAmount 未定義
  }
])

// ✅ ref<T>
const settingRef = ref<Setting[]>([
  {
    name: 'foo',
    type: 'bar',
    formatAmount: 'float' // 報錯，formatAmount 未定義
  }
])
```

## Code Snippets 程式碼片段

請在 VSCode 檔案中輸入 `!` 前綴顯示 Code Snippets。

### Vue 頁面相關

[.vscode/vue.code-snippets](.vscode/vue.code-snippets)

- !vue: vue 基本模板。

> 請依實際需求自行增減模板產生的內容。

### 非頁面相關

[.vscode/typescript.code-snippets](.vscode/typescript.code-snippets)

- !store: vue pinia store 模板。

## 開發注意事項

- **非同步 function 必須使用 await。**
- **非特殊情況 input 一率使用 @change**，而不是 @blur。

  - change 只有在欄位值變更，失焦後觸發
  - blur 不管值是否有異動，失焦後觸發
  - 串接 API 回傳結果必須明確使用型別。

  ```ts
  // 錯誤 ❌
  searchHandler(response?: apiResponseBundle) {
    response.欄位 // 型別 any
    ...
  }

   // 正確 ✅
  searchHandler(response?: apiResponseBundle<XXXXResponse>) {
    response.欄位 // 可取欄位正確型別
    ...
  }
  ```

- **禁止將 API 回傳的結果直接賦值給 form.value** ，必須使用 lodash 的 cloneDeep 函式封裝過，避免淺複製造成異動到原始資料，產生非預期的錯誤。

  ```ts
  // 錯誤 ❌
  form.value = result
  form.value = { ...result } // 如有多階層則會有問題

  // 正確 ✅
  form.value = cloneDeep(result)
  ```

- **陣列物件需要複製時必須使用 lodash 的 cloneDeep 函式封裝過**，免淺複製造成異動到原始資料，產生非預期的錯誤。

  ```ts
  // 錯誤 ❌
  const arrayObj = [{ name: 'leo', age: 60 }]
  const copyArrayObj = { ...arrayObj }
  copyArrayObj[0].age = 100
  console.log(arrayObj[0].age) // 100

  // 正確 ✅
  const arrayObj = [{ name: 'leo', age: 60 }]
  const copyArrayObj = cloneDeep(arrayObj)
  copyArrayObj[0].age = 100
  console.log(arrayObj[0].age) // 60
  ```
