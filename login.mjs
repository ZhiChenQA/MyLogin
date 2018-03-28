import LoginStory from'./loginstory.mjs';

let given = 'Given: open login page';
let whenUser = 'When: enter user name [admin]';
let whenPwd = 'When: enter password [taylor2018]';
let then = 'Then: [Successful!]';

let loginArr = [given,whenUser,whenPwd,then];
const loginStory = new LoginStory(loginArr);
loginStory.Play();