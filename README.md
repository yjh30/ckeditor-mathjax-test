#ckeditor编辑器使用总结

1、**使用第三方／自定义 插件**

插件包放入ckeditor/plugins/目录，如你的插件包名为mathjax，配置ckeditor/config.js
```js
config.extraPlugins = 'mathjax';
```

2、**设置MathJax Library**

请一定使用第三方cdn地址，MathJax.js有引用其他js文件，引用方式为相对路径
```js
config.mathJaxLib = '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML';
```

3、**设置Enter键，Enter+shift键模式**
```js
config.enterMode = CKEDITOR.ENTER_BR
config.shiftEnterMode = CKEDITOR.ENTER_P
```

4、**关闭ACF Advanced Content Filter**

为了支持很多后台富文本标签数据，需关闭内容标签过滤
```js
CKEDITOR.config.allowedContent = true
```

5、**获取富文本纯文本，内容长度**
```js
editor.document.getBody().getText()
editor.document.getBody().getText().length  // 公式元数据会被忽略
editor.getData() // 获取富文本内容
```

6、**MathJax动态解析公式**
```js
document.querySelector('button').addEventListener('click', function() {
  var result = editor.getData()
  $('#editor-source-code').html(result)
  MathJax.Hub.Queue(["Typeset", MathJax.Hub])
})
```

7、**禁止自启动行内方式编辑器**

contenteditable 这个属性是ckeditor编辑器的一种创建方式，所以富文本标签如果有这个属性，需禁用自动创建
```js
CKEDITOR.disableAutoInline = true
```

8、**预览时诡异的转换**

编辑器元数据为
```html
<div class="quizPutTag" contenteditable="true">&nbsp;</div>
```
编辑器预览解析dom树标签为如下
```html
<div class="quizPutTag" contenteditable="true"><br></div>
```
以上诡异行为需要考虑br标签带来的换行样式问题，再就是.quizPutTag样式类不生效问题，因为其作用不了br标签

