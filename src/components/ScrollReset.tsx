// 検索結果一覧をスクロールした状態でユーザーをクリックして遷移したときに、
// App Routerの仕様でスクロール位置がリセットされないためのコンポーネント

"use client";
import { useEffect } from "react";

export function ScrollReset() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return null;
}
