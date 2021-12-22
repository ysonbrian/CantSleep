const { User, Users } = require("./models");

const checkRegisterValidation = async (req, res, next) => {
  const { username, password } = req.body;
  const user = Users.findOne({
    where: {
      userName: username,
    },
  });
  if (user) {
    res
      .status(400)
      .json({ message: "회원가입 실패! 이미 등록된 Username입니다." });
    return;
  }
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json("message: 인증을 위한 토큰을 전송해주세요.");
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "유효하지 않은 토큰입니다. 인증에 실패하였습니다." });
    }
    req.userId = decoded.id; // TODO: 확인 필요
    next();
  });
};

module.exports = {
  checkRegisterValidation,
  verifyToken,
};
