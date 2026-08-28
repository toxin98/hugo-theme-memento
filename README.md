# hugo-theme-memento

This theme was originally created for my own use, but I’ve made an effort to keep it accessible and user-friendly for everyone.

## Required

hugo 0.158.0

## Initialize a new Hugo site

```shell
hugo new site mySite
```

```shell
cd mySite
git init
```

## Installation

```shell
git submodule add -b main https://github.com/toxin98/hugo-theme-memento.git themes/hugo-theme-memento
```

Change `hugo.toml`

```toml
theme = "hugo-theme-memento"
```

## Update

```shell
git submodule update --remote
```
