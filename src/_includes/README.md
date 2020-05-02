# _includes

Files in this directory, and its subdirectories, can be included in any template by using
the file's relative path from `src/_includes`.

For example, to include a Nunjucks template from components, the following code can be used:

```jinja
{% include 'components/brand.njk' %}
```

SVG files can also be inlined using the same method. In the brand component,
the following code includes the logo and logotype from `src/_includes/svg`:

```jinja
{% include 'svg/logo.svg' %}
{% include 'svg/logotype.svg' %}
```

For more information, see:

- [Layouts](https://www.11ty.dev/docs/layouts)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
