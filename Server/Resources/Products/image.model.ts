import mongoose from 'mongoose';

interface Image {
    image: string;
}
const imageSchema = new mongoose.Schema({
    image: {
        type: String,
    }
})

module.exports = mongoose.model<Image>('Image', imageSchema);