const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Story = mongoose.model('Story');

module.exports = app => {
    app.get('/api/stories/:id', requireLogin, async (req, res) => {
        const story = await Story.findOne({
            _user: req.user.id,
            _id: req.params.id
        });
        res.send(story);
    });

    app.get('/api/stories', requireLogin, async (req, res) => {
        const stories = await Story.find({_user: req.user.id});
        res.send(stories);
    });

    app.post('/api/stories', requireLogin, async (req, res) => {
        const {title, content} = req.body;

        const story = new Story({
            title,
            content,
            _user: req.user.id
        });
        try {
            await story.save();
            res.send(story);
        } catch (err) {
            res.send(400,err)
        }
    });
}