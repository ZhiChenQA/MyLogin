import Story from './story.mjs';
import webdriver from 'selenium-webdriver'; 
export default class LoginStory extends Story{
    constructor(content){
        super(content);
        this.username;
        this.password;
        this.expected;
        this.actual;
    }

    When(context){
        super.When(context);
        const sub = context.substr(context.indexOf('r')+2,4);
        const account = context.substring(context.indexOf('[')+1,context.length-1);
        sub == 'user' ? this.username = account:this.password = account;
          
    }
    
    Then(context){
        super.Then(context);
        this.expected = context.substring(context.indexOf('[')+1,context.length-1);
        let driver= new webdriver.Builder().forBrowser("chrome").build();
        const login_url='https://everdoc.github.io/hellojs/quize/login.html';
        driver.get(login_url);
        driver.wait(webdriver.until.urlIs(login_url), 1000*15).then((success)=>{
            driver.findElement(webdriver.By.id('name')).sendKeys(this.username);
            driver.findElement(webdriver.By.id('password')).sendKeys(this.password);
            driver.findElement(webdriver.By.tagName('button')).click();
            driver.findElement(webdriver.By.id('result')).getText().then((text)=>{
                this.actual = text;
                //let regexp = new RegExp(this.actual,'i');
                //let result = regexp.test(this.expected);
                //let result = ()=>this.actual == this.expected;
                //let result = (this.actual == this.expected);
                let result = Object.is(this.actual,this.expected);
                let tc_pass = 'The case is PASS';
                result?console.log('The case is PASS'):console.log('The case is FAIL'); 
                driver.quit();
                }
            );         
       }
    ),  ((reason)=>{
            // do nothing
            console.log(reason);
            driver.quit();
            }
       );
    }  
}
