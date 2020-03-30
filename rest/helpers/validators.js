const  Joi = require('@hapi/joi');


module.exports  = {
    validationBody: (schemas)=>{
        return (req,res,next)=>{
            const result  = schemas.validate(req.body)
            if (result.error){
                return res.status(200).json({er:true, no:1, message:'validation Error',token:'' })
            }
            if(!req.value){ req.value= {}}
            req.value['body'] = result.value;
            next()
        }
    },
    schemas:{
        registerSchema:Joi.object().keys({
            firstname:Joi.string().alphanum().min(3).max(30).required(),
            lastname:Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password :Joi.string().required(),
            gender :Joi.string(),
        }),
        loginSchema :Joi.object().keys({
            email: Joi.string().email().required(),
            password :Joi.string().required(),
        }) ,
        password:Joi.object().keys({
            password :Joi.string().required(),
            rePassword : Joi.ref('password'),
        })

    }
}