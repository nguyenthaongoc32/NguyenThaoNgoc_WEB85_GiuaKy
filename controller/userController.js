import userModel from '../model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
export const register = async(req, res, next) =>{
    const {userName, email, password, api_key} = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    try {
        const newUser = await userModel.create({
            userName,
            email,
            password: hash,
            api_key
        });
        await newUser.save();
        res.status(201).send({
            message : 'User registered successfully!',
            data : newUser,
            success : true
        })

    }catch(err){
        res.status(404).send({
            message: err.message,
            data: null,
            success: false
        });
    }
};


export const login = async(req, res, next) =>{
    try {
        const { email, password } = req.body;
        const currentUser = await userModel.findOne({ email });
        
        if (!currentUser) {
            return res.status(400).json({ message: 'Incorrect account', success: false });
        }

        const isPasswordCorrect =await bcrypt.compare(password, currentUser.password);


        if (isPasswordCorrect) {
            const token = jwt.sign({userId: currentUser._id, email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            const api_key = `mern-${currentUser._id}-${email}-${token}`;

            currentUser.api_key = api_key;
            await currentUser.save();

            return res.status(200).json({
                message: 'Login successful',
                data: { api_key },
                success: true
            });
        } else {
            return res.status(400).json({
                message: 'Incorrect password',
                success: false
            });
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: null,
            success: false
        });
    }
};

