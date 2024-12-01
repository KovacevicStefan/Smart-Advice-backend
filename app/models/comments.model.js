module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
      imePrezime: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      newsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'news',
        key: 'id'
      }
      },
      replyTo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
        model: 'comments',
        key: 'id'
      },
      onDelete: 'CASCADE'
      },
      plus: {
        type: Sequelize.INTEGER
      },
      minus: {
        type: Sequelize.INTEGER
      },
      dateTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      timestamps: false,
    });
  
    return Comments;
  };
  