const noteSvc = require("./note.service");

class NoteController {
    noteMe = (req, res, next) => {
        const data = req.loggedInUser;
        
        res.json({
            data: data,
            code: 200,
            status: "Sucessfully Data Fetched",
            message: "Your profile.",
            options: null,
        })
    }

    createNote = async (req, res, next) => {
        try {
            const updatedData = await noteSvc.transformNoteData(req);

            const response = await noteSvc.saveNote(updatedData);

            res.json({
                data: response,
                code: 200,
                status: "Note Created Successfully",
                message: "Your note has been successfully created.",
                options: null
            })
        } catch (error) {
            throw error
        }
    }

    noteList = async (req, res, next) => {
        try {
            const userDetail = req.loggedInUser;

            const {response, pagination} = await noteSvc.getMultipleById(req.query, {
                user: userDetail._id
            })

            res.json({
                data: response, 
                message: "All the notes of the user",
                status: "List Fetched",
                code: 200,
                options: pagination
            })
        } catch (error) {
            throw error
        }
    }

    updateNote = async (req, res, next) => {
        try {
            const noteId = req.params.id;
            const userNote = await noteSvc.getMultipleById({
                _id: noteId
            });

            if(!userNote) {
                throw {
                    code: 404,
                    status: "Note not found",
                    message: "Note you are searching has been either changed or deleted."
                }
            };

            const body = req.body;
            const updatedBody = await noteSvc.updateNoteById({
                _id: noteId
            }, body, {
                new: true
            });

            res.json({
                data: updatedBody,
                code: 200, 
                status: "Successfully Updated",
                message: "Note updated Successfully.",
                options: null 
            })
        } catch (error) {
            throw error
        }
    }

    deleteNote = async (req, res, next) => {
        try {
            const userNote = await noteSvc.getMultipleById({_id: req.params.id});

            if(!userNote) {
                throw {
                    code: 404, 
                    status: "Error Deleting",
                    message: "Note is already deleted or error in deleting. Try again"
                }
            };

            const response = await noteSvc.deleteNote({_id: req.params.id});

            res.json({
                data: response,
                code: 200, 
                status: "Deleted Successfully.",
                messages: "Your note has been deleted successfully",
                options: null
            })
        } catch (error) {
            throw error
        }
    }

    getSingleNoteInfo = async(req, res, next) => {
        try {
            const token = req.params.id;
            const userNote = await noteSvc.getSingleById({
                _id: token
            })

            if(!userNote) {
                throw {
                    code: 404, 
                    status: "No data found",
                    message: "Note is already deleted or error in fetching. Try again"
                }
            }

            res.json({
                data: userNote, 
                code: 200,
                status: "Fetched Successfully.",
                messages: "Your note has been fetched successfully",
                options: null
            })
        } catch (error) {
            throw error
        }
    }
}

const noteCtrl = new NoteController;

module.exports = noteCtrl