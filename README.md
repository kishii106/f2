ふ〜どふぁいんだ〜

# 開発環境構築

```
$ go get github.com/jteeuwen/go-bindata/...
```

これで```go-bindata```というコマンドがインストールされる.

```
$ go get github.com/mattn/goemon/cmd/goemon
```

これで```goemon```というコマンドがインストールされる.

```
$ npm install -g react-tools
```

これで```jsx```というコマンドがインストールされる.

```
$ npm install -g less
```

これで```lessc```というコマンドがインストールされる.

```
$ npm install -g minifyjs
```

これで```minifyjs```というコマンドがインストールされる.

```
$ npm install -g uglifycss
```

これで```uglifycss```というコマンドがインストールされる.

# 開発中に実行するコマンド

``` goemon ``` でファイルの変更を検出しつつ、変更が入ったらWebサーバを再起動する． 以下のコマンドを実行してけばよい.

```
goemon go run src/main.go -bind=:8081
```

# 禁止事項

## assets内のファイルに ``` logo ``` という文字列を含むファイルを作ること

なぜか、 ``` logo ``` という文字列を含むファイルは ``` go-bindata ``` の処理対象外となってしまう.
謎すぎる・・・

# ビルド

## ビルドの事前準備

[ここ](http://qiita.com/Jxck_/items/02185f51162e92759ebe#2-2)を参考に事前準備をしておく.

## ビルド実行

```
$ GOOS=linux GOARCH=amd64 go build -o f2 src/main.go
```

# FAQ

## ```too many open files```が出てgoemonが動作しない
[http://d.hatena.ne.jp/hide-K/20100125/1264424614](http://d.hatena.ne.jp/hide-K/20100125/1264424614)を見てファイルオープン数の上限を上げること.

