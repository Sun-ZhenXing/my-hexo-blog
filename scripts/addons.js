"use strict";

function getUuid() {
  return Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
}

hexo.extend.injector.register('body_end', `<script>
// 美化 license 框
$('.license-box').addClass('note note-warning');
</script>`, 'post');

hexo.extend.filter.register(
  "after_post_render",
  function (data) {
    const { line_number, lib } = hexo.theme.config.code.highlight;

    let reg;
    if (lib === "highlightjs") {
      if (line_number) {
        reg = /(<figure class="highlight.+?>)(.+?hljs (.*?)".+?)(<\/figure>)/gims;
      } else {
        reg = /(<div class="code-wrapper.+?>)(.+?hljs (.*?)".+?)(<\/div>)/gims;
      }
    } else if (lib === "prismjs") {
      reg = /(<div class="code-wrapper.+?>)(.+?data-language="(.*?)".+?)(<\/div>)/gims;
    }

    data.content = data.content.replace(reg, function (match, begin, inner, lang, end, offset, string) {
      const collapseId = `collapse-${getUuid()}`;
      const collapseBtn = `<i class="iconfont icon-code" type="button" data-toggle="collapse" data-target="#${collapseId}"></i>`;
      const collapseDiv = `<div class="collapse show" id="${collapseId}">${inner}</div>`;
      // const langSpan = `<span type="button" data-toggle="collapse" data-target="#${collapseId}">点击显示隐藏代码</span>`;
      const langSpan = '';
      return begin + collapseBtn + langSpan + collapseDiv + end;
    });
    return data;
  },
  10000
);