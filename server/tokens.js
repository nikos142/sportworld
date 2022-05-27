const {sign} = require('jsonwebtoken')

 function createAccessToken(id){
    return sign({id}, process.env.ACCESS_TOKEN_SECRET , {
        expiresIn: "15m",
    })
}

function createRefreshToken(id){
    return sign({id}, process.env.REFRESH_TOKEN_SECRET , {
        expiresIn: "1d",
    })
}
    

function sendAccessToken( res, req, accesstoken)
{
    res.send({
        accesstoken, 
        email: req.body.email
    })
}

function sendRefreshToken( res, refreshtoken)
{
    res.cookie(
        'refreshtoken', refreshtoken , {
            httpOnle:true,
            path:'/refresh_token', 
        }
    )
}

module.exports ={createRefreshToken,
                 createAccessToken, 
                 sendAccessToken,
                 sendRefreshToken}