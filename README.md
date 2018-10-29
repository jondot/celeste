![](media/cover.png)

An all-in-one tool for the repository maintainer.


## Features

✅ Awesome lists: enrich Github links with star counts, update in-place, report diffs and trends  
✅ Awesome lists: sort lists based on star counts (preserve structure)  
✅ Markdown: generate and embed table of contents   
✅ Markdown: find broken links  
✅ Markdown: add open source license automatically  
✅ Markdown: add contributors section based on Git history   
✅ Find magic strings (secrets, placeholders etc.) and replace them automatically  


## Quick Start

```
$ yarn add --dev celeste
$ yarn celeste -f README.md -o OUT.md
react-native-swiper ★6881	 +54 (6827 -> 6881)
..
<< review >>
$ mv OUT.md README.md
```

## Plugins

See [celeste-config.js](examples/celeste-config.js) for a full configuration.


Internally this tool is structured into plugins. Plugins are [unifiedjs](https://github.com/unifiedjs/unified) based and have a standard logging payload format:

```js
{
    "type":"plugins/fetch-stars/update",
    "level":"info",
    "payload":{...}
}
```

See more in [LogMessage](src/types.js).


### Add License

Adds an open source license in markdown files. Add this to `celeste-config.js`:

```js
addLicense: {
    name: 'Dotan Nahum',
    url: 'https://github.com/jondot'
}
```

You should have a section named `# License` at the bottom of your file.

### Broken Links

Detects and reports broken links in markdown files.

Add this to `celeste-config.js`:

```js
brokenLinks: true,
```

### Fetch Stars

Fetch Github stars and update links in your markdown files. Great for [awesome lists maintenance](https://github.com/jondot/awesome-react-native).


Add this to `celeste-config.js`:

```js
fetchStars: true,
```

### Sort By Stars

Sorts lists in markdown files by star count. Combine with `fetchStars` for the full package. 

Add this to `celeste-config.js`:

```js
sortByStars: true,
```

### Git Contributors

Adds a table with Git contributors for a project.

Add this to `celeste-config.js`:

```js
gitContributors: {
    contributors: [
        {
            name: 'Dotan Nahum',
            email: 'jondotan@gmail.com',
            github: 'jondot'
        }
    ]
},
```

Add metadata as you wish to the `contributors`   array.

You must have a section header `## Contributors` for the table to be injected.

### Magic Strings

Finds and replaces strings based on regular expression dictionary. Great for eliminating secrets leakage, placeholders, and updating things like current year in copyright lines.

Add this to `celeste-config.js`:

```js
magicStrings: {
    replacements: {
        '\\d\\d\\d\\d': (line, regex) => '***'
    }
},
```

The above will report and replace all 4-digit strings with `***`. This plugin works with all kinds of files (source code, text, and markdown included).

### Table of Contents

Generates a table of contents in your markdown file based on the various headings that already exists there.

Add this to `celeste-config.js`:

```js
toc: true,
```


## Integrations

By default `celeste` uses a text formatter for reporting its findings, the text format is parseable and readable and is perfect for CI system logs.

However should you want to integrate with other scripts and tools, all data can be output as `json`:

```
$ celeste -f README.md -o OUT.md --report json
{"type":"plugins/fetch-stars/update","level":"info","payload":{"title":"React Native Styling Cheatsheet ★2632","diff":43,"from":2589,"to":2632}}
...
```


# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).

## Development

Clone this repo, and run:

```
$ yarn
$ yarn main -c examples/celeste-config.js -f test.md --out out.md
```


## Thanks:


To all [Contributors](https://github.com/jondot/celeste/graphs/contributors) - you make this happen, thanks!


# Copyright

Copyright (c) 2018 [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.
