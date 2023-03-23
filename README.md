# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

---
## ローカル環境セットアップ手順
- nodeのインストール  
vscodeのターミナルやwindowsのコマンドプロンプトなどから  
node --version  
を実行して、バージョンが表示されない場合は下記からnodeをインストールする。  
https://nodejs.org/ja/  
（※v16.14.2にて動作確認済み）  

- git  
vscodeでターミナルを開き、gitから最新を取得する。  
プロジェクトを作成したいフォルダに移動してから、下記のコマンドを実行  
git clone https://gitlab.dev.tap-ic.co.jp/tap/okinawa-web/prodecon3front.git  
vscodeでci-ctを取得し、ブランチを今回の作業ブランチに変更する。  

- vscodeの拡張をインストール  
・Vetur https://marketplace.visualstudio.com/items?itemName=octref.vetur  

- vueの開始とデバッグ  
vscodeでターミナルで下記のコマンドを実行  
npm i
npm run dev　を実行  

--------
## OpenApi generatorについて
### テンプレート修正箇所  
typescript-axiosのテンプレートファイル（openapi-generator-vueの配下）  
apiInner.mustacheの305行目あたり  
    export interface {{classname}}{{operationIdCamelCase}}Request {  
　　　↓  
    export class {{classname}}{{operationIdCamelCase}}Request {  
  
modelGeneric.mustacheの6行目あたり  
    export interface {{classname}} {{#parent}}extends {{{.}}} {{/parent}}{  
　　　↓  
    export class {{classname}} {{#parent}}extends {{{.}}} {{/parent}}{  
  
modelGeneric.mustacheの20行目あたり  
    '{{baseName}}'{{^required}}?{{/required}}: {{#isEnum}}{{{datatypeWithEnum}}}{{/isEnum}}{{^isEnum}}{{{dataType}}}{{#isNullable}} | null{{/isNullable}}{{/isEnum}};  
　　　↓  
    {{baseName}}{{^required}}?{{/required}}: {{#isEnum}}{{{datatypeWithEnum}}}{{/isEnum}}{{^isEnum}}{{{dataType}}}{{#isNullable}} | null{{/isNullable}}{{/isEnum}}  
### APIファイルの生成  
prodeconapiから最新のopenapi.yamlをコピーする。  
openapi1.batを実行後、openapi2.batを実行する。(1つのファイルにしたいがnpm run og後にコマンドの実行方法が不明。。。)  
※openapi-generatorを実行するにはJava1.8のインストールとJAVA_HOMEの設定が必要  
  
# Selenium


## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to run requirement.txt

```bash
pip install -r path/to/requirement.txt
```


## Usage

setup test case 
```python
class TestCustomerSearchResult(BaseSetup):
    def setUp(self):
        super().setUp('customerSearchResult_2')
        
    def page(self):
        return CustomerSearchResult(self.getDriver())
    
```
write test case
```python
 def test_check__route_reservation_register_member_2(self):
        current_path = self.page().check_route_reservation_register_member(2)
        assert current_path == '/reservationRegistMember'
```

Run test case in file test_.py

```bash
pytest path/to/test_.py
```
## Reference

[page-factory](https://selenium-page-factory.readthedocs.io/en/latest/)
[selenium-python](https://selenium-python.readthedocs.io/)
  