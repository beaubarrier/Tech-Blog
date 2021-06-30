const User = require('./User');
const Note = require('./Note');

User.hasMany(Note, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Note };
