import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
// const handler = nextConnect<NextApiRequest, NextApiResponse>({
//   onError(error, req, res) {
//     // エラーが発生した場合の処理
//   },
//   onNoMatch(req, res) {
//     // エンドポイントがない場合の処理
//   },
// }).use((req, res, next) => {
//   // ミドルウェアの処理を追加する
//   // - headerのAuthenticationでリクエストの認証をする
//   // - DBを接続する  など
// });

const router = createRouter<NextApiRequest, NextApiResponse>();

export default router.handler({
  onError(error, req, res) {
    // エラーが発生した場合の処理
  },
  onNoMatch(req, res) {
    // エンドポイントがない場合の処理
  },
});
