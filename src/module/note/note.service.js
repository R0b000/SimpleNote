const NoteModel = require("./note.model");

class NoteService {
    transformNoteData = (req) => {
        try {
            const data = req.body;

            data.date = Date.now();
            data.user = req.loggedInUser._id;

            return data;
        } catch(error) {
            throw error
        }
    };

    saveNote = async (data) => {
        try {
            const response = new NoteModel(data);
            return await response.save();
        } catch (error) {
            throw error
        }
    }

    getMultipleById = async (query, data) => {
        try {
            const page = parseInt(query.page) || 1;
            let limit = parseInt(query.limit) || 10
            let offset = ((page - 1) * limit)
            let total = await NoteModel.countDocuments(data)
            let total_page = Math.ceil((total)/limit);

            const response = await NoteModel.find(data)
                                            .limit(limit)
                                            .skip(offset)
            return {
                response,
                pagination: {
                    total: total, 
                    limit: limit, 
                    offset: offset, 
                    total_page: total_page
                }
            }
        } catch (error) {
            throw error
        }
    }

    updateNoteById = async (filter, update, options) => {
        try {
            const response = await NoteModel.findOneAndUpdate(filter, update, options);
            return response;
        } catch (error) {
            throw error
        }
    }

    deleteNote = async (data) => {
        try {
            const response = await NoteModel.findOneAndDelete(data);
            return response;
        } catch (error) {
            throw error
        }
    }

    getSingleById = async (data) => {
        try {
            const response = await NoteModel.findOne(data);
            return response;
        } catch (error) {
            throw error
        }
    }
}

const noteSvc = new NoteService;

module.exports = noteSvc