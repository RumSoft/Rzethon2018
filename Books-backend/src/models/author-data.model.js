const AuthorDataSchema = {
    summaryChart: [
        {
          day: "01-12-2018",
          count: 4
        },
        {
          day: "02-12-2018",
          count: 11
        },
        {
          day: "03-12-2018",
          count: 13
        },
        {
          day: "04-12-2018",
          count: 9
        },
        {
          day: "05-12-2018",
          count: 6
        },
        {
          day: "06-12-2018",
          count: 4
        },
        {
          day: "07-12-2018",
          count: 5
        },
        {
          day: "08-12-2018",
          count: 12
        },
        {
          day: "09-12-2018",
          count: 15
        }
      ],
      howManyReadersChart: [
        {
          id: "M",
          name: "mężczyźni",
          value: 52
        },
        {
          id: "F",
          name: "kobiety",
          value: 41
        }
      ],
      readersAgeChart: [
        {
          title: "0-18",
          value: 10
        },
        {
          title: "19-25",
          value: 25
        },
        {
          title: "26-40",
          value: 32
        },
        {
          title: "41-60",
          value: 20
        },
        {
          title: "60+",
          value: 15
        }
      ],
      howManyRead: [
        {
          books: 1,
          count: 70
        },
        {
          books: 2,
          count: 55
        },
        {
          books: 3,
          count: 32
        },
        {
          books: 4,
          count: 25
        },
        {
          books: 5,
          count: 10
        }
      ],
      bestReaderInfo: {
        name: "Konrad Pękala",
        gender: "M",
        count: 69,
        image: "https://i.ibb.co/pXsHQkq/bookpic.png",
        history: [
          1,
          0,
          1,
          2,
          1,
          0,
          3,
          4,
          0,
          1,
          7,
          8,
          9,
          4,
          3,
          6,
          5,
          1,
          0,
          0,
          4,
          2,
          3
        ]
      },
      booksPopularity: [
        {
          title: "Ogniem i mieczem",
          M: 50,
          F: 49
        },
        {
          title: "Quo Vadis",
          M: 25,
          F: 30
        },
        {
          title: "Krzyzacy",
          M: 59,
          F: 40
        },
        {
          title: "Pan Wolodyjowski",
          M: 12,
          F: 25
        },
        {
          title: "Moja walka",
          M: 44,
          F: 24
        }
    ]
};

module.exports = AuthorDataSchema;