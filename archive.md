---
title: Archive
---

<ul class="archive">
  {%for post in site.posts %}
  <li class="archive__item">
    <time class="archive__date">{{ post.date | date:"%Y.%m.%d" }}</time>
    <a class="archive__link" href="{{ post.url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>
