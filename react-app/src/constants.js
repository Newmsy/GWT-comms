const today = new Date();

export const dummyData = {
  data: [
    {
      people: [
        {
          name: "Keelie Nampos",
          interested: true,
        },
        {
          name: "Seth Harrington",
          interested: false,
        },
        {
          name: "Cain Cantrell",
          interested: false,
        },
        {
          name: "Joel Mccarthy",
          interested: true,
        },
      ],
      date: today.setDate(11),
    },
    {
      people: [
        {
          name: "Keelie Nampos",
          interested: true,
          attending: false,
        },
        {
          name: "Cain Cantrell",
          interested: false,
          attending: false,
        },
        {
          name: "Joel Mccarthy",
          interested: true,
          attending: false,
        },
      ],
      date: today.setDate(12),
    },
    {
      people: [
        {
          name: "Keelie Nampos",
          interested: true,
        },
        {
          name: "Seth Harrington",
          interested: false,
        },
        {
          name: "Cain Cantrell",
          interested: true,
        },
        {
          name: "Joel Mccarthy",
          interested: false,
        },
      ],
      date: today.setDate(13),
    },
  ],
};
