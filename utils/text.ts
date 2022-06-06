/**
 * 忌々しき全角を半角にする
 * @param text string
 * @returns string
 */
export const zenkakuToHankaku = (text: string): string => {
  return text
    // アルファベット、数字
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    })
    // 記号
    .replace(/[！”＂＇＃＄％＆’（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    })
    // 空白
    .replace(/[　]/g, " ");
};
