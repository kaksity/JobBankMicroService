const Express = require('express');
const Router = Express.Router();



//Controllers
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const ProfileGetController = require('../controllers/ProfileGetController');
const EducationLevelController = require('../controllers/EducationLevelController');
const LGAController = require('../controllers/LGAController');
const SkillController = require('../controllers/SkillController');
const AdditionalSkillsGetController = require('../controllers/AdditionalSkillsGetController');
const AdditionalSkillsPostController = require('../controllers/AdditionalSkillsPostController');
const AdditionalSkillsDeleteController = require('../controllers/AdditionalSkillsDeleteController');
const WorkExperienceGetController = require('../controllers/WorkExperienceGetController');
const WorkExperiencePostController = require('../controllers/WorkExperiencePostController');
const WorkExperienceDeleteController = require('../controllers/WorkExperienceDeleteController');
const ProfileUpdateController = require('../controllers/ProfileUpdateController');
const QualificationsGetController = require('../controllers/QualificationsGetController');
const QualificationsDetailsGetController = require('../controllers/QualificationsDetailsGetController');
const PassportGetController = require('../controllers/PassportGetController');
const PassportUpdateController = require('../controllers/PassportUpdateController');
const QualificationsPostController = require('../controllers/QualificationsPostController');
const QualificationsDeleteController = require('../controllers/QualificationsDeleteController');
const PreviewGetController = require('../controllers/PreviewGetController');
const ChnagePasswordPutController = require('../controllers/ChangePasswordPutController');
const ForgotPasswordPostController = require('../controllers/ForgotPasswordPostController');

//Middlware
const VerifyToken = require('../middleware/VerifyToken');
const UploadAvatar = require('../middleware/UploadAvatar');
const UploadQualifications = require('../middleware/UploadQualifications');

//Register Routes
Router.post('/login', LoginController);

//Login Routes
Router.post('/register', RegisterController);

//Get Profile routes
Router.get('/profile', [VerifyToken], ProfileGetController);

//Update Profile 
Router.put('/profile', [VerifyToken], ProfileUpdateController)

//Get Education level
Router.get('/education-level', EducationLevelController);

//Get LGA 
Router.get('/lga', LGAController)

//Get Skills
Router.get('/skills', SkillController)

//Get Additional Skills
Router.get('/additional-skills', [VerifyToken], AdditionalSkillsGetController);

//Post Additional Skills
Router.post('/additional-skills', [VerifyToken], AdditionalSkillsPostController);

//Delete Additional Skills
Router.delete('/additional-skills/:id', [VerifyToken], AdditionalSkillsDeleteController);

//Get Passport
Router.get('/passport', [VerifyToken], PassportGetController)

//Update Passport
Router.put('/passport', [VerifyToken, UploadAvatar], PassportUpdateController)

//Get Work Experince
Router.get('/work-experiences', [VerifyToken], WorkExperienceGetController);

//Post Work Experience
Router.post('/work-experiences', [VerifyToken], WorkExperiencePostController);

//Delete Work Experience
Router.delete('/work-experiences/:id', [VerifyToken], WorkExperienceDeleteController);

//Get Qualifications
Router.get('/qualifications', [VerifyToken], QualificationsGetController);

//Get Qualifications Details
Router.get('/qualifications/:id', [VerifyToken], QualificationsDetailsGetController);

//Delete Qualifications
Router.delete('/qualifications/:id', [VerifyToken], QualificationsDeleteController);

//Post a new Qualification
Router.post('/qualifications', [VerifyToken, UploadQualifications], QualificationsPostController);

//PUT change Password
Router.put('/change-password', [VerifyToken], ChnagePasswordPutController);

//Post Forgot Password
Router.post('/forgot-password', ForgotPasswordPostController);
//Get the Preview Data
Router.get('/preview', [VerifyToken], PreviewGetController)
module.exports = Router;