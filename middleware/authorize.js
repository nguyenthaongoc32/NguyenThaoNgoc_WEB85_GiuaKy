    import jwt from 'jsonwebtoken';

    export const authorize = (req, res,next) =>{
        try {
            const { api_key } = req.query;
            if (!api_key) {
                return res.status(403).json({ message: 'Forbidden: API key is missing' });
            }
    
            const token = api_key.split('-')[3];
    
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Access token is invalid or expired', success: false });
                }
    
                const user = await userModel.findById(decoded.userId);
                if (!user || user.api_key !== api_key) {
                    return res.status(403).json({ message: 'Invalid or expired API key', success: false });
                }
    
                req.user = user; 
                next();
            });
        } catch (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
    };