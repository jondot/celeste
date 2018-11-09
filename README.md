![](media/cover.png)

An all-in-one tool for the repository maintainer.


## Features

✅ Awesome lists: enrich Github links with star counts, update in-place, report diffs and trends  
✅ Awesome lists: sort lists based on star counts (preserve structure)  
✅ Markdown: generate and embed table of contents   
✅ Markdown: find broken links  
✅ Markdown: find duplicate links  
✅ Markdown: add open source license automatically  
✅ Markdown: add contributors section based on Git history   
✅ Find magic strings (secrets, placeholders etc.) and replace them automatically  
✅ Publish results directly to Github or file


## Quick Start

Get a configuration file from [examples/celeste-config.js](examples/celeste-config.js) and add the plugins you need, then:

```
$ yarn add --dev celeste
$ yarn celeste -i README.md
react-native-swiper ★6881	 +54 (6827 -> 6881)
..
```

Celeste will scan your files and notify you, as well as edit and fix files automatically if you configure the `publishers` section with the `file` publisher. In such cases make sure you have everything committed properly.

You can also glob to run over multiple files:

```
$ yarn celeste -i '*.md'
```

## Processors

Celeste has a `text` (for all files) and `markdown` processors as well as the ability to activate multiple processors per file. You match file extensions or patterns to a pipeline of processor by specifying it in your `celeste-config.js` file:


```js
processors: {
  '.*\\.md$': ['text', 'markdown'],
  '.*': ['text']
},
```

Each pattern is a regex, so you can capture not only file extensions but also any pattern you think of.

## Publishers

Celeste supports multiple publishers, for example - for publishing results directly to Github or files. 

You can leave this section empty if you only want logs and no side effects (no disk writes or Github publishing).

```js
publishers: {}
```

### File

The simplest form of publisher. Just specify the follow in your `celeste-config.js` file:

```js
  publishers: {
    file: true
  }
```

### Github

To publish results to Github, specify the following in your `celeste-config.js` file:

File
```js
  publishers: {
    github: {
      auth: {
        type: 'token',
        token: process.env.CELESTE_GH
      },
      context: {
        // ref: 'v0.9.2',
        repo: 'celeste',
        owner: 'jondot',
        defaultCommitMessage: 'Celeste: update'
      }
    }
  }
```

For `auth` the following is important:

* `type: 'token'` this is always true, unless you prefer a different authentication method (refer to octokit.js)
* `token: process.env.CELESTE_GH` best to pull the token from an environment variable like specified here

For `context` the following is important:

* `repo: 'celeste'` pick a repository to push to. In this example the repository is called `celeste`
* `owner: 'jondot'` pick an owner of the repository. In this example the owner is  `jondot`
* `ref` specify a branch, tag, or commit sha to refer to. It's best to take from an environment variable (Travis will have the current pull request branch set in an environment variable)
* `defaultCommitMessage` pick a default commit message that celeste will use


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

### Duplicate Links

Detects and reports duplicate links in markdown files.

Add this to `celeste-config.js`:

```js
dedupLinks: true,
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
$ celeste -i README.md --format json
{"type":"plugins/fetch-stars/update","level":"info","payload":{"title":"React Native Styling Cheatsheet ★2632","diff":43,"from":2589,"to":2632}}
...
```


# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).

## Development

Clone this repo, and run:

```
$ yarn
$ yarn main -c examples/celeste-config.js -i test.md
```


## Thanks:


To all [Contributors](https://github.com/jondot/celeste/graphs/contributors) - you make this happen, thanks!


# Copyright

Copyright (c) 2018 [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.
