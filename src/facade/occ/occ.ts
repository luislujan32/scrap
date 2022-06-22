import * as puppeteer from 'puppeteer'

async function navigateOcc (email: string, password: string) {
  const browser = await puppeteer.launch({ headless: false })
  try {
    const page = await browser.newPage()
    // Se inicia la navegacion desde el dashboard de OCC, esto es porque el login genera un codigo aleatoreo en la URL para poder iniciar sesion
    await page.goto('https://www.occ.com.mx/empresas/')
    const buttons = await page.$$('button')
    await buttons[1].click()
    await page.waitForNavigation()
    // Una vez hecho click, se redirije al login. Se escribe en los inputs y hace click en el boton de login
    await page.type('input[name="login_user"]', `${email}`)
    await page.type('input[name="login_pwd"]', `${password}`)
    const buttonsLogin = await page.$$('button')
    await buttonsLogin[0].click()
    await page.waitForNavigation()
    // Una vez iniciada sesion, se obtieneb las cookies y los datos necesarios para consultar endpoints
    const data = await page.evaluate(() => {
      function getCookieValue (name: string) {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) {
          // @ts-ignore
          return parts.pop().split(';').shift()
        }
        return null
      }

      return {
        token: getCookieValue('occidr11'),
        username: getCookieValue('usrid'),
        cookie: document.cookie
      }
    })
    // Se cierra el browser y se devuelve el token
    await browser.close()
    return data
  } catch (err) {
    await browser.close()
    return {
      err
    }
  }
}

export async function getToken (email: string, pass: string) {
  const result = await navigateOcc(email, pass)
  return result
}



