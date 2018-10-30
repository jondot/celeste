module.exports = {
  plugins: {
    magicStrings: {
      replacements: {
        '\\d\\d\\d\\d': () => '***'
      }
    },
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
    addLicense: {
      name: 'Dotan Nahum',
      url: 'https://github.com/jondot'
    }

    // sortByStars: true,
    // toc: true
  }
}
