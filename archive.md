---
title: Archive
---

<ul class="archive">
  {%for post in site.posts %}
  <li class="archive__item">
    <a href="{{ post.url }}">{{ post.title }}</a>
    <p class="archive__date">Published: <time>{{ post.date | date:"%Y.%m.%d" }}</time></p>
  </li>
  {% endfor %}
</ul>
