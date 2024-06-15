# Browser Game "ito"

数字禁止！言葉で当てる 1~100！意思疎通ゲーム「ito (イト)」

## 目次

- [ゲームの概要について](#about-game)
- [使用技術](#technology-used)
- [環境構築の手順](#environment-setup)
- [各種 URL](#url)

<h2 id="about-game">ゲームの概要</h2>

1. お題を決定（ex. 面積の広い国）
2. 各プレイヤーは数字(1~100)を決定する
3. 数字が 100 に近いほどお題に適するもの（ex. ロシア）を、1 に近いほど適さないもの（ex. バチカン市国）をあげる
4. 協力して話し合って小さい順に並び替えられていればクリア

<h2 id="technology-used">使用技術</h2>

### Node Version

<img src="https://img.shields.io/badge/-Node.js v20.11.1-333333.svg?logo=node.js&style=for-the-badge&logoColor"> <img src="https://img.shields.io/badge/-npm v10.2.4-333333.svg?logo=npm&style=for-the-badge&logoColor">

### Frontend

<img src="https://img.shields.io/badge/-TypeScript-333333.svg?logo=typescript&style=for-the-badge&logoColor"> <img src="https://img.shields.io/badge/-React-333333.svg?logo=react&style=for-the-badge&logoColor">

### Backend

<img src="https://img.shields.io/badge/-TypeScript-333333.svg?logo=typescript&style=for-the-badge&logoColor"> <img src="https://img.shields.io/badge/-Socket.IO-333333.svg?logo=socketdotio&style=for-the-badge&logoColor">

### Style

<img src="https://img.shields.io/badge/-Tailwind CSS-333333.svg?logo=TailwindCSS&style=for-the-badge&logoColor"> <img src="https://img.shields.io/badge/-daisyUI-333333.svg?logo=daisyUI&style=for-the-badge&logoColor=00ccb7">

### Hosting

<img src="https://img.shields.io/badge/-Vercel-333333.svg?logo=vercel&style=for-the-badge&logoColor"> <img src="https://img.shields.io/badge/-Render-333333.svg?logo=render&style=for-the-badge&logoColor">

<h2 id="environment-setup">環境構築の手順</h2>

### 1. 環境変数ファイルを作成（`frontend`, `backend`とも）
```
cp .env.example .env
```
- リポジトリに設置してある`.env.example`ファイルを複製した`.env`ファイルとして作成
- `.env`の中の値は管理者に確認し記述

### 2. パッケージのインストール（`frontend`, `backend`とも）

```
npm install
```

### 3. ローカル環境の立ち上げ（`frontend`）

```
npm run dev
```

- http://localhost:8080/ にアクセスできれば問題なし

### 4. ローカル環境の立ち上げ（`backend`）

```
npm run server
```

- http://localhost:3000/ にアクセスできれば問題なし

<h2 id="url">各種URL</h2>
<a href="https://highfalutin-donkey-f65.notion.site/44ba5ee9986b4df08238a1a7b6ea1ea0?v=4c31651e7ed346b99a0cc2a498f77226&pvs=4">
    <img src="https://img.shields.io/badge/-開発ノート(Notion)-333333.svg?logo=notion&style=for-the-badge&logoColor">
</a> 
<a href="https://www.figma.com/design/8XqKZzhNdyxHU1Yp2VsgfT/ito(%E3%82%A4%E3%83%88)?node-id=0%3A1&t=OnbI2n5kZIpOPnRJ-1">
    <img src="https://img.shields.io/badge/-ワイヤーフレーム(Figma)-333333.svg?logo=figma&style=for-the-badge&logoColor">
</a>
