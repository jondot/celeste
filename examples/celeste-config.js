module.exports = {
  processors: {
    '.*\\.md$': ['text', 'markdown'],
    '.*': ['text']
  },
  publishers: {
    file: true
    /*
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
    */
  },
  plugins: {
    magicStrings: {
      replacements: {
        '\\d\\d\\d\\d': () => '***'
      }
    },
    /*
    brokenLinks: true,
    fetchStars: true,
    gitContributors: {
      contributors: [
        {
          name: 'Dotan Nahum',
          email: 'jondotan@gmail.com',
          github: 'jondot'
        }
      ]
    },
    */
    addLicense: {
      name: 'Dotan Nahum',
      url: 'https://github.com/jondot'
    }

    // sortByStars: true,
    // toc: true
  }
}
