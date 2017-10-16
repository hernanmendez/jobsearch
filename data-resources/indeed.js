const api = require('../indeed-api').getInstance('7256479688442809');
const jobs = require('../database/mongoose').jobs;
const dateoption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

const insertjobs = ({ results }) =>
    results.forEach(({ jobtitle, company, city, date, url }) => {
        try {
            const datepost = (new Date(date)).getTime()
            let job = new jobs({ title: jobtitle, company, location: city, datepost, URL: url })
            job.save().catch(err => {
                if (err) {
                    console.log(`error saving job "${jobtitle}", indeed`)
                }
            });
        }
        catch (e) {
            console.log('Error with indeed')
        }
    })

api.JobSearch()
    .Radius(20)
    .WhereLocation({
        city: "San Francisco",
        state: "CA"
    })
    .Limit(30)
    .WhereKeywords(["frontend backend full stack engineer developer javascript"])
    .SortBy("date")
    .UserIP("1.2.3.4")
    .UserAgent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36")
    .Search(insertjobs, console.log);
