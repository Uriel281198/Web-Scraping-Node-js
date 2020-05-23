const puppeter = require('puppeteer');

const getData = async (req,resp) => {
   
    
    try {
        let urlBase = 'https://animeschedule.net/';
        let browser = await puppeter.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],
        });
        let page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        })
        await page.goto(urlBase,{timeout:0});
        
        const resultado = await page.evaluate(() => {

            const mondayNames = [
                ...document.querySelectorAll('.Monday .timetable-column-show .show-title-bar h3')
            ].map((x) => x.innerHTML)
            const mondayImages = [
                ...document.querySelectorAll('.Monday .timetable-column-show .poster-link picture img')
            ].map((imagen => imagen.src))
            const mondayEpisodes = [
                ...document.querySelectorAll('.Monday .timetable-column-show .time-bar .show-episode')
            ].map((episode => episode.innerHTML))


            const tuesdayNames = [
                ...document.querySelectorAll('.Monday .timetable-column-show .show-title-bar h3')
            ].map((x) => x.innerHTML)
            const tuesdayImages = [
                ...document.querySelectorAll('.Tuesday .timetable-column-show .poster-link picture img')
            ].map((x) => x.src)            
            const tuesdayEpisodes = [
                ...document.querySelectorAll('.Tuesday .timetable-column-show .time-bar .show-episode')
            ].map((episode => episode.innerHTML))


            const wednesdayNames = [
                ...document.querySelectorAll('.Wednesday .timetable-column-show .show-title-bar h3')
            ].map((x) => x.innerHTML)
            const wednesdayImages = [
                ...document.querySelectorAll('.Wednesday .timetable-column-show .poster-link picture img')
            ].map((x) => x.src)
            const wednesdayEpisodes = [
                ...document.querySelectorAll('.Wednesday .timetable-column-show .time-bar .show-episode')
            ].map((episode => episode.innerHTML))


            const thursdayNames = [
                ...document.querySelectorAll('.Thursday .timetable-column-show .show-title-bar h3')
            ].map((x) => x.innerHTML)
            const thursdayImages = [
                ...document.querySelectorAll('.Thursday .timetable-column-show .poster-link picture img')
            ].map((x) => x.src)
            const thursdayEpisodes = [
                ...document.querySelectorAll('.Wednesday .timetable-column-show .time-bar .show-episode')
            ].map((episode => episode.innerHTML))

            const fridayNames = [
                ...document.querySelectorAll('.Friday .timetable-column-show .show-title-bar h3')
            ].map((x) => x.innerHTML)
            const fridayImages = [
                ...document.querySelectorAll('.Friday .timetable-column-show .poster-link picture img')
            ].map((x) => x.src)

            const fridayEpisodes = [
                ...document.querySelectorAll('.Friday .timetable-column-show .time-bar .show-episode')
            ].map((episode => episode.innerHTML))

            const saturdayNames = [
                ...document.querySelectorAll('.Saturday .timetable-column-show .show-title-bar h3')
            ].map((x) => x.innerHTML)
            const saturdayImages = [
                ...document.querySelectorAll('.Saturday .timetable-column-show .poster-link picture img')
            ].map((x) => x.src)

            const saturdayEpisodes = [
                ...document.querySelectorAll('.Saturday .timetable-column-show .time-bar .show-episode')
            ].map((episode => episode.innerHTML))

            const sundayNames = [
                ...document.querySelectorAll('.Sunday .timetable-column-show .show-title-bar h3')
            ].map((x) => x.innerHTML)
            const sundayImages = [
                ...document.querySelectorAll('.Sunday .timetable-column-show .poster-link picture img')
            ].map((x) => x.src)

            const sundayEpisodes = [
                ...document.querySelectorAll('.Sunday .timetable-column-show .time-bar .show-episode')
            ].map((episode => episode.innerHTML))

            const monday = mondayNames.map((name, i) => (
                {
                    name: name, 
                    img: mondayImages[i],
                    episodes:mondayEpisodes[i]
                }
            ))
            const tuesday = tuesdayNames.map((name, i) => (
                { 
                    name: name, 
                    img: tuesdayImages[i],
                    episodes:tuesdayEpisodes[i]
                }
            ))

            const wednesday = wednesdayNames.map((name, i) => (
                { 
                    name: name, 
                    img: wednesdayImages[i],
                    episodes:wednesdayEpisodes[i]
                }
            ))
            const thursday = thursdayNames.map((name,i)=>  (
                {
                    name:name,
                    img:thursdayImages[i],
                    episodes:thursdayEpisodes[i]
                }
            ))

            const friday = fridayNames.map((name,i)=>(
                {
                    name:name,
                    img:fridayImages[i],
                    episodes:fridayEpisodes[i]
                }
            ))
            const saturday = saturdayNames.map((name,i)=>(
                {
                    name:name,
                    img:saturdayImages[i],
                    episodes:saturdayEpisodes[i]
                }
            ))
            const sunday = sundayNames.map((name,i)=>(
                {
                    name:name,
                    img:sundayImages[i],
                    episodes:sundayEpisodes[i]
                }
            ))

            //return wednesdayEpisodes
            return {
                lunes: monday,
                martes: tuesday,
                miercoles: wednesday,
                jueves: thursday,
                viernes:friday,
                sabado: saturday,
                domingo:sunday
            };
        })
        resp.json(resultado)
        console.log(resultado)
        await browser.close();  

    } catch (e) {
        console.log(e)
    }
};



module.exports = {
    getData
}
