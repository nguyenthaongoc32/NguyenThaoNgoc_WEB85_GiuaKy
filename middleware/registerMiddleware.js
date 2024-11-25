export const registerMiddleware = (req, res, next) => {
    const { userName, email, password } = req.body;
  
    if (!userName || !email ||!password) {
      return res.status(400).json({ error: "Missing required fields: userName, email or password " });
    }
  
  
    next(); 
  };