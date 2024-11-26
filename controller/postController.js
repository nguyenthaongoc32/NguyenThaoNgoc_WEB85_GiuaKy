import postModel from '../model/postModel.js';
import userModel from '../model/userModel.js';

export const postCreate = async(req,res) =>{
    const { content } = req.body;
    if (!content) {
        return res.status(400).send({
            message: "Content is required",
            success: false
        });
    }

    try {
        const user = req.user; 

        if (!user) {
            return res.status(403).send({
                message: "Invalid or expired apiKey",
                success: false
            });
        }

        const newPost = new postModel({
            userId: user._id, 
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await newPost.save();

        return res.status(201).send({
            message: "Post created successfully",
            post: newPost,
            success: true
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message || 'Server error',
            success: false
        });
    }
};

export const postPut = async(req,res) =>{
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (!post.userId.equals(req.user.userId)) {
            return res.status(403).json({ error: "Unauthorized to edit this post" });
        }

        post.content = content;
        post.updatedAt = new Date();
        await post.save();

        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}