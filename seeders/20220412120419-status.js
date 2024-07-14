module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Statuses',
      [
        {
          id: 1,
          key: 'responseawaited',
          value: 'Response Awaited',
          order: 1,
          type: 'concept',
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 2,
          key: 'confirm',
          value: 'Confirm',
          type: 'concept',
          order: 2,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 3,
          key: 'cancel',
          value: 'Cancel',
          type: 'concept',
          order: 3,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 4,
          key: 'convertedtoproject',
          value: 'Converted To Project',
          order: 4,
          type: 'concept',
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 5,
          key: 'sendforreview',
          value: 'Send for Review',
          order: 5,
          type: 'concept',
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 6,
          key: 'sendforcustomer',
          value: 'Send for Customer',
          order: 6,
          type: 'concept',
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 7,
          key: 'inprogress',
          value: 'In Progress',
          order: 1,
          type: 'space',
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 8,
          key: 'pending',
          value: 'Pending',
          order: 2,
          type: 'space',
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 9,
          key: 'completed',
          value: 'Completed',
          order: 3,
          type: 'space',
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 10,
          key: 'completed',
          value: 'Completed',
          order: 7,
          type: 'concept',
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 11,
          key: 'draft',
          value: 'Draft',
          order: 8,
          type: 'concept',
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
      ],
      {}
    );
  },

  down: async () => {
    // await queryInterface.dropTable('Roles');
    // await queryInterface.bulkDelete('Roles', null, {});
  },
};
