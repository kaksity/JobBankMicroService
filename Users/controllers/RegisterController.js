const validator = require('validator');
const UserInfo = require('../models/UserInfo');
const UserRole = require('../models/UserRole');
const Profile = require('../models/Profile');
const bcryptjs = require('bcryptjs');
const db = require('../config/db');

module.exports = async(req, res) => {
    try {
        let FirstName = req.body.first_name;
        let LastName = req.body.last_name;
        let EmailAddress = req.body.email_address;
        let PhoneNumber = req.body.phone_number;
        let Password = req.body.password;
        let ConfirmPassword = req.body.confirm_password;


        if (validator.isEmpty(FirstName)) {
            return res.status(400).json({
                success: false,
                message: 'First Name is required'
            });
        } else if (validator.isEmpty(LastName)) {
            return res.status(400).json({
                success: false,
                message: 'Last Name is required'
            });
        } else if (validator.isEmpty(EmailAddress)) {
            return res.status(400).json({
                success: false,
                message: ''
            });
        } else if (validator.isEmpty(PhoneNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Phone Number is required'
            });
        } else if (validator.isEmpty(Password)) {
            return res.status(400).json({
                success: false,
                message: 'Password is required'
            });
        } else if (validator.isEmpty(ConfirmPassword)) {
            return res.status(400).json({
                success: false,
                message: 'Confirm Password is required'
            });
        } else if (validator.isEmail(EmailAddress) == false) {
            return res.status(400).json({
                success: false,
                message: 'Email Address is invalid'
            });
        }
        //Check if the Length of the Phone Number is 11
        if (PhoneNumber.length != 11) {
            return res.status(400).json({
                success: false,
                message: 'Phone Number must be 11 digits'
            });
        }

        //Check if the Length of the Password is 8
        if (Password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password length must be 8 or more characters'
            });
        }

        //Check if the password matches the confirm password
        if (Password != ConfirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password must match Confirm Password'
            });
        }
        let transaction = await db.transaction();
        //Convert the Email Address to small case
        EmailAddress = EmailAddress.toLowerCase();
        //Check if the email Address has already been taken
        try {
            let result = await UserInfo.findOne({
                where: {
                    email_address: EmailAddress
                }
            });

            if (result) {
                return res.status(400).json({
                    success: false,
                    message: 'This E-mail Address has already been taken'
                });
            }

            // Since the Email Address has not been taken. Hash the Password and been the process to insert data into db

            let HashedPassword = await bcryptjs.hash(Password, 10);

            try {

                let ProfileResult = await Profile.create({
                    firstname: FirstName,
                    lastname: LastName,
                    phone: PhoneNumber,
                    educated: false,
                    profile_completed: false,
                }, {
                    transaction: transaction
                });

                let UserResult = await UserInfo.create({
                    enabled: true,
                    firstname: FirstName,
                    is_using2fa: false,
                    lastname: LastName,
                    password: HashedPassword,
                    phone: PhoneNumber,
                    email_address: EmailAddress,
                    profile_id: ProfileResult.id
                }, {
                    transaction: transaction
                });

                let UserRoleResult = await UserRole.create({
                    user_id: UserResult.id,
                    role_id: 1
                }, {
                    transaction: transaction
                });

                await transaction.commit();

                return res.status(201).json({
                    success: true,
                    message: 'New User was created Successfully'
                });
            } catch (e) {

                await transaction.rollback();
                console.log(e);
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Try again'
                });
            }

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Try again'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'The Following request bodies are required. first_name, last_name, email_address, phone_number, password, confirm_password'
        });
    }
}