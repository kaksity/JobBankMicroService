const Express = require('express');
const Router = Express.Router();

//Controllers
const LoginPostController = require('../controllers/LoginPostController');
const ChangePasswordPutController = require('../controllers/ChangePasswordPutController');
const EducationLevelController = require('../controllers/EducationLevelController');
const LGAController = require('../controllers/LGAController');
const GenerateReportProfileGetController = require('../controllers/GenerateReportProfileGetController');
const SkillController = require('../controllers/SkillController');
const GenerateReportSkillsGetController = require('../controllers/GenerateReportSkillsGetController');
const GenerateReportQualificationsGetController = require('../controllers/GenerateReportQualificationsGetController');
const DashboardGetController = require('../controllers/DashboardGetController');
const ProfileListGetController = require('../controllers/ProfileListGetController');
const ProfileGetController = require('../controllers/ProfileGetController');
const GenerateCVGETController = require('../controllers/GenerateCVGETController');

// Middleware
const VerifyToken = require('../middleware/VerifyToken');
const VerifyAdmin = require('../middleware/VerifyAdmin');

Router.post('/login',LoginPostController);
Router.put('/change-password',[VerifyToken,VerifyAdmin],ChangePasswordPutController);

Router.get('/dashboard',[VerifyToken,VerifyAdmin],DashboardGetController);

//Get Education level
Router.get('/education-level',[VerifyToken,VerifyAdmin],EducationLevelController);

//Get SkillSet List
Router.get('/skills',[VerifyToken,VerifyAdmin],SkillController)

//Get LGA 
Router.get('/lga',[VerifyToken,VerifyAdmin],LGAController);


Router.get('/profile',[VerifyToken,VerifyAdmin],ProfileListGetController);
Router.get('/generate/user/profile',[VerifyToken,VerifyAdmin],GenerateReportProfileGetController);
Router.get('/generate/user/skills',[VerifyToken,VerifyAdmin],GenerateReportSkillsGetController);
Router.get('/generate/user/qualifications',[VerifyToken,VerifyAdmin],GenerateReportQualificationsGetController);
Router.get('/profile/:id',[VerifyToken,VerifyAdmin],ProfileGetController);
Router.get('/generate/cv/:id',[VerifyToken,VerifyAdmin],GenerateCVGETController);
module.exports = Router;
