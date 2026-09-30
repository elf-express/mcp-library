# 安全政策 (Security Policy)

## 支援版本

僅最新一個 minor 版本提供安全更新。

| 版本 | 安全更新 |
| --- | --- |
| 最新 minor (`vX.Y.*`) | ✅ |
| 其餘歷史版本 | ❌ |

## 回報弱點

**請勿在公開 Issue 中討論安全弱點。**

發現潛在安全問題請走以下流程:

1. 透過 GitHub **Security Advisory** 私下回報
   `Security` 標籤頁 → `Report a vulnerability`
2. 或郵件聯繫倉庫維護者(詳見 GitHub 組織頁)
3. 描述應包含:
   - 弱點類型(SQL injection、XSS、credentials leak ...)
   - 受影響版本
   - 重現步驟(PoC)
   - 建議的修補方向(如有)

## 回應時程

| 階段 | 時間 |
| --- | --- |
| 收到通報回執 | 3 個工作日內 |
| 初步影響評估 | 7 個工作日內 |
| 修補釋出(高嚴重度) | 30 個工作日內 |

## 揭露原則

採用 **協調揭露** (Coordinated Disclosure):
- 修補發布前不公開細節
- 修補發布後,在 GitHub Security Advisories 公布弱點編號與 credit
- 鼓勵研究人員負責任地揭露

## 排除範圍

下列情境**不**視為安全弱點:

- 文件拼字錯誤
- 舊版本第三方相依套件的已知 CVE,且本專案未使用受影響功能
- 僅可在攻擊者已具備管理員權限下利用的問題
