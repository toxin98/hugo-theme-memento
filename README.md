# hugo-theme-memento

This theme was originally created for my own use, but I’ve made an effort to keep it accessible and user-friendly for everyone.

**Notice:**  
I’m not a professional developer, and I may not always be able to keep up with Hugo’s ongoing updates and changes. It is built on Hugo `0.156.0`, and between the earlier versions I first encountered and this one, the framework has evolved significantly—its syntax and templating system have become much cleaner and more readable.  
In a way, I feel lucky to have gotten to know Hugo in its current form, rather than the more complex and frustrating versions it once was.

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
