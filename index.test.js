const { Builder, By, Key, until } = require("selenium-webdriver")
require('dotenv').config()

describe("", () => {
    let driver

    beforeAll(async() => {
        driver = await new Builder().forBrowser('chrome').build()
        await driver.manage().window().maximize()
    })

    afterAll(async() => {
        await driver.quit()
    })

    const setDelay = async() => {
        await driver.sleep(500)
    }

    it("Open homepage and check the title is Home", async() => {
        await driver.get(process.env.url)
        await driver.getTitle().then(title => {
            expect(title).toEqual("Home")
        })
        await setDelay()
    })

    it("Open contact page and check the tile is Contact Us", async() => {
        await driver.get(driver.getCurrentUrl())
        await driver.findElement(By.id('contactLink')).click()
        await driver.getTitle().then(title => {
            expect(title).toEqual("Contact Us")
        })
        await setDelay()
    })

    it("Sign up for more info and confirm the message is More info coming to and the entered email address", 
    async() => {
        await driver.get(driver.getCurrentUrl())
        let element = await driver.findElement(By.id('formInput'))
        await element.sendKeys('email@email.com', Key.TAB)
        await driver.findElement(By.id('formSubmit')).click()

        const isDisplayed = await driver.wait(until.elementLocated(By.id('formMessage')), 5000)
        await isDisplayed.getText().then(message => {
            expect(message).toEqual("More info coming to email@email.com")
        })
        await setDelay()
    })
})