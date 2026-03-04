+++
title = "Blog post date"
+++

Supported date extraction patterns  

| Pattern                               | Example                                           |
| ------------------------------------- | ------------------------------------------------- |
| Single file                           | '2021-05-28-my-blog-post-title.md'                |
| Single folder + 'index.md'            | '2021-05-28-my-blog-post-title/index.md'          |
| Category + single folder + 'index.md' | 'category/2021-05-28-my-blog-post-title/index.md' |
| ❌Folder named by date                 | '2021-05-28/my-blog-post-title.md'                |
| ❌Nested folders by date               | '2021/05/28/my-blog-post-title.md'                |
| ❌Partially nested folders by date     | '2021/05-28-my-blog-post-title.md'                |
| ❌Nested folders + 'index.md'          | '2021/05/28/my-blog-post-title/index.md'          |
