const bcrypt = require('bcryptjs');
const UserInfo = require('../models/UserInfo');
const validator = require('validator')
const GeneralFunctions = require('../functions/GeneralFunctions');
const UserRole = require('../models/UserRole');

module.exports = async(req, res) => {
    try {
        let EmailAddress = req.body.email_address;
        let Password = req.body.password;

        if (validator.isEmpty(EmailAddress)) {
            return res.status(400).json({
                success: false,
                message: 'Email Address is required'
            });
        } else if (validator.isEmpty(Password)) {
            return res.status(400).json({
                success: false,
                message: 'Password is required'
            });
        } else if (Password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Login Credentials'
            });
        }

        EmailAddress = EmailAddress.toLowerCase();

        try {
            let result = await UserInfo.findOne({
                where: {
                    email_address: EmailAddress
                },
            });


            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Incorrect Login Credentials'
                });
            }

            const isPasswordValid = await bcrypt.compare(Password, result.password);

            if (isPasswordValid == false) {
                return res.status(404).json({
                    success: false,
                    message: 'Incorrect Login Credentials'
                });
            }

            const UserRoleResult = await UserRole.findOne({
                attributes: ['role_id'],
                where: {
                    user_id: result.id
                }
            });

            if (!UserRoleResult || UserRoleResult.role_id != 2) {
                return res.status(404).json({
                    success: false,
                    message: 'Incorrect Login Credentials'
                });
            }

            JWTData = {
                id: result.id
            };

            return res.status(200).json({
                success: true,
                message: 'Login was successful',
                data: {
                    token: GeneralFunctions.signToken(JWTData)
                }
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Try again'
            });
        }

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'The following request bodies are required email_address & password'
        })
    }
}