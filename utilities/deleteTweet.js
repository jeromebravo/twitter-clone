module.exports = async (id, array, Model, field) => {
    try {
        let i = 0;
        while(i < array.length) {
            // get Like schema or TweetList schema
            let document = await Model.findOne({user: array[i].profile.user});

            // get correct index
            let removeIndex = document[field].map(val => val.tweet.toString()).indexOf(id);

            // remove tweet from like list or tweet list
            document[field].splice(removeIndex, 1);

            // save
            await document.save();

            // increment by 1
            i++;
        }
    } catch(err) {
        console.log(err.message);
    }
}