const puppeter = require('puppeteer');

const getDataCovid = async (req, resp) => {


    try {

        let urlBase = 'https://news.google.com/covid19/map?hl=es-419&gl=US&ceid=US%3Aes-419&mid=%2Fm%2F0b90_r';
        let browsert = await puppeter.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],
        });

        let page = await browsert.newPage();

        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        })
        await page.goto(urlBase, { timeout: 0 });
        // await page.screenshot({ path: 'google.png' })

        const resultado = await page.evaluate(() => {
            const nombres = [
                ...document.querySelectorAll('.y3767c  .pH8O4c  .ppcUXd  .sgXwHf  th span')
            ].map((x) => x.innerHTML)

            var casos = [
                ...document.querySelectorAll('.y3767c  .pH8O4c  .ppcUXd  .sgXwHf td')
            ].map((x) => x.innerHTML)

            let resultado = [];
            for (let i = 3; i < casos.length; i += 4) {
                const caso = {};
                caso["confirmados"] = casos[i - 3];
                caso["casosxmillon"] = casos[i - 2];
                caso["recuperadas"] = casos[i - 1];
                caso["muertes"] = casos[i];
                resultado.push(caso)
            }
            const resultadoFinal = nombres.map((x, i) => (
                {
                    name: x,
                    datos: resultado[i]
                }
            ))

            return resultadoFinal;

        })

        resp.json(resultado)
        console.log(resultado)
        await browsert.close();
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getDataCovid
}